import { clamp, mix, smooth, type Journey, type SceneClock } from './journey';

interface Point { x: number; y: number; z: number; size: number; tone: number }
interface ParticleScene {
  draw: (time: number) => void;
  resize: () => void;
  pointer: (x: number, y: number, active: boolean) => void;
  interacting: () => boolean;
}
function randomGenerator() {
  let seed = 491;
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

/** Samples transparent artwork or separates opaque JPEG artwork from its corner-derived background. */
export async function sampleMotif(url: string): Promise<Point[]> {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = url;
  await image.decode();
  const surface = document.createElement('canvas');
  surface.width = surface.height = 200;
  const context = surface.getContext('2d', { willReadFrequently: true });
  if (!context) return [];
  context.drawImage(image, 0, 0, 200, 200);
  const rgba = context.getImageData(0, 0, 200, 200).data;
  const random = randomGenerator();
  const points: Point[] = [];
  const cornerCoordinates = [[2, 2], [197, 2], [2, 197], [197, 197]];
  const background = cornerCoordinates.reduce((sum, [x, y]) => {
    const offset = (y * 200 + x) * 4;
    return [sum[0] + rgba[offset], sum[1] + rgba[offset + 1], sum[2] + rgba[offset + 2], sum[3] + rgba[offset + 3]];
  }, [0, 0, 0, 0]).map(value => value / cornerCoordinates.length);
  const opaqueBackground = background[3] > 230;
  for (let y = 0; y < 200; y += 2) for (let x = 0; x < 200; x += 2) {
    const offset = (y * 200 + x) * 4;
    const red = rgba[offset], green = rgba[offset + 1], blue = rgba[offset + 2], alpha = rgba[offset + 3];
    if (alpha < 80) continue;
    const distance = Math.hypot(red - background[0], green - background[1], blue - background[2]);
    if (opaqueBackground && distance < 26) continue;
    const lightness = (red + green + blue) / 765;
    const tone = lightness > 0.72 ? 0.96 : blue > red * 1.12 ? 0.04 : 0.5;
    const layers = random() > 0.84 ? 2 : 1;
    for (let depth = 0; depth < layers; depth++) points.push({
      x: (x + random() * 2 - 100) / 200,
      y: (y + random() * 2 - 100) / 200,
      z: (random() - 0.5) * 0.12,
      size: 0.45 + random() * 1.2,
      tone,
    });
  }
  return points;
}

export function createParticleScene(canvas: HTMLCanvasElement, points: Point[], journey: Journey, clock: SceneClock, reduced: boolean): ParticleScene {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return { draw: () => {}, resize: () => {}, pointer: () => {}, interacting: () => false };
  const random = randomGenerator();
  const stars: Point[] = Array.from({ length: 760 }, () => ({
    x: random(), y: random(), z: random(), size: random() * 1.35 + 0.3, tone: random(),
  }));
  let width = 0, height = 0, mobile = false;
  let accent = '', foreground = '', particleSecondary = '';
  let pointerTargetX = 0, pointerTargetY = 0, pointerX = 0, pointerY = 0;
  let pointerPresenceTarget = 0, pointerPresence = 0;
  const resize = () => {
    width = innerWidth; height = innerHeight; mobile = width < 768;
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const css = getComputedStyle(document.documentElement);
    accent = css.getPropertyValue('--color-accent').trim();
    foreground = css.getPropertyValue('--color-text').trim();
    particleSecondary = css.getPropertyValue('--color-particle-secondary').trim() || css.getPropertyValue('--color-secondary').trim();
  };
  const dot = (x: number, y: number, radius: number, alpha: number, tone: number) => {
    if (x < -10 || x > width + 10 || y < -10 || y > height + 10 || alpha < 0.015) return;
    context.globalAlpha = clamp(alpha);
    context.fillStyle = tone > 0.84 ? foreground : tone > 0.12 ? accent : particleSecondary;
    if (radius < 1.3) context.fillRect(x, y, radius * 1.4, radius * 1.4);
    else {
      context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill();
      if (radius > 2) {
        context.globalAlpha = clamp(alpha * 0.1);
        context.beginPath(); context.arc(x, y, radius * 2.2, 0, Math.PI * 2); context.fill();
      }
    }
  };
  let elapsed = 0, previous = 0;
  const draw = (time: number) => {
    if (!width || document.hidden) return;
    const delta = Math.max(0, Math.min(time - previous, 0.05)); previous = time;
    if (!clock.paused && !reduced && clock.ready) elapsed += delta;
    const pointerEase = 1 - Math.exp(-delta * 5.5);
    pointerX = mix(pointerX, pointerTargetX, pointerEase);
    pointerY = mix(pointerY, pointerTargetY, pointerEase);
    pointerPresence = mix(pointerPresence, pointerPresenceTarget, pointerEase);
    if (Math.abs(pointerX - pointerTargetX) < 0.015) pointerX = pointerTargetX;
    if (Math.abs(pointerY - pointerTargetY) < 0.015) pointerY = pointerTargetY;
    if (Math.abs(pointerPresence - pointerPresenceTarget) < 0.015) pointerPresence = pointerPresenceTarget;
    const h = reduced ? 0 : clock.h;
    const travel = smooth(h / (1 + 2 * journey.pace));
    const departure = smooth((h - journey.fit) / 1.4);
    context.clearRect(0, 0, width, height);

    // A full-viewport field replaces the old rectangular threshold from the first frame onward.
    const fieldAlpha = reduced ? 0.12 : mix(0.3, 0.66, smooth(h / (2.4 * journey.pace)));
    for (const star of stars) {
      const depthShiftX = pointerX * (8 + star.z * 20);
      const depthShiftY = pointerY * (5 + star.z * 14);
      const x = (star.x * width + Math.sin(elapsed * 0.09 + star.z * 20) * 7 + depthShiftX + width) % width;
      const y = (star.y * height + elapsed * (0.4 + star.z) * 2 + depthShiftY + height) % height;
      dot(x, y, star.size * (1 + departure), fieldAlpha * (0.18 + star.z * 0.65), star.tone);
    }

    let anchorX = width / 2;
    let anchorY = mobile ? height * 0.4 : height * 0.5;
    if (h > 0.3) anchorY = height * 0.5;
    const panelZone = smooth((h - (journey.heading - 0.45 * journey.pace)) / (0.65 * journey.pace));
    if (mobile) {
      anchorY = mix(anchorY, height * 0.28, panelZone * (1 - smooth((h - journey.workEnd) / (0.5 * journey.pace))));
    } else {
      const count = Math.max(1, Math.round((journey.workEnd - journey.work) / journey.panelLength));
      let side = 0.73;
      for (let i = 1; i < count; i++) {
        const at = journey.work + i * journey.panelLength - 0.75 * journey.pace;
        side = mix(side, i % 2 ? 0.27 : 0.73, smooth((h - at) / (0.5 * journey.pace)));
      }
      anchorX = mix(width / 2, width * side, panelZone);
      anchorX = mix(anchorX, width / 2, smooth((h - (journey.workEnd - 0.5 * journey.pace)) / journey.pace));
    }
    if (!reduced) {
      const interactionScale = mix(1, 0.48, panelZone);
      const restrainedAnchorX = anchorX + pointerX * Math.min(width * 0.09, 96) * interactionScale;
      const restrainedAnchorY = anchorY + pointerY * Math.min(height * 0.07, 62) * interactionScale;
      const edgeX = Math.min(width * 0.04, 48);
      const edgeY = Math.min(height * 0.05, 40);
      const pointerAnchorX = mix(edgeX, width - edgeX, (pointerX + 1) * 0.5);
      const pointerAnchorY = mix(edgeY, height - edgeY, (pointerY + 1) * 0.5);
      const homeFollow = 1 - smooth((h - (journey.about - 0.65 * journey.pace)) / (0.25 * journey.pace));
      const interactiveAnchorX = mix(restrainedAnchorX, pointerAnchorX, homeFollow);
      const interactiveAnchorY = mix(restrainedAnchorY, pointerAnchorY, homeFollow);
      anchorX = mix(anchorX, interactiveAnchorX, pointerPresence);
      anchorY = mix(anchorY, interactiveAnchorY, pointerPresence);
    }
    const largeSize = mobile ? Math.min(height * 0.92, width * 1.55) : Math.min(height * 1.08, width * 0.68);
    const size = mix(mobile ? 160 : 230, largeSize, smooth(h / (2.1 * journey.pace)));
    const angle = reduced ? 0.04 : elapsed * 0.14 + travel * 1.25 + pointerX * 0.16;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const tilt = Math.sin(elapsed * 0.12) * 0.1 + pointerY * 0.08;
    const step = mobile ? 2 : 1;
    for (let i = 0; i < points.length; i += step) {
      const point = points[i];
      const x = point.x * cos + point.z * sin;
      const z = -point.x * sin + point.z * cos;
      const perspective = 1 / (1.2 - z * 0.42);
      const spread = departure * (1.4 + point.tone * 1.8);
      const px = anchorX + (x * size * perspective + point.x * width * spread);
      const py = anchorY + (point.y * size * perspective + x * size * tilt + point.y * height * spread);
      const radius = point.size * (0.68 + size / 550) * perspective;
      const flicker = 0.82 + Math.sin(elapsed * 1.2 + i) * 0.18;
      dot(px, py, radius, (1 - departure) * (0.38 + point.tone * 0.58) * flicker, point.tone);
    }
    context.globalAlpha = 1;
  };
  const pointer = (x: number, y: number, active: boolean) => {
    pointerTargetX = active && width ? clamp((x / width - 0.5) * 2, -1, 1) : 0;
    pointerTargetY = active && height ? clamp((y / height - 0.5) * 2, -1, 1) : 0;
    pointerPresenceTarget = active ? 1 : 0;
  };
  resize();
  return {
    draw,
    resize,
    pointer,
    interacting: () => Math.abs(pointerX - pointerTargetX) > 0.002
      || Math.abs(pointerY - pointerTargetY) > 0.002
      || Math.abs(pointerPresence - pointerPresenceTarget) > 0.002,
  };
}

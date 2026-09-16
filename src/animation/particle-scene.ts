import { clamp, mix, smooth, type Journey, type SceneClock } from './journey';

interface Point { x: number; y: number; z: number; size: number; tone: number }
function randomGenerator() {
  let seed = 491;
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
}

/** Sample our replaceable SVG's alpha only. No reference geometry is used. */
export async function sampleMotif(url: string): Promise<Point[]> {
  const image = new Image();
  image.src = url;
  await image.decode();
  const surface = document.createElement('canvas');
  surface.width = surface.height = 160;
  const context = surface.getContext('2d', { willReadFrequently: true });
  if (!context) return [];
  context.drawImage(image, 0, 0, 160, 160);
  const rgba = context.getImageData(0, 0, 160, 160).data;
  const random = randomGenerator();
  const points: Point[] = [];
  for (let y = 0; y < 160; y += 2) for (let x = 0; x < 160; x += 2) {
    if (rgba[(y * 160 + x) * 4 + 3] < 80) continue;
    for (let depth = 0; depth < 3; depth++) points.push({
      x: (x + random() * 2 - 80) / 160,
      y: (y + random() * 2 - 80) / 160,
      z: (random() - 0.5) * 0.14,
      size: 0.45 + random() * 1.15,
      tone: random(),
    });
  }
  return points;
}

export function createParticleScene(canvas: HTMLCanvasElement, points: Point[], journey: Journey, clock: SceneClock, reduced: boolean) {
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return { draw: () => {}, resize: () => {} };
  const random = randomGenerator();
  const stars: Point[] = Array.from({ length: 420 }, () => ({
    x: random(), y: random(), z: random(), size: random() * 1.35 + 0.3, tone: random(),
  }));
  const portal: Point[] = Array.from({ length: 920 }, (_, i) => {
    const side = i % 4;
    return { x: side < 2 ? (side ? 0.5 : -0.5) : random() - 0.5,
      y: side >= 2 ? (side === 2 ? -0.5 : 0.5) : random() - 0.5,
      z: random(), size: random() * 1.6 + 0.4, tone: random() };
  });
  let width = 0, height = 0, mobile = false;
  let accent = '', foreground = '', secondary = '';
  const resize = () => {
    width = innerWidth; height = innerHeight; mobile = width < 768;
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const css = getComputedStyle(document.documentElement);
    accent = css.getPropertyValue('--color-accent').trim();
    foreground = css.getPropertyValue('--color-text').trim();
    secondary = css.getPropertyValue('--color-secondary').trim();
  };
  const dot = (x: number, y: number, radius: number, alpha: number, tone: number) => {
    if (x < -10 || x > width + 10 || y < -10 || y > height + 10 || alpha < 0.015) return;
    context.globalAlpha = clamp(alpha);
    context.fillStyle = tone > 0.84 ? foreground : tone > 0.12 ? accent : secondary;
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
    const h = reduced ? 0 : clock.h;
    const travel = smooth(h / (1 + 2 * journey.pace));
    const departure = smooth((h - journey.outro) / 1.4);
    context.clearRect(0, 0, width, height);

    // A quiet field gains depth only after the opening traversal.
    const fieldAlpha = reduced ? 0.12 : smooth((h - 1.7 * journey.pace) / journey.pace) * 0.6;
    for (const star of stars) {
      const x = (star.x * width + Math.sin(elapsed * 0.09 + star.z * 20) * 7 + width) % width;
      const y = (star.y * height + elapsed * (0.4 + star.z) * 2) % height;
      dot(x, y, star.size * (1 + departure), fieldAlpha * (0.18 + star.z * 0.65), star.tone);
    }
    // An original sparse rectangular threshold; all points are generated locally.
    const portalAlpha = 1 - smooth((travel - 0.58) / 0.42);
    if (portalAlpha > 0) {
      const zoom = 1 + travel * 7;
      const portalWidth = Math.min(width * 0.7, height * 0.26) * zoom;
      const portalHeight = height * 0.64 * zoom;
      for (const point of portal) {
        const drift = Math.sin(elapsed * 0.6 + point.z * 25) * 3;
        const x = width / 2 + point.x * portalWidth + (point.z - 0.5) * 19 * zoom + drift;
        const y = height / 2 + point.y * portalHeight + (point.z - 0.5) * 13 * zoom;
        dot(x, y, point.size * Math.min(zoom, 2.8), portalAlpha * (0.2 + point.z * 0.65), point.tone);
      }
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
    const largeSize = mobile ? Math.min(height * 0.9, width * 1.65) : Math.min(height * 1.05, width * 0.65);
    const size = mix(mobile ? 145 : 180, largeSize, smooth(h / (2.1 * journey.pace)));
    const angle = reduced ? 0.18 : elapsed * 0.18 + travel * 1.6;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const tilt = Math.sin(elapsed * 0.12) * 0.12;
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
  resize();
  return { draw, resize };
}

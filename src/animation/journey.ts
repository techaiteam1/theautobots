/** Distances are viewport heights. Content count and input control total length. */
export function createJourney(touch: boolean, count: number) {
  const pace = touch ? 1.8 : 1;
  const about = 1 + 2 * pace + 0.1;
  const aboutEnd = about + 3.3 * pace;
  const bridge = aboutEnd + 0.65 * pace;
  const bridgeEnd = bridge + 1.45 * pace;
  const heading = bridgeEnd + 0.55 * pace;
  const work = heading + 0.4;
  const panelLength = 1.75 * pace;
  const workEnd = work + count * panelLength;
  const outro = workEnd + 0.7 * pace;
  const operations = outro + 1.1 * pace;
  const fit = operations + 1.65 * pace;
  const contact = fit + 1.8 * pace;
  return { pace, about, aboutEnd, bridge, bridgeEnd, heading, work, panelLength, workEnd, outro, operations, fit, contact, total: contact + 1 };
}
export type Journey = ReturnType<typeof createJourney>;
export interface SceneClock { h: number; paused: boolean; ready: boolean }
export type SectionId = 'home' | 'approach' | 'workflow' | 'systems' | 'operations' | 'fit' | 'contact';
export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Distances are viewport heights. Content count and input control total length. */
export function createJourney(touch: boolean, count: number) {
  const pace = touch ? 1.8 : 1;
  const about = 1 + 2 * pace + 0.1;
  const aboutEnd = about + 3.3 * pace;
  const heading = aboutEnd + 0.5 * pace;
  const work = heading + 0.4;
  const panelLength = 1.8 * pace;
  const workEnd = work + count * panelLength;
  const outro = workEnd + 0.7 * pace;
  const contact = outro + 1.4;
  return { pace, about, aboutEnd, heading, work, panelLength, workEnd, outro, contact, total: contact + 1 };
}
export type Journey = ReturnType<typeof createJourney>;
export interface SceneClock { h: number; paused: boolean; ready: boolean }
export type SectionId = 'home' | 'approach' | 'systems' | 'contact';
export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p); };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

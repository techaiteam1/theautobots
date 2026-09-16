---
title: Motion and Interaction Model
type: engineering-context
status: current
last_verified: 2026-09-16
---

# Motion and interaction model

## The journey coordinate

Animation is expressed in viewport heights (`H`), not raw pixels. ScrollTrigger maps `scrollY / innerHeight` to the shared journey coordinate `h`. Fine-pointer devices use `pace = 1`; coarse pointers use `pace = 1.8` to give touch transitions more room.

For `count` stories:

```text
about      = 1 + 2*pace + 0.1
aboutEnd   = about + 3.3*pace
heading    = aboutEnd + 0.5*pace
work       = heading + 0.4
panelLength= 1.8*pace
workEnd    = work + count*panelLength
outro      = workEnd + 0.7*pace
contact    = outro + 1.4
total      = contact + 1
```

The default three-story experience is approximately `15.8H` for mouse and `25.32H` for touch, matching the reference's measured rhythm.

## Timeline ownership

- `useIntro`: elapsed-time opening timeline. It waits for `document.fonts.ready`, animates intro words and count, reveals `[data-intro]` elements, then marks the shared clock ready.
- `useJourney`: master paused GSAP timeline controlled by one scrubbed ScrollTrigger (`scrub: 0.7`). It owns hero departure, capability sequences, systems heading, panel entrances/exits, philosophy, contact reveal, active navigation, and scene accessibility.
- `particle-scene`: renders generated portal points, star field, sampled brand motif, rotation, depth, and departure. It reads the shared clock but does not own scroll.
- `MediaFrame`: owns slow alternate-media opacity cycling.

## Choreography contract

- Hero exits across `0.3H`, remaining spatially fixed while opacity dissolves.
- Capability words combine blur, vertical travel, opacity, and staged primary/detail timing. They enter around the motif and leave before the next group.
- Systems heading arrives with blur/y settle and clears before the first panel.
- Each panel enters from `y: 60`, holds, then exits to `y: -30`; the strong-out custom ease produces a quick move and long settle.
- Panels alternate left/right/left based on item index. The motif shifts to the opposing side.
- Contact is an elapsed one-second blur/y reveal triggered near the final scene rather than an endless scroll fade.
- Motion should express transition and focus, not decorate every element.

Recorded final representative states:

| Progress | Hero opacity | Panel opacity | Panel Y |
| --- | ---: | ---: | ---: |
| 0% | 1.000 | 0.000 | 60 px |
| 25% | 0.842 | 0.767 | 14.0 px |
| 50% | 0.500 | 0.961 | 2.3 px |
| 75% | 0.154 | 0.997 | 0.2 px |
| 100% | 0.000 | 1.000 | 0 px |

## Canvas motif

The renderer samples only alpha from `brand.motif`, converts opaque pixels into deterministic seeded points with shallow depth, then renders those points using CSS theme colors. The source graphic must be square, transparent, centered, and have meaningful negative space.

Performance rules:

- Pixel density is capped at 1.5.
- Draw with Canvas 2D; no 3D dependency is needed.
- Use transform/opacity for DOM motion.
- Paused/reduced states skip unchanged frames.
- Canvas time delta is clamped and never negative.
- Resize recalculates the surface, theme colors, and responsive scale.

## Navigation and input

Navigation is scene navigation, not a router. Normal mode converts section IDs to journey positions and uses an instant scroll followed by GSAP scrub settling. When keyboard-initiated, focus transfers to the semantic section after settling. Reduced mode uses native `scrollIntoView` and immediate focus.

The menu is a real modal dialog:

- Locks body scroll.
- Makes header/main inert.
- Moves focus inside on open.
- Cycles Tab/Shift+Tab.
- Closes with Escape and restores focus.

Custom cursor and magnetic behavior are enabled only for fine hover pointers and are removed for reduced motion. Touch does not emulate hover.

## Safe extension checklist

When adding a story, edit content only; journey length and timing redistribute automatically. When adding a new scene type, first add a named journey landmark, then wire one owner timeline, accessibility state, navigation mapping if relevant, reduced-mode rendering, and QA captures. Do not create independent scroll listeners or arbitrary timeout chains.

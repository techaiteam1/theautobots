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
bridge     = aboutEnd + 0.65*pace
bridgeEnd  = bridge + 1.45*pace
heading    = bridgeEnd + 0.55*pace
work       = heading + 0.4
panelLength= 1.75*pace
workEnd    = work + count*panelLength
outro      = workEnd + 0.7*pace
operations = outro + 1.1*pace
fit        = operations + 1.65*pace
contact    = fit + 1.8*pace
total      = contact + 1
```

The default four-story experience is approximately `22.7H` for mouse and `38.86H` for touch. The larger narrative preserves the reference's measured rhythm while giving workflow mapping, operating controls, and ideal-fit content their own sparse scenes.

## Timeline ownership

- `useIntro`: elapsed-time opening timeline. It waits for `document.fonts.ready`, animates intro words and count, reveals `[data-intro]` elements, then marks the shared clock ready.
- `useJourney`: master paused GSAP timeline controlled by one scrubbed ScrollTrigger (`scrub: 0.7`). It owns hero departure, capability sequences, workflow bridge, systems heading, panel entrances/exits, philosophy, operations, fit, contact reveal, active navigation, and scene accessibility.
- `particle-scene`: renders the full-screen field, sampled brand logo, pointer parallax, rotation, depth, and departure. It reads the shared clock but does not own scroll.
- `MediaFrame`: owns slow alternate-media opacity cycling.

## Choreography contract

- Hero exits across `0.3H`, remaining spatially fixed while opacity dissolves.
- Capability words combine blur, vertical travel, opacity, and staged primary/detail timing. They enter around the motif and leave before the next group.
- A workflow-mapping bridge enters after Approach, stages its path markers, then clears before Systems.
- Systems heading arrives with blur/y settle and clears before the first panel.
- Each panel enters from `y: 60`, holds, then exits to `y: -30`; the strong-out custom ease produces a quick move and long settle.
- Panels alternate left/right based on item index. The motif shifts to the opposing side.
- After Systems, a short philosophy line clears into operating-controls and ideal-fit scenes before the final contact reveal.
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

The renderer supports both transparent art and the supplied opaque JPEG. Transparent sources use alpha; opaque sources derive a background color from four corners and retain pixels sufficiently different from it. The retained logo pixels become deterministic seeded points with shallow depth and render in the logo-derived magenta, violet, and light theme.

The old rectangular threshold is removed. A 760-point field spans the viewport from the opening frame. On fine-pointer devices, the logo anchor smoothly tracks the pointer across the complete viewport only while Home is active, with a small center-point edge inset; intentional particle clipping can occur at the edges. As Approach begins, tracking blends back to the original restrained parallax and scroll-defined composition used through Approach and Systems. When the pointer leaves the window, ownership eases back to the scroll-defined anchor. Pointer tracking is disabled for touch and reduced-motion users.

Each Systems panel contains an original inline SVG explanation animated by its own scoped GSAP timeline: workflow convergence for Transformation, governed agent/tool coordination for Agentic Systems, and a monitored refinement loop for Managed Operations. Timelines clean up on unmount, stop when ambient motion is paused, and remain static under reduced motion.

Performance rules:

- Pixel density is capped at 1.5.
- Draw with Canvas 2D; no 3D dependency is needed.
- Use transform/opacity for DOM motion.
- Paused/reduced states skip unchanged frames.
- Direct pointer response can redraw while ambient time remains paused.
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

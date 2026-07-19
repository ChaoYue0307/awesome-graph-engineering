# Design QA

- Source reference: `/var/folders/33/9w5jp8wx5hs371x82wslbfvw0000gn/T/codex-clipboard-8a839d3c-e094-4c6b-bc76-acc66bb75bb1.png`
- Implementation: `docs/index.html`
- Comparison capture: `.design/audit-2026-07-20/06-reference-implementation-comparison.png`
- Desktop viewport: 1280 x 720
- Mobile viewport: 390 x 844
- Tested states: English desktop, navigation menu, all eight introduction languages, filtered atlas, copied filtered view, stable resource permalink, organization/work graph toggle, canvas zoom controls, canvas keyboard input, and mobile layout

## History

1. The first multilingual mobile pass allowed the Simplified Chinese headline to wrap too aggressively.
2. Localized hero type sizing and CJK font fallbacks were tightened.
3. A second pass confirmed no horizontal overflow for English, Simplified Chinese, Spanish, French, German, Japanese, Korean, or Brazilian Portuguese.
4. The final side-by-side review confirmed the reference's strong front-door hierarchy is preserved while the implementation has a distinct Graph Engineering identity.

## Accessibility and resilience

- The canvas is keyboard focusable and includes text instructions and explicit zoom controls.
- Reduced-motion users receive a stable rendered scene.
- Normal page scrolling is not captured unless the graph is focused and the modifier key is used.
- Mobile evidence metadata remains visible.
- No personal name appears in any figure, diagram, logo, or social-preview artwork.

## Remaining issues

- P0: none
- P1: none
- P2: none

Final result: `passed`

# Add Tinder Primary Color And Tinder-Like Logo

## Summary
- Update the popup brand color system so the primary accent is `#ff2358` and all accent-derived surfaces use that hue consistently instead of the current orange-red token set in `popup.html`.
- Replace the current extension logo assets with a Tinder-like flame-inspired mark and use the same asset family for both the popup header and Chrome extension icons.
- Keep the current layout, copy, and interaction model intact; this is a visual branding pass, not a UI restructure.

## Key Changes
- In `popup.html`, change the root design tokens so `--accent` becomes `#ff2358`, then recompute `--border-focus`, `--accent-hover`, `--accent-dim`, `--accent-glow`, and any button shadow values that currently assume `#e8604c`.
- Preserve the existing dark surface palette and typography, but update any hardcoded accent usages that should visually align with the new primary color, especially the header icon shell, active tab state, primary buttons, and focus states.
- Replace `icon16.png`, `icon32.png`, `icon48.png`, and `icon128.png` with a coordinated icon set built around a Tinder-like flame silhouette:
  - simple centered flame mark
  - white or very light inner cut where needed for legibility at 16px
  - flat or lightly graded fill in the `#ff2358` family
  - no extra decorative ring/details that blur at small sizes
- Keep the popup header image wiring unchanged in `popup.html` and the manifest icon references unchanged in `manifest.json`; only the image assets change, so no code-path decisions remain for the implementer.

## Test Plan
- Static verification:
  - confirm `popup.html` still references `icon128.png` in the header and manifest icon paths remain valid
  - confirm no old primary token `#e8604c` remains in the popup accent token definitions unless intentionally kept for non-primary semantic use
- Manual popup checks:
  - open `file:///Applications/work/tinder-extention/popup.html`
  - verify the popup header logo reads as Tinder-like at 45x45 without clipping
  - verify active tab, primary CTA, and focus states now read `#ff2358` rather than orange
  - verify contrast is still acceptable on the dark background for buttons, pills, and active controls
- Icon checks:
  - inspect the 16px and 32px PNGs directly to ensure the flame silhouette is still legible
  - reload the extension and verify the browser toolbar / extension management icon uses the updated mark

## Assumptions
- “Similar Tinder” means flame-inspired and color-adjacent, not a pixel copy of Tinder’s exact trademarked logo.
- The change should cover both popup branding and packaged extension icons, since the popup header currently renders `icon128.png` directly and the manifest uses the same icon family.
- No app title or subtitle text changes are required; this request only affects color and logo treatment.

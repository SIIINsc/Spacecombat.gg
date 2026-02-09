# spacecombat.gg Training Center (Offline HTML/CSS/JS)

## Multi-page structure
- Offline stack: `index.html`, `styles.css`, `app.js` (no framework).
- Hash routing:
  - `#home`
  - `#<sub-page-id>` (Protocol, Space Meta, FPS Meta, and any custom sub pages).
  - `#<sub-page-id>/<block-id>` for jump links.
- State is stored in localStorage under `scscp_state`.
- Legacy protocol-only saves are migrated into the current `pages` model automatically.

## Home vs sub-page admin behavior
- **Home admin panel** includes full project controls (save/reset/import/export/online build) and full header controls.
- **Sub-page admin panel** is simplified and page-aware:
  - Shows block creation controls (Information, Example, Study, Video) and page-local hero controls.
  - Hides home/global controls like support, online credentials, and header mini-icons.
- `Export final (viewer-only HTML)` is visible only on Home, because it exports the whole site.

## Hero content modules
- Home hero and sub-page hero both support modular items:
  - text blocks
  - image blocks (base64-friendly)
  - video blocks (base64-friendly)
- In Edit mode you can:
  - add/remove hero items
  - reorder hero items
  - edit hero title/subtitle

## Home grid sub-page boxes + GIF hover behavior
- Home sub-page navigation is a card grid (max 4 cards per row; wraps to next row).
- Each card supports:
  - static background image
  - optional hover media (image or GIF)
- For GIF-like behavior, use:
  - **static image** for non-hover state
  - **hover media** for hover animation state

## Navigation scroll offset logic
- Anchor/jump navigation uses a dynamic header offset.
- Offset is computed from the **current header height**, so targets align directly under the header even when header height changes.
- Works for:
  - Home links
  - Sub-page block links
  - Hash-based anchor routes

## Notes
- Keep uploads as base64 for fully offline use.
- Role label colors are the source of truth for Example node coloring.
- Existing protocol defaults are preserved.

# spacecombat.gg Training Center (Offline HTML/CSS/JS)

## Click-to-edit + ID-based linking
- In Edit mode, visible titles/labels are editable directly in place (`contenteditable`) instead of only side inputs.
- Navigation and page references use stable IDs (`page.id`, `block.id`, `subElement.id`) for links and jumps.
- Display text is synchronized from a single source of truth:
  - Renaming a sub-page title updates homepage tile title + header website navigation label + page title metadata.
  - Block jump links continue to work because anchors use IDs, not labels.

## Header navigation structure
The header stack is center-aligned for clarity:
1. Home button
2. Basic/Advanced integrated toggle
3. Website navigation (Home / Protocol / Space Meta / FPS Meta + custom pages)
4. Sub-page navigation (current page block links, visually smaller)
5. Donate button (if enabled)

## Hero area (homepage)
- Hero title box can be added/removed in Edit mode.
- Hero title/subtitle are directly editable without literal helper labels.
- Hero background image upload is supported (base64/offline).
- Hero content can be split into 2 or 3 editable sections.
- Each section supports optional image or video upload.

## Homepage sub-page boxes + hover media
- Sub-page cards support editable in-place titles and left/right reordering.
- Card background media:
  - static image/gif for default state
  - optional hover media (image/gif or video)
- Hover behavior:
  - video: play on hover, pause/reset on leave
  - image/gif: switch preview on hover

## Advanced-only indicator
- Advanced-only items use a minimal border-only distinction (subtle dashed/accent border).
- No layout redesign or extra badges required.

## Navigation scroll offset logic
- Anchor/jump navigation uses dynamic header height offset.
- Targets align directly below the sticky header even as header height changes.

## Notes
- Fully offline-friendly: base64 uploads + localStorage state.

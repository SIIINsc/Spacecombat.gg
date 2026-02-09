# spacecombat.gg Training Center (Offline HTML/CSS/JS)

## Structure
- `index.html` + `styles.css` + `app.js` only (no framework, offline-friendly).
- Pages are hash-routed:
  - `#home`
  - `#protocol`
  - `#meta-space`
  - `#meta-fps`
- Header UI is shared across all pages (theme selector, advanced switch, mini-icons, edit toggle).

## Data model (localStorage)
Stored under `scscp_state`.

- `home`
  - `title`, `subtitle`
  - `heroImageSrc` (base64/image URL)
  - `ctaButtons`
- `pages`
  - `protocol`, `meta-space`, `meta-fps`
  - Each page has:
    - `blocks[]`
    - `callouts[]`

Legacy single-page saves are migrated automatically into `pages.protocol`.

## Home page hero data
Hero content is in `state.home`:
- `state.home.title`
- `state.home.subtitle`
- `state.home.heroImageSrc`
- `state.home.ctaButtons`

In Edit mode you can upload/replace the hero background image (stored as base64).

## Adding a new section/page
1. Add an entry to `PAGE_DEFINITIONS` in `app.js`.
2. Add page content in `state.pages[<id>]` (blocks + callouts).
3. Add a home tile/CTA target if desired.
4. Use `#<id>` to navigate.

## Basic / Advanced visibility
- Global mode switch controls viewer filtering (`basic` / `advanced`).
- Elements and sub-elements can be marked:
  - `Basic only`
  - `Basic + Advanced`
  - `Advanced only`
- In Advanced mode, advanced-only elements show a subtle advanced indicator next to title.

## Themes (color-only)
Theme palette lives in `THEMES` in `app.js`.
Included:
- Stanton
- Grimhex
- Pyro (rusty/industrial; no blue)
- AVS
- Blightveil
- Shadow Moses

No layout/spacing/typography changes are made by theme selection.

## Export/import
- JSON export/import still works.
- Viewer HTML export still works.
- ZIP export still works and includes current multi-page capable app.

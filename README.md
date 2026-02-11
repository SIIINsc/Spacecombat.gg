# Space Combat Learning Platform (offline HTML/CSS/JS)

## Editing model
- Edit mode is now compact by default: each block/page tile keeps viewer layout until you click its local **Edit** button.
- Header controls are compartmentalized in a collapsed **Edit Header** panel in the admin area.

## Home Navigation Box
- Home page portal tiles are named **Home Navigation Box** tiles.
- In edit mode, each tile has a dedicated internal toolbar so editing controls never conflict with tile navigation clicks.
- Rename is explicit in the toolbar (instead of title click-edit) to prevent accidental navigation.

## Study overlay behavior
- Study Box supports up to 3 compact sub-study boxes.
- Expanding a study element opens an overlay dropdown that floats above surrounding content.
- The layout height is preserved (no push-down resize).

## Online roles
- Online build supports account roles:
  - **Admin**: structure/account/export controls.
  - **Editor**: content edits inside existing boxes/sub-boxes only.
- Login entry is a subtle footer control.

## Export types
- **Export Project ZIP**: local editor build (no login), includes current state.
- **Generate Online Build**: login-enabled build with Admin/Editor roles.
- **Generate Online Build (Viewer Only)**: no login/edit UI.
- ZIP exports are static web files only (`index.html`, `styles.css`, `app.js`, `README.md`, assets) and exclude executable file types.

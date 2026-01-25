# Star Citizen Space Combat Communication Protocol

## How to run
Open `index.html` directly in your browser (double-click). No build tools or servers required.

## Admin lock disclaimer (important)
This is a **static offline site**. The admin password is **convenience-only** to prevent accidental edits. It is **not true security** and does not protect against someone who can open and edit the files directly.

## Admin password hash
Only a SHA-256 hash is stored in `app.js` as `ADMIN_PASSWORD_HASH`. To generate a new hash in the browser console:

```js
crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_PASSWORD'))
  .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''))
```

Replace the hash in `app.js` with the output string.

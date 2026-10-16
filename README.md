# Ephemeral Network — website starter

This is a responsive, dark-themed static website starter for a Minecraft network.

## Run it on your computer
1. Extract the ZIP.
2. Open the `ephemeral-network-starter` folder.
3. Double-click `index.html` to preview it in your browser.
4. Edit the text and links in `index.html`; edit colors/layout in `styles.css`.

## Before publishing
Search `index.html` for these placeholders:
- `play.yourserver.net` — replace with the real Minecraft server address.
- `data-placeholder-link` — replace `href="#"` with your real Discord/forum links.
- Planned game modes and coming-soon copy — update to match what is actually live.

## Publish free with GitHub Pages
1. Create/sign in to a GitHub account at https://github.com/
2. Create a new public repository named `ephemeral-network` (or another name).
3. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root.
4. Open the repository's **Settings → Pages**.
5. Under build/deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish. Your site will have a `github.io` address.
7. Open that address and test it on desktop and mobile.

## Important feature limits
This starter is a static front-end. It does **not** yet have real user registration/login, persistent forums, admin publishing, player counts, or payment processing. Do not collect passwords or payment information in this static site.

Recommended next steps:
- Use a managed authentication/database service for accounts, with secure rules and email verification.
- Add a forum/community platform or a backend with moderation, spam controls, and reporting.
- Use a reputable Minecraft server store provider for purchases and rank delivery; configure payment and server permissions securely.
- Keep payment processing on the store provider's hosted checkout rather than handling card details yourself.

The page currently uses Google Fonts from an external CDN. If you want no external requests, remove the `@import` line at the top of `styles.css` and it will use system fonts.

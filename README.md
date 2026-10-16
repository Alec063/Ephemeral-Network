# Ephemeral Network — player accounts update

This version retains the existing homepage and live server status and adds `account.html` with Supabase Auth email/password registration, email confirmation, login, password reset, sign out, and a basic dashboard.

## REQUIRED: configure the public key

1. In Supabase find **Project URL** (Settings → Data API or Connect) and **Publishable key** (Settings → API Keys).
2. Edit `supabase-config.js` and replace `PASTE_PROJECT_URL_HERE` and `PASTE_PUBLISHABLE_KEY_HERE` with the actual values, keeping quotes.
3. Use ONLY the public `sb_publishable_...` key. Never upload `service_role`, `sb_secret_...`, JWT secrets, or database passwords.
4. In Supabase Authentication → URL Configuration set Site URL to `https://alec063.github.io/Ephemeral-Network/` and add BOTH redirect URLs `https://alec063.github.io/Ephemeral-Network/` and `https://alec063.github.io/Ephemeral-Network/account.html`. The second is required for confirmation and password reset links.
5. In Authentication → Providers → Email, enable email authentication and keep email confirmation enabled. Supabase's built-in email service may have delivery/rate limits; configure custom SMTP before inviting many players.
6. Upload all site files to the **root** of the existing GitHub repository (the `main` branch), replacing matching files. Do not upload the ZIP as a file.
7. Wait for GitHub Pages deployment, then visit `https://alec063.github.io/Ephemeral-Network/account.html`.
8. Test using your own email address, verify email, sign in, sign out, and password reset.

## Security / scope

This version uses Supabase's managed auth. It does NOT create a public profile database table or any custom database policies. The dashboard displays the authenticated email only. **Minecraft account linking is NOT yet implemented.** The future in-game `/link` flow must be verified server-side with a trusted Minecraft plugin and secure backend; never trust a username submitted by a browser. Do not store passwords in your own database.

If you later add tables, explicitly grant only needed API access and define/test Row Level Security policies before making them accessible.

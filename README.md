# Secunit Security and Mercantile

SRE, DevOps, and DevSecOps consulting website built with SvelteKit and Cloudflare.

## Project Structure

```
static_consulting_site/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ContactForm.svelte    # Form with validation
│   │   │   └── ThemeToggle.svelte    # Dark/light mode toggle
│   │   └── server/
│   │       └── email.ts              # SendGrid + Resend email logic
│   ├── routes/
│   │   ├── api/contact/+server.ts    # Form submission endpoint
│   │   ├── +layout.svelte            # Header, footer, navigation
│   │   └── +page.svelte              # Contact page
│   ├── app.css                       # Theme system + global styles
│   ├── app.html                      # HTML template
│   └── app.d.ts                      # TypeScript types
├── static/                           # Favicon, robots.txt
├── svelte.config.js                  # Cloudflare Pages adapter
├── wrangler.toml                     # Cloudflare config
└── .env.example                      # Environment variable template
```

## Features

- **Dark/Light Mode** - System preference detection + toggle
- **Contact Form** - Name, email, company (optional), service selection, description
- **Service Categories** - SRE, DevOps, DevSecOps, Platform Engineering, etc.
- **Email Notifications** - JSON attachment for CRM import
- **Email Provider Switching** - Set `EMAIL_PROVIDER=sendgrid` or `EMAIL_PROVIDER=resend`

## To Deploy

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set Cloudflare secrets:**
   ```bash
   wrangler secret put SENDGRID_API_KEY
   wrangler secret put EMAIL_PROVIDER     # "sendgrid" or "resend"
   wrangler secret put FROM_EMAIL         # your verified sender
   ```

3. **Deploy:**
   ```bash
   npm run build && wrangler pages deploy .svelte-kit/cloudflare
   ```

Or connect your GitHub repo to Cloudflare Pages for auto-deploys.

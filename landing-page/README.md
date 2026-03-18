# Landing Page (`landing-page`)

Documentation site for the AI tooling ecosystem. Built with Next.js (App Router + MDX).

## Prerequisites

- Node.js 20+
- npm, pnpm, yarn, or bun
- A Vercel account (recommended for production deployment)
- Domain ownership for `ai.sethwebster.com`

## Local development

```bash
cd landing-page
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production deployment (recommended on Vercel)

1. Add the repo project in Vercel using `landing-page/` as the root directory.
2. Set framework preset to **Next.js**.
3. Deploy to production.
4. In Vercel Domains, add `ai.sethwebster.com`.
5. Point DNS:
   - `ai.sethwebster.com` → Vercel-provided CNAME (`cname.vercel-dns.com`) at your registrar.
6. Wait for TLS provisioning and propagation.

### One-command deploy

```bash
cd landing-page
npm run deploy:prod
```

### GitHub Actions

A workflow is included at:

- `.github/workflows/deploy-landing-page.yml`

It deploys the `landing-page/` app to Vercel on push to `main`.

Required secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Useful commands

```bash
npm run build   # production build check
npm run lint    # lint + quality checks
npm run start   # run built Next.js app locally
```

## Why this structure works

This app is intentionally isolated in `landing-page/` so website updates and CLI releases can be managed independently.

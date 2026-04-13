# MyYado Web App

React 18 + Redux Toolkit + Final Form + Express.js + server-side rendering on the Sharetribe Web
Template baseline.

## Local Setup

Use one setup path only:

```sh
nvm install
corepack enable
yarn install
cp .env.example .env
# Fill the required values in .env
yarn dev
```

The app starts the Sharetribe frontend on `http://localhost:3000` and the local API server on
`http://localhost:3500`.

## Config Ownership

Repo config is static and versioned. Keep routes, local fallback branding, feature flags, UI rules,
and documentation in this repository.

Sharetribe Console is the operational source of truth for listing schema, transaction processes,
hosted branding assets, hosted content assets, Stripe secret configuration, and marketplace data.

Local `.env` is for secrets and runtime endpoints only. Do not put listing schema, transaction
rules, curation decisions, or content in `.env`.

## Required Local Values

Fill these in `.env` before running the app against a real marketplace:

- `REACT_APP_SHARETRIBE_SDK_CLIENT_ID`
- `SHARETRIBE_SDK_CLIENT_SECRET`
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`
- `REACT_APP_MAPBOX_ACCESS_TOKEN` or `REACT_APP_GOOGLE_MAPS_API_KEY`
- `REACT_APP_MARKETPLACE_ROOT_URL`
- `REACT_APP_MARKETPLACE_NAME`
- `REACT_APP_ENV`
- `REACT_APP_CSP`

Never commit `.env` or any real API secrets.

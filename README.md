# HypeOmeter

## Recommended deployment setup

You do **not** need to deploy this app to Vercel from GitHub Actions.

The simplest setup is:

- use **GitHub Actions** for CI checks
- use **Vercel Git Integration** for deployments

Once this repository is imported into Vercel through the Vercel UI, Vercel can automatically create a production deployment for every push to `main`.

## What the GitHub Actions workflow does

This repository includes `.github/workflows/vercel-deploy.yml`, which runs on:

- every pull request targeting `main`
- every push to `main`

The workflow only verifies the app by running:

- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

It does **not** deploy to Vercel directly.

## One-time Vercel setup

### 1. Import the repository in Vercel

In the Vercel dashboard, create a new project and import this GitHub repository.

### 2. Confirm the production branch

In Vercel project settings, make sure the production branch is set to `main`.

### 3. Add any required environment variables

Set these variables in Vercel (or your local `.env.local`) for persistent share links:

- `NEXT_PUBLIC_APP_URL` (example: `https://hypometer.app`)
- `UPSTASH_REDIS_REST_URL` (from Upstash Redis)
- `UPSTASH_REDIS_REST_TOKEN` (from Upstash Redis)
- `SHARE_RESULT_TTL_SECONDS` (optional, defaults to 30 days)

If Upstash vars are not configured, share links use an in-memory fallback store (good for local development only).

### 4. Optional: protect `main` with CI checks

If you want merges to `main` to wait for GitHub Actions to pass first, add a branch protection rule in GitHub and require the CI workflow status check.

## Result

After that setup:

1. pull requests get CI validation in GitHub Actions
2. merges or direct pushes to `main` trigger Vercel production deployments automatically through Vercel's Git integration

## Notes

- No `VERCEL_TOKEN`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID` GitHub secrets are required for this setup.
- If you ever want GitHub Actions to trigger deployments explicitly, that can be added later, but it is not necessary for standard Vercel workflows.

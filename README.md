# HumanaIze Platform

Engineering foundation for the agency's internal services and tooling.

## Quick start

```bash
cp .env.example .env
npm run build    # builds static assets → dist/
npm start        # health server on :3000
npm test         # Node.js test runner
npm run lint     # whitespace + trailing newline checks
```

## Version control conventions

- **Branch naming:** `feat/`, `fix/`, `chore/` prefixes (e.g. `feat/attribution-dash`)
- **Commit format:** imperative mood, short first line. All commits must end with:
  ```
  Co-Authored-By: Paperclip <noreply@paperclip.ing>
  ```
- **PRs:** target `main`, require CI green before merge

## CI / CD

GitHub Actions (`.github/workflows/ci.yml`):
- **On every push/PR to main:** lint, test, build
- **On push to main:** deploy to GitHub Pages (production environment)

## Environments

| Environment | Purpose               | Deploy target      |
|-------------|-----------------------|--------------------|
| development | Local dev             | `npm start`        |
| staging     | Pre-prod validation   | GitHub Pages (TBD) |
| production  | Live                  | GitHub Pages       |

## Secrets management

- **Local:** `.env` file (git-ignored, copy from `.env.example`)
- **CI/CD:** GitHub Actions secrets (Settings → Secrets and variables → Actions)
- **Never commit real secrets.** All sensitive values go through environment variables.

## Structure

```
src/           Application source
public/        Static assets (deployed to GitHub Pages)
scripts/       Build and lint tooling
.github/       CI workflows
```

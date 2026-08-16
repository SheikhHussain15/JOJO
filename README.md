# JOJO International

Corporate website for JOJO International (automotive & industrial machinery) as an
npm-workspaces monorepo.

## Structure

```
JOJO/
├─ packages/
│  ├─ frontend/   # Next.js 16 (App Router) website
│  └─ backend/    # Express API (contact & careers endpoints)
├─ docs/          # Implementation plans, phase reports, migration guides
├─ package.json   # Workspace root — orchestration scripts
└─ README.md
```

## Quick start

```bash
npm install        # installs all workspaces (hoisted to root)
npm run dev        # starts backend (:4000) + frontend (:3000) together
```

Frontend dev proxies `/api/*` to the backend automatically (see
`packages/frontend/next.config.ts`).

## Scripts (root)

| Command          | Description                                  |
| :--------------- | :------------------------------------------- |
| `npm run dev`    | Backend + frontend together                  |
| `npm run build`  | Production build of the frontend             |
| `npm run start`  | Serve the built frontend                     |
| `npm run lint`   | Lint frontend + typecheck backend            |
| `npm run test`   | Backend API test suite (20 checks)           |
| `npm run typecheck` | Typecheck the backend package             |

## Environment

Copy the relevant `.env.example` into `.env.local` (frontend) / `.env`
(backend). See `packages/backend/README.md` for backend delivery options
(`FORM_DELIVERY_URL`, recipients, resume size).

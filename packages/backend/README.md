# @jojo/backend

Express API for JOJO International — contact inquiries and career applications.

## Endpoints

| Endpoint          | Method | Body                        | Notes                              |
| :---------------- | :----- | :-------------------------- | :--------------------------------- |
| `/api/contact`    | POST   | JSON fields                 | Honeypot + validation + delivery   |
| `/api/careers`    | POST   | multipart form + `resume`   | File sniffing (PDF/DOC/DOCX), 3 MB |

Non-POST methods on these paths return `400`. Unknown routes return `404`.

## Run

```bash
npm run dev -w packages/backend      # node --watch, http://127.0.0.1:4000
npm run test -w packages/backend     # 20 API checks against a live ephemeral server
npm run typecheck -w packages/backend
```

## Delivery & env

Copy `.env.example` to `.env`. Behavior:

- **Local sink (default):** submissions land in `.data/outbox.jsonl` and
  resumes in `.data/uploads/` (gitignored).
- **Provider delivery:** set `FORM_DELIVERY_URL` (+ optional
  `FORM_DELIVERY_TOKEN` bearer). Submissions are POSTed as JSON; resume bytes
  are embedded base64.

Key variables: `HOST`, `PORT`, `CONTACT_RECIPIENT_EMAIL`, `RESUME_MAX_SIZE_MB`,
`CORS_ORIGINS`, `FORM_DELIVERY_URL`, `FORM_DELIVERY_TOKEN`.

## Notes

- Runs on Node ≥ 24 with native TypeScript type-stripping (no build step).
  `src`/`scripts` must stay "erasable syntax only" (no enums, no parameter
  properties).
- The frontend proxies `/api/*` here in local dev — see
  `packages/frontend/next.config.ts`.

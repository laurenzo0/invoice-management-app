# Invoice Management Application

Full-stack invoice app built with **React (Next.js)** + **Supabase Postgres**.

## Features
- Create, view, edit, delete invoices
- Save drafts, mark pending as paid
- Filter by status (draft / pending / paid)
- Light/dark theme (persists in LocalStorage)
- Fully responsive + accessible modal (focus trap + ESC)

## Local development
Install and run:

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Supabase setup
1. Create a Supabase project.
2. Run the SQL in `supabase/schema.sql` (Supabase SQL editor).
3. Add environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; add to Vercel Env Vars too)

## API routes (Next.js)
All APIs are served from the same deployment (Vercel):
- `GET /api/health`
- `GET /api/invoices?status=draft,pending`
- `POST /api/invoices`
- `GET /api/invoices/:id`
- `PUT /api/invoices/:id`
- `DELETE /api/invoices/:id`
- `PATCH /api/invoices/:id/status`

Dev-only seed route (disabled in production):
- `POST /api/dev/seed`

## Deploy (Vercel)
1. Import this repo into Vercel.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel project settings.
3. Deploy from `main`.



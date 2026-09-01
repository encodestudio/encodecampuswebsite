# Encode Campus — Website

Marketing website for **Encode Campus**, the Education Operating & Governance Platform.

- **Frontend:** React (Vite) + React Router + Recharts
- **Backend:** Django + Django REST Framework
- **Database:** MySQL (`EncodeCampusWebsite`)

The design follows the *Encode Campus Website Visual Design System* (navy/blue/mist
palette, Inter, restrained cards, dashboard-forward hero, connected-data motif,
governance sections, pricing calculator, FAQ accordion).

```
encodecampus-website/
├── backend/     Django project (API + admin + seed data)
└── frontend/    React single-page app
```

---

## 1. Backend

### Prerequisites
- Python 3.11+
- MySQL running locally, database `EncodeCampusWebsite` created, user `root`

### Setup

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate      # optional
pip install -r requirements.txt
copy .env.example .env                               # then edit .env
```

Set your MySQL password in `backend/.env`:

```
DB_NAME=EncodeCampusWebsite
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=127.0.0.1
DB_PORT=3306
```

### Migrate, seed, run

```bash
python manage.py migrate
python manage.py seed_content --demo-leads          # marketing content + sample leads
python manage.py createsuperuser                    # optional (admin UI)
python manage.py runserver 127.0.0.1:8000
```

Run `python manage.py createsuperuser` to create your own admin login.
Admin UI: http://127.0.0.1:8000/admin/

### API

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET  | `/api/health/` | health check |
| GET  | `/api/features/`, `/api/features/<slug>/` | module content |
| GET  | `/api/solutions/`, `/api/solutions/<slug>/` | institution-type pages |
| GET  | `/api/pricing-plans/?institution_type=school` | pricing plans |
| GET  | `/api/pricing/calculate/?institution_type=&plan=&students=` | live calculator |
| GET  | `/api/faqs/` | FAQ entries |
| GET  | `/api/blog-posts/` | resources |
| GET  | `/api/insights/leads/` | aggregated (non-PII) demo-request metrics |
| POST | `/api/demo-requests/` | Book-a-Demo form |
| POST | `/api/contact/` | Contact form |
| POST | `/api/newsletter/` | footer subscribe |

### Tests

```bash
python manage.py test api
```

---

## 2. Frontend

### Prerequisites
- Node 18+

### Setup & run

```bash
cd frontend
npm install
npm run dev            # http://localhost:5173  (proxies /api -> :8000)
```

Production build:

```bash
npm run build          # outputs to frontend/dist
npm run preview
```

Set `VITE_API_BASE` at build time to point at a deployed API (defaults to `/api`).

### Key pages

`/` home · `/platform` · `/features` + `/features/:slug` · `/solutions` +
`/solutions/:slug` · `/pricing` · `/governance` · `/analytics` · `/security` ·
`/why-encode-campus` · `/product-tour` · `/resources` · `/faq` · `/insights` ·
`/about` · `/contact` · `/demo`

---

## 3. Brand assets

`frontend/public/` — `encodecampus-logo.png`, `encodecampus-icon.png`, `favicon.ico`.
The header/footer use an inline SVG recreation of the brand mark
(`src/components/Logo.jsx`) so it stays crisp and theme-aware.

---

## 4. Notes

- CORS is restricted to the dev frontend origin in `settings.py` /
  `CORS_ALLOWED_ORIGINS`; add your production origin there.
- `seed_content` is idempotent — safe to re-run.
- Time-zone month bucketing for `/api/insights/leads/` is done in Python so it
  works without MySQL time-zone tables installed.

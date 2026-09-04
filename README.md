# Waasha

**The Future of Service, Today.**

Waasha is a service marketplace connecting customers with trusted service providers across five core service categories:

- 💈 Barbers
- 💇 Hair Salons & Stylists
- 💅 Nail Technicians
- 💄 Beauty Services
- 🚗 Car Wash

## Platform

Waasha is being built as a production-grade platform for:

- Web
- Android
- iOS

Customers can discover providers, book services, make payments, submit custom requests, receive notifications, and review their experience.

Providers can manage services, availability, bookings, customers, locations, earnings, teams, and business operations.

## Provider Tiers

Waasha supports three provider capability tiers:

- **T1 — Individual**
- **T2 — Teams**
- **T3 — Business**

Tiers define capabilities and management features. They do not provide preferential marketplace ranking.

## Core Platform

- 10 km default discovery radius
- Provider and customer location services
- Provider GPS navigation to authorized client booking locations
- Service and provider discovery
- Booking and scheduling
- Custom service requests
- Waasha Payment
- Cash payments
- EFT payments
- Configurable platform commission
- Reviews and ratings
- Notifications
- Provider earnings and payouts
- Training-centre attribution
- Media and portfolio management
- Offline-tolerant workflows
- Analytics and reporting
- AI-assisted platform features

## Technology

### Frontend

- Angular
- Ionic
- Capacitor
- TypeScript

### Backend

- Node.js
- Express
- TypeScript
- REST API

### Data & Infrastructure

- MySQL 8.x
- Prisma
- Redis
- S3-compatible object storage
- Docker
- GitHub Actions

### Testing

- Unit tests
- Component tests
- Integration tests
- API tests
- End-to-end tests
- Security testing
- Performance testing
- Accessibility testing
- Offline/synchronization testing

## Architecture Documentation

The production architecture and implementation roadmap are maintained in:

- `docs/WAASHA_PRODUCTION_BLUEPRINT_MASTER.md`
- `docs/WAASHA_IMPLEMENTATION_PLAN.md`

AI engineering instructions are maintained in:

- `AGENTS.md`

The Stitch design source is maintained in:

- `design/stitch/`

## Prerequisites

- Node.js ≥20, npm ≥10 (packageManager npm@11.13.0)
- Docker & Docker Compose (for local MySQL 8.x + Redis 7)
- MySQL 8.x (via Docker) + Prisma 5.x
- Angular CLI 21.x (`npx ng`)

## Local Setup (Fresh Checkout)

```bash
# 1. Clone & install
git clone <repo-url> waasha && cd waasha
npm install
npm --prefix backend install

# 2. Environment (placeholders only — never commit real secrets)
cp backend/.env.example backend/.env
# Edit backend/.env if needed — defaults work for local Docker MySQL
# JWT_SECRET in backend/.env is dev-only; production requires ≥32 random chars

# 3. Start local infra (MySQL 8.x + Redis)
docker compose up -d
docker compose ps   # wait for waasha-mysql (healthy) & waasha-redis

# 4. Prisma
npm run db:generate          # prisma generate (backend)
npm run db:migrate:status    # verify migration status
# first-time local dev (disposable DB only):
npm --prefix backend run prisma:migrate   # applies pending migrations
npm run db:seed              # idempotent seed: roles, tiers, 5 categories, admin_settings

# 5. Backend
npm --prefix backend run dev     # http://localhost:3000  (or npm --prefix backend start after build)
npm --prefix backend run build   # tsc → backend/dist
npm --prefix backend run lint    # tsc --noEmit
npm run test:backend             # jest — auth + radius vertical slices (67 tests)

# 6. Web & Mobile
npm run build:web      # ng build --project web  → dist/web
npm run build:mobile   # ng build --project mobile → dist/mobile
npm run build:all      # web + mobile + backend

# 7. Dev servers
npx ng serve --project web        # http://localhost:4200
npx ng serve --project mobile     # http://localhost:8100 (Ionic/Capacitor uses same)
```

### Environment

| Variable | Source | Notes |
|---|---|---|
| `DATABASE_URL` | `backend/.env` | `mysql://waasha:waasha_secret@localhost:3306/waasha` (dev only) |
| `JWT_SECRET` | `backend/.env` | dev: `dev-jwt-secret-...` ; prod: fail-fast if placeholder/ <32 chars |
| `JWT_EXPIRES_IN` | `backend/.env` | default `1h` (local .env) |
| `CORS_ORIGIN` | `backend/.env` | allowlist, e.g. `http://localhost:4200,http://localhost:8100` |
| Frontend API | `apps/*/src/app/core/services` | relative `/api/v1/...` via proxy/interceptor — no hard-coded host |

`.env.example` contains safe placeholders; `backend/.env` is git-ignored.

### Docker (Local Dev Only)

`docker-compose.yml` provides reproducible local `mysql:8.0` + `redis:7-alpine` with named volumes `mysql_data`/`redis_data`, health checks, and dev credentials via env vars (`MYSQL_USER` etc.). Application is **not** coupled to Docker — standard MySQL/Redis via `DATABASE_URL`/env.

### Prisma

- Schema: `backend/prisma/schema.prisma` (MySQL, 25+ models)
- Migrations: `backend/prisma/migrations/20260904140012_init` (tracked)
- Seed: `backend/prisma/seed.ts` (idempotent `upsert` — 4 roles, 3 tiers, 5 categories, 8 admin_settings including commission 25%)
- Validate: `npx --prefix backend prisma validate`
- Status: `npm --prefix backend run prisma:migrate:status`

### Testing

```bash
npm run test:backend   # 67 tests: auth (46) + radius (21)
```

### Builds Verified

- `npx tsc --noEmit` (backend) — 0 errors
- `ng build --project web` — 253 kB initial
- `ng build --project mobile` — 263 kB initial

## Notes

- **Hosting portability:** Afrihost is intended initial host but not an application dependency. No Afrihost URLs/credentials/SDKs in app code. Config stays env-driven; storage behind S3-compatible abstraction; DB is standard MySQL+Prisma.
- **Business rules preserved:** 5 categories, T1/T2/T3 tiers, 10→15→20 km radius BOTH-rule, no tier/training ranking, 25% commission configurable, 3-image limits, driver excluded.

## Repository

GitHub:

https://github.com/Nicoliam/Waasha
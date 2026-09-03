# WAASHA IMPLEMENTATION PLAN

**Document:** 19  
**Project:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Production Implementation Roadmap  
**Primary reference:** `docs/WAASHA_PRODUCTION_BLUEPRINT_MASTER.md`  
**AI development instructions:** `AGENTS.md`

---

# 1. Purpose

This document converts the Waasha Production Blueprint into an executable engineering roadmap.

The 18 architecture documents define **what Waasha must be**.

This document defines:

- What to build first
- What depends on what
- Which systems are built together
- What must be tested
- What must be completed before moving forward
- How to control implementation scope
- How to know when a phase is genuinely complete

The objective is to build Waasha as a coherent production platform rather than assembling disconnected features.

---

# 2. Implementation Philosophy

The implementation follows:

```text
Understand
 ↓
Design
 ↓
Build
 ↓
Test
 ↓
Integrate
 ↓
Verify
 ↓
Document
 ↓
Proceed
```

Do not build the entire frontend first and connect it later.

Do not build isolated features without their supporting backend, database, authorization, analytics, and tests.

Every meaningful capability should be implemented as a complete vertical slice where practical.

---

# 3. Source-of-Truth Hierarchy

Implementation follows:

```text
Current user instruction
        ↓
AGENTS.md
        ↓
WAASHA_PRODUCTION_BLUEPRINT_MASTER.md
        ↓
Existing codebase
        ↓
Stitch design assets
```

If two sources conflict, stop and identify the conflict when it materially affects architecture or business behaviour.

---

# 4. Implementation Stages

The recommended implementation sequence is:

| Stage | Name | Primary Outcome |
|---|---|---|
| 0 | Repository Audit & Baseline | Understand current code |
| 1 | Repository Foundation | Clean engineering foundation |
| 2 | Database Foundation | Production schema |
| 3 | Backend Foundation | API/runtime architecture |
| 4 | Authentication & Authorization | Secure identity |
| 5 | Profiles & Provider Onboarding | Customer/provider accounts |
| 6 | Services, Locations & Availability | Provider inventory |
| 7 | Marketplace Discovery | Search/discovery |
| 8 | Booking Engine | Complete booking lifecycle |
| 9 | Payments & Finance | Financial workflows |
| 10 | Notifications | Communication system |
| 11 | Customer Application | Customer experience |
| 12 | Provider Application | Provider operations |
| 13 | T2/T3 Business Operations | Teams & businesses |
| 14 | Training Centres | Referral/earnings |
| 15 | Admin Platform | Platform operations |
| 16 | Media & File Management | Production media |
| 17 | Offline Synchronization | Offline-safe workflows |
| 18 | Analytics & Observability | Operational intelligence |
| 19 | AI & Automation | AI-assisted capabilities |
| 20 | Security Hardening | Production security |
| 21 | Full QA & Performance | Release validation |
| 22 | Deployment & Production | Go-live |
| 23 | Post-Launch Operations | Continuous improvement |

---

# 5. Stage 0 — Repository Audit & Baseline

## Objective

Before changing code, understand exactly what currently exists.

Inspect:

- Repository structure
- Branches
- Git history
- Existing frontend
- Existing backend
- Existing database
- Configuration
- Dependencies
- Environment variables
- Docker/container files
- Build scripts
- Tests
- Stitch assets
- Existing documentation

## Required output

Create:

```text
docs/IMPLEMENTATION_BASELINE.md
```

Record:

- Current stack
- Working components
- Broken components
- Reusable code
- Deprecated code
- Missing components
- Technical debt
- Recommended cleanup

## Definition of Done

- Repository has been audited.
- Existing implementation is understood.
- No major rewrite is started blindly.
- Baseline is documented.

---

# 6. Stage 1 — Repository Foundation

## Objective

Establish the project structure and development conventions.

Recommended structure:

```text
Waasha/
├── AGENTS.md
├── README.md
│
├── docs/
│   ├── WAASHA_PRODUCTION_BLUEPRINT_MASTER.md
│   ├── WAASHA_IMPLEMENTATION_PLAN.md
│   ├── IMPLEMENTATION_BASELINE.md
│   └── decisions/
│
├── design/
│   └── stitch/
│
├── frontend/
├── backend/
├── database/
├── tests/
└── infrastructure/
```

## Build

- Git conventions
- Branch strategy
- Environment strategy
- Local development
- Environment variable templates
- Formatting
- Linting
- Type checking
- Basic CI
- README

## Definition of Done

```text
[ ] Clean repository structure
[ ] Local setup documented
[ ] Environment templates
[ ] Linting
[ ] Formatting
[ ] Type checking
[ ] Initial CI
[ ] Build succeeds
```

---

# 7. Stage 2 — Database Foundation

## Objective

Implement the MySQL database architecture.

Build core entities:

```text
Users
Roles
Customer Profiles
Provider Profiles
Provider Tiers
Categories
Skills
Services
Service Images
Locations
Availability
Teams
Businesses
Business Units
Staff
Bookings
Booking Items
Custom Requests
Payments
Commission
Payouts
Reviews
Notifications
Training Centres
Verification
Media
Audit Logs
Configuration
```

## Requirements

- UUID/ID strategy
- Foreign keys
- Constraints
- Indexes
- Timestamps
- Soft deletion where appropriate
- Historical snapshots
- Tenant boundaries
- Migration system
- Seed system

## Definition of Done

- Fresh database can be created from migrations.
- Seed data can be loaded.
- Rollback strategy exists where appropriate.
- Schema matches the blueprint.
- Critical constraints are tested.

---

# 8. Stage 3 — Backend Foundation

## Objective

Create the server/API foundation.

Implement:

- Application bootstrap
- Configuration
- Database connection
- Logging
- Error handling
- Request validation
- API versioning
- Authentication middleware foundation
- Authorization middleware foundation
- Rate limiting
- Correlation IDs
- Health endpoints
- API documentation

Base:

```text
/api/v1
```

## Definition of Done

```text
GET /health
GET /ready
```

work correctly and the application can connect safely to the database.

---

# 9. Stage 4 — Authentication & Authorization

## Objective

Create secure identity.

Build:

- Registration
- Login
- Logout
- Password reset
- Email verification
- Session/token management
- MFA architecture
- Roles
- Permissions
- Authorization
- Account status
- Admin access

## Critical requirement

Authorization must be enforced server-side.

Test object-level access.

## Definition of Done

A user cannot access resources they do not own or have permission to access.

---

# 10. Stage 5 — Profiles & Provider Onboarding

## Objective

Allow customers and providers to establish their identities.

### Customer

- Profile
- Contact information
- Addresses
- Preferences
- Favourites

### Provider

- Profile
- Bio
- Skills
- Categories
- Services
- Pricing
- Location
- Availability
- Payment preferences
- Verification
- Portfolio

Implement:

- T1
- T2 foundation
- T3 foundation

## Definition of Done

A provider can complete onboarding and become discoverable only when required verification/activation rules are satisfied.

---

# 11. Stage 6 — Services, Locations & Availability

## Objective

Create the provider's bookable inventory.

Build:

- Categories
- Services
- Pricing
- Duration
- Service images
- Locations
- Service areas
- Availability
- Exceptions
- Working hours

Enforce:

```text
Maximum 3 service/style images
```

## Definition of Done

A provider can publish a valid service with pricing, duration, location and availability.

---

# 12. Stage 7 — Marketplace Discovery

## Objective

Allow customers to find providers and services.

Default:

```text
10 km
```

Build:

- Location search
- Category filtering
- Service filtering
- Provider search
- Business search
- Availability-aware discovery
- Pagination
- Sorting
- Favourites
- Search history where appropriate

## Ranking rule

Do not automatically favour:

- T2
- T3
- Training-centre referrals

## Definition of Done

A customer can reliably discover eligible services/providers within the intended radius.

---

# 13. Stage 8 — Booking Engine

## Objective

Implement the core transactional workflow.

Build:

```text
Search
 ↓
Service
 ↓
Availability
 ↓
Booking
 ↓
Assignment
 ↓
Acceptance
 ↓
Payment
 ↓
Service
 ↓
Completion
 ↓
Review
```

Support:

- Standard bookings
- Custom bookings
- Provider assignment
- T2 team assignment
- T3 staff assignment
- Cancellation
- No-show
- Reassignment
- Disputes
- Completion

## Critical rule

Payment and service completion are separate states.

## Concurrency

Prevent double booking using server-side validation and safe concurrency controls.

## Definition of Done

Complete booking lifecycle works for T1, T2 and T3 scenarios.

---

# 14. Stage 9 — Payments & Finance

## Objective

Implement financial integrity.

Payment methods:

- Waasha Payment
- Cash
- EFT

Build payment abstraction:

```text
PaymentService
      ↓
PaymentProvider
      ↓
PaystackAdapter
```

Build:

- Transactions
- Webhooks
- Idempotency
- Refunds
- Commission
- Earnings
- Payout eligibility
- Reconciliation
- Receipts
- Training-centre allocation
- Staff compensation

Current commission:

```text
25%
```

It must be configurable.

## Cash

Support:

```text
Cash change requested
```

## Definition of Done

Every financial transaction is traceable from customer payment through settlement.

---

# 15. Stage 10 — Notifications

## Objective

Implement event-driven communication.

Build:

- In-app notifications
- Push
- Email
- SMS-ready architecture
- WhatsApp-ready architecture

Events include:

- Booking
- Payment
- Cancellation
- Reminder
- Completion
- Review
- Payout
- Security

Implement:

- Templates
- Preferences
- Retries
- Queues
- Deduplication
- Deep links
- Audit

## Definition of Done

Critical user events generate reliable notifications with retry handling.

---

# 16. Stage 11 — Customer Application

## Objective

Build the customer-facing application against the real backend.

Use Stitch as the visual reference.

Build:

- Splash
- Authentication
- Home
- Location
- Category discovery
- Near You / 10 km
- Provider profile
- Service detail
- Booking
- Checkout
- Cash change request
- Custom requests
- Booking history
- Notifications
- Reviews
- Profile
- Favourites

## Definition of Done

Customer can complete the full journey without mocked production data.

---

# 17. Stage 12 — Provider Application

## Objective

Build provider operations.

### T1

- Dashboard
- Profile
- Services
- Availability
- Bookings
- Customer details
- Completion
- Earnings

### T2

Add:

- Team
- Team members
- Permissions
- Assignment
- Compensation

### T3

Add:

- Business
- Units
- Categories
- Staff
- Assignment
- Compensation
- Business analytics

## Definition of Done

Providers can operate Waasha without requiring administrative intervention for normal workflows.

---

# 18. Stage 13 — T2/T3 Business Operations

## Objective

Complete advanced provider capabilities.

Build:

```text
T2
 └── Team
      ├── Members
      ├── Roles
      ├── Assignments
      └── Compensation

T3
 └── Business
      ├── Units
      ├── Categories
      ├── Staff
      ├── Roles
      ├── Assignments
      └── Compensation
```

## Definition of Done

Tenant boundaries and permissions are proven with automated tests.

---

# 19. Stage 14 — Training Centres

## Objective

Implement partner attribution and earnings.

Build:

- Training-centre accounts
- Provider referral attribution
- Verification relationship
- Eligible transaction tracking
- Configurable share
- Earnings
- Reporting
- Payout eligibility

No permanent marketplace ranking priority.

## Definition of Done

Completed eligible services correctly generate partner attribution and financial records.

---

# 20. Stage 15 — Admin Platform

## Objective

Give Waasha operators control of the platform.

Build:

- Dashboard
- User management
- Provider management
- Business management
- Verification
- Bookings
- Marketplace
- Payments
- Commission
- Training centres
- Payouts
- Refunds
- Disputes
- Reviews
- Media moderation
- Notifications
- Configuration
- Feature flags
- Audit logs
- Reports

## Definition of Done

Operations can manage the platform without direct database manipulation.

---

# 21. Stage 16 — Media & File Management

## Objective

Implement secure production media.

Build:

- Upload sessions
- Object storage
- Image processing
- EXIF stripping
- Malware scanning
- Moderation
- Signed URLs
- CDN
- Ownership
- Deletion
- Retention
- Quotas

Enforce the three-image rules.

## Definition of Done

Media is securely uploaded, processed, stored and served according to ownership.

---

# 22. Stage 17 — Offline Synchronization

## Objective

Make supported workflows safe under unreliable connectivity.

Build:

- Local state
- Offline queue
- Sync engine
- Idempotency
- Conflict resolution
- Pending states
- Retry
- Auth expiry handling
- Media upload queue

Never represent a queued operation as confirmed.

## Definition of Done

Offline/online transition tests pass without corrupting booking or financial state.

---

# 23. Stage 18 — Analytics & Observability

## Objective

Make Waasha measurable and operationally visible.

Implement:

- Product events
- Marketplace events
- Booking events
- Financial events
- Notification events
- Security events
- Logs
- Metrics
- Traces
- Correlation IDs
- Dashboards
- Alerts

Core events:

```text
registration
search
provider_view
service_view
booking_created
payment_succeeded
payment_failed
booking_completed
review_created
```

## Definition of Done

The team can determine what happened in production without guessing.

---

# 24. Stage 19 — AI & Automation

## Objective

Add AI after deterministic foundations are reliable.

Build selectively:

- Natural-language discovery
- Booking assistant
- Custom-request assistance
- Provider writing assistant
- Review summaries
- Moderation assistance
- Support assistant
- Recommendations
- Operational insights

Use:

```text
AI Gateway
 ↓
Provider Adapter
```

## Critical rule

AI assists.

Deterministic systems decide:

- Money
- Availability
- Permissions
- Tenant access
- Booking truth
- Financial settlement

## Definition of Done

AI features have:

- Safe fallback
- Validation
- Observability
- Cost controls
- Privacy boundaries
- Evaluation

---

# 25. Stage 20 — Security Hardening

## Objective

Perform dedicated production security validation.

Test:

- Authentication
- Authorization
- Tenant isolation
- API security
- File upload
- Admin
- Payment
- Rate limiting
- Secrets
- Session security
- Audit logging

Perform appropriate penetration/security testing.

## Definition of Done

No unresolved critical security issues.

---

# 26. Stage 21 — Full QA & Performance

## Objective

Validate the entire system.

Test:

- Unit
- Component
- Integration
- API
- Database
- Contract
- E2E
- Security
- Accessibility
- Compatibility
- Offline
- Performance
- Load
- Stress
- Failure recovery
- Disaster recovery

Critical paths:

```text
Registration
Login
Provider onboarding
Search
Booking
Payment
Cash
EFT
Completion
Review
Commission
Payout
Tenant isolation
```

## Definition of Done

All release-blocking tests pass.

---

# 27. Stage 22 — Deployment & Production

## Objective

Move from tested release candidate to production.

Sequence:

```text
Release candidate
 ↓
Final QA
 ↓
Security gate
 ↓
Backup
 ↓
Migration
 ↓
Deploy
 ↓
Smoke tests
 ↓
Controlled launch
 ↓
Monitoring
```

Use the:

```text
docs/WAASHA_PRODUCTION_LAUNCH_OPERATIONS_RUNBOOK.md
```

for operational execution.

## Definition of Done

Production is stable and monitored.

---

# 28. Stage 23 — Post-Launch Operations

## Objective

Operate Waasha continuously.

Daily:

- Health
- Errors
- Payments
- Bookings
- Notifications
- Security
- Backups

Weekly:

- Product metrics
- Provider metrics
- Marketplace
- Finance
- Support
- Incidents

Monthly:

- Growth
- Retention
- Reliability
- Cost
- Security
- Capacity

---

# 29. Feature Implementation Template

Every major feature should follow:

```text
FEATURE
 ↓
Blueprint review
 ↓
Requirements
 ↓
Database
 ↓
API
 ↓
Authorization
 ↓
Business logic
 ↓
Frontend
 ↓
Notifications
 ↓
Analytics
 ↓
Tests
 ↓
Documentation
 ↓
Review
 ↓
Deploy
```

Not every feature requires every layer, but each layer must be consciously assessed.

---

# 30. Vertical Slice Rule

When practical, build complete vertical slices.

Example:

```text
Booking Feature
 ├── Database
 ├── API
 ├── Business logic
 ├── Authorization
 ├── Frontend
 ├── Notifications
 ├── Analytics
 └── Tests
```

This is preferable to building:

```text
All frontend first
then
all backend
then
all integration
```

because vertical slices expose architectural problems earlier.

---

# 31. Git Strategy

Use small, coherent commits.

Example:

```text
feat(auth): add provider registration
feat(booking): add availability validation
feat(payments): add Paystack adapter
fix(booking): prevent duplicate slot assignment
test(payments): add webhook idempotency tests
```

Avoid giant commits containing unrelated work.

---

# 32. Branch Strategy

Recommended:

```text
main
 │
 ├── feature/...
 ├── fix/...
 └── chore/...
```

Production-ready code should merge through review and automated checks where practical.

---

# 33. Migration Strategy

Every schema change:

```text
Create migration
 ↓
Run locally
 ↓
Run tests
 ↓
Test against realistic data
 ↓
Review rollback implications
 ↓
Deploy
```

Never casually modify production schema manually.

---

# 34. Environment Strategy

Maintain clear separation:

```text
development
staging
production
```

Production credentials must never be committed to source control.

Use environment-specific configuration.

---

# 35. Staging Environment

Staging should reproduce production architecture as closely as practical.

Use it for:

- Release candidates
- Integration tests
- Payment sandbox
- Notification testing
- Performance tests
- Admin testing
- Migration testing

---

# 36. Release Candidate Checklist

Before release:

```text
[ ] Blueprint requirements checked
[ ] Database migrations tested
[ ] API tests pass
[ ] Frontend tests pass
[ ] E2E tests pass
[ ] Security checks pass
[ ] Accessibility checks pass
[ ] Performance acceptable
[ ] Analytics verified
[ ] Notifications verified
[ ] Backup verified
[ ] Rollback verified
[ ] Documentation updated
```

---

# 37. Definition of Done — Global

The Waasha implementation is considered complete only when:

### Product

- Customer journeys work.
- Provider journeys work.
- T1/T2/T3 work.
- Admin works.

### Platform

- Database works.
- API works.
- Marketplace works.
- Booking engine works.
- Payments work.
- Notifications work.
- Media works.

### Reliability

- Offline-safe behaviour works.
- Monitoring works.
- Backups work.
- Recovery is tested.

### Security

- Authentication works.
- Authorization works.
- Tenant isolation is tested.
- Critical security issues are resolved.

### Quality

- Automated tests pass.
- Critical E2E paths pass.
- Performance is acceptable.

### Operations

- Support is ready.
- Finance reconciliation works.
- Incident response exists.
- Production deployment is repeatable.

---

# 38. Non-Negotiable Implementation Rules

1. **Do not build against assumptions when the blueprint already defines the behaviour.**
2. **Do not hard-code the 25% commission.**
3. **Do not create additional launch categories.**
4. **Do not give T2/T3 marketplace ranking preference automatically.**
5. **Do not give training-centre referrals permanent marketplace ranking preference.**
6. **Do not exceed 3 service/style images.**
7. **Do not exceed 3 custom-request images.**
8. **Do not treat payment as service completion.**
9. **Do not bypass server-side authorization.**
10. **Do not bypass tenant isolation.**
11. **Do not expose private media incorrectly.**
12. **Do not treat offline queued actions as confirmed.**
13. **Do not allow AI to control critical deterministic outcomes.**
14. **Do not introduce driver functionality into the initial launch.**
15. **Do not silently introduce major business rules.**
16. **Do not ignore security or financial integrity to make a feature ship faster.**
17. **Do not rewrite working architecture without understanding the existing implementation.**
18. **Do not mark a feature complete merely because the UI exists.**

---

# 39. Implementation Progress Tracking

Maintain a simple progress table:

| Stage | Status | Notes |
|---|---|---|
| 0 Repository Audit | Not Started | |
| 1 Repository Foundation | Not Started | |
| 2 Database | Not Started | |
| 3 Backend | Not Started | |
| 4 Auth | Not Started | |
| 5 Profiles | Not Started | |
| 6 Services/Availability | Not Started | |
| 7 Marketplace | Not Started | |
| 8 Booking | Not Started | |
| 9 Payments | Not Started | |
| 10 Notifications | Not Started | |
| 11 Customer App | Not Started | |
| 12 Provider App | Not Started | |
| 13 T2/T3 | Not Started | |
| 14 Training Centres | Not Started | |
| 15 Admin | Not Started | |
| 16 Media | Not Started | |
| 17 Offline | Not Started | |
| 18 Analytics | Not Started | |
| 19 AI | Not Started | |
| 20 Security | Not Started | |
| 21 QA/Performance | Not Started | |
| 22 Production | Not Started | |
| 23 Operations | Not Started | |

Statuses:

```text
Not Started
In Progress
Blocked
Ready for Review
Complete
```

---

# 40. How the AI Should Execute a Task

For a request such as:

> "Build provider availability."

The AI should:

```text
1. Read AGENTS.md
        ↓
2. Identify relevant blueprint sections
        ↓
3. Inspect current repository
        ↓
4. Inspect existing database/API/frontend
        ↓
5. Determine dependencies
        ↓
6. Implement database
        ↓
7. Implement API
        ↓
8. Implement authorization
        ↓
9. Implement frontend
        ↓
10. Add tests
        ↓
11. Run validation
        ↓
12. Report what changed
```

It should not immediately start writing UI code.

---

# 41. How the AI Should Report Implementation

For meaningful tasks, the AI should report:

### What was built

Short summary.

### Files changed

List important files.

### Database changes

Migrations/schema changes.

### API changes

Endpoints/contracts.

### Frontend changes

Screens/components.

### Tests

Tests added/run.

### Known issues

Anything unresolved.

### Next dependency

What should logically happen next.

---

# 42. When to Stop and Ask

The AI should ask for a decision when:

- A major business rule is undefined.
- Two requirements conflict.
- A destructive migration is required.
- A financial behaviour is ambiguous.
- Security implications are significant.
- A major architectural choice cannot be inferred safely.

It should **not** ask unnecessary questions for decisions already defined in the blueprint.

---

# 43. Implementation Order — Critical Dependency Graph

The dependency structure is:

```text
Repository
    ↓
Database
    ↓
Backend
    ↓
Authentication
    ↓
Profiles
    ↓
Services
    ↓
Locations
    ↓
Availability
    ↓
Marketplace
    ↓
Booking
    ↓
Payments
    ↓
Notifications
    ↓
Customer / Provider Apps
    ↓
T2 / T3
    ↓
Training Centres
    ↓
Admin
    ↓
Media
    ↓
Offline
    ↓
Analytics
    ↓
AI
    ↓
Security Hardening
    ↓
Full QA
    ↓
Production
```

Some components may be developed in parallel, but this dependency graph should guide sequencing.

---

# 44. Parallel Workstreams

Where safe, work can happen in parallel:

```text
Database
        ├── Backend
        └── Test infrastructure

Backend
        ├── Customer frontend
        └── Provider frontend

Core platform
        ├── Admin
        ├── Media
        └── Notifications

Stable platform
        ├── Offline
        ├── Analytics
        └── AI
```

Parallel work must still respect shared contracts.

---

# 45. First Build Sprint

The first implementation sprint should be:

## Step 0 — Repository Audit

Before writing production features:

1. Open the repository.
2. Inspect current structure.
3. Identify current stack.
4. Check package/dependency files.
5. Check database code.
6. Check frontend.
7. Check backend.
8. Check environment configuration.
9. Check Docker/container setup.
10. Check Git state.
11. Check existing tests.
12. Check Stitch assets.
13. Produce `IMPLEMENTATION_BASELINE.md`.

Only after this should implementation architecture be finalized against the existing repository.

---

# 46. First Implementation Milestone

The first milestone is:

**"Waasha Engineering Foundation Ready."**

It is complete when:

```text
[ ] Repository audited
[ ] Folder structure established
[ ] AGENTS.md installed
[ ] Master Blueprint installed
[ ] Development environment documented
[ ] Environment templates created
[ ] Linting configured
[ ] Formatting configured
[ ] Type checking configured
[ ] CI foundation configured
[ ] Database strategy confirmed
[ ] Backend strategy confirmed
[ ] Frontend strategy confirmed
[ ] First build succeeds
```

---

# 47. Master Rule

**Do not rush from architecture into random feature development.**

The implementation should proceed in controlled milestones.

Every completed milestone should leave the repository in a better, more stable state than before.

---

# 48. Final Execution Principle

```text
Architecture first.
Foundation second.
Critical workflows third.
Experience fourth.
Hardening fifth.
Launch last.
```

Or simply:

> **Build in dependency order, verify every layer, and never sacrifice the architecture for speed.**

**Waasha — The Future of Service, Today.**

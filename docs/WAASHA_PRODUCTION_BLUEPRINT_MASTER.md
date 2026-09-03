# WAASHA PRODUCTION BLUEPRINT — MASTER DOCUMENT

**Version:** Master compilation of Documents 01–18
**Product:** Waasha
**Tagline:** The Future of Service, Today.

---

## Document Index

01. Product Build Specification
02. Database Architecture
03. API Specification
04. Booking Engine
05. Provider Tiers
06. Payment & Finance Architecture
07. Notification & Communication Architecture
08. Authentication, Authorization & Security
09. Marketplace, Discovery & Search Architecture
10. Frontend Application Architecture
11. Admin Platform Architecture
12. Media & File Storage Architecture
13. Analytics, Reporting & Observability Architecture
14. Infrastructure, DevOps & Deployment Architecture
15. Testing & Quality Assurance Architecture
16. Offline-First & Synchronization Architecture
17. AI & Automation Architecture
18. Production Launch & Operations Runbook

---

# MASTER DOCUMENT


<!-- ============================================================ -->
<!-- DOCUMENT 01: PRODUCT BUILD SPECIFICATION -->
<!-- ============================================================ -->

# WAASHA — PRODUCT BUILD SPECIFICATION

**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Baseline build specification  
**Release:** Initial complete product build  
**Phase 2:** Driver network excluded from this release

## 1. Product Purpose

Waasha is a service marketplace connecting customers with nearby service providers within a default 10 km discovery radius.

Core categories only:
1. Barbers
2. Hair Salons & Stylists
3. Nail Technicians
4. Beauty Services
5. Car Wash

Primary participant areas:
- Customer
- T1 Individual Provider
- T2 Team
- T3 Business
- Training Centre
- Admin

The Driver Network is Phase 2 and is not part of the initial build.

## 2. Core Principles

### Marketplace equality
T1/T2/T3 are capability tiers, not ranking tiers. Marketplace visibility should use legitimate signals such as service relevance, distance, availability, rating, reviews, reliability, response time, completed bookings and verification.

Training-centre affiliation must not permanently guarantee higher marketplace ranking.

### Human-first technology
Brand language: Human, Confident, Simple, Progressive, Trustworthy.

### Location-first discovery
Default discovery radius: 10 km.

Providers may use a fixed address, live location, or both.

### Configuration over hard-coding
The default platform commission is 25%, but it must be admin-configurable and never hard-coded into application logic.

## 3. Brand

Approved identity:
- Compact geometric W
- Deep navy left side
- Teal right side
- Teal diamond centered above the W
- WAASHA wordmark
- Tagline: THE FUTURE OF SERVICE, TODAY.

Do not use a gold diamond. Do not make the W excessively wide.

Primary Navy: `#0B1F33`  
Waasha Teal: `#19B6A5`  
White: `#FFFFFF`  
Light background: `#F6F8FA`  
Dark text: `#17212B`  
Muted text: `#667085`

Use the Stitch-established typography/design system.

### Splash animation
The teal diamond rotates horizontally around its vertical axis: front → thin side → front. The W, wordmark and tagline remain stationary.

## 4. Roles

### Customer
Discover, book, create custom requests, receive proposals, pay and review.

### Provider
Has T1, T2 or T3 capability level.

### T2 roles
- Owner
- Manager
- Provider

### T3 roles
- Business Owner
- Business Manager
- Staff/Provider

### Training Centre
Recruits providers and receives configured partner allocation from completed services.

### Admin
Full platform control.

Permissions must be enforced server-side, not only by hiding UI controls.

## 5. T1 — Individual

For solo providers.

Capabilities:
- Professional profile
- Profile image
- Bio
- Skills
- Experience
- Qualifications
- Portfolio
- Services
- Pricing
- Duration
- Up to 3 images per service/style
- Availability
- Working hours
- Bookings
- Booking history
- Earnings
- Reviews
- Customer history
- Location
- Home visits
- Payment settings
- Custom-request opt-in

## 6. T2 — Team

Includes relevant T1 functionality plus:
- Create team
- Invite members
- Member profiles
- Member management
- Assign services
- Assign bookings
- Team availability
- Scheduling
- Performance
- Payouts

Use role-based permissions for Owner, Manager and Provider.

## 7. T3 — Business

A T3 business can operate any or all five Waasha categories.

A single Business Account can contain multiple Business Units.

Structure:

Business Account
→ Business Units
→ Services / Staff / Availability / Bookings / Reviews / Earnings

Each Business Unit can have:
- Name
- Category
- Branding
- Location
- Operating hours
- Services
- Pricing
- Images
- Staff
- Availability
- Bookings
- Reviews
- Earnings

Central Business Dashboard:
- All units
- Unit switching
- Consolidated performance
- Bookings
- Staff
- Revenue
- Analytics
- Services
- Locations

Support future multiple-location expansion.

## 8. Service Management

Providers and Business Units can create services.

Fields:
- Service name
- Category
- Description
- Price
- Duration
- Availability
- Service location
- Custom-request relevance
- Images

Maximum **3 images per service/style**.

Support upload, preview, remove, replace, reorder, edit, disable, duplicate and delete.

## 9. Location

Provider modes:
- Fixed address
- Live/current location
- Both

Location permissions must be explicit and privacy-conscious.

Businesses generally use fixed locations.

## 10. Customer Discovery

Customers can:
- Set current location
- Manually choose location
- Search
- Browse categories
- Filter
- Sort
- View providers within 10 km
- See provider distance
- See availability

Filters:
- Category
- Service
- Distance
- Price
- Rating
- Availability
- Home visits
- Provider type

Ranking must not be pay-to-win or tier-based.

## 11. Standard Booking

Flow:

Search → Category/service → Provider → Service → Date → Time → Location → Payment method → Review → Confirm → Booking

Support provider location and customer/home location.

Clearly identify Home Visit bookings.

## 12. Booking State Machine

States:
- Draft
- Pending
- Accepted
- Confirmed
- Payment Pending
- Paid
- In Progress
- Completed
- Cancelled
- Declined
- Refunded
- Disputed

Transitions must be role- and rule-controlled.

Payment success must not automatically mean the service is completed.

## 13. Custom Requests

Customers can request services/styles not currently listed.

Fields:
- Description
- Preferred date
- Preferred time
- Location
- Optional budget
- Payment preference
- Reference images

Maximum **3 reference images per custom request**.

Allow preview, removal and replacement.

Reference images are private to the request/booking context and do not automatically become public portfolio content.

## 14. Custom Request Opt-In

During provider onboarding ask:

**Do you accept custom requests?**

Options:
- Yes — show me custom opportunities
- No — standard bookings only

Only opted-in providers receive Custom Request Board access. The setting can be changed later.

## 15. Custom Request Board

Show relevant requests based on:
- Category
- Skills
- Distance
- Location
- Availability
- Preferences

Request cards show:
- Category
- Customer description
- Reference images
- Distance
- Preferred date/time
- Optional budget
- Location

## 16. Custom Proposals

Providers submit proposals instead of automatically claiming requests.

Proposal fields:
- Proposed price
- Estimated duration
- Available date/time
- Optional message

Customer compares proposals and selects one.

Flow:

Custom Request → Proposals → Customer selects provider → Booking → Payment → Service → Review

## 17. Payment Methods

Providers choose:
- Waasha Payment
- Cash
- EFT

Customers only see methods supported by the selected provider.

Online Waasha Payment will use Paystack.

Use an internal payment abstraction so core business logic is not tightly coupled to Paystack-specific implementation.

## 18. Cash and Change

Example:
Service = R150  
Payment = Cash  
Customer paying = R200

Ask:
**Will you need change?**

If yes:
**How much will you be paying with?**

Provider sees:
- Service total: R150
- Payment: Cash
- Customer paying: R200
- Change required: R50

Preferred copy:
**Cash change requested**
**Provider has been notified to bring R50 change.**

Do not imply Waasha physically guarantees the change.

## 19. EFT

Show EFT only when enabled by the provider.

Keep payment status and service lifecycle separate.

Support future reconciliation.

## 20. Commission

Providers join for free.

Default platform commission: **25%**.

The rate must be stored as an Admin-configurable setting.

Example:
Service value = R400  
Platform commission at 25% = R100  
Provider/business payout = R300

Training-centre allocation may be taken from the platform commission according to configured partnership rules.

Do not pay training-centre revenue simply for registration.

## 21. Training Centres

Training centres recruit students/graduates.

Provider source:
- Independent
- Training Centre Referred

Referred providers may receive faster onboarding, training verification, partner verification and an initial onboarding advantage.

They must not receive permanent marketplace ranking preference.

Training-centre attribution must remain associated with recruited providers.

## 22. Training Centre Dashboard

Include:
- Partner profile
- Recruited providers
- Provider status
- Active providers
- Completed services
- Partner earnings
- Provider performance
- Recruitment activity

Partner revenue is based on completed services from attributed providers.

## 23. Staff Compensation

Support:
- Salary
- Fixed per-service payout
- Percentage/commission payout

Compensation is configurable.

Restrict financial information by role.

## 24. Customer Features

- Registration
- Login
- Profile
- Location
- Search
- Categories
- Provider discovery
- Provider profiles
- Services
- Bookings
- Custom Requests
- Proposals
- Payments
- Notifications
- Reviews
- Booking history
- Favourites
- Settings

## 25. Provider Dashboard

T1:
- Dashboard
- Bookings
- Services
- Custom Requests
- Customers
- Earnings
- Profile
- Availability
- Payment settings

T2 adds:
- Team
- Team scheduling
- Team performance
- Team payouts

T3 adds:
- Business
- Business Units
- Staff
- Analytics
- Reporting
- Business earnings

## 26. Reviews

Only completed bookings should normally create review eligibility.

Customer can submit:
- Star rating
- Written review

Show overall rating, rating breakdown and reviews.

## 27. Notifications

Support:
- Booking request
- Booking accepted
- Booking declined
- Booking changes
- Cancellation
- Upcoming booking
- Payment success
- Payment failure
- Custom request
- Custom proposal
- Proposal acceptance
- Verification
- Training-centre activity
- Team activity
- Business activity

## 28. Admin

Admin sections:
- Dashboard
- Users
- Providers
- Teams
- Businesses
- Business Units
- Training Centres
- Services
- Bookings
- Payments
- Commissions
- Reports
- Settings

Admin controls:
- Platform commission
- Training-centre allocation
- Provider payout rules
- T1 feature access
- T2 feature access
- T3 feature access
- Verification settings
- Service categories
- Marketplace settings

## 29. Tier Matrix

| Feature | T1 | T2 | T3 |
|---|---:|---:|---:|
| Profile | ✓ | ✓ | ✓ |
| Services | ✓ | ✓ | ✓ |
| Pricing | ✓ | ✓ | ✓ |
| 3 images/service | ✓ | ✓ | ✓ |
| Portfolio | ✓ | ✓ | ✓ |
| Availability | ✓ | ✓ | ✓ |
| Bookings | ✓ | ✓ | ✓ |
| Home visits | ✓ | ✓ | ✓ |
| Live location | ✓ | ✓ | ✓ |
| Cash | ✓ | ✓ | ✓ |
| EFT | ✓ | ✓ | ✓ |
| Waasha Payment | ✓ | ✓ | ✓ |
| Earnings | ✓ | ✓ | ✓ |
| Reviews | ✓ | ✓ | ✓ |
| Custom requests* | ✓ | ✓ | ✓ |
| Team members | — | ✓ | ✓ |
| Team scheduling | — | ✓ | ✓ |
| Team roles | — | ✓ | ✓ |
| Team payouts | — | ✓ | ✓ |
| Staff management | — | ✓ | ✓ |
| Business profile | — | — | ✓ |
| Business units | — | — | ✓ |
| All five categories | — | — | ✓ |
| Multi-category business | — | — | ✓ |
| Business dashboard | — | — | ✓ |
| Business analytics | — | — | ✓ |
| Advanced reporting | — | — | ✓ |
| Multiple-location architecture | — | — | ✓ |

*Custom Requests require provider opt-in.

Admin must be able to configure feature access by tier.

## 30. Security

Include:
- Secure authentication
- Password hashing
- Authorization
- RBAC
- Server-side permission enforcement
- Input validation
- File validation
- Image type/size restrictions
- Rate limiting
- Secure payment webhook verification
- SQL injection protection
- XSS protection
- CSRF protection where applicable
- Secure session/token handling
- Audit logging for sensitive admin actions
- Data isolation

Customer addresses/private data must only be exposed to authorized parties for legitimate purposes.

## 31. File Uploads

Service images: maximum 3 per service/style.

Custom request images: maximum 3 per request.

Validate file type, size, dimensions where appropriate and security constraints.

Never rely on frontend validation alone.

## 32. API Domains

Document APIs for:
- Authentication
- Users
- Customers
- Providers
- Teams
- Businesses
- Business Units
- Services
- Locations
- Availability
- Bookings
- Custom Requests
- Proposals
- Payments
- Payouts
- Commissions
- Reviews
- Notifications
- Training Centres
- Admin
- Settings

Use consistent API response and error structures.

## 33. Database Principles

Use a relational MySQL database with strong integrity.

Expected core entities:
- users
- customer_profiles
- provider_profiles
- provider_tiers
- provider_services
- service_images
- provider_locations
- availability
- bookings
- booking_items
- custom_requests
- custom_request_images
- custom_request_proposals
- teams
- team_members
- businesses
- business_units
- business_staff
- staff_compensation
- training_centres
- training_centre_providers
- payments
- payouts
- commissions
- reviews
- notifications
- admin_settings
- tier_features

Final schema must be reviewed before migrations are treated as stable.

## 34. Frontend Architecture

Use reusable components rather than duplicating UI.

Core components:
- Buttons
- Inputs
- Forms
- Cards
- Provider cards
- Service cards
- Business cards
- Booking cards
- Ratings
- Badges
- Image galleries
- Image uploader
- Calendar
- Location selector
- Payment selector
- Status indicators
- Modals
- Toasts
- Empty states
- Loading states
- Error states

The Stitch export is the visual source of truth, with the build-copy corrections listed in this specification.

## 35. Responsive Requirements

Customer: mobile-first, tablet, desktop.

Provider: mobile, tablet, desktop.

T2/T3: mobile and desktop.

Admin: desktop-first but responsive.

## 36. Stitch Corrections

Replace:
**T3 Encrypted Checkout**
with:
**Secure Checkout**

Replace:
**Guaranteed Cash Change**
with:
**Cash change requested**

Preferred supporting message:
**Provider has been notified to bring R50 change.**

Preserve:
- 10 km discovery
- Five core categories
- Navy/teal brand
- Customer navigation
- Approved logo
- Splash animation concept

## 37. Development Workflow

Recommended branches:
- `main` — production
- `develop` — integration
- `feature/*` — feature development

Example feature branches:
- feature/authentication
- feature/customer-discovery
- feature/provider-onboarding
- feature/bookings
- feature/custom-requests
- feature/teams
- feature/businesses
- feature/training-centres
- feature/payments
- feature/admin

Do not develop directly on production.

## 38. Environments

Maintain:
- Development
- Staging
- Production

Use environment variables for:
- Database credentials
- Auth secrets
- Payment keys
- Storage
- Email
- External services

Never commit secrets.

Provide `.env.example`.

## 39. Recommended Build Order

1. Repository/project setup
2. Documentation
3. Database schema
4. Authentication
5. Roles/permissions
6. Design system
7. Customer profile/location
8. Provider onboarding
9. Service management
10. Marketplace discovery
11. Availability
12. Booking engine
13. Reviews
14. T2 Teams
15. T3 Business
16. Custom Requests
17. Training Centres
18. Payment abstraction
19. Paystack integration
20. Cash/EFT workflows
21. Commission engine
22. Notifications
23. Admin platform
24. Security hardening
25. Automated tests
26. Staging deployment
27. End-to-end testing
28. Production deployment
29. Launch preparation

## 40. Definition of Done

A feature is complete only when:
- UI matches Stitch
- Responsive states work
- Backend endpoint exists
- Authorization is enforced
- Database state is correct
- Validation exists
- Loading/error/success states exist
- Relevant notifications work
- Tests cover important business rules
- Sensitive data is protected
- Feature works end-to-end

## 41. Source of Truth

Resolve conflicts in this order:

1. Explicit business rules in this specification
2. Approved Waasha brand/design system
3. Stitch screen designs
4. API/database specifications
5. Implementation conventions

If the design conflicts with a business rule, the business rule wins and the UI should be corrected.

If a major requirement is unclear, do not invent a major business rule silently.

## 42. Phase 2 Exclusion

Do not implement the Driver Network in the initial release.

No driver registration, driver marketplace, ride requests, driver dashboard or transport booking is required for this phase.

# WAASHA

## THE FUTURE OF SERVICE, TODAY.

Build the technology around people.

Make service effortless.

---


<!-- ============================================================ -->
<!-- DOCUMENT 02: DATABASE ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA — DATABASE ARCHITECTURE SPECIFICATION

**Product:** Waasha  
**Database:** MySQL 8.x  
**Status:** Architecture baseline  
**Purpose:** Source of truth for application data modelling and migrations

---

## 1. Database Objectives

The Waasha database must support the complete initial product:

- Customers
- Individual providers
- Team providers
- Businesses
- Multiple business units
- Staff
- Services
- Service images
- Provider/business locations
- Availability
- Standard bookings
- Custom requests
- Custom request images
- Provider proposals
- Reviews
- Payments
- Payouts
- Platform commissions
- Training-centre attribution and revenue share
- Notifications
- Admin configuration
- Tier feature configuration
- Verification
- Auditability

The schema must be designed so that business rules are configurable and transactional data remains auditable.

The Driver Network is Phase 2 and must not be implemented in the initial database.

---

# 2. Core Architectural Principles

## 2.1 One user identity

A person should have one `users` record.

Do not create separate authentication accounts for:

- Customer
- Provider
- Team member
- Business staff
- Training-centre user
- Admin

A user may have more than one legitimate role where the product allows it.

Authentication identity belongs to `users`.

Role-specific information belongs in related tables.

---

## 2.2 Separate account identity from provider/business structure

Do not put all provider and business information into `users`.

Use:

`users`
→ authentication/account identity

`provider_profiles`
→ provider-specific information

`teams`
→ team ownership/structure

`businesses`
→ business account

`business_units`
→ individual operating units/locations

This keeps the model extensible.

---

## 2.3 Tiers are capabilities

T1, T2 and T3 should not be represented as three unrelated provider systems.

Use a provider tier reference:

`provider_profiles.tier_id`

with configurable features stored separately.

---

## 2.4 Financial data is immutable/auditable

Do not calculate historical transaction values from today's settings.

When a booking is financially completed, store the actual:

- gross amount
- commission rate used
- commission amount
- provider/business payout
- training-centre allocation
- payment fees where applicable
- currency

Historical records must remain correct even if Admin later changes the commission configuration.

---

# 3. High-Level Relationship Model

```text
USERS
│
├── CUSTOMER_PROFILES
│
├── PROVIDER_PROFILES
│   │
│   ├── PROVIDER_TIERS
│   ├── PROVIDER_LOCATIONS
│   ├── PROVIDER_SERVICES
│   │   └── SERVICE_IMAGES
│   ├── AVAILABILITY
│   ├── VERIFICATION
│   └── TRAINING_CENTRE ATTRIBUTION
│
├── TEAM MEMBERSHIPS
│   └── TEAMS
│
├── BUSINESS STAFF
│   └── BUSINESSES
│       └── BUSINESS_UNITS
│           ├── SERVICES
│           ├── LOCATIONS
│           ├── STAFF
│           └── BOOKINGS
│
├── TRAINING CENTRE USERS
│   └── TRAINING CENTRES
│
└── ADMIN USERS

CUSTOMERS
│
├── BOOKINGS
│   ├── BOOKING ITEMS
│   ├── PAYMENTS
│   ├── PAYOUTS
│   ├── COMMISSIONS
│   └── REVIEWS
│
└── CUSTOM REQUESTS
    ├── REQUEST IMAGES
    └── PROPOSALS
        └── BOOKING
```

---

# 4. Authentication and Users

## 4.1 `users`

Purpose: one authentication identity per person.

Suggested fields:

- `id` — BIGINT UNSIGNED PK
- `uuid` — UUID/CHAR(36), public-safe identifier
- `email` — nullable if phone-first registration is supported
- `phone` — nullable
- `password_hash` — nullable if social/passwordless authentication is introduced
- `status` — active, suspended, pending, deleted
- `email_verified_at`
- `phone_verified_at`
- `last_login_at`
- `created_at`
- `updated_at`
- `deleted_at` — nullable soft-delete timestamp

Unique constraints:

- email where present
- phone where present
- uuid

Never store plaintext passwords.

---

# 5. Roles

## 5.1 `roles`

Suggested records:

- CUSTOMER
- PROVIDER
- TRAINING_CENTRE
- ADMIN

## 5.2 `user_roles`

Fields:

- `id`
- `user_id`
- `role_id`
- `created_at`

Unique:

`user_id + role_id`

A provider's T1/T2/T3 level is not a role.

---

# 6. Customer

## 6.1 `customer_profiles`

Fields:

- `id`
- `user_id`
- `first_name`
- `last_name`
- `display_name`
- `profile_image_url`
- `date_of_birth` if legitimately required
- `default_location_id` nullable
- `created_at`
- `updated_at`

One customer profile per user.

---

# 7. Provider

## 7.1 `provider_tiers`

Initial records:

- T1 — Individual
- T2 — Team
- T3 — Business

Fields:

- `id`
- `code`
- `name`
- `description`
- `is_active`
- `sort_order`
- `created_at`
- `updated_at`

Do not use hard-coded tier IDs in application logic.

---

## 7.2 `provider_profiles`

Fields:

- `id`
- `user_id`
- `tier_id`
- `provider_type` — individual, team, business
- `display_name`
- `bio`
- `profile_image_url`
- `experience_summary`
- `custom_requests_enabled`
- `verification_status`
- `status`
- `created_at`
- `updated_at`
- `deleted_at`

The exact relationship between provider profile and T2/T3 ownership is described below.

---

# 8. Provider Skills and Qualifications

## 8.1 `skills`

Fields:

- `id`
- `name`
- `description`
- `is_active`

## 8.2 `provider_skills`

Fields:

- `id`
- `provider_id`
- `skill_id`
- `proficiency_level` nullable
- `years_experience` nullable

Unique:

`provider_id + skill_id`

## 8.3 `qualifications`

Fields:

- `id`
- `name`
- `issuing_body`
- `description`

## 8.4 `provider_qualifications`

Fields:

- `id`
- `provider_id`
- `qualification_id`
- `certificate_reference` nullable
- `issued_at` nullable
- `expires_at` nullable
- `verification_status`

---

# 9. Portfolio

## 9.1 `provider_portfolio_items`

Fields:

- `id`
- `provider_id`
- `title`
- `description`
- `image_url`
- `sort_order`
- `status`
- `created_at`
- `updated_at`

Portfolio images are separate from service images.

---

# 10. Categories

Only these five categories should exist initially:

1. Barbers
2. Hair Salons & Stylists
3. Nail Technicians
4. Beauty Services
5. Car Wash

## 10.1 `service_categories`

Fields:

- `id`
- `code`
- `name`
- `description`
- `icon`
- `image_url`
- `is_active`
- `sort_order`
- `created_at`
- `updated_at`

Suggested codes:

- BARBERS
- HAIR_SALONS_STYLISTS
- NAIL_TECHNICIANS
- BEAUTY_SERVICES
- CAR_WASH

Admin may manage category availability, but the initial seed must contain only these five.

---

# 11. Services

## 11.1 `services`

A service belongs to either an independent/team provider or a business unit.

Fields:

- `id`
- `uuid`
- `service_category_id`
- `provider_id` nullable
- `business_unit_id` nullable
- `name`
- `description`
- `price`
- `currency`
- `duration_minutes`
- `service_mode` — provider_location, customer_location, both
- `custom_request_supported`
- `status`
- `created_at`
- `updated_at`
- `deleted_at`

Integrity rule:

Exactly one owner must exist:

- `provider_id` OR
- `business_unit_id`

A business unit service should not also have a direct provider owner.

---

# 12. Service Images

## 12.1 `service_images`

Fields:

- `id`
- `service_id`
- `image_url`
- `storage_key`
- `sort_order`
- `created_at`
- `updated_at`

Business rule:

**Maximum 3 images per service.**

The API must enforce this and the database/service layer should protect against race-condition violations where practical.

---

# 13. Teams

## 13.1 `teams`

Fields:

- `id`
- `uuid`
- `owner_provider_id`
- `name`
- `description`
- `status`
- `created_at`
- `updated_at`

A T2 provider can own a team.

## 13.2 `team_members`

Fields:

- `id`
- `team_id`
- `provider_id`
- `role` — owner, manager, provider
- `status`
- `joined_at`
- `created_at`
- `updated_at`

Unique:

`team_id + provider_id`

A team member should be represented by a provider profile where they independently provide services.

---

# 14. Businesses

## 14.1 `businesses`

Fields:

- `id`
- `uuid`
- `owner_provider_id`
- `legal_name`
- `display_name`
- `description`
- `logo_url`
- `cover_image_url`
- `status`
- `verification_status`
- `created_at`
- `updated_at`
- `deleted_at`

A T3 provider/business owner controls the business.

---

# 15. Business Units

## 15.1 `business_units`

A business unit represents a distinct operating service business.

Fields:

- `id`
- `uuid`
- `business_id`
- `name`
- `description`
- `service_category_id` nullable
- `logo_url`
- `cover_image_url`
- `status`
- `created_at`
- `updated_at`
- `deleted_at`

A business unit may represent:

- Salon
- Barbershop
- Nail business
- Beauty business
- Car wash

T3 can create multiple units across all five categories.

If a unit needs to offer multiple categories in future, use the relationship table below rather than changing the core business structure.

## 15.2 `business_unit_categories`

Fields:

- `id`
- `business_unit_id`
- `service_category_id`

Unique:

`business_unit_id + service_category_id`

This supports multi-category units without limiting the business account.

---

# 16. Business Locations

## 16.1 `business_locations`

Fields:

- `id`
- `business_unit_id`
- `label`
- `address_line_1`
- `address_line_2`
- `suburb`
- `city`
- `province`
- `postal_code`
- `country`
- `latitude`
- `longitude`
- `is_primary`
- `created_at`
- `updated_at`

Use latitude/longitude for marketplace distance calculations.

---

# 17. Business Staff

## 17.1 `business_staff`

Fields:

- `id`
- `business_id`
- `business_unit_id` nullable
- `provider_id`
- `role` — owner, manager, staff/provider
- `status`
- `joined_at`
- `created_at`
- `updated_at`

A staff member may be assigned to one or more business units.

If multiple-unit staff assignment is required, create:

## 17.2 `business_staff_units`

Fields:

- `id`
- `business_staff_id`
- `business_unit_id`

Unique:

`business_staff_id + business_unit_id`

---

# 18. Staff Compensation

## 18.1 `staff_compensation`

Fields:

- `id`
- `business_staff_id`
- `compensation_type` — salary, fixed_per_service, percentage
- `amount` nullable
- `percentage` nullable
- `currency`
- `effective_from`
- `effective_to` nullable
- `status`
- `created_at`
- `updated_at`

Historical compensation records should not be overwritten.

Create a new record when compensation changes.

---

# 19. Locations

## 19.1 `provider_locations`

Fields:

- `id`
- `provider_id`
- `location_type` — fixed, live
- `label`
- `address_line_1` nullable
- `address_line_2` nullable
- `suburb` nullable
- `city` nullable
- `province` nullable
- `postal_code` nullable
- `country` nullable
- `latitude`
- `longitude`
- `is_primary`
- `is_active`
- `created_at`
- `updated_at`

Live location may be updated when a provider explicitly enables location sharing.

Do not unnecessarily retain a detailed historical location trail in the initial release.

---

# 20. Availability

## 20.1 `availability_rules`

Fields:

- `id`
- `provider_id` nullable
- `business_unit_id` nullable
- `day_of_week`
- `start_time`
- `end_time`
- `timezone`
- `is_active`
- `created_at`
- `updated_at`

Exactly one owner:

- provider OR business unit.

## 20.2 `availability_exceptions`

Fields:

- `id`
- `provider_id` nullable
- `business_unit_id` nullable
- `date`
- `start_time` nullable
- `end_time` nullable
- `type` — unavailable, custom_hours
- `reason`
- `created_at`
- `updated_at`

This handles holidays, leave and special hours.

---

# 21. Provider Payment Preferences

## 21.1 `provider_payment_methods`

Fields:

- `id`
- `provider_id`
- `method` — waasha_payment, cash, eft
- `is_enabled`
- `created_at`
- `updated_at`

For business units, support equivalent business-level payment configuration if needed.

The booking should snapshot the selected payment method.

---

# 22. Bookings

## 22.1 `bookings`

A booking represents the service transaction lifecycle.

Fields:

- `id`
- `uuid`
- `customer_id`
- `provider_id` nullable
- `business_unit_id` nullable
- `service_id` nullable
- `custom_request_id` nullable
- `proposal_id` nullable
- `assigned_provider_id` nullable
- `booking_type` — standard, custom
- `service_location_type` — provider, customer
- `service_address_id` nullable
- `scheduled_start`
- `scheduled_end`
- `timezone`
- `status`
- `currency`
- `subtotal`
- `discount_amount`
- `total_amount`
- `payment_method`
- `payment_status`
- `customer_notes`
- `provider_notes`
- `accepted_at`
- `confirmed_at`
- `started_at`
- `completed_at`
- `cancelled_at`
- `cancelled_by_user_id`
- `cancellation_reason`
- `created_at`
- `updated_at`

A booking should preserve the commercial facts at the time it was created.

---

# 23. Booking Items

## 23.1 `booking_items`

Use this even if the first UI normally books one service.

Fields:

- `id`
- `booking_id`
- `service_id`
- `service_name_snapshot`
- `service_description_snapshot`
- `unit_price`
- `quantity`
- `duration_minutes`
- `line_total`
- `created_at`

This protects historical booking records if a provider later edits the service.

---

# 24. Booking Location Snapshot

## 24.1 `booking_locations`

Store the actual service location used for the booking.

Fields:

- `id`
- `booking_id`
- `location_type`
- `address_line_1`
- `address_line_2`
- `suburb`
- `city`
- `province`
- `postal_code`
- `country`
- `latitude`
- `longitude`
- `created_at`

Do not rely solely on a live customer/provider address record because the address may change after booking.

---

# 25. Cash and Change

## 25.1 `cash_payment_details`

Fields:

- `id`
- `booking_id`
- `change_requested`
- `amount_tendered` nullable
- `change_amount` nullable
- `provider_notified_at` nullable
- `confirmed_by_provider_at` nullable
- `created_at`
- `updated_at`

Example:

Service: R150  
Tendered: R200  
Change: R50

The provider-facing UI should show the change requirement.

---

# 26. Custom Requests

## 26.1 `custom_requests`

Fields:

- `id`
- `uuid`
- `customer_id`
- `service_category_id`
- `description`
- `preferred_date` nullable
- `preferred_time_start` nullable
- `preferred_time_end` nullable
- `location_id`
- `budget_amount` nullable
- `currency`
- `payment_method` nullable
- `status`
- `expires_at` nullable
- `selected_proposal_id` nullable
- `created_at`
- `updated_at`

Suggested statuses:

- draft
- open
- proposals_received
- accepted
- converted
- cancelled
- expired

---

# 27. Custom Request Images

## 27.1 `custom_request_images`

Fields:

- `id`
- `custom_request_id`
- `image_url`
- `storage_key`
- `sort_order`
- `created_at`

Business rule:

**Maximum 3 images per custom request.**

Images are private to the request context.

---

# 28. Custom Proposals

## 28.1 `custom_request_proposals`

Fields:

- `id`
- `uuid`
- `custom_request_id`
- `provider_id`
- `business_unit_id` nullable
- `proposed_price`
- `currency`
- `estimated_duration_minutes`
- `proposed_start`
- `proposed_end`
- `message`
- `status`
- `submitted_at`
- `accepted_at`
- `declined_at`
- `withdrawn_at`
- `created_at`
- `updated_at`

Suggested statuses:

- submitted
- viewed
- accepted
- declined
- withdrawn
- expired

Only one proposal should become the selected proposal.

---

# 29. Reviews

## 29.1 `reviews`

Fields:

- `id`
- `uuid`
- `booking_id`
- `customer_id`
- `provider_id` nullable
- `business_unit_id` nullable
- `rating`
- `comment`
- `status`
- `provider_response`
- `provider_responded_at`
- `created_at`
- `updated_at`

Constraint:

Normally one customer review per completed booking.

Only completed/eligible bookings can create reviews.

---

# 30. Training Centres

## 30.1 `training_centres`

Fields:

- `id`
- `uuid`
- `name`
- `description`
- `logo_url`
- `contact_email`
- `contact_phone`
- `address`
- `status`
- `verification_status`
- `created_at`
- `updated_at`

## 30.2 `training_centre_users`

Fields:

- `id`
- `training_centre_id`
- `user_id`
- `role`
- `created_at`

---

# 31. Training Centre Provider Attribution

## 31.1 `training_centre_providers`

Fields:

- `id`
- `training_centre_id`
- `provider_id`
- `attribution_status`
- `referred_at`
- `approved_at`
- `ended_at` nullable
- `created_at`
- `updated_at`

A provider may have one active recruiting training-centre relationship unless the business rules later explicitly support multiple attribution sources.

The relationship must be retained historically.

---

# 32. Verification

## 32.1 `verification_records`

Fields:

- `id`
- `subject_type`
- `subject_id`
- `verification_type`
- `status`
- `submitted_at`
- `reviewed_at`
- `reviewed_by_user_id`
- `rejection_reason`
- `metadata_json`
- `created_at`
- `updated_at`

This allows verification for providers, businesses and training centres without creating separate verification systems.

Do not store unnecessary sensitive documents directly in database fields. Store secure references to approved storage where required.

---

# 33. Payments

## 33.1 `payments`

Fields:

- `id`
- `uuid`
- `booking_id`
- `customer_id`
- `provider_id` nullable
- `business_unit_id` nullable
- `provider_reference`
- `internal_reference`
- `gateway` — paystack, manual_cash, manual_eft
- `method`
- `amount`
- `currency`
- `status`
- `gateway_transaction_id` nullable
- `gateway_response_reference` nullable
- `initiated_at`
- `paid_at`
- `failed_at`
- `refunded_at`
- `failure_reason`
- `metadata_json`
- `created_at`
- `updated_at`

Payment status examples:

- pending
- processing
- paid
- failed
- cancelled
- refunded
- partially_refunded

Never trust only a frontend success response for payment confirmation.

---

# 34. Payment Events

## 34.1 `payment_events`

Fields:

- `id`
- `payment_id`
- `event_type`
- `gateway_event_id` nullable
- `payload_json`
- `processed_at`
- `processing_status`
- `created_at`

Purpose:

- Webhook audit
- Idempotency
- Troubleshooting
- Payment reconciliation

Do not expose raw gateway payloads to normal users.

---

# 35. Payouts

## 35.1 `payouts`

Fields:

- `id`
- `uuid`
- `booking_id`
- `recipient_type`
- `recipient_id`
- `gross_amount`
- `fees`
- `net_amount`
- `currency`
- `status`
- `scheduled_at`
- `paid_at`
- `external_reference`
- `created_at`
- `updated_at`

Recipients can include:

- Provider
- Business
- Training Centre

---

# 36. Commission Configuration

## 36.1 `commission_rules`

Fields:

- `id`
- `name`
- `platform_percentage`
- `training_centre_percentage`
- `is_active`
- `effective_from`
- `effective_to`
- `created_by_user_id`
- `created_at`
- `updated_at`

The default initial platform commission is:

**25%**

But this is a configuration value.

---

# 37. Commission Ledger

## 37.1 `commission_entries`

Do not rely only on current configuration to calculate historical commissions.

Fields:

- `id`
- `booking_id`
- `commission_rule_id`
- `gross_amount`
- `platform_percentage_snapshot`
- `platform_amount`
- `training_centre_percentage_snapshot`
- `training_centre_amount`
- `provider_amount`
- `currency`
- `created_at`

The actual percentages used at transaction time must be stored.

---

# 38. Training Centre Earnings

## 38.1 `training_centre_earnings`

Fields:

- `id`
- `training_centre_id`
- `provider_id`
- `booking_id`
- `commission_entry_id`
- `amount`
- `currency`
- `status`
- `earned_at`
- `paid_at`
- `created_at`
- `updated_at`

Only completed/financially eligible services should generate partner earnings.

---

# 39. Notifications

## 39.1 `notifications`

Fields:

- `id`
- `user_id`
- `type`
- `title`
- `message`
- `entity_type`
- `entity_id`
- `read_at`
- `created_at`

Use entity references so notifications can deep-link to:

- Booking
- Proposal
- Custom request
- Payment
- Verification
- Team
- Business

---

# 40. Notification Preferences

## 40.1 `notification_preferences`

Fields:

- `id`
- `user_id`
- `channel`
- `notification_type`
- `is_enabled`
- `created_at`
- `updated_at`

Channels may include:

- in_app
- email
- sms

SMS/WhatsApp can be introduced later without redesigning the notification model.

---

# 41. Favourites

## 41.1 `customer_favourites`

Fields:

- `id`
- `customer_id`
- `provider_id` nullable
- `business_unit_id` nullable
- `created_at`

At least one target should be present.

Unique per customer/target.

---

# 42. Addresses

## 42.1 `user_addresses`

Customer saved addresses can be stored separately.

Fields:

- `id`
- `user_id`
- `label`
- `address_line_1`
- `address_line_2`
- `suburb`
- `city`
- `province`
- `postal_code`
- `country`
- `latitude`
- `longitude`
- `is_default`
- `created_at`
- `updated_at`
- `deleted_at`

Bookings should snapshot the actual address into `booking_locations`.

---

# 43. Admin Settings

## 43.1 `admin_settings`

Use configuration records rather than hard-coded constants.

Fields:

- `id`
- `setting_key`
- `setting_value`
- `value_type`
- `description`
- `is_sensitive`
- `updated_by_user_id`
- `created_at`
- `updated_at`

Examples:

- default_discovery_radius_km = 10
- default_platform_commission = 25
- max_service_images = 3
- max_custom_request_images = 3

Secrets should not be stored here in plaintext. Use secure environment/secret management for credentials.

---

# 44. Tier Features

## 44.1 `tier_features`

Fields:

- `id`
- `feature_key`
- `feature_name`
- `description`
- `created_at`

## 44.2 `tier_feature_access`

Fields:

- `id`
- `tier_id`
- `feature_id`
- `is_enabled`
- `created_at`
- `updated_at`

This makes T1/T2/T3 capability configuration dynamic.

---

# 45. Audit Logs

## 45.1 `audit_logs`

Fields:

- `id`
- `actor_user_id`
- `action`
- `entity_type`
- `entity_id`
- `before_json`
- `after_json`
- `ip_address`
- `user_agent`
- `created_at`

Prioritize audit logging for:

- Admin settings
- Commission changes
- Verification decisions
- Payout changes
- User suspension
- Business/staff permission changes
- Refunds
- Financial adjustments

---

# 46. Marketplace Search and Distance

The database should store latitude/longitude for relevant locations.

The application can calculate distance using MySQL spatial functions or a service-layer geospatial calculation.

Recommended initial approach:

- Store decimal latitude/longitude
- Index location fields appropriately
- Query a bounding box first
- Apply accurate distance calculation second
- Enforce the 10 km business rule in the service layer

The 10 km value should come from configuration.

Do not store a provider's historical live-location trail in the initial release.

---

# 47. Booking Ownership Rules

A booking may be associated with:

- An independent provider
- A team provider
- A business unit

For a business booking:

`business_unit_id` identifies the operating business.

`assigned_provider_id` identifies the actual staff/provider delivering the service.

For an independent provider booking:

`provider_id` identifies the provider.

The schema must support both without duplicating booking systems.

---

# 48. Custom Request Conversion

When a proposal is accepted:

1. Mark proposal as accepted.
2. Mark other active proposals as declined/closed as appropriate.
3. Store the selected proposal on the custom request.
4. Create a booking.
5. Link the booking to:
   - `custom_request_id`
   - `proposal_id`
6. Preserve the proposed price and terms in booking snapshots.

Do not delete the original custom request or proposals.

---

# 49. Financial Integrity

For every financially relevant booking, retain:

- Original service price
- Final gross amount
- Discount if any
- Payment method
- Payment status
- Commission rule used
- Commission percentage snapshot
- Commission amount
- Provider/business payout
- Training-centre allocation
- Currency
- Payment references

Financial history must remain reconstructable.

---

# 50. Soft Deletes

Use soft deletion where historical references matter.

Recommended for:

- Users
- Providers
- Businesses
- Business units
- Services
- Addresses
- Portfolio items

Do not physically delete financial transactions or completed bookings merely because a user/account is deleted.

---

# 51. Foreign Keys

Use foreign keys for core relational integrity.

Examples:

- `customer_profiles.user_id → users.id`
- `provider_profiles.user_id → users.id`
- `provider_profiles.tier_id → provider_tiers.id`
- `services.provider_id → provider_profiles.id`
- `services.business_unit_id → business_units.id`
- `bookings.customer_id → customer_profiles.id`
- `bookings.provider_id → provider_profiles.id`
- `bookings.business_unit_id → business_units.id`
- `booking_items.booking_id → bookings.id`
- `payments.booking_id → bookings.id`
- `reviews.booking_id → bookings.id`

Use deliberate delete/update actions.

Do not use cascading deletes on financial records.

---

# 52. Indexing Strategy

At minimum, index:

### Users
- email
- phone
- uuid
- status

### Providers
- user_id
- tier_id
- status
- verification_status

### Services
- provider_id
- business_unit_id
- service_category_id
- status

### Locations
- provider_id
- business_unit_id
- latitude/longitude

### Bookings
- customer_id
- provider_id
- business_unit_id
- assigned_provider_id
- status
- scheduled_start
- created_at

### Custom requests
- customer_id
- service_category_id
- status
- preferred_date

### Proposals
- custom_request_id
- provider_id
- status

### Payments
- booking_id
- internal_reference
- gateway_transaction_id
- status

### Reviews
- booking_id
- provider_id
- business_unit_id

### Training centre attribution
- training_centre_id
- provider_id

Indexes should be validated against actual query patterns after implementation.

---

# 53. Money Data Types

Use fixed-precision decimal values for money.

Recommended:

`DECIMAL(12,2)`

Do not use floating-point types for financial amounts.

Store currency explicitly, even if South African Rand is the initial currency.

Initial currency:

`ZAR`

---

# 54. Time and Dates

Store timestamps consistently, preferably in UTC at the database layer.

Store the relevant timezone for bookings/availability.

Examples:

- `created_at`
- `updated_at`
- `scheduled_start`
- `scheduled_end`

A booking must preserve the timezone in which the appointment was scheduled.

---

# 55. Data Privacy

Sensitive/private information includes:

- Password hashes
- Customer addresses
- Phone/email
- Verification data
- Payment references
- Business financial information

Apply least-privilege access.

Do not expose database records directly through API endpoints.

Use DTOs/serializers to expose only appropriate fields.

---

# 56. Initial Seed Data

The first migration/seed set should create:

### Categories

- Barbers
- Hair Salons & Stylists
- Nail Technicians
- Beauty Services
- Car Wash

### Tiers

- T1 Individual
- T2 Team
- T3 Business

### Roles

- Customer
- Provider
- Training Centre
- Admin

### Team roles

- Owner
- Manager
- Provider

### Initial platform configuration

- Discovery radius: 10 km
- Platform commission: 25%
- Max service images: 3
- Max custom request images: 3

These are defaults, not hard-coded application constants.

---

# 57. Phase 2 Exclusion

Do not create production Driver Network tables in this release.

No driver:
- profile
- vehicle
- ride
- transport request
- driver availability
- driver payout

The future Driver Network can be added later without changing the core service-booking model.

---

# 58. Migration Strategy

Use versioned migrations.

Example:

```text
001_create_users.sql
002_create_roles.sql
003_create_provider_profiles.sql
004_create_categories.sql
005_create_services.sql
...
```

Never manually modify production tables without a migration.

Every schema change should be:

1. Added as a migration
2. Tested locally
3. Tested in staging
4. Reviewed
5. Applied to production

---

# 59. Database Testing

Test at minimum:

### User integrity
- Duplicate email rejected
- Duplicate phone rejected where required
- Role assignment works

### Provider
- T1 provider cannot access T2/T3-only records
- Service belongs to exactly one owner
- Maximum 3 service images enforced

### Custom requests
- Maximum 3 request images
- Only opted-in providers receive eligible requests
- One proposal can be selected
- Accepted proposal creates correct booking linkage

### Business
- T3 can create multiple business units
- Units can use different categories
- Staff can be assigned to units
- Staff permissions are isolated

### Booking
- Valid state transitions only
- Historical service price remains unchanged after service editing
- Booking location remains unchanged after customer address changes

### Payments
- Duplicate webhook is idempotent
- Failed payment does not mark booking as paid
- Payment status does not mark service completed automatically

### Commission
- Current Admin rate applies to new eligible transactions
- Historical transactions retain old rate
- Training-centre allocation is calculated correctly

### Training centre
- Provider attribution is retained
- Partner earnings only arise from eligible completed transactions

---

# 60. Architecture Decision Summary

The database must preserve these core relationships:

```text
USER
 ├── CUSTOMER
 ├── PROVIDER
 │    ├── T1
 │    ├── T2 → TEAM
 │    └── T3 → BUSINESS → BUSINESS UNITS
 │
 ├── TRAINING CENTRE USER
 └── ADMIN
```

Marketplace:

```text
CUSTOMER
   ↓
DISCOVERY
   ↓
PROVIDER / BUSINESS UNIT
   ↓
SERVICE
   ↓
BOOKING
   ↓
PAYMENT
   ↓
COMMISSION
   ↓
PAYOUT
   ↓
REVIEW
```

Custom service:

```text
CUSTOMER
   ↓
CUSTOM REQUEST
   ↓
UP TO 3 IMAGES
   ↓
PROVIDER PROPOSALS
   ↓
SELECTED PROPOSAL
   ↓
BOOKING
```

Training:

```text
TRAINING CENTRE
   ↓
REFERRED PROVIDER
   ↓
COMPLETED BOOKING
   ↓
COMMISSION ENTRY
   ↓
TRAINING CENTRE EARNING
```

Business:

```text
BUSINESS
   ↓
BUSINESS UNITS
   ├── Hair
   ├── Barbers
   ├── Nails
   ├── Beauty
   └── Car Wash
        ↓
      STAFF
        ↓
     SERVICES
        ↓
     BOOKINGS
```

---

# 61. Final Database Rules

1. One authentication identity per user.
2. Provider tier is a capability level, not a ranking mechanism.
3. T3 can operate multiple business units and all five Waasha categories.
4. Services belong to either an independent/team provider or a business unit.
5. Maximum 3 images per service.
6. Maximum 3 images per custom request.
7. Custom request participation is provider opt-in.
8. Custom requests and standard bookings use the same final booking engine.
9. Booking records preserve historical commercial facts.
10. Cash change requirements are stored against the booking.
11. Payment status and service completion are separate.
12. Platform commission defaults to 25% but is configurable.
13. Historical commission percentages are snapshotted.
14. Training-centre earnings are transaction-based.
15. Marketplace ranking is independent of tier and training-centre affiliation.
16. Customer/service addresses used for bookings are snapshotted.
17. Financial records are never casually deleted.
18. Sensitive permissions are enforced server-side.
19. Driver functionality is Phase 2 and excluded.
20. All schema changes use migrations.

---

# WAASHA DATABASE FOUNDATION

**Design first. Build second.**

The database should make the business rules enforceable, the financial history auditable, and future expansion possible without rebuilding the core platform.

---


<!-- ============================================================ -->
<!-- DOCUMENT 03: API SPECIFICATION -->
<!-- ============================================================ -->

# WAASHA — API SPECIFICATION

**Product:** Waasha  
**API:** REST  
**Status:** Architecture baseline  
**Purpose:** Contract between Waasha frontend, backend services, database and external payment services

---

## 1. API Goals

The Waasha API must provide a secure, consistent interface for:

- Authentication
- Customers
- Providers
- T1/T2/T3 capabilities
- Teams
- Businesses
- Business units
- Services
- Locations
- Availability
- Marketplace discovery
- Bookings
- Custom requests
- Custom proposals
- Payments
- Payouts
- Commissions
- Training centres
- Reviews
- Notifications
- Admin
- Configuration

The API must enforce business rules server-side.

The frontend must never be treated as a trusted source for authorization, prices, commission calculations, booking states or payment confirmation.

---

# 2. Recommended Base URL

Development:

`/api/v1`

Staging and production should use the same API versioning pattern.

Example:

`https://<waasha-api-domain>/api/v1`

Do not hard-code environment-specific URLs in frontend source.

---

# 3. API Versioning

Use URL versioning:

`/api/v1/...`

Breaking changes require a new version.

Backward-compatible additions can remain within the current version.

---

# 4. Authentication

Recommended authentication flow:

1. User registers.
2. User verifies email/phone where required.
3. User logs in.
4. API issues an authenticated session/token.
5. Frontend uses the authenticated session for protected requests.
6. Backend validates identity and permissions on every protected operation.

Never store plaintext passwords.

---

# 5. Authentication Endpoints

## POST `/auth/register`

Create a base user account.

Request:

```json
{
  "email": "user@example.com",
  "phone": "+27...",
  "password": "..."
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {},
    "verificationRequired": true
  }
}
```

Do not return sensitive authentication information.

---

## POST `/auth/login`

Authenticate a user.

---

## POST `/auth/logout`

Invalidate the current session/token.

---

## POST `/auth/refresh`

Refresh authentication where the chosen authentication mechanism requires refresh tokens.

---

## POST `/auth/verify-email`

Verify email address.

---

## POST `/auth/verify-phone`

Verify phone number.

---

## POST `/auth/forgot-password`

Start password recovery.

---

## POST `/auth/reset-password`

Complete password reset.

---

## GET `/auth/me`

Return the authenticated user's safe profile and roles.

---

# 6. Role Model

Supported primary roles:

- CUSTOMER
- PROVIDER
- TRAINING_CENTRE
- ADMIN

Provider tiers:

- T1
- T2
- T3

Provider tier is not an authentication role.

Team roles:

- OWNER
- MANAGER
- PROVIDER

Business roles:

- OWNER
- MANAGER
- STAFF

Authorization must be evaluated using:

**User → Role → Profile/Relationship → Permission → Resource**

---

# 7. Standard API Response

Successful response:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

For lists:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100
  }
}
```

---

# 8. Standard Error Response

```json
{
  "success": false,
  "error": {
    "code": "BOOKING_INVALID_STATE",
    "message": "This booking cannot be changed from its current state.",
    "details": {}
  }
}
```

Do not expose:

- SQL errors
- Stack traces
- Password information
- Secrets
- Internal database structure

---

# 9. HTTP Status Codes

Use standard status codes:

- `200` successful request
- `201` resource created
- `202` accepted for asynchronous processing
- `204` successful request with no response body
- `400` malformed/invalid request
- `401` unauthenticated
- `403` authenticated but unauthorized
- `404` resource not found
- `409` conflict
- `422` validation/business-rule failure
- `429` rate limited
- `500` unexpected server error
- `503` temporary service unavailable

---

# 10. Pagination

List endpoints should support:

- `page`
- `perPage`

Example:

`GET /providers?page=1&perPage=20`

Maximum page size should be enforced server-side.

---

# 11. Filtering and Sorting

Where applicable support:

- `search`
- `status`
- `category`
- `distance`
- `rating`
- `availability`
- `sort`
- `page`
- `perPage`

Never allow arbitrary database column names to be passed directly into SQL.

---

# 12. Users

## GET `/users/me`

Return current user's safe account information.

## PATCH `/users/me`

Update permitted account fields.

## GET `/users/me/roles`

Return assigned roles and capability context.

---

# 13. Customer API

## GET `/customers/me`

Return customer profile.

## PATCH `/customers/me`

Update customer profile.

## GET `/customers/me/addresses`

List saved addresses.

## POST `/customers/me/addresses`

Create saved address.

## PATCH `/customers/me/addresses/:id`

Update address.

## DELETE `/customers/me/addresses/:id`

Soft-delete saved address.

## GET `/customers/me/bookings`

List customer's bookings.

## GET `/customers/me/custom-requests`

List customer's custom requests.

## GET `/customers/me/favourites`

List favourites.

## POST `/customers/me/favourites`

Create favourite.

## DELETE `/customers/me/favourites/:id`

Remove favourite.

---

# 14. Categories

## GET `/categories`

Return active Waasha categories.

Initial categories:

- BARBERS
- HAIR_SALONS_STYLISTS
- NAIL_TECHNICIANS
- BEAUTY_SERVICES
- CAR_WASH

No additional marketplace categories should be seeded for the initial release.

Admin can manage category availability.

---

# 15. Provider Onboarding

## POST `/providers/onboarding`

Create or update provider onboarding state.

Provider selects:

- Individual/T1
- Team/T2
- Business/T3

Collect:

- Personal/business information
- Profile
- Skills
- Qualifications
- Services
- Pricing
- Images
- Availability
- Location
- Payment methods
- Custom request preference

---

## GET `/providers/me/onboarding`

Return onboarding progress.

---

## POST `/providers/me/submit-verification`

Submit provider verification.

---

# 16. Provider Profile API

## GET `/providers/:id`

Public provider profile.

Return only information intended for marketplace visibility.

Do not expose private information.

## PATCH `/providers/me`

Update provider profile.

## GET `/providers/me`

Return authenticated provider's full permitted profile.

---

# 17. Provider Skills

## GET `/providers/me/skills`

List skills.

## POST `/providers/me/skills`

Add skill.

## DELETE `/providers/me/skills/:id`

Remove skill.

---

# 18. Provider Qualifications

## GET `/providers/me/qualifications`

List qualifications.

## POST `/providers/me/qualifications`

Add qualification.

## PATCH `/providers/me/qualifications/:id`

Update qualification.

## DELETE `/providers/me/qualifications/:id`

Remove qualification.

---

# 19. Provider Portfolio

## GET `/providers/:id/portfolio`

Public portfolio.

## GET `/providers/me/portfolio`

Private management view.

## POST `/providers/me/portfolio`

Create portfolio item.

## PATCH `/providers/me/portfolio/:id`

Update portfolio item.

## DELETE `/providers/me/portfolio/:id`

Delete portfolio item.

---

# 20. Provider Locations

## GET `/providers/me/locations`

List provider locations.

## POST `/providers/me/locations`

Create fixed location.

## PATCH `/providers/me/locations/:id`

Update location.

## DELETE `/providers/me/locations/:id`

Disable/delete location.

## POST `/providers/me/live-location`

Update current location when live location is enabled.

Request:

```json
{
  "latitude": -26.1076,
  "longitude": 28.0567
}
```

Live location must only operate when the provider has explicitly enabled location sharing.

Do not build historical location tracking in the initial release.

---

# 21. Services

## GET `/providers/me/services`

List provider-owned services.

## POST `/providers/me/services`

Create service.

Required:

- Name
- Category
- Description
- Price
- Duration
- Service mode
- Status

Maximum:

**3 images per service.**

## GET `/services/:id`

Return service details.

## PATCH `/services/:id`

Update service.

## DELETE `/services/:id`

Delete/disable service.

## POST `/services/:id/images`

Upload service image.

## DELETE `/services/:id/images/:imageId`

Remove image.

## POST `/services/:id/images/reorder`

Reorder images.

Backend must enforce the 3-image maximum.

---

# 22. Business Unit Services

T3 Business Units use the same service model.

Example:

`POST /business-units/:businessUnitId/services`

The API must verify:

- User belongs to business
- User has sufficient role
- Business unit is active
- Service category is valid

---

# 23. Marketplace Discovery

## GET `/marketplace/providers`

Primary discovery endpoint.

Supported parameters:

- `latitude`
- `longitude`
- `radiusKm`
- `categoryId`
- `serviceId`
- `minPrice`
- `maxPrice`
- `rating`
- `homeVisits`
- `availableDate`
- `availableTime`
- `providerType`
- `sort`
- `page`
- `perPage`

Default:

`radiusKm = configured default`

Initial default:

**10 km**

The API must not trust an arbitrary radius beyond configured limits without Admin-defined rules.

---

# 24. Marketplace Ranking

Ranking should consider appropriate signals:

- Service relevance
- Distance
- Availability
- Rating
- Reviews
- Reliability
- Response time
- Completed bookings
- Verification

Do not automatically rank T3 above T2/T1.

Do not automatically rank training-centre providers above independent providers.

Do not create paid ranking in the initial product.

---

# 25. Availability API

## GET `/providers/:id/availability`

Return available appointment windows.

## GET `/providers/me/availability`

Return provider availability rules.

## PUT `/providers/me/availability`

Replace/update recurring availability.

## POST `/providers/me/availability/exceptions`

Create unavailable/custom-hours exception.

## DELETE `/providers/me/availability/exceptions/:id`

Remove exception.

Business Units should have equivalent availability endpoints.

---

# 26. Booking Creation

## POST `/bookings`

Create a standard booking.

Request should include:

```json
{
  "providerId": "...",
  "serviceId": "...",
  "scheduledStart": "...",
  "scheduledEnd": "...",
  "locationType": "customer",
  "location": {},
  "paymentMethod": "cash",
  "notes": "..."
}
```

Backend must verify:

- Customer identity
- Provider/service ownership
- Service active
- Provider/business availability
- Appointment conflict
- Location rules
- Payment method supported
- Price from authoritative service data

Never trust a frontend-provided price.

---

# 27. Booking API

## GET `/bookings/:id`

Return booking according to caller permissions.

## POST `/bookings/:id/accept`

Provider accepts.

## POST `/bookings/:id/decline`

Provider declines.

## POST `/bookings/:id/confirm`

Confirm where the workflow requires explicit confirmation.

## POST `/bookings/:id/start`

Mark service in progress.

## POST `/bookings/:id/complete`

Mark service completed.

Only authorized participants can complete a booking.

## POST `/bookings/:id/cancel`

Cancel booking.

## POST `/bookings/:id/dispute`

Open dispute.

---

# 28. Booking State Enforcement

The backend must implement a state machine.

Example:

`PENDING → ACCEPTED → CONFIRMED → IN_PROGRESS → COMPLETED`

Alternative terminal states:

- DECLINED
- CANCELLED
- REFUNDED
- DISPUTED

Invalid transitions must return:

`422 BOOKING_INVALID_STATE`

The frontend must not be able to force a status.

---

# 29. Booking Price Snapshot

When a booking is created, the backend snapshots:

- Service name
- Description
- Price
- Duration
- Currency

If the provider later changes their service price, historical bookings remain unchanged.

---

# 30. Booking Location

For every confirmed booking, store a booking-specific location snapshot.

Do not rely only on a user's current address.

This protects historical appointment information if an address later changes.

---

# 31. Cash Workflow

## POST `/bookings/:id/cash-details`

Customer can specify cash/change information.

Request:

```json
{
  "changeRequested": true,
  "amountTendered": 200
}
```

Backend calculates:

`change = totalAmount - amountTendered`

Example:

R150 service + R200 tendered = R50 change.

Never allow the frontend to dictate the calculated change amount.

---

## GET `/bookings/:id/cash-details`

Authorized provider/customer can view relevant cash details.

Provider-facing result:

- Service total
- Payment method
- Amount tendered
- Change required
- Provider notification status

Preferred copy:

**Cash change requested**

**Provider has been notified to bring R50 change.**

---

# 32. Payment Methods

Provider settings:

## GET `/providers/me/payment-methods`

## PUT `/providers/me/payment-methods`

Supported:

- waasha_payment
- cash
- eft

Business units can have equivalent payment settings.

Customer checkout must only offer currently enabled methods.

---

# 33. Custom Requests

## POST `/custom-requests`

Create custom request.

Fields:

- Category
- Description
- Preferred date
- Preferred time
- Location
- Budget
- Payment preference

Maximum:

**3 reference images.**

---

## GET `/custom-requests/:id`

Return authorized request.

## PATCH `/custom-requests/:id`

Update request while editable.

## POST `/custom-requests/:id/publish`

Publish request to eligible providers.

## POST `/custom-requests/:id/cancel`

Cancel request.

---

# 34. Custom Request Image API

## POST `/custom-requests/:id/images`

Upload image.

## DELETE `/custom-requests/:id/images/:imageId`

Delete image.

Maximum:

**3 images per request.**

Backend must enforce the limit.

---

# 35. Custom Request Board

## GET `/custom-requests/board`

Return requests available to the authenticated provider.

Only providers with:

`custom_requests_enabled = true`

may access the board.

Matching can use:

- Category
- Skills
- Distance
- Location
- Availability
- Provider preferences

---

# 36. Custom Proposals

## POST `/custom-requests/:id/proposals`

Provider submits proposal.

Fields:

- Proposed price
- Duration
- Proposed date/time
- Message

## GET `/custom-requests/:id/proposals`

Customer sees proposals.

Provider sees their own proposal unless authorized otherwise.

## POST `/proposals/:id/accept`

Customer accepts proposal.

Backend must:

1. Verify customer owns request.
2. Verify proposal is active.
3. Mark selected proposal accepted.
4. Close competing active proposals.
5. Link proposal to request.
6. Create booking.
7. Snapshot proposed price/terms.
8. Trigger required payment workflow.

## POST `/proposals/:id/decline`

Customer declines proposal.

## POST `/proposals/:id/withdraw`

Provider withdraws proposal.

---

# 37. Teams

## POST `/teams`

Create team.

Only eligible T2/T3 users can create teams according to configured tier access.

## GET `/teams/:id`

Return authorized team.

## PATCH `/teams/:id`

Update team.

## POST `/teams/:id/invitations`

Invite team member.

## GET `/teams/:id/members`

List members.

## PATCH `/teams/:id/members/:memberId`

Update member role/status.

## DELETE `/teams/:id/members/:memberId`

Remove member.

---

# 38. Team Bookings

## POST `/teams/:id/bookings/:bookingId/assign`

Assign booking to eligible team member.

Backend must verify:

- Team membership
- Provider eligibility
- Service capability
- Availability
- Role permissions

---

# 39. Businesses

## POST `/businesses`

Create T3 business.

## GET `/businesses/:id`

Get business.

## PATCH `/businesses/:id`

Update business.

## GET `/businesses/:id/staff`

List staff.

## POST `/businesses/:id/staff/invitations`

Invite staff.

## PATCH `/businesses/:id/staff/:staffId`

Update role/status.

## DELETE `/businesses/:id/staff/:staffId`

Remove/disable staff.

---

# 40. Business Units

## POST `/businesses/:id/units`

Create business unit.

## GET `/businesses/:id/units`

List business units.

## GET `/business-units/:id`

Get business unit.

## PATCH `/business-units/:id`

Update business unit.

## DELETE `/business-units/:id`

Disable business unit.

## POST `/business-units/:id/locations`

Create location.

## GET `/business-units/:id/services`

List services.

## POST `/business-units/:id/services`

Create service.

---

# 41. Business Unit Categories

## GET `/business-units/:id/categories`

List categories.

## PUT `/business-units/:id/categories`

Set permitted categories.

T3 can use all five Waasha categories.

---

# 42. Staff Compensation

## GET `/businesses/:id/staff/:staffId/compensation`

Return authorized compensation.

## POST `/businesses/:id/staff/:staffId/compensation`

Create compensation rule.

Supported types:

- salary
- fixed_per_service
- percentage

Do not overwrite historical compensation records.

Create a new effective record.

---

# 43. Training Centres

## POST `/training-centres`

Register training centre.

## GET `/training-centres/:id`

Get training centre profile.

## PATCH `/training-centres/:id`

Update profile.

## POST `/training-centres/:id/providers`

Attribute/refer provider.

## GET `/training-centres/:id/providers`

List recruited providers.

## GET `/training-centres/:id/earnings`

List partner earnings.

---

# 44. Provider Attribution

When a provider joins through a training centre, the backend must retain:

- Training centre
- Provider
- Referral date
- Attribution status
- Approval date

Do not use a frontend-only referral flag.

---

# 45. Reviews

## POST `/bookings/:id/reviews`

Create review.

Only eligible completed bookings can be reviewed.

## GET `/providers/:id/reviews`

List provider reviews.

## GET `/business-units/:id/reviews`

List business-unit reviews.

## POST `/reviews/:id/response`

Provider/business response where permitted.

---

# 46. Favourites

## POST `/customers/me/favourites`

Add provider/business unit.

## GET `/customers/me/favourites`

List favourites.

## DELETE `/customers/me/favourites/:id`

Remove favourite.

---

# 47. Notifications

## GET `/notifications`

List notifications.

## PATCH `/notifications/:id/read`

Mark notification read.

## POST `/notifications/read-all`

Mark all eligible notifications read.

Notifications should reference related entities without exposing private data.

---

# 48. Payments

## POST `/payments`

Initiate an online payment.

The backend creates the payment record before interacting with the payment gateway.

## GET `/payments/:id`

Get authorized payment status.

## POST `/payments/:id/verify`

Verify payment status server-side.

The client must not be allowed to mark a payment as paid.

---

# 49. Paystack Integration

Paystack is the initial online payment gateway.

Use an internal payment service:

```text
Waasha API
    ↓
Payment Service
    ↓
Paystack Adapter
```

Do not spread Paystack-specific code throughout booking, provider or customer modules.

The adapter should handle:

- Payment initiation
- Transaction reference
- Verification
- Webhooks
- Refund operations where supported

---

# 50. Payment Webhooks

## POST `/webhooks/paystack`

Receive gateway events.

Webhook processing must:

1. Authenticate/verify the webhook.
2. Validate event structure.
3. Identify the internal payment.
4. Check idempotency.
5. Update payment state.
6. Trigger permitted financial actions.
7. Record the event.
8. Return the correct gateway response.

Never trust a browser redirect as proof of payment.

---

# 51. Payment Idempotency

Payment initiation and webhook processing must be idempotent.

Use:

- Internal payment reference
- Gateway transaction reference
- Webhook event ID where available
- Idempotency keys for supported write operations

Duplicate gateway events must not create duplicate payments or payouts.

---

# 52. Refunds

## POST `/payments/:id/refund`

Admin/authorized role only.

Backend should:

- Validate refund eligibility
- Record refund request
- Communicate with gateway if online payment
- Update payment status
- Update related financial records
- Preserve audit history

---

# 53. Payouts

## GET `/providers/me/payouts`

Provider earnings/payout history.

## GET `/businesses/:id/payouts`

Business payout history.

## GET `/training-centres/:id/payouts`

Training-centre payout history.

Admin can access broader payout records.

---

# 54. Commission Engine

Commission must be calculated server-side.

Never accept commission values from frontend requests.

Flow:

```text
Completed eligible booking
        ↓
Load active commission rule
        ↓
Calculate platform commission
        ↓
Calculate training-centre allocation
        ↓
Calculate provider/business amount
        ↓
Snapshot percentages and amounts
        ↓
Create commission ledger entry
        ↓
Create eligible payout records
```

Default platform commission:

**25%**

But it is configurable.

---

# 55. Commission API

## GET `/admin/commission-rules`

Admin only.

## POST `/admin/commission-rules`

Create new rule.

## PATCH `/admin/commission-rules/:id`

Update/configure rule.

Do not edit historical commission entries.

New rules should have effective dates.

---

# 56. Admin API

All Admin endpoints require Admin authorization.

Examples:

## GET `/admin/dashboard`

Platform metrics.

## GET `/admin/users`

Manage users.

## GET `/admin/providers`

Manage providers.

## GET `/admin/teams`

Manage teams.

## GET `/admin/businesses`

Manage businesses.

## GET `/admin/training-centres`

Manage partners.

## GET `/admin/bookings`

Manage bookings/disputes.

## GET `/admin/payments`

View payments.

## GET `/admin/payouts`

View payouts.

## GET `/admin/commissions`

View commission ledger.

## GET `/admin/settings`

View configuration.

## PATCH `/admin/settings/:key`

Update configuration.

---

# 57. Tier Configuration API

## GET `/admin/tiers`

List tiers.

## GET `/admin/tiers/:tierId/features`

List features.

## PUT `/admin/tiers/:tierId/features`

Update feature access.

The API should evaluate feature access through the tier-feature configuration rather than hard-coded checks where practical.

---

# 58. Verification API

## POST `/verification/submit`

Submit verification.

## GET `/verification/me`

View current user's verification status.

Admin:

## GET `/admin/verifications`

List verification cases.

## POST `/admin/verifications/:id/approve`

Approve.

## POST `/admin/verifications/:id/reject`

Reject with reason.

---

# 59. File Upload API

Use controlled upload endpoints.

The backend should validate:

- MIME type
- Extension
- File size
- Image dimensions
- File contents where supported

Prefer direct-to-object-storage uploads with signed URLs if the chosen infrastructure supports it.

The API should not expose arbitrary filesystem paths.

---

# 60. Location Security

Do not expose a provider's exact live location to every marketplace visitor.

Public marketplace responses should normally use:

- Approximate distance
- General service area
- Appropriate fixed business address where intended

Exact location should be disclosed only when required for a confirmed service and to authorized parties.

---

# 61. Authorization Matrix

### Customer can

- Manage own profile
- Create own bookings
- View own bookings
- Create custom requests
- View own proposals
- Pay for own bookings
- Review eligible bookings
- Manage own favourites

### Provider can

- Manage own provider profile
- Manage own services
- Manage own availability
- View assigned bookings
- Accept/decline eligible bookings
- Manage custom request proposals if opted in
- View permitted customer booking information
- View own earnings

### Team Owner/Manager can

- Manage permitted team members
- Assign bookings
- Manage team schedules
- View permitted team performance
- Manage permitted payouts

### Business Owner/Manager can

- Manage permitted business units
- Manage staff
- Manage services
- Manage bookings
- View permitted business analytics
- Manage compensation according to role

### Training Centre can

- Manage own partner profile
- View attributed providers
- View eligible partner earnings
- Manage recruitment activity

### Admin can

- Manage platform-wide configuration
- Manage users
- Manage providers
- Manage businesses
- Manage training centres
- Manage bookings
- Manage financial records
- Manage commission rules
- Manage verification
- View audit logs

---

# 62. Data Access Rules

Never return complete database records directly.

Use explicit response DTOs/serializers.

Examples:

Customer should not receive:

- Provider internal verification documents
- Internal financial calculations not relevant to booking
- Private staff data

Provider should not receive:

- Customer information unrelated to their booking
- Other providers' private data
- Private training-centre information

Staff should not receive:

- Restricted business financial data unless their role permits it.

---

# 63. Rate Limiting

Apply rate limits to:

- Login
- Registration
- Password reset
- OTP/verification
- File uploads
- Search
- Booking creation
- Payment initiation
- Proposal submission
- Review submission
- Admin authentication

Stricter limits should apply to authentication and financial endpoints.

---

# 64. Audit Logging

Audit sensitive operations:

- Admin changes
- Commission changes
- Verification decisions
- Refunds
- Payout changes
- User suspension
- Permission changes
- Business staff changes
- Financial adjustments

Audit entries should include:

- Actor
- Action
- Entity
- Before state where appropriate
- After state where appropriate
- Timestamp
- IP/user agent where appropriate

---

# 65. Concurrency and Transactions

Use database transactions for operations that modify multiple related records.

Important transactional operations include:

### Booking acceptance
Prevent two providers/business processes from claiming the same booking.

### Proposal acceptance
Ensure only one proposal becomes accepted.

### Payment state change
Prevent duplicate financial updates.

### Commission creation
Ensure a completed transaction does not generate duplicate commission entries.

### Payout creation
Prevent duplicate payouts.

Use unique constraints and idempotency in addition to application checks.

---

# 66. Booking Conflict Prevention

Before accepting/confirming a booking:

1. Check provider/business availability.
2. Check assigned provider availability where applicable.
3. Check existing bookings.
4. Lock relevant records where necessary.
5. Confirm the appointment atomically.

Do not rely only on a frontend calendar check.

---

# 67. Search and Distance API Rules

For provider discovery:

1. Receive customer location.
2. Apply configured radius.
3. Use geospatial/bounding-box filtering.
4. Calculate accurate distance.
5. Apply service/category filters.
6. Apply availability.
7. Rank results using approved signals.
8. Return safe public provider information.

Default radius:

**10 km**

---

# 68. API Security Rules

Never trust frontend-provided:

- User ID
- Provider ID ownership
- Business ownership
- Tier
- Commission percentage
- Service price
- Payment status
- Booking status
- Payout amount
- Training-centre attribution
- Review eligibility

The server determines all of these.

---

# 69. API Testing Requirements

Test:

### Authentication
- Valid login
- Invalid login
- Token/session expiration
- Role enforcement

### Provider
- T1 access
- T2 access
- T3 access
- Unauthorized tier feature access

### Services
- 3-image maximum
- Price validation
- Ownership validation

### Marketplace
- 10 km radius
- Location filtering
- Category filtering
- Ranking rules

### Bookings
- Conflict prevention
- State transitions
- Price snapshot
- Location snapshot

### Custom requests
- 3-image maximum
- Opt-in provider restriction
- Proposal acceptance race conditions

### Business
- Business-unit isolation
- Staff permissions
- Multi-category operation

### Payments
- Successful payment
- Failed payment
- Duplicate webhook
- Refund
- Incorrect payment amount

### Commission
- Configurable rate
- Historical rate preservation
- Training-centre allocation

### Security
- Unauthorized resource access
- IDOR prevention
- Rate limits
- Input validation

---

# 70. API Documentation

Use OpenAPI/Swagger or an equivalent machine-readable API contract.

Every endpoint should document:

- Method
- Path
- Authentication
- Authorization
- Request schema
- Response schema
- Validation
- Error codes
- Example request
- Example response

Generate frontend API clients from the API contract where practical.

---

# 71. API Error Codes

Use stable machine-readable error codes.

Examples:

- AUTH_INVALID_CREDENTIALS
- AUTH_UNAUTHORIZED
- AUTH_FORBIDDEN
- VALIDATION_FAILED
- RESOURCE_NOT_FOUND
- PROVIDER_NOT_VERIFIED
- TIER_FEATURE_UNAVAILABLE
- SERVICE_NOT_AVAILABLE
- SERVICE_IMAGE_LIMIT
- CUSTOM_REQUEST_IMAGE_LIMIT
- CUSTOM_REQUEST_NOT_ENABLED
- BOOKING_INVALID_STATE
- BOOKING_CONFLICT
- PAYMENT_FAILED
- PAYMENT_ALREADY_PROCESSED
- COMMISSION_CONFIGURATION_INVALID
- PAYOUT_ALREADY_CREATED
- PERMISSION_DENIED
- RATE_LIMITED

Frontend should use codes for behavior and messages for display.

---

# 72. API Architecture Boundaries

Recommended backend modules:

```text
auth
users
customers
providers
teams
businesses
business-units
services
locations
availability
marketplace
bookings
custom-requests
proposals
payments
payouts
commissions
training-centres
reviews
notifications
verification
admin
```

Each module should own its business logic rather than placing everything in one controller.

---

# 73. External Service Boundaries

External services should be accessed through adapters/services.

Example:

```text
PaymentService
    ↓
PaystackAdapter
```

Future:

```text
NotificationService
    ↓
EmailAdapter
    ↓
SMSAdapter
    ↓
WhatsAppAdapter
```

This prevents external providers from becoming deeply coupled to core business logic.

---

# 74. Phase 2 Exclusion

Do not create Driver API endpoints in the initial release.

No:

- driver registration
- driver profile
- ride requests
- driver matching
- driver availability
- transport booking
- driver payout

The future Driver Network will be a separate domain.

---

# 75. Implementation Order

Build APIs in this order:

1. Authentication
2. Users/roles
3. Customers
4. Providers
5. Categories
6. Services
7. Locations
8. Availability
9. Marketplace discovery
10. Bookings
11. Reviews
12. Teams
13. Businesses
14. Business units/staff
15. Custom Requests
16. Proposals
17. Training Centres
18. Payment abstraction
19. Paystack
20. Cash/EFT
21. Commission engine
22. Payouts
23. Notifications
24. Verification
25. Admin
26. Audit/security hardening

---

# 76. API Definition of Done

An API feature is complete when:

- Endpoint exists
- Request validation exists
- Authorization exists
- Business rules are enforced
- Database transaction is correct
- Response schema is documented
- Error codes are documented
- Idempotency is handled where necessary
- Audit requirements are handled
- Tests exist
- API documentation is updated
- Frontend integration is possible without hidden assumptions

---

# 77. Source of Truth

Resolve conflicts in this order:

1. Product Build Specification
2. Database Architecture
3. API Specification
4. Approved Stitch design
5. Implementation conventions

Business rules must not be weakened simply to make a UI easier to implement.

---

# WAASHA API

The API is the contract between the user experience and the business engine.

The frontend should present Waasha.

The backend should enforce Waasha.

---


<!-- ============================================================ -->
<!-- DOCUMENT 04: BOOKING ENGINE -->
<!-- ============================================================ -->

# WAASHA — BOOKING ENGINE SPECIFICATION

**Product:** Waasha  
**Status:** Functional baseline  
**Purpose:** Define the complete lifecycle and business rules for standard and custom service bookings.

---

## 1. Booking Engine Purpose

The Booking Engine is the core transaction engine connecting:

**Customer → Provider/Business → Service → Appointment → Payment → Completion → Commission → Payout → Review**

It must support:

- T1 Individual providers
- T2 Teams
- T3 Businesses and business units
- Standard bookings
- Custom-request bookings
- Home visits
- Provider-location appointments
- Waasha Payment
- Cash
- EFT
- Availability
- Booking conflicts
- Cancellations
- Notifications
- Commission
- Payouts
- Reviews

The Driver Network is Phase 2 and is excluded.

---

# 2. Core Booking Principles

## 2.1 Backend is authoritative

The frontend may request:

- A service
- A date/time
- A location
- A payment method

The backend determines whether the booking is actually valid.

Never trust frontend values for:

- Price
- Provider ownership
- Availability
- Commission
- Payment status
- Booking status
- Payout
- Review eligibility

---

## 2.2 One booking engine

Standard and custom services ultimately use the same booking engine.

Custom requests differ only in how the service/provider/price is selected before the booking is created.

---

# 3. Booking Types

Two initial booking types:

### Standard

Customer chooses an existing provider/business service.

### Custom

Customer creates a request, providers submit proposals, customer chooses one, and the selected proposal becomes a booking.

---

# 4. Standard Booking Flow

```text
Customer
   ↓
Search
   ↓
Category
   ↓
Provider / Business
   ↓
Service
   ↓
Date & Time
   ↓
Location
   ↓
Payment Method
   ↓
Booking Review
   ↓
Confirm
   ↓
Provider/Business receives request
   ↓
Accept
   ↓
Confirmed
   ↓
Service
   ↓
Complete
   ↓
Payment settlement
   ↓
Commission
   ↓
Payout
   ↓
Review
```

---

# 5. Booking State Machine

Primary states:

- `DRAFT`
- `PENDING`
- `ACCEPTED`
- `CONFIRMED`
- `PAYMENT_PENDING`
- `PAID`
- `IN_PROGRESS`
- `COMPLETED`
- `DECLINED`
- `CANCELLED`
- `REFUNDED`
- `DISPUTED`

Not every booking must use every state.

The valid transition path depends on payment method and provider workflow.

---

# 6. Recommended Standard State Path

For a normal provider-accepted booking:

```text
DRAFT
  ↓
PENDING
  ↓
ACCEPTED
  ↓
CONFIRMED
  ↓
IN_PROGRESS
  ↓
COMPLETED
```

For online payment where payment is required before confirmation:

```text
DRAFT
  ↓
PAYMENT_PENDING
  ↓
PAID
  ↓
PENDING / CONFIRMED
  ↓
IN_PROGRESS
  ↓
COMPLETED
```

The exact transition policy should be configured per payment workflow.

---

# 7. Draft Booking

A draft is not a real appointment.

A draft may contain:

- Customer
- Provider
- Service
- Proposed date/time
- Location
- Payment method
- Notes

No provider slot should be permanently consumed by a draft.

Drafts may expire.

---

# 8. Booking Creation

When the customer confirms a booking, backend must:

1. Authenticate customer.
2. Validate provider/business.
3. Validate service.
4. Validate service ownership.
5. Validate service status.
6. Validate category.
7. Validate requested date/time.
8. Validate provider/business availability.
9. Check conflicting bookings.
10. Validate location/service mode.
11. Validate payment method.
12. Calculate authoritative price.
13. Create booking.
14. Create booking item snapshot.
15. Create booking location snapshot.
16. Create payment record if required.
17. Create cash details if applicable.
18. Emit notifications.
19. Return booking.

Use a database transaction for the creation process.

---

# 9. Price Authority

The service's current database price is authoritative when the booking is created.

The frontend may display a price but cannot determine the final price.

After creation:

**Booking price is immutable unless an authorized change process is used.**

Any approved price change must be auditable.

---

# 10. Booking Item Snapshot

Store:

- Service name
- Description
- Unit price
- Quantity
- Duration
- Currency
- Line total

This ensures that editing a service later does not rewrite historical bookings.

---

# 11. Location Types

Booking location can be:

### Provider location

Customer travels to provider/business.

### Customer location

Provider performs a home/mobile visit.

For every booking store a booking-specific location snapshot.

---

# 12. Home Visit

When the customer chooses a home visit:

1. Customer provides/selects service address.
2. Backend validates that provider/service supports home visits.
3. Booking stores location snapshot.
4. Provider sees the required service location.
5. Customer's address is only disclosed to authorized booking participants.

The marketplace must not expose the customer's home address publicly.

---

# 13. Live Provider Location

Providers may enable live location.

When enabled:

- Current location can be used for discovery.
- Distance can be calculated.
- Provider can appear within the 10 km marketplace radius.

When disabled:

- Use fixed provider location.

Do not retain continuous historical location tracking in the initial release.

---

# 14. Availability

Before confirming an appointment:

1. Load recurring availability.
2. Apply availability exceptions.
3. Check existing bookings.
4. Check assigned provider availability where relevant.
5. Confirm requested duration fits.
6. Reserve/confirm atomically.

Do not rely on frontend calendars.

---

# 15. Booking Conflicts

Two confirmed bookings must not overlap for the same individual provider.

For T2/T3:

The business may have multiple staff, so the booking should be assignable to an eligible provider.

The system must prevent overlapping bookings for the assigned provider.

If no eligible provider is available, the booking cannot be confirmed.

---

# 16. T2 Team Booking

Flow:

```text
Customer
   ↓
Team Provider
   ↓
Service
   ↓
Booking
   ↓
Team accepts
   ↓
Eligible team member assigned
   ↓
Confirmed
```

The team owner/manager may assign the booking.

If the selected team member becomes unavailable, an authorized manager may reassign the booking to another eligible member.

The reassignment must be logged.

---

# 17. T3 Business Booking

Flow:

```text
Customer
   ↓
Business
   ↓
Business Unit
   ↓
Service
   ↓
Booking
   ↓
Business accepts
   ↓
Staff/provider assigned
   ↓
Confirmed
```

The booking must retain:

- Business
- Business Unit
- Service
- Assigned provider where applicable

This allows consolidated business reporting.

---

# 18. Provider Acceptance

When a provider receives a pending request:

Provider can:

- Accept
- Decline

If accepted:

- Booking moves to `ACCEPTED` or `CONFIRMED` according to payment flow.
- Customer receives notification.
- Relevant availability becomes unavailable for that time.
- Booking acceptance timestamp is recorded.

If declined:

- Booking moves to `DECLINED`.
- Customer receives notification.
- No payout/commission is generated.

---

# 19. Customer Cancellation

Customer may cancel according to configured cancellation rules.

Cancellation should record:

- Cancelled by
- Timestamp
- Reason
- Previous state
- Refund requirement

Cancellation policy should be configurable rather than hard-coded.

---

# 20. Provider Cancellation

Provider may cancel where permitted.

System records:

- Provider
- Timestamp
- Reason
- Previous state

Repeated provider cancellations should be available to reliability analytics.

---

# 21. Business Cancellation

T2/T3 authorized users may cancel bookings according to role permissions.

The system must record the responsible user.

---

# 22. Cancellation Rules

The initial architecture should support configurable:

- Cancellation windows
- Customer cancellation
- Provider cancellation
- Business cancellation
- Refund eligibility
- Cancellation fees
- No-show handling

Do not hard-code cancellation penalties before the business policy is finalized.

---

# 23. No-Show

The booking engine should support future no-show handling.

Potential states/actions:

- Customer no-show
- Provider no-show
- Business no-show

The system should retain the event for reliability metrics.

Exact financial penalties should remain configurable.

---

# 24. Starting a Service

Authorized provider/staff member can mark:

`CONFIRMED → IN_PROGRESS`

Record:

- `started_at`
- User who started the service where appropriate

A service cannot normally start from:

- Cancelled
- Declined
- Refunded

---

# 25. Completing a Service

Authorized provider/staff member marks:

`IN_PROGRESS → COMPLETED`

Record:

- Completion timestamp
- Completing user
- Relevant completion information

Completion triggers the financial eligibility workflow.

---

# 26. Payment Model

Payment and service completion are separate concepts.

A payment can be:

- Pending
- Processing
- Paid
- Failed
- Cancelled
- Refunded

A service can be:

- Pending
- Confirmed
- In progress
- Completed
- Cancelled

Do not equate:

**Paid = Completed**

---

# 27. Waasha Payment

Online payment uses Paystack through the internal Payment Service.

Flow:

```text
Customer
   ↓
Waasha Checkout
   ↓
Payment Service
   ↓
Paystack
   ↓
Verified Payment
   ↓
Booking payment status updated
```

Payment must be verified server-side.

Browser redirect alone is insufficient.

---

# 28. Cash Booking

Customer selects Cash only if provider/business supports Cash.

Example:

Service = R150

Customer selects Cash.

System asks:

**Will you need change?**

If yes:

**How much will you be paying with?**

Customer enters:

R200

System calculates:

R200 − R150 = R50

Provider sees:

- Total: R150
- Payment: Cash
- Customer paying: R200
- Change required: R50

Display:

**Cash change requested**

**Provider has been notified to bring R50 change.**

Waasha must not claim that it physically guarantees the change.

---

# 29. Cash Completion

Provider/business can record cash payment received after the service or according to configured workflow.

The system should capture:

- Cash received
- Amount expected
- Amount tendered
- Change amount
- Confirmation timestamp

Do not allow a customer to mark another party's cash payment as received without appropriate authorization.

---

# 30. EFT Booking

If provider/business accepts EFT:

Customer may select EFT.

The booking should show:

- EFT payment instructions where configured
- Amount due
- Payment status

EFT payment must not be marked as confirmed solely because the customer says they made the payment.

Support future manual verification/reconciliation.

---

# 31. Custom Request Flow

```text
Customer
   ↓
Create Custom Request
   ↓
Up to 3 Images
   ↓
Publish
   ↓
Eligible providers
   ↓
Proposals
   ↓
Customer compares
   ↓
Selects proposal
   ↓
Booking created
```

---

# 32. Custom Request Eligibility

Only providers with:

`custom_requests_enabled = true`

may receive custom request opportunities.

Matching can consider:

- Category
- Skills
- Distance
- Availability
- Location
- Provider preferences

Tier must not automatically outrank another provider.

Training-centre affiliation must not automatically outrank an independent provider.

---

# 33. Custom Request Images

Maximum:

**3 images**

Images must remain associated with the custom request.

They do not automatically become provider portfolio images.

---

# 34. Custom Proposal

Provider proposal includes:

- Provider
- Proposed price
- Duration
- Date/time
- Message

Customer can accept one proposal.

Only one proposal may become the selected proposal.

---

# 35. Proposal Acceptance Transaction

When customer accepts:

1. Verify customer owns request.
2. Verify proposal is active.
3. Verify provider remains eligible.
4. Re-check availability.
5. Lock relevant records.
6. Mark proposal accepted.
7. Close competing proposals.
8. Create booking.
9. Snapshot proposal price/terms.
10. Link booking to custom request and proposal.
11. Start payment workflow where required.
12. Notify customer/provider.

All critical changes should occur in a transaction.

---

# 36. Proposal Price

The accepted proposal price becomes the booking price.

Provider's original service catalogue price does not override the accepted custom proposal.

---

# 37. Booking Notifications

Customer:

- Booking created
- Provider accepted
- Provider declined
- Booking confirmed
- Payment status
- Upcoming booking
- Provider started
- Booking completed
- Cancellation
- Custom proposal

Provider:

- New booking request
- Booking accepted/declined
- Customer cancellation
- Upcoming booking
- Custom request
- Proposal acceptance
- Cash/change requirement
- Payment status

Business/team:

- New booking
- Assignment
- Staff changes
- Customer cancellation
- Payment
- Completion

---

# 38. Booking Reminders

The architecture should support reminders before appointments.

Recommended initial reminder opportunities:

- 24 hours before
- 1 hour before

Exact notification channels/cadence should remain configurable.

---

# 39. Review Eligibility

A customer can review a booking only when:

- Booking belongs to customer
- Booking is completed
- Customer has not already reviewed it

One review per eligible booking.

---

# 40. Commission Trigger

Commission is generated only when the booking becomes financially eligible.

Initial default:

**25% platform commission**

The exact trigger should be controlled by the financial workflow.

For cash/EFT, financial eligibility may require payment confirmation.

For online payment, successful payment does not automatically mean the service is complete.

The system must avoid double charging.

---

# 41. Commission Snapshot

When commission is generated, store:

- Gross booking amount
- Platform percentage
- Platform amount
- Training-centre percentage
- Training-centre amount
- Provider/business amount
- Currency
- Commission rule reference

Historical commission must never depend on today's Admin setting.

---

# 42. Training Centre Share

A provider referred by a training centre may generate partner earnings from eligible completed services.

The partner allocation is taken from the configured platform commission structure.

Do not create training-centre earnings merely because:

- Provider registered
- Provider was approved
- Provider received a booking

Earnings require an eligible transaction.

---

# 43. Payout Eligibility

Provider/business payout becomes eligible according to the financial workflow.

Possible prerequisites:

- Booking completed
- Payment confirmed
- Refund window satisfied where applicable
- No active dispute
- Commission recorded

The payout system must prevent duplicate payouts.

---

# 44. Disputes

A customer/provider/business may raise a dispute according to permissions.

A disputed booking should be prevented from automatic final payout where business rules require it.

Admin can review:

- Booking
- Payment
- Communications/events
- Completion
- Commission
- Payout

Admin resolution must be audited.

---

# 45. Reassignment

T2/T3 authorized managers may reassign an upcoming booking when appropriate.

Reassignment must:

1. Verify new provider eligibility.
2. Verify new provider availability.
3. Preserve booking price.
4. Update assigned provider.
5. Record previous assignment.
6. Notify affected parties.

Do not silently overwrite assignment history.

---

# 46. Provider Availability During Pending Requests

Pending requests should not necessarily permanently block the time slot.

The exact reservation strategy should prevent double booking while avoiding unnecessary calendar locking.

For high-contention slots, use temporary reservation/locking with an expiration.

---

# 47. Idempotency

Critical operations must be idempotent:

- Booking creation where retries can occur
- Proposal acceptance
- Payment initiation
- Payment verification
- Payment webhooks
- Commission generation
- Payout creation
- Refunds

Repeated requests must not create duplicate financial or booking records.

---

# 48. Concurrency

Use database transactions/locking for:

- Booking confirmation
- Provider assignment
- Proposal acceptance
- Payment state changes
- Commission creation
- Payout creation

Two users acting at the same time must not create conflicting confirmed bookings.

---

# 49. Booking Audit Trail

Important events should be recorded:

- Created
- Accepted
- Declined
- Confirmed
- Assigned
- Reassigned
- Payment initiated
- Payment paid
- Started
- Completed
- Cancelled
- Refunded
- Disputed
- Commission created
- Payout created

A dedicated booking event table is recommended.

## `booking_events`

Fields:

- `id`
- `booking_id`
- `event_type`
- `actor_user_id`
- `previous_status`
- `new_status`
- `metadata_json`
- `created_at`

This provides a reliable operational history.

---

# 50. Booking Access

Customer can access only their bookings.

Provider can access bookings where they are:

- Provider
- Assigned provider
- Authorized team member
- Authorized business staff

Business owner/manager can access permitted bookings for their business.

Admin can access platform bookings.

---

# 51. Customer Privacy

Before booking:

Public provider discovery may show approximate provider location/distance.

After booking:

Authorized provider receives the minimum customer location/contact information needed to deliver the service.

Do not expose a customer's full home address to the public marketplace.

---

# 52. Provider Privacy

Do not expose:

- Private phone/email unless business rules permit
- Verification documents
- Private financial information
- Internal payout data
- Internal training-centre information

Public profile should contain only marketplace-safe information.

---

# 53. Business Privacy

Staff compensation, business revenue and payout information are restricted to authorized roles.

A normal staff member should not automatically see:

- Business revenue
- Other staff salaries
- Owner financial data
- Commission configuration

---

# 54. Cancellation and Refund Architecture

Cancellation and refund are separate events.

A cancellation may result in:

- No refund
- Full refund
- Partial refund
- Manual review

The booking status and payment status should be updated independently.

---

# 55. No-Show Architecture

Record no-show events without automatically applying penalties until configured business rules exist.

Possible event:

```text
booking_event = CUSTOMER_NO_SHOW
```

or:

```text
booking_event = PROVIDER_NO_SHOW
```

This allows future reliability scoring.

---

# 56. Reliability Metrics

Future marketplace ranking may use operational reliability signals.

Possible metrics:

- Acceptance rate
- Cancellation rate
- Completion rate
- Response time
- No-show rate

These should be calculated from booking/event history rather than manually entered by users.

---

# 57. Tier Independence

The booking engine must not contain logic such as:

```text
if T3 then automatically win booking
```

Instead:

```text
eligible providers
      ↓
relevant service
      ↓
availability
      ↓
distance
      ↓
quality/reliability
      ↓
customer choice
```

Tiers determine capabilities, not guaranteed customer selection.

---

# 58. Training Centre Independence

Training-centre referral must not create a hidden booking priority mechanism.

A referred provider can benefit through:

- Faster verification/onboarding
- Partner attribution
- Training recognition

But the customer ultimately chooses the provider.

---

# 59. Driver Exclusion

Do not attach driver functionality to the booking engine in Phase 1.

A future transport request must be independent from the service booking.

Example future architecture:

```text
Service Booking
      │
      └── optional transport request
             │
             └── separate Driver domain
```

For now, this does not exist.

---

# 60. Booking API Integration

The booking engine consumes services from:

- Customer
- Provider
- Business
- Availability
- Location
- Payment
- Custom Request
- Proposal

And produces events for:

- Notifications
- Payments
- Commission
- Payout
- Reviews
- Analytics
- Audit

---

# 61. Booking Transaction Example

### Standard cash home visit

Customer selects:

- Hair service
- R150
- Provider
- Home visit
- 14:00
- Cash

Customer says:

- Paying with R200
- Needs R50 change

Backend:

1. Validates service.
2. Validates provider.
3. Checks 10 km eligibility where applicable.
4. Checks availability.
5. Creates booking.
6. Snapshots R150.
7. Snapshots customer service address.
8. Stores cash tender R200.
9. Calculates R50 change.
10. Notifies provider.
11. Provider accepts.
12. Appointment becomes confirmed.
13. Provider starts service.
14. Provider completes service.
15. Cash payment is confirmed.
16. Commission is generated.
17. Provider payout becomes eligible.
18. Customer can review.

---

# 62. Custom Booking Example

Customer wants a hairstyle not listed.

1. Customer creates custom request.
2. Uploads three reference images.
3. Selects Hair category.
4. Adds description.
5. Adds preferred time.
6. Publishes request.
7. Eligible opted-in providers see request.
8. Provider submits R450 proposal.
9. Another provider submits R400 proposal.
10. Customer chooses provider 2.
11. Backend verifies availability again.
12. Proposal 2 becomes accepted.
13. Other proposals close.
14. Booking is created at R400.
15. Payment flow starts.
16. Provider completes service.
17. Financial settlement occurs.
18. Commission/payout processed.
19. Customer reviews.

---

# 63. Definition of Done

The Booking Engine is complete when:

- Standard booking works end-to-end.
- Custom booking works end-to-end.
- T1 bookings work.
- T2 assignment works.
- T3 business-unit booking works.
- Availability prevents conflicts.
- Home visits work.
- Fixed/live provider locations work.
- Cash/change workflow works.
- EFT workflow works.
- Paystack workflow works.
- Payment state is separate from service state.
- Commission is generated correctly.
- Training-centre attribution works.
- Payout eligibility works.
- Cancellation works.
- Dispute flow exists.
- Review eligibility works.
- Booking events are recorded.
- Authorization is enforced.
- Duplicate operations are prevented.
- Important operations are tested.

---

# 64. Final Booking Engine Model

```text
                    WAASHA MARKETPLACE
                           │
                    Customer selects
                           │
                 ┌─────────┴─────────┐
                 │                   │
             STANDARD             CUSTOM
                 │                   │
              Service             Request
                 │                   │
                 │                Proposals
                 │                   │
                 └─────────┬─────────┘
                           │
                        BOOKING
                           │
                ┌──────────┼──────────┐
                │          │          │
             Location   Availability Payment
                │          │          │
                └──────────┼──────────┘
                           │
                      Confirmation
                           │
                     Service Starts
                           │
                    Service Completed
                           │
                  Financial Settlement
                           │
             ┌─────────────┼─────────────┐
             │             │             │
         Commission      Payout       Training
             │                           Centre
             │                           Share
             └─────────────┬─────────────┘
                           │
                         Review
```

# WAASHA BOOKING ENGINE

**The booking engine is the operational heart of Waasha.**

Every booking must be traceable from customer request to final service outcome and financial settlement.

---


<!-- ============================================================ -->
<!-- DOCUMENT 05: PROVIDER TIERS -->
<!-- ============================================================ -->

# WAASHA PROVIDER TIERS
## T1 Individual → T2 Teams → T3 Business

**Document:** Provider Tier & Capability Specification  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Build specification  
**Scope:** Complete production product  
**Primary market:** South Africa, globally extensible

---

# 1. Purpose

Waasha supports three provider capability tiers:

- **T1 — Individual**
- **T2 — Teams**
- **T3 — Business**

These tiers define **what a provider can do**, not how prominently the provider appears in the marketplace.

### Core marketplace principle

Every provider is equal in marketplace treatment.

Waasha must **not**:

- rank T3 above T2 or T1 simply because of tier;
- hide T1 providers because they are on a lower tier;
- automatically favour training-centre-referred providers;
- use subscription tier as a customer-quality signal.

Customers should be able to choose providers based on relevant information such as service, price, availability, location, portfolio, ratings, and other legitimate marketplace signals.

---

# 2. Tier Overview

| Capability | T1 Individual | T2 Teams | T3 Business |
|---|---|---|---|
| Provider profile | ✓ | ✓ | ✓ |
| Offer services | ✓ | ✓ | ✓ |
| Set pricing | ✓ | ✓ | ✓ |
| Service/style images | ✓ | ✓ | ✓ |
| Maximum images per service/style | 3 | 3 | 3 |
| Manage own availability | ✓ | ✓ | ✓ |
| Receive standard bookings | ✓ | ✓ | ✓ |
| Custom requests | Optional | Optional | Optional |
| Custom Request Board | If enabled | If enabled | If enabled |
| Customer reviews | ✓ | ✓ | ✓ |
| Customer favourites | ✓ | ✓ | ✓ |
| Earnings dashboard | ✓ | ✓ | ✓ |
| Payment preferences | ✓ | ✓ | ✓ |
| Waasha Payment | ✓ | ✓ | ✓ |
| Cash | ✓ | ✓ | ✓ |
| EFT | ✓ | ✓ | ✓ |
| Manage team members | — | ✓ | ✓ |
| Assign bookings to team members | — | ✓ | ✓ |
| Team member availability | — | ✓ | ✓ |
| Business profile | — | — | ✓ |
| Multiple business units | — | — | ✓ |
| Multiple service categories | — | — | ✓ |
| Business locations | — | — | ✓ |
| Staff management | — | Limited team model | ✓ |
| Staff compensation configuration | — | Optional team payout | ✓ |
| Business-level analytics | — | ✓ | ✓ |
| Business-level operations | — | — | ✓ |
| Business admin controls | — | — | ✓ |

The exact availability of paid/plan-gated capabilities must be controlled through configuration rather than hard-coded throughout the application.

---

# 3. T1 — Individual Provider

## 3.1 Definition

T1 is the standard solo-provider account.

It is intended for an individual who personally performs services and manages their own Waasha activity.

Examples include:

- an independent barber;
- a hairstylist;
- a nail technician;
- an independent beauty-service provider;
- an independent car-wash operator.

T1 is a complete provider experience, not a restricted marketplace listing.

---

## 3.2 T1 Profile

A T1 provider can create and maintain:

- display name;
- profile photo;
- biography/about section;
- service category;
- skills;
- qualifications/certifications where applicable;
- portfolio;
- service catalogue;
- pricing;
- service duration;
- availability;
- service location;
- payment preferences;
- custom-request preference;
- contact/notification preferences.

The provider controls what customers can see, subject to platform rules and verification requirements.

---

# 4. T1 Services

A T1 provider can create services within Waasha's five supported categories:

1. **Barbers**
2. **Hair Salons & Stylists**
3. **Nail Technicians**
4. **Beauty Services**
5. **Car Wash**

Each service can contain:

- service name;
- description;
- price;
- duration;
- category;
- optional service/style attributes;
- maximum of **3 images**;
- availability status.

The system must prevent a provider from exceeding the 3-image service limit.

---

# 5. T1 Custom Requests

Custom requests are optional.

A provider can choose:

> **Accept Custom Requests: ON/OFF**

### OFF

The provider receives normal bookings only.

### ON

The provider becomes eligible to receive relevant custom requests through the Custom Request Board.

The provider can:

- view eligible requests;
- review customer description;
- view up to 3 customer-uploaded images;
- see preferred date/time;
- see location information required for the request;
- submit a proposal;
- decline/not respond.

A selected proposal converts into a normal Waasha booking workflow.

---

# 6. T2 — Teams

## 6.1 Definition

T2 is for providers operating with a team.

The T2 owner remains the primary provider/account owner but can add team members to help deliver services and handle bookings.

T2 is designed for a growing operator that is larger than a solo provider but does not require the full T3 business structure.

---

# 7. T2 Team Owner

The T2 owner can:

- manage their provider profile;
- create/manage services;
- set prices;
- manage availability;
- receive bookings;
- manage team members;
- assign eligible bookings to team members;
- view team activity;
- view team earnings;
- manage team permissions;
- configure team payout/compensation information where supported;
- manage custom-request participation.

The owner remains accountable for the provider account.

---

# 8. T2 Team Members

A T2 owner can create team-member profiles.

A team member may have:

- name;
- profile photo;
- role/title;
- skills;
- qualifications;
- assigned services;
- availability;
- active/inactive status;
- payout/commission configuration where applicable.

Team members must not automatically receive access to owner-level settings.

---

# 9. T2 Permissions

Use role-based permissions.

Example permission groups:

| Permission | Owner | Manager | Service Provider |
|---|---:|---:|---:|
| View profile | ✓ | ✓ | ✓ |
| Edit provider profile | ✓ | configurable | — |
| Manage services | ✓ | configurable | — |
| View bookings | ✓ | ✓ | assigned/relevant |
| Accept/decline bookings | ✓ | ✓ | configurable |
| Assign bookings | ✓ | configurable | — |
| Manage team | ✓ | configurable | — |
| View team analytics | ✓ | configurable | — |
| View financial information | ✓ | configurable | configurable |
| Change payment settings | ✓ | — | — |
| Change account settings | ✓ | — | — |

The implementation should use permissions/capabilities rather than hard-coded role checks wherever possible.

---

# 10. T2 Booking Assignment

A booking received by a T2 provider can be:

- accepted by the owner;
- assigned to a specific team member;
- accepted by an eligible team member where the provider configuration allows it.

The booking must record:

- provider account;
- assigned team member;
- assignment timestamp;
- assignment actor;
- assignment history.

Changing the assigned team member must not erase the original audit trail.

---

# 11. T2 Team Compensation

T2 can support team-member payout arrangements.

Examples:

- fixed payout;
- percentage payout;
- configurable service-based payout.

The actual compensation model must be stored as configuration/data.

Waasha must not assume that all T2 teams use the same compensation arrangement.

For each completed eligible service, the system should be able to calculate:

- gross service amount;
- Waasha commission;
- provider/team amount;
- team-member payout where applicable;
- other configured deductions or allocations.

Compensation calculation must be auditable.

---

# 12. T3 — Business

## 12.1 Definition

T3 is the full business operating model.

A T3 account represents a business rather than only an individual service provider.

The business may operate:

- one location;
- multiple locations;
- one service category;
- multiple service categories;
- multiple business units.

A single T3 business can operate across **all five Waasha categories**.

---

# 13. T3 Multi-Category Model

T3 must support a structure such as:

**Business**
→ Business Unit / Location  
→ Category  
→ Services  
→ Staff  
→ Availability  
→ Bookings

Example:

**ABC Group**
- Sandton Salon
  - Hair
  - Nails
  - Beauty
- Fourways Barber
  - Barbers
- Fourways Car Wash
  - Car Wash

The system must not require the business to create a separate top-level Waasha account for every category or location.

---

# 14. T3 Business Units

A T3 owner can create and manage multiple business units.

Each business unit can have:

- name;
- description;
- address/location;
- operating hours;
- service categories;
- services;
- staff;
- availability;
- business-specific settings;
- booking activity;
- analytics.

Business units should remain connected to the parent business for consolidated reporting.

---

# 15. T3 Staff

T3 supports business staff management.

Staff may:

- receive assigned bookings;
- accept/decline bookings where permitted;
- perform services;
- manage their assigned availability;
- view relevant booking information;
- update service status;
- receive notifications;
- view permitted earnings information.

Access must follow business-defined permissions.

---

# 16. T3 Staff Compensation

T3 supports staff compensation arrangements.

Possible configuration models include:

- salary;
- percentage commission;
- fixed payout;
- service-specific payout;
- other configurable internal allocation models.

The system must distinguish between:

### Customer price

What the customer pays.

### Waasha commission

The platform's configured commission.

### Business amount

The amount remaining for the business after applicable platform deductions.

### Staff compensation

The configured salary/payout/commission allocation.

These must be separate ledger concepts.

---

# 17. Waasha Commission

The platform commission is currently **25%**.

However:

> **25% must be admin-configurable and must never be hard-coded into booking or payment logic.**

Commission configuration should support:

- global default rate;
- effective dates;
- category/service overrides where required;
- provider/business overrides where required;
- future pricing changes.

Every applicable booking should retain a commission snapshot so historical transactions remain accurate even after the admin changes the current rate.

---

# 18. T3 Business Payments

T3 providers can configure supported payment methods:

- **Waasha Payment**
- **Cash**
- **EFT**

Payment-method availability can be controlled at business level and, where required, at business-unit/service level.

For cash bookings, the system must preserve the customer's change request.

Example:

Service = R150  
Customer tenders = R200  
Expected change = R50

Provider-facing status:

> **Cash change requested**  
> Provider has been notified to bring R50 change.

Waasha must not represent cash-change handling as a platform guarantee.

---

# 19. Tier and Marketplace Equality

Provider tier must not become a ranking mechanism.

The marketplace should avoid rules such as:

> T3 always appears before T2.

or:

> T2 receives more organic visibility than T1.

Instead, discovery should use legitimate marketplace signals, such as:

- distance;
- service/category match;
- availability;
- customer-selected filters;
- ratings/reviews;
- service relevance;
- provider-defined service information.

Any ranking algorithm must be designed so that tier alone does not create preferential placement.

---

# 20. Training Centre Referrals

Training-centre affiliation is an attribution/partner relationship, not a marketplace ranking advantage.

If a provider joins through a training centre, Waasha must retain:

- training centre;
- provider;
- referral/attribution relationship;
- attribution date;
- relevant status.

A training centre may earn a configured share from eligible completed services.

The partner earning must be tied to qualifying completed transactions, not simply to provider registration.

Training-centre providers may receive faster onboarding or verification workflows where the business rules allow it, but this must not create permanent marketplace ranking preference.

---

# 21. Feature Enforcement

Tier capability should be implemented through a centralized feature/capability system.

Example:

```text
T1
  team_management = false
  business_units = false
  business_staff = false

T2
  team_management = true
  business_units = false
  business_staff = limited

T3
  team_management = true
  business_units = true
  business_staff = true
  multi_category_business = true
```

Do not scatter tier checks throughout the codebase.

Preferred architecture:

```text
Account
   ↓
Provider Tier
   ↓
Feature Entitlements
   ↓
Authorization / Service Layer
   ↓
API
   ↓
Frontend
```

The backend is authoritative.

The frontend should hide unavailable actions for good UX, but security must never depend on frontend hiding.

---

# 22. Upgrade Flow

A provider can upgrade:

**T1 → T2**

or:

**T1 → T3**

A T2 provider can upgrade:

**T2 → T3**

Upgrade should be designed so existing data is preserved.

Examples:

- existing services remain;
- existing bookings remain;
- reviews remain;
- portfolio remains;
- earnings history remains;
- customer relationships remain;
- provider identity remains.

The system should add new capabilities rather than create a new unrelated identity.

---

# 23. Upgrade Validation

Before an upgrade takes effect, Waasha should validate:

- account eligibility;
- required business information;
- required verification;
- required staff/business-unit data;
- required subscription/plan status where applicable;
- billing state where applicable.

If additional setup is required, the user should receive a clear checklist.

---

# 24. Downgrade Flow

Downgrading must be handled carefully because a higher tier may contain data that a lower tier cannot operate.

Example:

T3 has:

- 5 business units;
- 20 staff;
- multiple categories.

A downgrade to T1 cannot simply delete those records.

Preferred approach:

1. Warn the provider.
2. Show incompatible features/data.
3. Prevent destructive automatic deletion.
4. Require resolution of incompatible configuration.
5. Preserve historical data.
6. Apply the lower-tier capability set only after validation.

Historical bookings, financial records, reviews, audit logs and transaction records must remain intact.

---

# 25. Subscription / Entitlement Separation

Tier and subscription should be separate concepts.

### Provider Tier

Defines the operational model:

- T1 Individual;
- T2 Teams;
- T3 Business.

### Subscription / Plan

Defines commercial access to features or limits.

This allows Waasha to change pricing and plans without rewriting the provider model.

Conceptually:

```text
Provider
   ↓
Tier = T1 / T2 / T3
   ↓
Subscription / Plan
   ↓
Feature Entitlements
   ↓
Usage Limits
```

---

# 26. Usage Limits

Where commercial plans impose limits, limits should be configurable.

Possible limits include:

- number of team members;
- number of business units;
- number of staff;
- number of services;
- storage/media limits;
- analytics history;
- other future platform features.

Do not hard-code commercial limits into business logic.

---

# 27. Tier Change Audit Trail

Every tier change should create an audit event containing:

- provider/account ID;
- previous tier;
- new tier;
- actor;
- reason/source;
- timestamp;
- subscription/plan reference where applicable.

Example:

```text
T1 → T2
Actor: Provider Owner
Source: Subscription Upgrade
Timestamp: 2026-XX-XX
```

---

# 28. Business Data Isolation

T3 business data must be isolated from other businesses.

A staff member from Business A must never be able to access:

- Business B bookings;
- Business B customers;
- Business B staff;
- Business B financial data;
- Business B analytics.

Every business-scoped query must enforce tenant/business authorization on the backend.

---

# 29. Customer Experience

Customers should not need to understand the provider tier system.

Marketplace cards should focus on useful customer information rather than labels such as:

> T3 = better provider.

The customer should see relevant information such as:

- provider/business name;
- service;
- price;
- distance;
- rating;
- availability;
- portfolio;
- location/service mode.

Tier is primarily an operational/account capability.

---

# 30. Provider Onboarding

### T1 onboarding

1. Create account.
2. Select provider type/category.
3. Complete profile.
4. Add services.
5. Add up to 3 images per service/style.
6. Configure availability.
7. Configure payment methods.
8. Choose custom-request participation.
9. Complete verification where required.
10. Publish profile.

### T2 onboarding

Includes T1 onboarding plus:

1. Select T2.
2. Configure team.
3. Add team members.
4. Configure permissions.
5. Configure team availability.
6. Configure team payout model where applicable.

### T3 onboarding

Includes business onboarding plus:

1. Create business profile.
2. Configure business information.
3. Create business unit(s).
4. Add locations.
5. Select supported categories.
6. Create services.
7. Add staff.
8. Configure staff permissions.
9. Configure compensation.
10. Configure payment methods.
11. Complete verification.
12. Publish business presence.

---

# 31. Notifications

Tier-specific operational notifications should include:

### T2

- team member added;
- team member removed;
- booking assigned;
- booking reassigned;
- team member accepted/declined;
- team availability conflict;
- payout/compensation event.

### T3

- new business unit;
- staff added/removed;
- booking assignment;
- staff acceptance/decline;
- business-level booking activity;
- compensation event;
- business payment event;
- business performance/analytics notifications where enabled.

---

# 32. Analytics

### T1

Personal/provider-level:

- bookings;
- completed services;
- cancellations;
- revenue;
- commission;
- payouts;
- ratings;
- service performance.

### T2

All T1 analytics plus:

- team bookings;
- team utilization;
- team response;
- member performance;
- team earnings;
- service performance by team member.

### T3

All relevant provider/team analytics plus:

- business-unit performance;
- category performance;
- staff performance;
- location performance;
- consolidated revenue;
- consolidated commission;
- business-level booking trends;
- operational performance.

Financial visibility must respect permissions.

---

# 33. Security Requirements

Tier capability checks must be enforced server-side.

Required controls:

- authentication;
- authorization;
- tenant/business isolation;
- permission checks;
- object-level access control;
- audit logging;
- secure media access;
- rate limiting;
- validation;
- idempotency for financial operations.

A malicious client must not be able to change:

```text
tier = T3
```

simply by modifying frontend requests.

Tier changes must pass through authorized backend workflows.

---

# 34. Database Relationships

Core relationship model:

```text
User
  ↓
Provider Profile
  ↓
Provider Tier
  ├── T1 Individual
  ├── T2 Team
  │     └── Team Members
  └── T3 Business
        ├── Business Units
        │     ├── Categories
        │     ├── Services
        │     ├── Locations
        │     └── Staff
        └── Business-level settings
```

The database architecture must preserve one user identity even if a provider changes tier.

---

# 35. API Behaviour

Representative endpoints:

```text
GET    /provider/profile
PATCH  /provider/profile

GET    /provider/tier
POST   /provider/tier/upgrade
POST   /provider/tier/downgrade

GET    /provider/features
GET    /provider/entitlements

GET    /team/members
POST   /team/members
PATCH  /team/members/:id
DELETE /team/members/:id

GET    /business
PATCH  /business

GET    /business/units
POST   /business/units
PATCH  /business/units/:id
DELETE /business/units/:id

GET    /business/staff
POST   /business/staff
PATCH  /business/staff/:id
DELETE /business/staff/:id

GET    /business/analytics
```

Exact API naming should follow the master API specification.

---

# 36. Admin Controls

Admin should be able to configure:

- tier definitions;
- feature entitlements;
- subscription plans;
- usage limits;
- commission rate;
- commission effective dates;
- partner/training-centre share;
- verification rules;
- provider capability flags.

Admin configuration changes must be audited.

---

# 37. Non-Negotiable Rules

1. Waasha has exactly **three provider tiers**: T1, T2, T3.
2. T1 is a complete solo-provider experience.
3. T2 adds team management.
4. T3 is the full business operating model.
5. T3 can support **all five Waasha service categories**.
6. T3 can manage multiple business units.
7. Service/style media is limited to **3 images per service/style**.
8. Custom requests are opt-in for providers.
9. Custom requests allow customers to upload **up to 3 images**.
10. Provider tier must **not** create marketplace ranking preference.
11. Training-centre affiliation must **not** create permanent marketplace ranking preference.
12. Commission is currently **25% but must remain admin-configurable**.
13. Payment status and service completion are separate.
14. Cash change is a request/notification workflow, not a platform guarantee.
15. Historical financial and booking data must survive tier changes.
16. Downgrades must not silently delete incompatible business data.
17. Tier enforcement must be centralized and server-authoritative.
18. Tenant/business authorization must be enforced on every protected backend operation.
19. Driver functionality is **not part of this tier specification or initial launch** and remains deferred to Phase 2.
20. Only the five approved Waasha categories are in scope.

---

# 38. Definition of Done

The provider-tier implementation is complete when:

- T1, T2 and T3 are represented in the backend;
- capabilities are centrally defined;
- frontend and backend enforce the same entitlement model;
- T1 can operate independently;
- T2 can create/manage teams;
- T2 can assign bookings;
- T3 can create/manage business units;
- T3 can operate across all five categories;
- T3 can manage staff;
- staff permissions are enforced;
- staff compensation can be configured;
- tier upgrades preserve existing data;
- downgrades are validated and non-destructive;
- commission remains admin-configurable;
- training-centre attribution remains intact;
- tier does not affect marketplace equality;
- audit logging captures tier changes;
- tenant isolation is tested;
- unauthorized tier/feature access is rejected server-side;
- automated tests cover core tier rules.

---

# 39. Source of Truth

This document should be implemented together with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`

The Stitch export remains the visual source of truth for the screens already designed, with the documented text corrections applied during implementation.

---


<!-- ============================================================ -->
<!-- DOCUMENT 06: PAYMENT & FINANCE ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA PAYMENT & FINANCE ARCHITECTURE
## Waasha Payment → Paystack → Cash → EFT → Commission → Earnings → Payouts

**Document:** Payment & Finance Architecture Specification  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Build specification  
**Scope:** Complete production product  
**Primary market:** South Africa, globally extensible

---

# 1. Purpose

This document defines Waasha's financial architecture.

The goal is to keep:

- booking logic;
- payment processing;
- commission calculation;
- provider earnings;
- staff compensation;
- training-centre partner earnings;
- refunds;
- payouts;
- reconciliation;
- financial reporting

as separate but connected systems.

The architecture must support **Waasha Payment**, with **Paystack** as the initial payment gateway, while also supporting **Cash** and **EFT**.

The payment gateway must be replaceable without rewriting the booking engine.

---

# 2. Core Financial Principle

A booking is not the same thing as a payment.

A service is not the same thing as a completed payment.

A payment is not the same thing as a payout.

Therefore the system must maintain separate states for:

```text
Booking
   ↓
Payment
   ↓
Service Completion
   ↓
Commission / Allocations
   ↓
Earnings
   ↓
Payout
```

A successful payment must **not automatically mark the service as completed**.

---

# 3. Supported Payment Methods

Waasha supports three customer payment methods:

1. **Waasha Payment**
2. **Cash**
3. **EFT**

Providers can choose which methods they accept.

A provider may enable:

- Waasha Payment only;
- Cash only;
- EFT only;
- any combination of the three.

The available options shown to the customer must reflect the provider/service configuration.

---

# 4. Waasha Payment

## 4.1 Definition

Waasha Payment is the platform's digital payment option.

The initial gateway integration is Paystack.

Architecture:

```text
Customer
   ↓
Waasha Checkout
   ↓
Payment Service
   ↓
Payment Gateway Adapter
   ↓
Paystack
   ↓
Webhook
   ↓
Waasha Payment Service
   ↓
Booking / Ledger
```

The booking system must communicate with a Waasha payment abstraction rather than directly with Paystack-specific code.

---

# 5. Payment Gateway Abstraction

Use an adapter/interface model.

Conceptually:

```text
PaymentGateway
├── PaystackGateway
└── FutureGateway
```

Example operations:

```text
initializePayment()
verifyPayment()
refundPayment()
handleWebhook()
getTransaction()
```

The booking engine should call:

```text
PaymentService
```

rather than:

```text
PaystackService
```

This allows Waasha to change or add payment providers later.

---

# 6. Paystack Integration

Paystack is the initial payment gateway.

The implementation must use:

- secure secret-key handling;
- server-side transaction initialization;
- server-side verification;
- webhook processing;
- webhook signature verification;
- idempotency;
- transaction references;
- payment-event logging.

Secret keys must never be exposed in frontend code.

Environment variables/secrets management should be used.

Example configuration:

```text
PAYSTACK_SECRET_KEY
PAYSTACK_PUBLIC_KEY
PAYSTACK_WEBHOOK_SECRET
```

Exact configuration names may change during implementation.

---

# 7. Payment Lifecycle

Digital payment lifecycle:

```text
INITIATED
   ↓
PENDING
   ↓
SUCCESSFUL
```

Possible terminal/exception states:

```text
FAILED
CANCELLED
EXPIRED
REFUNDED
PARTIALLY_REFUNDED
DISPUTED
```

The exact status model must distinguish:

- gateway status;
- Waasha payment status;
- booking status.

---

# 8. Payment Verification

The frontend redirect/result page must never be treated as the final authority for payment success.

The backend must verify the transaction.

Preferred sequence:

1. Customer starts payment.
2. Waasha creates internal payment record.
3. Gateway transaction is initialized.
4. Customer completes payment.
5. Gateway sends webhook.
6. Waasha verifies webhook authenticity.
7. Waasha verifies transaction status.
8. Internal payment status is updated.
9. Booking payment state is updated.
10. Financial ledger entries are created where applicable.
11. Notifications are sent.

Webhook processing must be idempotent.

---

# 9. Payment Records

Each payment should retain:

- payment ID;
- booking ID;
- customer ID;
- provider/business ID;
- gateway;
- payment method;
- gateway transaction/reference;
- amount;
- currency;
- gateway fee where available;
- Waasha commission;
- net provider/business amount;
- status;
- initiated timestamp;
- successful timestamp;
- refund information;
- metadata;
- reconciliation status.

Never rely solely on gateway records for internal financial history.

---

# 10. Money Representation

Financial values must never be stored as floating-point numbers.

Preferred representation:

```text
integer minor units
```

For South African Rand:

```text
R150.00 → 15000
R200.00 → 20000
```

Currency should be stored explicitly:

```text
ZAR
```

This prevents rounding errors.

The architecture should remain currency-aware for future international expansion.

---

# 11. Price Snapshot

When a booking is created, Waasha must snapshot the applicable price.

Example:

```text
Service current price: R150
Booking price snapshot: R150
```

If the provider later changes the service price to R180, the existing booking remains R150 unless the booking is explicitly modified according to the booking rules.

Financial records must reference historical amounts, not current service configuration.

---

# 12. Commission

Current platform commission:

> **25%**

This is a configurable default, not a hard-coded application constant.

Example:

```text
Customer pays: R150
Commission: 25%
Waasha commission: R37.50
Provider/business gross share: R112.50
```

Actual allocations may include other configured partner/staff amounts.

The exact financial calculation must use stored configuration applicable to the booking.

---

# 13. Commission Configuration

Admin must be able to configure:

- default commission rate;
- effective date;
- end date;
- service/category overrides;
- provider overrides;
- business overrides;
- special partner rules where applicable.

Each transaction must retain the commission rule/rate used.

Example:

```text
Booking #12345
Gross: R150
Commission rule: DEFAULT
Commission rate snapshot: 25%
Commission amount: R37.50
```

Changing the current rate must not recalculate historical transactions.

---

# 14. Financial Allocation

The system should conceptually calculate:

```text
Gross Customer Amount
        ↓
Gateway Fees
        ↓
Waasha Commission
        ↓
Partner Allocations
        ↓
Staff/Team Allocations
        ↓
Provider/Business Net Earnings
```

However, the actual accounting treatment of gateway fees and deductions must remain configurable.

Do not assume that every fee is always deducted from the same party.

---

# 15. Training Centre Partner Share

A provider may be attributed to a training centre.

A configured portion of eligible Waasha earnings may be allocated to that training centre.

Example:

```text
Customer payment: R150
Waasha commission: R37.50
Training centre share: configured portion of commission
Provider/business amount: remaining eligible amount
```

The exact percentage must remain configurable.

Partner earnings should be created only when the transaction satisfies the configured eligibility rules.

Registration alone does not create a partner payout.

---

# 16. Staff Compensation

For T2/T3 providers, staff compensation may be configured.

Possible models:

- fixed amount;
- percentage;
- service-specific payout;
- other configured internal allocation.

Example:

```text
Gross service amount
      ↓
Waasha commission
      ↓
Provider/business amount
      ↓
Staff allocation
```

Staff compensation must be recorded independently from Waasha commission.

A staff member's internal payout must not accidentally reduce the platform commission unless the configured financial model explicitly says so.

---

# 17. Cash Payments

Cash is an accepted payment method where enabled by the provider.

Cash booking example:

```text
Service price: R150
Payment method: Cash
Customer tenders: R200
Expected change: R50
```

Customer-facing confirmation:

> Cash change requested.

Provider-facing information:

> Customer is expected to tender R200. Bring R50 change.

The system must not claim:

> Guaranteed Cash Change

Waasha is recording and communicating the customer's request; it is not guaranteeing that physical cash will be available.

---

# 18. Cash Change Data

For cash bookings, store:

- requested tender amount;
- expected change;
- cash-change-requested flag;
- provider notification state;
- optional provider acknowledgement;
- booking/payment notes.

Example:

```text
service_amount = 15000
cash_tender_amount = 20000
cash_change_amount = 5000
```

Validation:

```text
tender amount >= service amount
change = tender amount - service amount
```

If the customer will pay the exact amount, the change request should be false.

---

# 19. Cash Payment Confirmation

Cash payment should not be marked as successfully collected simply because the customer selected Cash.

Recommended lifecycle:

```text
BOOKED
   ↓
CASH_EXPECTED
   ↓
SERVICE_STARTED
   ↓
SERVICE_COMPLETED
   ↓
CASH_COLLECTED / PAYMENT_CONFIRMED
```

The exact workflow may vary depending on operational requirements.

The important rule is:

> Selecting Cash is not proof that cash was collected.

---

# 20. EFT

EFT is supported where enabled by the provider.

EFT can operate through a controlled confirmation process.

Possible lifecycle:

```text
EFT_SELECTED
   ↓
PAYMENT_INSTRUCTIONS
   ↓
PAYMENT_PENDING
   ↓
CUSTOMER_SUBMITS_REFERENCE / PROOF
   ↓
PROVIDER OR ADMIN CONFIRMS
   ↓
PAYMENT_CONFIRMED
```

For production, Waasha should define whether EFT confirmation is:

- provider-confirmed;
- admin-confirmed;
- bank-integrated in a future phase.

Do not mark EFT as paid merely because a customer says they made the transfer.

---

# 21. EFT Proof

If proof-of-payment is supported, store:

- payment record;
- customer reference;
- uploaded proof;
- submission timestamp;
- review status;
- reviewer;
- review timestamp;
- decision.

Proof uploads must follow Waasha's secure media-storage rules.

---

# 22. Payment vs Completion

These are separate concepts.

Example:

```text
Payment = SUCCESSFUL
Booking = CONFIRMED
Service = NOT_COMPLETED
```

Only after the service is actually delivered should the booking enter its completed state.

This protects:

- customer refunds;
- provider earnings;
- partner earnings;
- reviews;
- dispute handling;
- operational analytics.

---

# 23. When Commission Is Earned

Commission recognition should be tied to the defined eligible transaction event.

For the standard model:

```text
Booking completed
      ↓
Eligibility validation
      ↓
Commission calculated
      ↓
Commission ledger entry
```

The system must not create final provider/partner earnings merely because a booking was created.

Cancelled or disputed bookings must follow their respective financial rules.

---

# 24. Earnings Ledger

Waasha should maintain an internal financial ledger.

A ledger entry should contain:

- ledger ID;
- account/entity;
- booking ID;
- payment ID;
- entry type;
- amount;
- currency;
- debit/credit direction where applicable;
- status;
- source;
- reference;
- created timestamp.

Example entry types:

```text
CUSTOMER_PAYMENT
WAASHA_COMMISSION
PROVIDER_EARNING
STAFF_ALLOCATION
TRAINING_CENTRE_EARNING
REFUND
ADJUSTMENT
PAYOUT
PAYOUT_REVERSAL
GATEWAY_FEE
```

The exact accounting model can evolve, but transaction history must remain immutable/auditable.

---

# 25. Immutable Financial History

Completed financial transactions must not be silently overwritten.

If a correction is needed:

```text
Original Entry
      ↓
Adjustment / Reversal
      ↓
Corrected Entry
```

Do not edit historical ledger amounts without creating an audit trail.

---

# 26. Provider Earnings

Provider earnings should distinguish:

- gross service value;
- Waasha commission;
- gateway fees where applicable;
- partner share;
- staff/team allocation;
- refunds/adjustments;
- net earnings;
- available balance;
- pending balance;
- paid-out amount.

Example:

```text
Gross: R1,000
Waasha commission: R250
Partner allocation: R25
Staff allocation: R100
Net provider/business earnings: R625
```

The example is illustrative only; actual allocations come from configuration.

---

# 27. Pending vs Available Earnings

Use separate balances.

### Pending

Money associated with transactions that are not yet eligible for payout.

Examples:

- service not completed;
- payment awaiting settlement;
- refund/dispute window;
- EFT not confirmed.

### Available

Money that has passed all configured payout eligibility checks.

### Paid Out

Money already transferred to the provider/business.

---

# 28. Payouts

Payout processing should be separate from booking completion.

Possible payout lifecycle:

```text
PAYOUT_ELIGIBLE
   ↓
PAYOUT_PENDING
   ↓
PAYOUT_PROCESSING
   ↓
PAYOUT_COMPLETED
```

Exception states:

```text
PAYOUT_FAILED
PAYOUT_CANCELLED
PAYOUT_REVERSED
```

Payouts must have unique references and idempotency controls.

---

# 29. Payout Accounts

Providers/businesses should have payout information stored separately from general profile information.

Possible information:

- account holder;
- bank;
- account type;
- account number/tokenized reference;
- branch/code where required;
- verification status.

Sensitive banking information must be protected.

Where the payment provider supports tokenization, prefer provider-managed references rather than storing unnecessary sensitive data.

---

# 30. Refunds

Refunds must be represented independently.

Possible refund states:

```text
REQUESTED
APPROVED
PROCESSING
COMPLETED
FAILED
```

Refund records should contain:

- payment ID;
- booking ID;
- requested amount;
- approved amount;
- reason;
- actor;
- gateway reference;
- status;
- timestamps.

Partial refunds must be supported architecturally.

---

# 31. Refund Allocation

A refund may require reversal of:

- provider earnings;
- Waasha commission;
- partner earnings;
- staff allocation;
- gateway-related amounts.

The system must apply configured refund rules.

Do not simply subtract the refund from the provider's current balance without creating appropriate ledger entries.

---

# 32. Cancellation Financial Rules

Cancellation rules should be defined separately from the payment gateway.

A cancellation can result in:

- full refund;
- partial refund;
- no refund;
- provider compensation;
- configured cancellation fee.

The booking engine determines eligibility; the payment service executes the applicable financial action.

---

# 33. Disputes

A disputed booking/payment must be financially isolated until resolved.

Potential status:

```text
DISPUTED
```

Depending on the dispute:

- provider earnings may remain pending;
- payout may be held;
- partner earnings may be held;
- refund may be initiated;
- admin adjustment may be required.

All dispute decisions must be audited.

---

# 34. Reconciliation

Waasha needs internal reconciliation between:

```text
Waasha payment records
        ↕
Payment gateway records
        ↕
Internal financial ledger
        ↕
Payout records
```

Reconciliation should identify:

- missing payments;
- duplicate payments;
- mismatched amounts;
- webhook failures;
- refunds not reflected internally;
- payout mismatches;
- unexplained financial differences.

---

# 35. Webhook Idempotency

A gateway may send the same webhook more than once.

Waasha must store a unique gateway event/reference.

Processing:

```text
Webhook received
      ↓
Check event/reference
      ↓
Already processed?
   ├── YES → return success / do nothing
   └── NO  → process → record event
```

No financial transaction should be duplicated because of repeated webhook delivery.

---

# 36. Checkout Idempotency

Customers may double-click Pay.

The system must prevent duplicate payment creation.

Use an idempotency key tied to the booking/payment attempt.

Example:

```text
booking_id + payment_attempt_id
```

Repeated requests should return the existing payment attempt rather than creating a second charge.

---

# 37. Payment Security

Required controls:

- TLS;
- secure server-side secrets;
- gateway signature verification;
- authentication;
- authorization;
- request validation;
- rate limiting;
- idempotency;
- audit logging;
- secure webhook endpoints;
- secure media handling;
- no card data stored by Waasha unless explicitly required and compliant.

Waasha should prefer hosted/tokenized gateway flows to reduce payment-card data exposure.

---

# 38. Financial Permissions

Not every provider/team member should see financial data.

### T1

Owner sees own earnings.

### T2

Owner sees team financial information according to permissions.

Team members see only information permitted to them.

### T3

Business owner/admin sees business financial information.

Managers/staff see only permitted financial information.

A staff member must not automatically see:

- business bank details;
- owner earnings;
- other staff earnings;
- total business revenue.

---

# 39. Admin Finance Controls

Admin should be able to manage:

- commission rules;
- partner shares;
- payout rules;
- refund rules;
- payment-method settings;
- transaction adjustments;
- disputes;
- reconciliation;
- payout holds;
- financial reports.

Sensitive financial actions should require appropriate admin permissions.

---

# 40. Financial Audit Log

Financial events must create audit records.

Examples:

```text
PAYMENT_INITIALIZED
PAYMENT_SUCCEEDED
PAYMENT_FAILED
PAYMENT_REFUNDED
COMMISSION_CREATED
PARTNER_EARNING_CREATED
STAFF_ALLOCATION_CREATED
PAYOUT_CREATED
PAYOUT_COMPLETED
PAYOUT_FAILED
REFUND_APPROVED
FINANCIAL_ADJUSTMENT_CREATED
```

Audit records should include:

- actor;
- event;
- entity;
- previous state where relevant;
- new state;
- timestamp;
- reason;
- request/reference ID.

---

# 41. Reporting

Admin reporting should support:

### Revenue

- gross booking value;
- collected payments;
- completed service value.

### Commission

- total commission;
- commission by category;
- commission by provider;
- commission by period.

### Provider earnings

- pending;
- available;
- paid out.

### Partner earnings

- training-centre earnings;
- pending;
- available;
- paid.

### Refunds

- amount;
- count;
- reason;
- provider;
- period.

### Payment methods

- Waasha Payment;
- Cash;
- EFT.

---

# 42. Provider Finance Dashboard

Provider dashboard should show:

```text
Today's earnings
This month's earnings
Pending balance
Available balance
Paid out
Commission
Bookings
Refunds/adjustments
```

T2/T3 dashboards may additionally show team/business breakdowns.

---

# 43. Customer Payment History

Customers should be able to view:

- booking;
- service;
- provider/business;
- amount;
- payment method;
- payment status;
- transaction reference where appropriate;
- refund status;
- receipt/invoice where available.

Sensitive internal financial calculations should not be exposed.

---

# 44. Receipts

For successful digital payments, Waasha should be able to generate a receipt containing:

- Waasha branding;
- booking reference;
- provider/business;
- service;
- date/time;
- amount;
- payment method;
- payment status;
- transaction reference;
- applicable taxes/fees if required.

The receipt should not expose sensitive gateway data.

---

# 45. Tax Readiness

Waasha's architecture should remain tax-aware without assuming a final tax/accounting policy.

Store enough information to support future:

- VAT handling;
- tax invoices;
- tax-inclusive/exclusive pricing;
- jurisdiction-specific rules.

Tax logic should be configurable and isolated from the core booking engine.

---

# 46. Database Components

The payment/finance architecture should integrate with the database structures for:

```text
payments
payment_events
refunds
payouts
commission_rules
commission_entries
training_centre_earnings
staff_compensation
ledger_entries
financial_adjustments
reconciliation_records
```

Names may be adjusted to match the final database implementation.

---

# 47. API Boundaries

Representative endpoints:

```text
POST /payments/initialize
GET  /payments/:id
POST /payments/:id/verify
POST /payments/:id/refund

POST /payments/webhooks/paystack

GET  /provider/earnings
GET  /provider/payouts
GET  /provider/transactions

GET  /business/earnings
GET  /business/payouts

GET  /admin/finance/transactions
GET  /admin/finance/reconciliation
POST /admin/finance/adjustments
POST /admin/finance/refunds
```

The exact routes must remain aligned with `WAASHA_API_SPEC.md`.

---

# 48. Payment-Service Module

Recommended backend boundary:

```text
Payment Module
├── PaymentService
├── PaymentGateway
├── PaystackGateway
├── PaymentVerification
├── WebhookProcessor
├── RefundService
├── PayoutService
├── CommissionService
├── EarningsService
├── LedgerService
└── ReconciliationService
```

Booking code should depend on service interfaces, not implementation-specific gateway code.

---

# 49. Failure Handling

Payment operations must handle:

- gateway timeout;
- gateway unavailable;
- duplicate webhook;
- duplicate checkout request;
- payment verification failure;
- partial refund;
- payout failure;
- database failure;
- network interruption.

A failed external operation must not leave the booking in an impossible state.

Use:

- retries where safe;
- idempotency;
- transaction boundaries;
- reconciliation jobs;
- explicit pending states.

---

# 50. Offline-Tolerant Considerations

Waasha should tolerate temporary connectivity problems.

However:

> Offline mode must never fabricate a successful digital payment.

For Cash:

- booking information may be cached;
- cash-change request can be queued;
- service status updates can be synchronized later.

For Waasha Payment:

- online verification remains authoritative.

For EFT:

- local submission can be queued, but payment confirmation requires the configured verification process.

---

# 51. Financial State Example

Example booking:

```text
Service price              R150
Payment method             Waasha Payment
Payment status              SUCCESSFUL
Service status              COMPLETED
Commission rule             DEFAULT
Commission rate             25%
Waasha commission           R37.50
Provider/business amount    R112.50
Payout status               PENDING
```

After payout:

```text
Payout status               COMPLETED
Provider available balance  reduced by R112.50
Payout reference            generated
```

Any staff or partner allocation would be represented separately according to configuration.

---

# 52. Cash Example

```text
Service price               R150
Payment method              Cash
Customer tender             R200
Expected change              R50

Booking status              CONFIRMED
Cash status                 EXPECTED
Service status              NOT_STARTED
```

After service:

```text
Service status              COMPLETED
Cash status                 COLLECTED / CONFIRMED
```

The actual confirmation mechanism must be defined in the operational implementation.

---

# 53. EFT Example

```text
Service price               R150
Payment method              EFT
EFT status                  PENDING
Proof                       SUBMITTED
Verification                PENDING
```

After verification:

```text
EFT status                  CONFIRMED
Payment status              SUCCESSFUL
```

Again, the exact verification authority is configurable.

---

# 54. No Direct Gateway Coupling

Avoid this:

```text
BookingController
    ↓
Paystack API
```

Use:

```text
BookingController
    ↓
BookingService
    ↓
PaymentService
    ↓
PaymentGateway
    ↓
Paystack
```

This is a non-negotiable architectural boundary.

---

# 55. Financial Consistency Rules

1. Never use floating-point money.
2. Never trust frontend payment success.
3. Never process a webhook twice.
4. Never create duplicate charges from repeated checkout requests.
5. Never hard-code the 25% commission.
6. Never recalculate historical commission using today's rate.
7. Never mark Cash as collected simply because Cash was selected.
8. Never mark EFT as confirmed solely from customer input.
9. Never mark a service completed because payment succeeded.
10. Never silently overwrite immutable financial history.
11. Never expose sensitive financial data to unauthorized staff.
12. Never allow a failed payout to appear as completed.
13. Never let a gateway outage corrupt booking state.
14. Never allow payment records to bypass tenant/business authorization.
15. Never make the booking engine depend directly on Paystack.

---

# 56. Testing Requirements

Automated tests must cover:

### Digital payments

- initialization;
- successful payment;
- failed payment;
- verification;
- duplicate webhook;
- invalid webhook signature;
- gateway timeout.

### Cash

- exact payment;
- change requested;
- invalid tender amount;
- cash confirmation.

### EFT

- payment instruction;
- proof submission;
- pending verification;
- confirmed payment;
- rejected proof.

### Commission

- 25% default;
- changed commission rate;
- historical commission snapshot;
- override rules.

### Refunds

- full refund;
- partial refund;
- duplicate refund request;
- failed refund.

### Earnings

- pending;
- available;
- payout;
- payout failure;
- payout reversal.

### Security

- unauthorized finance access;
- cross-business data access;
- forged webhook;
- duplicate financial requests.

---

# 57. Admin-Configurable Financial Rules

The following must be data/configuration driven:

- commission rate;
- commission effective dates;
- training-centre share;
- staff compensation models;
- refund rules;
- cancellation financial rules;
- payout eligibility;
- payout schedules;
- payment method availability;
- tax configuration where introduced.

The application must not require a code deployment for normal business-rule changes.

---

# 58. Phase 2 Compatibility

This architecture should be extensible for future Waasha capabilities without changing the core financial model.

The deferred driver feature is **not part of the current launch**.

If a future driver marketplace is introduced, its financial model should be separately designed and integrated through the payment/ledger abstractions rather than being forced into the service-booking financial model.

---

# 59. Definition of Done

The payment/finance architecture is complete when:

- Waasha Payment is abstracted behind a payment service;
- Paystack is implemented as the initial gateway adapter;
- webhook verification is secure;
- webhook processing is idempotent;
- checkout is idempotent;
- Cash is supported;
- Cash change requests are supported;
- EFT is supported;
- payment and service completion remain separate;
- commission is configurable;
- 25% is the current default;
- commission snapshots are stored;
- training-centre allocation is configurable;
- staff compensation is separate from platform commission;
- provider/business earnings are tracked;
- pending and available balances are separated;
- payouts have their own lifecycle;
- refunds support full and partial refunds;
- reconciliation is supported;
- immutable financial history is maintained;
- finance permissions are enforced;
- admin finance controls exist;
- financial audit logging exists;
- no payment-card secrets are exposed;
- money uses integer minor units;
- automated financial/security tests pass.

---

# 60. Source of Truth

This document must be implemented together with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`
- `WAASHA_PROVIDER_TIERS.md`

The Stitch export remains the visual source of truth for the screens already designed.

Stitch copy corrections remain:

- **“Secure Checkout”** instead of “T3 Encrypted Checkout”
- **“Cash change requested”** instead of “Guaranteed Cash Change”

---


<!-- ============================================================ -->
<!-- DOCUMENT 07: NOTIFICATION & COMMUNICATION ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA NOTIFICATION & COMMUNICATION ARCHITECTURE
## In-App → Push → Email → SMS/WhatsApp-Ready Communication

**Document:** Notification & Communication Architecture Specification  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Build specification  
**Scope:** Complete production product  
**Primary market:** South Africa, globally extensible

---

# 1. Purpose

This document defines Waasha's communication and notification system.

Waasha must keep customers, providers, team members, businesses, training-centre partners and administrators informed about important events without overwhelming users.

The system must support multiple delivery channels while keeping the underlying notification event independent from the delivery provider.

Primary channels:

1. In-app notifications
2. Push notifications
3. Email
4. SMS-ready architecture
5. WhatsApp-ready architecture

The first production implementation can prioritize in-app, push and email while preserving clean interfaces for future SMS and WhatsApp providers.

---

# 2. Core Architecture Principle

Business events should create **notification events**.

They should not directly call a specific communication provider.

Avoid:

```text
BookingService
   ↓
Twilio
```

Prefer:

```text
BookingService
   ↓
NotificationEvent
   ↓
NotificationService
   ↓
Channel Router
   ├── In-App
   ├── Push
   ├── Email
   ├── SMS
   └── WhatsApp
```

This keeps Waasha independent from individual communication vendors.

---

# 3. Communication Channels

## 3.1 In-App

In-app notifications are the primary persistent notification layer.

Examples:

- booking confirmed;
- booking accepted;
- provider declined;
- custom request proposal;
- payment status;
- booking reminder;
- cancellation;
- review request.

In-app notifications remain available in the user's notification centre.

---

## 3.2 Push

Push notifications are intended for time-sensitive events.

Examples:

> Your booking has been accepted.

> Your appointment starts in 30 minutes.

> A provider has responded to your custom request.

Push requires user permission and device registration.

Users who deny push permissions must still receive applicable in-app notifications.

---

## 3.3 Email

Email is appropriate for:

- receipts;
- booking confirmations;
- important account changes;
- verification;
- password/security events;
- financial summaries;
- selected operational notifications.

Email should not necessarily be used for every low-priority in-app event.

---

## 3.4 SMS-Ready

Waasha should expose an SMS channel interface even if SMS is not enabled initially.

Potential future uses:

- booking reminders;
- verification;
- critical booking changes;
- account recovery.

SMS should be controlled by user preferences and admin policy.

---

## 3.5 WhatsApp-Ready

WhatsApp should be architecturally supported as a future channel.

Potential future uses:

- booking confirmation;
- reminders;
- provider/customer updates;
- custom-request communication;
- operational notifications.

WhatsApp integration should use an approved business messaging provider and template-based communication where required.

---

# 4. Notification Event Model

Every notification begins with a structured event.

Example:

```text
Event:
BOOKING_CONFIRMED

Recipient:
Customer

Data:
booking_id
provider_name
service_name
date
time
location
```

The notification engine then decides:

- whether the user should be notified;
- which channels apply;
- which template to use;
- which language/content variant to use;
- whether the event is urgent;
- whether delivery should happen immediately or be delayed.

---

# 5. Notification Lifecycle

```text
BUSINESS EVENT
      ↓
CREATE NOTIFICATION EVENT
      ↓
RESOLVE RECIPIENTS
      ↓
CHECK USER PREFERENCES
      ↓
CHECK CHANNEL POLICY
      ↓
GENERATE MESSAGE
      ↓
QUEUE DELIVERY
      ↓
SEND
      ↓
TRACK RESULT
      ↓
RETRY IF SAFE
      ↓
STORE DELIVERY RESULT
```

The notification record should remain even if delivery fails.

---

# 6. Notification Types

Recommended notification categories:

### Booking

- booking created;
- booking accepted;
- booking declined;
- booking rescheduled;
- booking cancelled;
- booking reassigned;
- booking started;
- booking completed;
- no-show;
- booking reminder.

### Custom Requests

- request created;
- request received;
- proposal submitted;
- proposal accepted;
- proposal declined;
- request expired.

### Payments

- payment initiated;
- payment successful;
- payment failed;
- EFT pending;
- EFT confirmed;
- refund requested;
- refund processed;
- payout processed.

### Provider Operations

- new booking;
- team assignment;
- team member response;
- cash change requested;
- customer arrival/service reminder;
- availability issue.

### Reviews

- review eligible;
- review reminder;
- review received;
- review response.

### Account/Security

- email verification;
- phone verification;
- password changed;
- login/security event;
- account status change.

### Business

- staff added;
- staff removed;
- business unit created;
- business booking activity;
- business finance event.

### Training Centres

- referred provider joined;
- referred provider activated;
- eligible partner earning created;
- partner payout processed.

---

# 7. Booking Notification Matrix

| Event | Customer | Provider | Assigned Staff | Admin |
|---|---:|---:|---:|---:|
| Booking created | ✓ | ✓ | if assigned | optional |
| Booking accepted | ✓ | ✓ | ✓ | — |
| Booking declined | ✓ | ✓ | — | — |
| Booking reassigned | ✓ | ✓ | ✓ | — |
| Booking reminder | ✓ | ✓ | ✓ | — |
| Booking started | ✓ | ✓ | ✓ | — |
| Booking completed | ✓ | ✓ | ✓ | — |
| Booking cancelled | ✓ | ✓ | ✓ | where relevant |
| No-show | ✓ | ✓ | ✓ | where relevant |

Channel selection depends on event importance and user preferences.

---

# 8. Customer Notifications

Important customer events include:

### Booking

> Your booking with [Provider] is confirmed for [Date] at [Time].

### Reminder

> Your [Service] booking starts in 30 minutes.

### Provider response

> [Provider] has accepted your booking.

### Custom request

> [Provider] sent you a proposal for your custom request.

### Payment

> Your Waasha Payment was successful.

### Cash

> Cash payment selected. Cash change requested: R50.

### Review

> Your service is complete. Share your experience with a review.

---

# 9. Provider Notifications

Important provider events include:

### New booking

> New booking request: [Service] with [Customer] at [Time].

### Accepted

> Booking confirmed for [Customer] at [Time].

### Cash

> Cash change requested. Customer is expected to tender R200. Bring R50 change.

### Custom request

> New custom request available in your area.

### Proposal

> Your proposal was selected by [Customer].

### Payment

> Payment for booking [Reference] has been confirmed.

---

# 10. Team Member Notifications

For T2/T3:

### Assignment

> You have been assigned a [Service] booking at [Time].

### Reassignment

> Booking [Reference] has been reassigned to you.

### Customer update

> Customer updated the booking details.

### Reminder

> Your assigned service starts in 30 minutes.

Team members should not receive financial or business information beyond their permissions.

---

# 11. Business Notifications

T3 business notifications may include:

- new booking;
- staff assignment;
- staff acceptance/decline;
- business-unit activity;
- payment activity;
- refund;
- payout;
- operational exception.

Business owners should be able to configure which operational notifications are sent to managers.

---

# 12. Notification Preferences

Users should have control over notification preferences.

Preference groups:

```text
Booking Updates
Reminders
Payments
Custom Requests
Reviews
Marketing
Account & Security
Business Operations
```

Security and critical account notifications should not be fully disableable where necessary.

---

# 13. Channel Preferences

A user may configure preferred channels where available.

Example:

```text
Booking confirmations
✓ In-App
✓ Push
✓ Email
□ SMS

Marketing
□ In-App
□ Push
✓ Email
□ SMS
```

The system should distinguish:

- required transactional notifications;
- optional operational notifications;
- marketing communications.

---

# 14. Notification Priority

Use priority levels:

### Critical

Examples:

- security event;
- payment failure affecting a booking;
- urgent cancellation.

### High

Examples:

- booking accepted;
- booking cancelled;
- custom proposal received.

### Normal

Examples:

- booking reminder;
- review request.

### Low

Examples:

- non-urgent operational updates.

Priority can influence delivery channels and retry behaviour.

---

# 15. Quiet Hours

Users may configure quiet hours for non-critical notifications.

Example:

```text
Quiet hours:
22:00 → 07:00
```

During quiet hours:

- low/normal notifications can be delayed;
- critical notifications may still be delivered;
- scheduled reminders should respect the configured policy.

The exact quiet-hour behaviour must be configurable.

---

# 16. Notification Centre

The Waasha notification centre should provide:

- unread count;
- read/unread state;
- notification grouping;
- timestamps;
- category filters;
- deep links;
- delete/archive where appropriate.

Example:

```text
Notifications

● Booking confirmed
  Today, 14:02

● Custom proposal received
  Today, 11:45

○ Review request
  Yesterday, 18:20
```

Selecting a notification should navigate to the relevant Waasha object.

---

# 17. Deep Linking

Notifications should contain a safe internal destination.

Examples:

```text
Booking notification
→ /bookings/:id

Custom request
→ /custom-requests/:id

Payment
→ /payments/:id

Review
→ /reviews/create/:bookingId
```

The backend must still verify authorization when the destination is opened.

A user must never gain access to a protected object merely because they received or modified a notification URL.

---

# 18. Push Device Registration

A user can have multiple devices.

Store:

- user ID;
- device ID;
- push token;
- platform;
- app version;
- last active timestamp;
- notification permission state.

Example:

```text
User
 ├── iPhone
 ├── Android
 └── Web
```

A push notification may be delivered to all eligible active devices according to policy.

---

# 19. Invalid Push Tokens

The system must handle:

- expired tokens;
- revoked tokens;
- invalid tokens;
- uninstalled applications.

Invalid tokens should be marked inactive rather than causing repeated failures.

---

# 20. Email Architecture

Use a dedicated email service abstraction.

Conceptually:

```text
EmailService
   ↓
EmailProvider
```

Possible provider implementations can be introduced later without changing booking logic.

Email messages should support:

- HTML;
- plain text fallback;
- branded templates;
- dynamic data;
- unsubscribe rules for marketing;
- delivery tracking where available.

---

# 21. Email Categories

### Transactional

Examples:

- booking confirmation;
- payment receipt;
- password reset;
- verification.

Transactional emails are required for core product operation where applicable.

### Operational

Examples:

- team assignment;
- payout notification;
- weekly business summary.

### Marketing

Examples:

- promotions;
- product announcements;
- educational campaigns.

Marketing communications must have appropriate consent/preferences.

---

# 22. SMS Architecture

Future-ready interface:

```text
SmsService
   ↓
SmsProvider
```

SMS should be used sparingly because it has a direct cost and is intrusive compared with in-app notifications.

Possible rules:

- critical booking change;
- reminder;
- verification;
- account recovery.

Admin should be able to enable/disable SMS globally.

---

# 23. WhatsApp Architecture

Future-ready interface:

```text
WhatsAppService
   ↓
WhatsAppProvider
```

Messages should be template-driven.

Potential templates:

```text
BOOKING_CONFIRMED
BOOKING_REMINDER
BOOKING_CANCELLED
PAYMENT_CONFIRMED
CUSTOM_PROPOSAL_RECEIVED
```

The system should store provider message IDs and delivery status where supported.

---

# 24. Notification Templates

Templates should be centralized.

Example:

```text
Template:
BOOKING_CONFIRMED

Variables:
provider_name
service_name
booking_date
booking_time
location
booking_reference
```

The same event can produce different channel content:

### In-App

Short notification.

### Push

Short action-oriented message.

### Email

Detailed confirmation.

### SMS

Compact transactional message.

### WhatsApp

Template-based message with relevant details.

---

# 25. Template Versioning

Templates should be versioned.

Example:

```text
BOOKING_CONFIRMED
Version 1
Version 2
```

This allows Waasha to improve communication without changing historical notification records.

---

# 26. Localization

Waasha is South Africa-first but globally ready.

Notification templates should support localization.

Store:

```text
language
locale
timezone
currency
```

User preference should determine the preferred language where translations are available.

Do not embed language-specific text throughout backend business logic.

---

# 27. Timezone Handling

All important timestamps should be stored in a consistent server/database representation, while user-facing notifications use the relevant local timezone.

Example:

```text
Booking:
2026-09-10 15:00 UTC

Customer display:
17:00 South Africa time
```

Do not assume the customer's timezone is always the provider's timezone.

Booking location timezone should be considered for service-time communications.

---

# 28. Reminder Engine

Waasha should support configurable reminders.

Example:

```text
24 hours before
2 hours before
30 minutes before
```

Not every event needs every reminder.

Reminder rules should be configurable by event type.

---

# 29. Reminder Idempotency

A reminder must not be sent twice because of:

- worker retry;
- duplicate scheduling;
- server restart;
- queue replay.

Store a unique reminder key.

Example:

```text
booking_id
+
reminder_type
+
scheduled_time
```

---

# 30. Notification Queue

Notification delivery should use asynchronous processing where appropriate.

Architecture:

```text
Application Event
      ↓
Notification Queue
      ↓
Worker
      ↓
Channel Provider
```

This prevents a slow email/SMS/push provider from blocking booking transactions.

Critical booking state changes should complete independently of notification delivery.

---

# 31. Retry Strategy

Retry transient delivery failures.

Example:

```text
Attempt 1
↓
Attempt 2
↓
Attempt 3
↓
Failed / Dead Letter
```

Do not endlessly retry permanent failures.

Examples of permanent failures:

- invalid email;
- invalid push token;
- invalid destination.

---

# 32. Dead-Letter Handling

Failed notifications that cannot be delivered should be stored for investigation.

Admin/operations should be able to see:

- event;
- recipient;
- channel;
- failure reason;
- attempts;
- timestamps.

Retry should be possible when appropriate.

---

# 33. Notification Deduplication

Users should not receive duplicate notifications for the same event.

Example:

A booking confirmation should not create:

- two push notifications;
- two emails;
- two in-app notifications

because the booking event was processed twice.

Use event IDs and notification keys.

---

# 34. Communication Audit Trail

Store notification activity:

```text
Notification ID
Event ID
Recipient
Channel
Template
Status
Attempt count
Provider reference
Created at
Sent at
Delivered at
Read at
Failure reason
```

This allows support teams to answer:

> Did Waasha send the notification?

---

# 35. Delivery States

Recommended states:

```text
CREATED
QUEUED
PROCESSING
SENT
DELIVERED
READ
FAILED
CANCELLED
```

Not every channel supports every state.

For example, email may support delivery but not reliable read tracking.

---

# 36. Notification Data Privacy

Notifications must not expose unnecessary sensitive information.

Avoid putting sensitive data in:

- push notification previews;
- email subject lines;
- SMS;
- WhatsApp messages.

Example:

Prefer:

> Your booking has an update.

over:

> Your private address booking with [full address] has changed.

Detailed information should require authenticated access to Waasha.

---

# 37. Customer/Provider Communication Boundary

The notification system is not automatically a private chat system.

Booking notifications can communicate operational updates.

If direct customer-provider messaging is introduced later, it should be designed as a separate communication module with:

- moderation;
- privacy;
- reporting;
- blocking;
- audit requirements.

Do not silently turn notifications into unrestricted chat.

---

# 38. Custom Request Notifications

Custom request flow:

```text
Customer creates request
      ↓
Eligible providers notified
      ↓
Provider submits proposal
      ↓
Customer notified
      ↓
Customer accepts proposal
      ↓
Provider notified
      ↓
Booking created
```

Providers should only receive requests for which they are eligible according to:

- category;
- service capability;
- location;
- custom-request preference;
- availability/other configured criteria.

---

# 39. Cash Change Notifications

When a customer requests change:

```text
Customer
   ↓
Booking
   ↓
Cash Change Requested
   ↓
Provider Notification
```

Provider message:

> Cash change requested. Customer is expected to tender R200. Bring R50 change.

Customer message:

> Cash change requested. Your provider has been notified.

The system must not imply that Waasha physically controls or guarantees the cash.

---

# 40. Payment Notifications

### Successful digital payment

Customer:

> Payment successful for your booking.

Provider/business:

> Payment confirmed for booking [Reference].

### Failed payment

Customer:

> Your payment could not be completed. Please try again.

Provider should not receive unnecessary payment-sensitive details.

### Refund

Customer:

> Your refund has been processed.

Provider/business:

> A refund was processed for booking [Reference].

---

# 41. Payout Notifications

Provider/business:

> Your payout of R1,250 has been processed.

Training centre:

> Your partner payout of R250 has been processed.

Sensitive banking information must never appear in notification content.

---

# 42. Review Notifications

After a completed eligible service:

```text
SERVICE_COMPLETED
      ↓
REVIEW_ELIGIBILITY
      ↓
REVIEW_NOTIFICATION
```

Example:

> How was your experience? Leave a review for [Provider].

Reminder frequency must be limited to avoid spam.

---

# 43. Marketing Communication

Marketing notifications are separate from transactional notifications.

Users should be able to manage marketing preferences.

Marketing must not be used to disguise required service notifications.

Examples:

### Transactional

> Your booking is confirmed.

### Marketing

> Discover new providers near you.

These must remain separate categories.

---

# 44. Admin Communication

Admin may send targeted operational notifications when necessary.

Examples:

- platform maintenance;
- security notice;
- account verification issue;
- policy change;
- important service disruption.

Admin broadcasts should have:

- audience selection;
- message;
- channel selection;
- schedule;
- audit record;
- delivery tracking.

Marketing broadcasts require appropriate consent controls.

---

# 45. Role-Based Notification Access

A notification must only be created for an authorized recipient.

Examples:

- customer sees their bookings;
- provider sees their bookings;
- team member sees assigned/relevant bookings;
- business owner sees business notifications;
- training centre sees attributed partner events;
- admin sees platform-level events.

Never send another user's private information because they are associated with the same booking unless their role permits it.

---

# 46. API Boundaries

Representative endpoints:

```text
GET    /notifications
POST   /notifications/:id/read
POST   /notifications/read-all
DELETE /notifications/:id

GET    /notification-preferences
PATCH  /notification-preferences

POST   /devices/push
DELETE /devices/push/:id

GET    /admin/notifications
POST   /admin/notifications/broadcast
```

Internal event/queue endpoints should not be exposed as public APIs.

---

# 47. Database Components

Recommended structures:

```text
notifications
notification_events
notification_deliveries
notification_templates
notification_template_versions
notification_preferences
push_devices
notification_queue
notification_failures
communication_logs
```

Names should align with the final database implementation.

---

# 48. Backend Modules

Recommended boundaries:

```text
Notification Module
├── NotificationService
├── NotificationEventService
├── TemplateService
├── PreferenceService
├── DeliveryRouter
├── InAppChannel
├── PushChannel
├── EmailChannel
├── SmsChannel
├── WhatsAppChannel
├── ReminderService
├── QueueWorker
└── CommunicationAuditService
```

Channel implementations should remain replaceable.

---

# 49. Observability

Track:

- notification creation rate;
- delivery success rate;
- failure rate;
- channel performance;
- queue depth;
- processing latency;
- retry rate;
- invalid destination rate.

Alerts should identify major communication failures.

Example:

> Push delivery failure rate exceeds configured threshold.

---

# 50. Performance

Notification delivery should not block core transactional requests.

For example:

```text
Customer confirms booking
        ↓
Booking saved
        ↓
Response returned
        ↓
Notification queued
        ↓
Push/email delivered
```

If email is temporarily unavailable, the booking should remain valid.

---

# 51. Offline-Tolerant Behaviour

If the customer/provider is temporarily offline:

- in-app notification remains stored;
- push may be delivered when connectivity returns;
- app can synchronize unread notifications;
- notification read state can synchronize later.

Offline clients must not invent notification events.

Server-side events remain authoritative.

---

# 52. Security Requirements

Required controls:

- authenticated notification access;
- object-level authorization;
- secure device registration;
- protected admin broadcast controls;
- signed/validated webhook handling for external channels where applicable;
- rate limiting;
- anti-spam controls;
- secure template variables;
- no sensitive data leakage;
- audit logging.

---

# 53. Abuse Prevention

The communication system must prevent:

- notification flooding;
- repeated custom-request spam;
- excessive reminders;
- malicious broadcast activity;
- unauthorized notifications;
- repeated failed delivery loops.

Use:

- rate limits;
- notification grouping;
- deduplication;
- cooldowns;
- permission controls.

---

# 54. Notification Grouping

Where multiple events occur quickly, the system may group them.

Example:

Instead of:

```text
Booking assigned
Booking accepted
Booking reminder
```

all arriving separately, the notification centre can group related events where appropriate.

Do not group critical security or financial notifications in a way that hides important information.

---

# 55. Example End-to-End Booking Communication

## Customer creates booking

```text
Customer
 ↓
Booking Created
 ↓
Provider notified
 ↓
Provider accepts
 ↓
Customer notified
 ↓
Payment processed if applicable
 ↓
Payment notification
 ↓
Reminder
 ↓
Service starts
 ↓
Service completed
 ↓
Review request
```

The booking engine remains responsible for booking state.

The notification system communicates state changes.

---

# 56. Example Custom Request Communication

```text
Customer creates request
 ↓
Eligible providers notified
 ↓
Provider submits proposal
 ↓
Customer notified
 ↓
Customer selects proposal
 ↓
Provider notified
 ↓
Booking created
 ↓
Standard booking notifications begin
```

---

# 57. Communication Preferences Must Not Break Core Operations

If a user disables push:

```text
Push = OFF
In-App = ON
```

The booking still works.

If email is disabled for optional operational updates:

```text
Email = OFF
In-App = ON
```

Required security/account communication may still be delivered according to platform policy.

---

# 58. Definition of Done

The notification/communication system is complete when:

- notification events are separated from business logic;
- in-app notifications work;
- push notifications work;
- email notifications work;
- SMS interface is ready for future integration;
- WhatsApp interface is ready for future integration;
- notification preferences exist;
- required/optional notification categories are separated;
- templates are centralized;
- templates are versioned;
- notification delivery is asynchronous where appropriate;
- retries exist;
- dead-letter handling exists;
- duplicate notifications are prevented;
- push devices are managed;
- deep links are authorization-safe;
- booking reminders work;
- custom-request notifications work;
- cash-change notifications work;
- payment notifications work;
- refund/payout notifications work;
- review notifications work;
- business/team notifications respect permissions;
- admin broadcasts are controlled and audited;
- localization/timezones are supported;
- notification activity is auditable;
- sensitive data is protected;
- notification performance is observable;
- automated tests cover core event/channel behaviour.

---

# 59. Source of Truth

This document must be implemented together with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`
- `WAASHA_PROVIDER_TIERS.md`
- `WAASHA_PAYMENT_FINANCE_ARCHITECTURE.md`

The Stitch export remains the visual source of truth for designed screens.

Stitch copy corrections remain:

- **“Secure Checkout”** instead of “T3 Encrypted Checkout”
- **“Cash change requested”** instead of “Guaranteed Cash Change”

---


<!-- ============================================================ -->
<!-- DOCUMENT 08: AUTHENTICATION, AUTHORIZATION & SECURITY -->
<!-- ============================================================ -->

# WAASHA AUTHENTICATION, AUTHORIZATION & SECURITY
## Identity → Access → Verification → Sessions → Tenant Isolation → Audit

**Document:** Authentication, Authorization & Security Architecture Specification  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Build specification  
**Scope:** Complete production product  
**Primary market:** South Africa, globally extensible

---

# 1. Purpose

This document defines the identity, authentication, authorization and security foundation for Waasha.

The security model must protect:

- customers;
- individual providers;
- team members;
- businesses;
- training-centre partners;
- administrators;
- bookings;
- customer data;
- provider data;
- financial information;
- uploaded media;
- platform configuration.

Security must be enforced by the backend and treated as a core product requirement, not as a frontend feature.

---

# 2. Security Principles

Waasha follows these principles:

1. **Backend is authoritative.**
2. **Least privilege by default.**
3. **One identity per user.**
4. **Authentication and authorization are separate.**
5. **Provider tier is not a security role.**
6. **Business/tenant boundaries are enforced server-side.**
7. **Sensitive operations require stronger controls.**
8. **Financial operations are separately permissioned.**
9. **Historical/audit data is protected from silent modification.**
10. **Frontend visibility never substitutes for backend authorization.**

---

# 3. Identity Model

A single user account represents one identity.

Conceptually:

```text
User
 ├── Customer Profile
 ├── Provider Profile
 ├── Team Membership
 ├── Business Membership
 ├── Training Centre Membership
 └── Admin Role
```

A user may have more than one legitimate capability without creating duplicate identities.

Example:

A person can be:

- a customer;
- an individual provider;
- a member of a business.

The identity remains the same user.

---

# 4. Account Types

Waasha supports these primary account contexts:

### Customer

Books and uses services.

### Provider

Offers services.

### Team Member

Performs services on behalf of a T2/T3 provider.

### Business User

Manages a T3 business according to assigned permissions.

### Training Centre User

Manages training-centre partner activity.

### Admin

Manages the Waasha platform.

Account context and permissions must be resolved server-side.

---

# 5. Provider Tier Is Not a Role

The provider tiers:

```text
T1 Individual
T2 Teams
T3 Business
```

define capabilities.

They do **not** define authorization by themselves.

Example:

```text
T3 ≠ Admin
T3 ≠ unrestricted financial access
T2 ≠ Manager automatically
```

A T3 business owner still requires explicit permissions for protected operations.

---

# 6. Role Model

Recommended roles:

```text
CUSTOMER
PROVIDER_OWNER
TEAM_MEMBER
BUSINESS_OWNER
BUSINESS_MANAGER
TRAINING_CENTRE_ADMIN
PLATFORM_ADMIN
PLATFORM_SUPPORT
FINANCE_ADMIN
```

Roles may be expanded later, but permissions should remain the primary authorization mechanism.

---

# 7. Permission Model

Permissions should use granular capabilities.

Examples:

```text
profile.view
profile.edit

services.view
services.create
services.edit
services.delete

bookings.view
bookings.create
bookings.accept
bookings.decline
bookings.assign
bookings.complete
bookings.cancel

team.view
team.create
team.edit
team.remove

business.view
business.edit
business.units.manage
business.staff.manage

finance.view
finance.refund
finance.payout.view
finance.adjust

admin.users.manage
admin.providers.verify
admin.finance.manage
admin.settings.manage
```

Do not rely on broad role names alone.

---

# 8. Authorization Layers

Waasha should enforce authorization at multiple levels:

```text
Authentication
      ↓
Role/Permission
      ↓
Resource Ownership
      ↓
Business/Tenant Scope
      ↓
Action Permission
```

Example:

A business manager may have:

```text
bookings.view = true
```

but only for:

```text
business_id = their business
```

and not another business.

---

# 9. Authentication Methods

Initial authentication should support:

- email + password;
- phone number verification where implemented;
- secure password reset;
- email verification;
- session/token authentication.

Future authentication providers can be added without changing the authorization model.

---

# 10. Registration

Registration should collect only information required for the selected account flow.

Customer:

```text
Email / phone
Password
Basic profile
```

Provider:

```text
Identity
Provider profile
Category
Services
Location
Verification information where required
```

Business:

```text
Business information
Owner identity
Business units
Staff
Categories
Verification information where required
```

Do not collect unnecessary sensitive information during initial registration.

---

# 11. Password Requirements

Passwords must be stored using a modern password-hashing algorithm.

Never store:

- plaintext passwords;
- reversible password encryption;
- passwords in logs.

Password policy should enforce appropriate minimum strength without making legitimate users unable to register.

The exact password policy should be configurable.

---

# 12. Password Hashing

Use a modern adaptive password hashing algorithm such as:

- Argon2id; or
- another currently approved secure password-hashing algorithm.

Never use:

- MD5;
- SHA-1;
- unsalted SHA-256;
- custom hashing algorithms.

Each password hash should include a unique salt as provided by the hashing implementation.

---

# 13. Email Verification

Where email authentication is used:

```text
Account created
 ↓
Verification token generated
 ↓
Verification email sent
 ↓
User clicks secure link
 ↓
Backend validates token
 ↓
Email marked verified
```

Verification tokens must:

- expire;
- be single-use;
- be cryptographically random;
- not reveal sensitive information.

---

# 14. Phone Verification

Where phone authentication/verification is enabled:

```text
Phone entered
 ↓
Verification challenge
 ↓
One-time code
 ↓
Verification
```

Codes must:

- expire quickly;
- have attempt limits;
- be rate limited;
- never be logged in plaintext;
- be invalidated after successful use.

---

# 15. Login

Login flow:

```text
Credentials submitted
 ↓
Rate-limit check
 ↓
Credential verification
 ↓
Account status check
 ↓
Session issued
 ↓
Security event recorded
```

Possible account states:

```text
ACTIVE
PENDING_VERIFICATION
SUSPENDED
LOCKED
DEACTIVATED
```

Suspended/deactivated accounts must not receive normal authenticated access.

---

# 16. Session Architecture

Use secure session/token handling.

For web applications:

- secure cookies are preferred where appropriate;
- `HttpOnly`;
- `Secure`;
- appropriate `SameSite` policy.

For mobile/API clients:

- use short-lived access tokens;
- use refresh-token rotation where applicable;
- securely store tokens on the device.

Never store long-lived sensitive tokens in insecure browser storage where a safer mechanism is available.

---

# 17. Access Token

Access tokens should be:

- short-lived;
- scoped;
- validated server-side;
- invalidated through session/revocation mechanisms when required.

Do not place sensitive user information unnecessarily inside tokens.

---

# 18. Refresh Tokens

If refresh tokens are used:

- rotate them;
- detect reuse;
- store secure server-side references/hashes where appropriate;
- revoke compromised token families;
- associate sessions with a device/context where practical.

A stolen refresh token should not provide indefinite access.

---

# 19. Session Management

Users should be able to:

- view active sessions/devices;
- revoke sessions;
- log out;
- log out of other sessions where supported.

Security-sensitive events should revoke appropriate sessions.

Examples:

- password reset;
- confirmed account compromise;
- admin-triggered security reset.

---

# 20. Logout

Logout must invalidate the relevant session/token.

For multi-device users:

```text
Logout this device
```

should not necessarily log the user out everywhere.

Provide a secure:

```text
Log out of all devices
```

option.

---

# 21. Password Reset

Password reset flow:

```text
Forgot password
 ↓
Identity challenge
 ↓
Secure reset token
 ↓
Password update
 ↓
Token invalidated
 ↓
Relevant sessions revoked
```

Do not reveal whether a particular email address exists through error messages.

Preferred response:

> If an account exists, we'll send instructions to reset your password.

---

# 22. Multi-Factor Authentication

MFA should be architecturally supported.

Priority:

- administrators;
- finance administrators;
- high-privilege business users.

Possible methods:

- authenticator application;
- passkey/WebAuthn;
- secure verification channel.

MFA should be introduced without changing the core authorization model.

---

# 23. Admin Security

Admin accounts require stronger security controls.

Recommended:

- mandatory MFA;
- shorter session lifetime;
- stronger login monitoring;
- stricter rate limits;
- audit logging;
- elevated-action confirmation.

High-risk admin operations may require re-authentication.

---

# 24. Sensitive Action Re-Authentication

Certain operations should require recent authentication or step-up authentication.

Examples:

- changing payout/bank information;
- changing account email;
- changing phone number;
- deleting account;
- changing business ownership;
- issuing financial adjustments;
- issuing refunds;
- changing platform commission;
- changing admin privileges.

---

# 25. Account Recovery

Account recovery must protect against account takeover.

Do not rely solely on easily guessed personal information.

Recovery mechanisms should use:

- verified email;
- verified phone;
- secure recovery tokens;
- MFA where enabled.

Recovery events should be audited.

---

# 26. Account Status

Supported states:

```text
PENDING_VERIFICATION
ACTIVE
SUSPENDED
LOCKED
DEACTIVATED
DELETED
```

Deletion should normally be a controlled lifecycle rather than immediately physically destroying all historical financial/booking records.

---

# 27. Soft Deletion

Use soft deletion where records are required for:

- financial history;
- legal/audit requirements;
- booking history;
- dispute handling;
- platform integrity.

Personal data deletion/anonymization should follow applicable legal requirements.

---

# 28. Authorization: Object-Level Security

Every protected resource must be checked against the requesting user.

Example:

```text
GET /bookings/123
```

must validate:

```text
Is user:
- the customer?
- the provider?
- assigned staff?
- authorized business user?
- authorized admin?
```

If not:

```text
403 Forbidden
```

or an appropriate not-found response where hiding resource existence is preferable.

---

# 29. Tenant Isolation

T3 businesses are separate tenants for authorization purposes.

Every business-scoped query must include a valid business context.

Example:

```text
business_id = authenticated_user.authorized_business_id
```

Never trust:

```text
business_id
```

supplied by the client without validating access.

---

# 30. Cross-Tenant Protection

A user from Business A must never access Business B's:

- customers;
- bookings;
- staff;
- services;
- financial records;
- analytics;
- locations;
- uploaded files.

Automated tests must explicitly attempt cross-tenant access and verify rejection.

---

# 31. Team Isolation

T2 team members should only access information permitted by:

- team membership;
- assigned role;
- assigned permissions;
- relevant booking/service scope.

Removing a team member must immediately remove active team access.

---

# 32. Business Staff Access

For T3:

```text
Business
 ↓
Business Unit
 ↓
Staff Membership
 ↓
Permissions
```

A staff member assigned to one business unit must not automatically gain access to every business unit unless explicitly authorized.

---

# 33. Customer Data Protection

Customer information should be disclosed only where operationally necessary.

For example, a provider may need:

- customer name;
- booking details;
- relevant service information;
- service location when applicable.

The provider does not automatically need unrelated:

- payment information;
- account history;
- other bookings;
- private profile data.

---

# 34. Provider Data Protection

Customers should only receive provider information intended for marketplace use.

Do not expose:

- private account settings;
- payout/bank details;
- internal staff records;
- admin notes;
- private verification documents.

---

# 35. Financial Data Protection

Financial data requires dedicated authorization.

Examples:

```text
provider.earnings.view
business.finance.view
business.payouts.view
admin.finance.manage
```

A team member must not gain financial access merely because they can view a booking.

---

# 36. Payment Data

Waasha should minimize payment-card data exposure.

Prefer:

```text
Customer
 ↓
Paystack-hosted/tokenized flow
 ↓
Payment reference
 ↓
Waasha
```

Avoid storing raw:

- card numbers;
- CVV;
- PIN;
- sensitive card authentication data.

Payment credentials should remain with the appropriate payment provider.

---

# 37. Secrets Management

Never store production secrets in:

- source code;
- Git repositories;
- frontend bundles;
- screenshots;
- logs;
- public configuration files.

Use secure environment/secret management.

Examples:

```text
DATABASE_PASSWORD
PAYSTACK_SECRET_KEY
JWT_SECRET
EMAIL_PROVIDER_KEY
STORAGE_SECRET
```

Production and development secrets must be separate.

---

# 38. Environment Separation

Minimum environments:

```text
Development
Staging
Production
```

Each environment should have separate:

- databases;
- credentials;
- API keys where practical;
- storage;
- logs;
- notification destinations.

Never point local development at production financial data.

---

# 39. API Security

Every protected API endpoint must perform:

1. authentication;
2. authorization;
3. input validation;
4. resource ownership/scope validation.

Public endpoints must still use:

- rate limiting;
- validation;
- abuse protection.

---

# 40. Input Validation

Validate all external input.

Examples:

- IDs;
- dates;
- prices;
- coordinates;
- image metadata;
- filenames;
- booking quantities;
- tier values;
- payment amounts.

Never trust:

```text
price
commission
provider_id
business_id
role
tier
payment_status
```

sent by the client.

These must be derived or validated server-side.

---

# 41. Mass Assignment Protection

Do not allow clients to update arbitrary database fields.

Bad:

```text
PATCH /provider
{
  "tier": "T3",
  "is_admin": true
}
```

The backend must explicitly whitelist allowed fields.

---

# 42. CSRF Protection

For cookie-authenticated web endpoints, use appropriate CSRF protection.

For token-authenticated APIs, use an appropriate architecture that prevents token theft and cross-site misuse.

---

# 43. CORS

CORS must use an explicit allowlist.

Do not use unrestricted production:

```text
Access-Control-Allow-Origin: *
```

for authenticated/private APIs unless the architecture genuinely requires it and has been security-reviewed.

---

# 44. Rate Limiting

Rate limit:

- login;
- password reset;
- verification code requests;
- registration;
- booking creation;
- custom requests;
- proposal submissions;
- payment initialization;
- refunds;
- admin endpoints;
- notification/broadcast operations.

Use stricter limits for sensitive authentication endpoints.

---

# 45. Brute-Force Protection

Repeated failed authentication should trigger controls such as:

- progressive delays;
- temporary lockout;
- CAPTCHA/risk challenge where appropriate;
- IP/device monitoring.

Do not create a permanent account lockout that becomes an easy denial-of-service mechanism.

---

# 46. Enumeration Protection

Avoid revealing whether an account, email, phone number or private resource exists.

Examples:

Password reset:

> If an account exists, we'll send instructions.

Login errors should not reveal excessive internal account state.

---

# 47. File Upload Security

Waasha supports provider/service and customer custom-request images.

Uploads must be:

- size limited;
- type validated;
- content validated;
- renamed;
- stored outside executable application paths;
- access controlled.

Do not trust a file's extension alone.

---

# 48. Media Authorization

Private media such as verification documents or proof-of-payment must not use unrestricted public URLs.

Use:

- authenticated access;
- signed temporary URLs;
- permission checks.

Marketplace portfolio images may be public if intentionally published.

---

# 49. Image Limits

Current product limits:

### Service/style

Maximum **3 images**.

### Custom request

Maximum **3 images**.

These limits must be enforced:

- frontend;
- API;
- database/service layer where appropriate.

Backend enforcement is mandatory.

---

# 50. Malware/File Safety

Uploaded files should be checked for:

- allowed MIME type;
- extension mismatch;
- suspicious content;
- executable content.

Where appropriate, integrate malware scanning for uploaded documents.

---

# 51. Location Privacy

Waasha uses location for discovery and service delivery.

Customer location should be disclosed only when operationally necessary.

Examples:

- marketplace search can use approximate/current location;
- home-service bookings may require exact service location after appropriate booking confirmation;
- unrelated providers must not receive private customer addresses.

---

# 52. Location Authorization

Provider location can be:

- fixed business/address location;
- provider-selected location;
- live location where enabled.

Location changes must be authenticated and validated.

Live location should only be active when explicitly enabled.

---

# 53. Audit Logging

Security-sensitive actions must be audited.

Examples:

```text
LOGIN_SUCCESS
LOGIN_FAILURE
PASSWORD_CHANGED
PASSWORD_RESET
EMAIL_CHANGED
PHONE_CHANGED
MFA_CHANGED
SESSION_REVOKED
ROLE_CHANGED
PERMISSION_CHANGED
TIER_CHANGED
BUSINESS_OWNERSHIP_CHANGED
BANK_DETAILS_CHANGED
REFUND_CREATED
PAYOUT_CHANGED
ADMIN_ACTION
```

---

# 54. Audit Log Integrity

Audit records should be:

- append-oriented;
- protected from ordinary users;
- timestamped;
- associated with actor;
- associated with resource;
- searchable by authorized admins.

Users must not be able to delete their own security audit history.

---

# 55. Security Monitoring

Monitor for:

- repeated failed logins;
- suspicious session activity;
- unusual privilege changes;
- repeated payment attempts;
- cross-tenant access attempts;
- abnormal API activity;
- excessive verification requests;
- admin account anomalies.

High-risk events should generate internal alerts.

---

# 56. Admin Support Access

Support staff should not automatically receive unrestricted customer/provider data.

Use:

- explicit support role;
- limited permissions;
- time-bound elevation where practical;
- audit logging.

Support access should be traceable to a legitimate operational reason.

---

# 57. Data Encryption

Use encryption:

### In transit

TLS/HTTPS.

### At rest

Use infrastructure/database/storage encryption where available.

Sensitive secrets should receive stronger secret-management controls.

---

# 58. Database Security

Production database should:

- not be directly exposed to the public internet where avoidable;
- use separate credentials by environment;
- use least-privilege database accounts;
- restrict administrative access;
- maintain backups;
- encrypt backups;
- monitor access.

Application users should not have unrestricted database administration privileges.

---

# 59. Database Backup

Backups should be:

- automated;
- encrypted;
- tested;
- retained according to policy;
- isolated from the primary environment.

A backup that has never been restored successfully should not be considered a reliable recovery strategy.

---

# 60. Disaster Recovery

Waasha should define:

- recovery point objective (RPO);
- recovery time objective (RTO);
- backup frequency;
- restore procedures;
- incident ownership.

Financial and booking data require especially strong recovery guarantees.

---

# 61. Error Handling

Production errors must not expose:

- stack traces;
- SQL queries;
- secret values;
- internal paths;
- tokens;
- database credentials.

Users should receive safe messages.

Detailed errors should go to secure logs.

---

# 62. Logging Rules

Never log:

- passwords;
- raw access tokens;
- refresh tokens;
- card numbers;
- CVV;
- private banking details;
- verification codes.

Logs should use:

- request IDs;
- user IDs where appropriate;
- resource IDs;
- sanitized metadata.

---

# 63. Security Headers

Web applications should use appropriate security headers such as:

- Content-Security-Policy;
- Strict-Transport-Security;
- X-Content-Type-Options;
- Referrer-Policy;
- appropriate frame/embedding protection.

Exact configuration should match the frontend architecture.

---

# 64. Dependency Security

Production dependencies must be:

- tracked;
- updated;
- vulnerability-scanned;
- reviewed before major upgrades.

Do not ignore critical security vulnerabilities simply because the application currently works.

---

# 65. Supply-Chain Security

Protect the build pipeline through:

- locked dependency versions where appropriate;
- dependency auditing;
- protected Git branches;
- protected secrets;
- controlled CI/CD;
- minimal production permissions.

---

# 66. Git Security

Never commit:

```text
.env
production secrets
private keys
Paystack secret keys
database passwords
JWT secrets
```

Use secret scanning where possible.

If a secret is accidentally committed:

1. revoke it;
2. rotate it;
3. remove it from active history where appropriate;
4. investigate exposure.

Deleting the visible file alone is not sufficient.

---

# 67. API Idempotency

Financial and sensitive mutation endpoints should support idempotency where appropriate.

Examples:

- payment initialization;
- refund creation;
- payout creation;
- booking creation;
- certain administrative actions.

This prevents duplicate actions during retries.

---

# 68. Concurrency Security

Protect against simultaneous requests.

Examples:

Two users attempt to:

- book the same slot;
- assign the same team member;
- process the same payment;
- issue the same refund.

Use:

- transactions;
- locking where appropriate;
- unique constraints;
- idempotency;
- state validation.

---

# 69. Business Ownership

T3 business ownership changes are sensitive.

Require:

- authenticated owner/admin;
- explicit authorization;
- audit record;
- verification/confirmation where appropriate.

Ownership transfer must not silently remove historical financial responsibility.

---

# 70. Team Member Removal

When a team member is removed:

- revoke team access;
- invalidate relevant permissions;
- prevent new assignments;
- preserve historical booking records;
- preserve historical attribution.

Existing completed bookings must retain the original assigned provider/team member.

---

# 71. Provider Suspension

A suspended provider should generally:

- stop receiving new bookings;
- stop publishing new services where appropriate;
- retain historical bookings;
- retain financial records;
- retain review history;
- be prevented from performing restricted actions.

Existing bookings should follow defined cancellation/reassignment policies.

---

# 72. Business Suspension

A suspended T3 business should:

- stop new marketplace activity;
- stop new bookings where appropriate;
- preserve historical records;
- preserve financial records;
- preserve audit history.

Admin must have controlled tools to manage the operational consequences.

---

# 73. Verification

Provider/business verification should be separate from authentication.

Possible verification states:

```text
UNVERIFIED
PENDING
VERIFIED
REJECTED
EXPIRED
SUSPENDED
```

Verification documents must be securely stored.

Verification status should not automatically grant unrestricted privileges.

---

# 74. Training Centre Verification

Training-centre partner accounts should have separate verification.

A verified training centre may receive partner capabilities, but only according to explicit permissions.

Training-centre attribution does not grant marketplace ranking preference.

---

# 75. Security and Provider Tiers

Tier upgrade/downgrade must require authorization.

A provider cannot upgrade by sending:

```text
tier = T3
```

to a public API.

The backend must:

1. authenticate the user;
2. verify ownership;
3. verify eligibility;
4. validate plan/subscription;
5. perform the tier change;
6. audit the change.

---

# 76. Security and Payments

Payment security must work together with:

`WAASHA_PAYMENT_FINANCE_ARCHITECTURE.md`

Critical rules:

- never trust frontend payment status;
- verify gateway events server-side;
- validate payment amount;
- validate booking association;
- prevent duplicate payment processing;
- protect payout information;
- audit financial changes.

---

# 77. Security and Notifications

Notification security must work together with:

`WAASHA_NOTIFICATION_COMMUNICATION_ARCHITECTURE.md`

Notifications must:

- resolve authorized recipients;
- avoid private-data leakage;
- use secure deep links;
- respect preferences;
- protect admin broadcasts.

A notification must never become an authorization bypass.

---

# 78. Security and Bookings

Booking security must work together with:

`WAASHA_BOOKING_ENGINE.md`

A booking mutation must validate:

```text
authenticated user
+
booking ownership/assignment
+
provider/business scope
+
permission
+
booking state
```

---

# 79. Security and Marketplace

Marketplace search may be public or authenticated depending on final UX.

Public discovery must not expose private fields.

Search results should contain only intentionally published marketplace information.

---

# 80. Privacy by Design

For every feature ask:

1. What personal data is required?
2. Why is it required?
3. Who needs access?
4. How long should it be retained?
5. Can it be minimized?
6. Can it be anonymized?
7. Can access be audited?

Do not collect personal information simply because it might be useful later.

---

# 81. Data Retention

Retention rules should distinguish:

- account data;
- booking data;
- financial records;
- audit logs;
- verification documents;
- notification history;
- uploaded media.

Financial/audit records may require longer retention than ordinary profile data.

Retention policies should be configurable and aligned with applicable law.

---

# 82. Account Deletion

Account deletion should use a controlled process.

Possible flow:

```text
Deletion requested
 ↓
Identity confirmation
 ↓
Impact check
 ↓
Active booking check
 ↓
Financial obligation check
 ↓
Data deletion/anonymization
 ↓
Account deactivated
```

Historical transaction records may need to remain while personal information is minimized/anonymized.

---

# 83. Incident Response

Waasha should maintain an incident-response process:

```text
Detect
 ↓
Contain
 ↓
Investigate
 ↓
Remediate
 ↓
Recover
 ↓
Review
```

Examples:

- account takeover;
- leaked secret;
- payment compromise;
- cross-tenant access;
- malicious upload;
- admin compromise.

---

# 84. Security Incident Audit

Every significant security incident should record:

- incident ID;
- discovery time;
- affected systems;
- affected accounts/resources;
- containment actions;
- resolution;
- responsible personnel;
- lessons learned.

---

# 85. Automated Security Testing

Test:

### Authentication

- invalid password;
- brute force;
- expired token;
- revoked session;
- password reset;
- verification expiry.

### Authorization

- unauthorized endpoint;
- unauthorized resource;
- cross-business access;
- removed team member;
- insufficient permission.

### Payments

- forged payment success;
- wrong amount;
- duplicate webhook;
- duplicate refund;
- unauthorized payout.

### Uploads

- invalid MIME;
- oversized file;
- malicious filename;
- unauthorized private media.

---

# 86. Penetration Testing Readiness

Before production launch, security testing should cover:

- authentication;
- authorization;
- API;
- file uploads;
- payments;
- business isolation;
- admin interfaces;
- mobile/web token handling.

Critical findings should be resolved before launch.

---

# 87. Security Definition of Done

The security architecture is complete when:

- one identity model exists;
- authentication is implemented securely;
- password hashing is secure;
- verification flows are secure;
- sessions/tokens are secure;
- refresh-token handling is secure where used;
- MFA is architecturally supported;
- admin security is stronger than standard accounts;
- granular permissions exist;
- backend authorization is enforced;
- object-level access control exists;
- T2/T3 tenant isolation is enforced;
- cross-tenant tests pass;
- financial permissions are isolated;
- uploads are validated and protected;
- private media uses authorization;
- secrets are managed securely;
- production environments are separated;
- rate limiting exists;
- brute-force protection exists;
- audit logging exists;
- security monitoring exists;
- backups are encrypted/tested;
- error messages do not leak secrets;
- dependencies are security-managed;
- payment integration follows secure gateway architecture;
- notification deep links cannot bypass authorization;
- account deletion and retention are defined;
- incident response procedures exist;
- automated security tests pass.

---

# 88. Non-Negotiable Security Rules

1. Never trust the frontend for authorization.
2. Never trust the frontend for payment success.
3. Never accept client-supplied role/admin/tier changes without server authorization.
4. Never expose another business's data.
5. Never store plaintext passwords.
6. Never store raw payment-card security data.
7. Never expose production secrets in source control.
8. Never log passwords, tokens or verification codes.
9. Never allow unrestricted private media URLs.
10. Never allow removed team members to retain active access.
11. Never let notification links bypass authorization.
12. Never silently modify financial/audit history.
13. Never make T1/T2/T3 a substitute for permissions.
14. Never give training-centre affiliation automatic marketplace privilege.
15. Never use unrestricted production CORS for private APIs without explicit security justification.
16. Never allow duplicate financial operations through retries.
17. Never expose detailed internal errors to customers.
18. Never connect development environments to production financial data.
19. Never delete historical records required for financial integrity without an approved retention/anonymization process.
20. Never treat security as a frontend-only concern.

---

# 89. Source of Truth

This document must be implemented together with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`
- `WAASHA_PROVIDER_TIERS.md`
- `WAASHA_PAYMENT_FINANCE_ARCHITECTURE.md`
- `WAASHA_NOTIFICATION_COMMUNICATION_ARCHITECTURE.md`

The Stitch export remains the visual source of truth for designed screens.

Stitch copy corrections remain:

- **“Secure Checkout”** instead of “T3 Encrypted Checkout”
- **“Cash change requested”** instead of “Guaranteed Cash Change”

---


<!-- ============================================================ -->
<!-- DOCUMENT 09: MARKETPLACE, DISCOVERY & SEARCH ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA MARKETPLACE, DISCOVERY & SEARCH ARCHITECTURE
## Location → 10 km Discovery → Categories → Providers → Services → Availability → Customer Choice

**Document:** Marketplace Discovery & Search Architecture Specification  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Build specification  
**Scope:** Complete production product  
**Primary market:** South Africa, globally extensible

---

# 1. Purpose

This document defines how customers discover services and providers on Waasha.

The marketplace must make it easy for a customer to answer:

> **Who can provide the service I need, near me, at a suitable time and price?**

The discovery experience must remain:

- fast;
- location-aware;
- service-aware;
- availability-aware;
- transparent;
- equal across provider tiers;
- scalable;
- privacy-conscious.

The initial default discovery radius is **10 km**.

---

# 2. Marketplace Principle

Waasha is a service marketplace, not a tier-ranking system.

All eligible providers should have a fair opportunity to be discovered.

Provider tier:

- T1 Individual;
- T2 Teams;
- T3 Business

must define operational capability, **not automatic marketplace preference**.

Similarly, training-centre affiliation must not automatically improve marketplace ranking.

---

# 3. Five Approved Marketplace Categories

Waasha's marketplace contains exactly these five core categories:

1. **💈 Barbers**
2. **💇 Hair Salons & Stylists**
3. **💅 Nail Technicians**
4. **💄 Beauty Services**
5. **🚗 Car Wash**

No additional categories should be introduced into the core marketplace without an explicit product decision.

---

# 4. Discovery Entry Points

Customers should be able to discover providers through:

- category selection;
- search;
- location;
- service search;
- provider/business name;
- filters;
- customer location;
- saved/favourite providers;
- recent searches/bookings;
- relevant custom-request flows.

The marketplace should support both browsing and intent-driven search.

---

# 5. Stitch Alignment

The customer discovery experience follows the visual direction established in Stitch.

Core concepts:

```text
Waasha
 ↓
Near You
 ↓
10 km discovery
 ↓
Five category options
 ↓
Provider/service cards
 ↓
Provider profile
 ↓
Service selection
 ↓
Booking
```

The Stitch export is the visual reference.

Production implementation must preserve the approved brand and interaction direction while connecting it to real marketplace data.

---

# 6. Customer Location

A customer can provide location through:

### Current location

The customer grants location permission.

Waasha uses the current device location for discovery.

### Manual location

The customer can manually select or enter a location.

This is important when the customer wants to search somewhere other than their current location.

---

# 7. Location Permission

If location permission is denied:

- the app must continue functioning;
- the customer should be offered manual location;
- no location-dependent functionality should silently fail.

Preferred UX:

> **Set your location to discover services near you.**

Do not repeatedly request permission after the customer has denied it.

---

# 8. Provider Location

A provider can have:

- fixed location;
- business location;
- live location where enabled.

The provider can update their location through an authorized workflow.

Live location must only be active when explicitly enabled.

---

# 9. Home-Service Location

Some providers may deliver services at the customer's location.

The marketplace must distinguish:

```text
Provider Location
```

from:

```text
Customer Service Location
```

A provider can advertise that a service is available at:

- provider location;
- customer location;
- both.

This must be stored at service/provider capability level.

---

# 10. 10 km Default Discovery

Default search radius:

> **10 km**

The marketplace should calculate eligible providers relative to the customer's selected location.

Conceptually:

```text
Customer Location
       ↓
10 km Radius
       ↓
Eligible Providers
       ↓
Eligible Services
```

The radius should be configurable by admin so Waasha can expand or modify the default later.

---

# 11. Distance Calculation

Provider distance should be calculated using geographic coordinates.

Use an appropriate geospatial distance calculation.

The system should not rely on:

- text address similarity;
- postcode alone;
- city name alone.

A provider must have usable coordinates before being included in precise radius-based discovery.

---

# 12. Distance Display

Customer-facing cards may show:

```text
2.4 km away
```

or:

```text
Within 10 km
```

Do not expose unnecessary precise provider/customer location data.

Distance should be rounded appropriately for UX.

---

# 13. Discovery Eligibility

A provider/service may appear in marketplace results only if the provider is eligible.

Minimum conditions may include:

- account active;
- provider/business approved for marketplace;
- service active;
- service belongs to one of five approved categories;
- location available where required;
- provider not suspended;
- service not hidden;
- business unit active where applicable.

---

# 14. Service Eligibility

An individual service should be searchable independently of the provider's overall profile.

Example:

```text
Provider:
ABC Barber

Services:
Fade
Beard Trim
Haircut
```

A customer searching:

> Fade

should be able to discover the specific service.

---

# 15. Provider Eligibility

Provider-level search can match:

- provider/business name;
- category;
- services;
- skills;
- relevant published profile information.

Search must not expose private provider information.

---

# 16. Business Discovery

T3 businesses can appear as a business entity.

Example:

```text
Business
 ↓
Location
 ↓
Services
 ↓
Staff
```

Customers should be able to view the business and then choose the relevant service/location/staff availability where applicable.

---

# 17. Business Multi-Location Discovery

If a T3 business has multiple locations:

```text
ABC Beauty
 ├── Sandton
 ├── Fourways
 └── Rosebank
```

the marketplace should treat each active location as a discoverable service point while retaining the parent business relationship.

A nearby Sandton customer should not be shown a location 20 km away merely because the parent business is within the broader search index.

---

# 18. Category Search

Category pages should support the five approved categories.

Example:

```text
Near You

💈 Barbers
💇 Hair Salons & Stylists
💅 Nail Technicians
💄 Beauty Services
🚗 Car Wash
```

Category selection should narrow results to services/providers belonging to that category.

---

# 19. Service Search

Search should support natural customer intent.

Examples:

```text
fade
braids
nails
manicure
beauty
car wash
```

Search should return relevant services/providers based on indexed marketplace data.

The final searchable vocabulary should come from the approved category/service model rather than arbitrary new marketplace categories.

---

# 20. Search Matching

Search can match:

- exact service name;
- partial service name;
- provider/business name;
- skill;
- category;
- published description.

Use normalized search data to handle:

- capitalization;
- spacing;
- common variations;
- punctuation.

---

# 21. Search Ranking

Ranking should prioritize relevance and customer usefulness.

Potential ranking signals:

1. Service/category relevance
2. Distance
3. Availability
4. Customer-selected filters
5. Rating/review quality
6. Provider/service completeness
7. Other legitimate marketplace signals

Provider tier should **not** be used as a default ranking boost.

---

# 22. Equal Marketplace Treatment

The marketplace must not implement:

```text
T3 > T2 > T1
```

as a ranking rule.

Likewise:

```text
Training Centre Provider > Independent Provider
```

must not be a ranking rule.

Customers should have a genuine opportunity to choose among eligible providers.

---

# 23. Search Results

Provider/service cards should contain useful customer information.

Possible fields:

- provider/business name;
- profile image;
- service name;
- price;
- duration;
- rating;
- review count;
- distance;
- availability indicator;
- service mode;
- selected location;
- portfolio preview.

Do not overload cards with unnecessary information.

---

# 24. Provider Profile

Selecting a provider opens the provider profile.

The profile can include:

- provider/business identity;
- description;
- category;
- skills;
- qualifications where published;
- services;
- service prices;
- durations;
- service images;
- portfolio;
- location/service area;
- availability;
- ratings/reviews;
- booking CTA;
- custom-request capability where enabled.

---

# 25. Service Detail

A service detail page should show:

- service name;
- description;
- price;
- duration;
- maximum 3 service/style images;
- provider/business;
- location/service mode;
- availability;
- booking action.

The customer should understand what they are booking before payment.

---

# 26. Service Image Limit

Every service/style can have a maximum of:

> **3 images**

The API must enforce this limit.

If a provider tries to upload a fourth image:

```text
400 / validation error
```

The frontend should also prevent unnecessary upload attempts.

---

# 27. Portfolio vs Service Images

Service images and provider portfolio images are different concepts.

### Service images

Represent a particular service/style.

Maximum:

**3**

### Portfolio

Represents broader provider work.

Portfolio limits can be configured separately.

Do not accidentally apply the service-image limit to the entire provider portfolio.

---

# 28. Availability-Aware Discovery

Where possible, search should help customers find providers who can actually serve them.

Example filter:

> Available today

or:

> Available Saturday

Availability should be based on provider/team/business scheduling data.

Do not infer availability simply from an active profile.

---

# 29. Availability and T2 Teams

For T2 providers, availability may come from eligible team members.

Example:

```text
T2 Provider
 ├── Team Member A — unavailable
 ├── Team Member B — available
 └── Team Member C — available
```

The provider can appear as available if an eligible team member can perform the requested service.

---

# 30. Availability and T3 Businesses

For T3:

```text
Business
 ↓
Business Unit
 ↓
Service
 ↓
Eligible Staff
 ↓
Available Slot
```

The system should calculate availability from:

- business hours;
- location;
- service duration;
- staff skills;
- staff availability;
- existing bookings;
- exceptions.

---

# 31. Customer Filters

Recommended filters:

- category;
- service;
- distance;
- price range;
- availability;
- rating;
- service mode;
- location/business unit.

Filters should be additive.

Example:

```text
Category: Hair
Distance: 10 km
Price: R100–R300
Available: Today
```

---

# 32. Radius Filter

The customer should be able to adjust the discovery radius if product rules permit.

Example:

```text
5 km
10 km
15 km
25 km
```

The default remains:

> **10 km**

The maximum allowed radius should be admin-configurable.

---

# 33. Empty Results

If no results exist within 10 km:

Do not simply show an empty screen.

Provide a useful explanation:

> No services found within 10 km.

Then offer:

- expand radius;
- change category;
- change location;
- search another service;
- create a custom request where applicable.

Do not silently expand the radius without telling the customer.

---

# 34. Custom Request Fallback

Custom requests can be a fallback when a customer cannot find exactly what they want.

Example:

```text
Search
 ↓
No suitable service
 ↓
Create Custom Request
```

Only providers who have enabled custom requests should be eligible to receive the request.

---

# 35. Custom Request Discovery

A custom request can contain:

- desired service/style;
- description;
- up to 3 images;
- preferred date/time;
- location;
- optional budget;
- other relevant information.

The system should match the request to eligible providers without giving providers access to unrelated private customer information.

---

# 36. Location Privacy

Marketplace discovery should reveal only the location information required for the customer to make a decision.

For provider listings:

- approximate distance is appropriate;
- public business location may be displayed;
- private residential details should not be exposed unless intentionally published.

For customer requests:

- exact customer location should only be disclosed to an eligible provider when operationally required.

---

# 37. Favourites

Customers can favourite:

- providers;
- businesses;
- services.

Favourites should be private to the customer.

A provider must not be able to infer who has favourited them unless a separate explicit feature allows it.

---

# 38. Search History

Recent searches may be stored for convenience.

Examples:

```text
Fade
Nails
Car Wash
```

Customers should be able to clear their search history.

Search history should not be exposed to providers.

---

# 39. Personalization

Future personalization may use:

- previous bookings;
- favourites;
- search history;
- service preferences.

However, personalization must not override basic marketplace fairness.

A customer should still be able to browse the full eligible marketplace.

---

# 40. Reviews and Ranking

Ratings can be used as one marketplace signal.

The system should avoid simplistic:

```text
5-star = always first
```

ranking.

Consider:

- rating;
- number of reviews;
- recency;
- relevance;
- distance;
- availability.

Review manipulation should be monitored separately.

---

# 41. Provider Completeness

Profile completeness can improve customer confidence.

Examples:

- profile photo;
- description;
- service details;
- service images;
- availability;
- pricing.

Completeness can be used as a legitimate customer-information signal, but should not become a hidden permanent ranking advantage.

---

# 42. Sponsored/Promoted Listings

If Waasha later introduces paid promotion, sponsored results must be clearly identified.

Paid placement must not be disguised as organic ranking.

The current marketplace architecture does not require sponsored ranking.

---

# 43. Marketplace Status

Provider/business marketplace status should support:

```text
DRAFT
PENDING_REVIEW
ACTIVE
PAUSED
SUSPENDED
```

Only eligible active listings should appear in normal discovery.

---

# 44. Provider Pausing

A provider can temporarily pause marketplace availability.

Possible reasons:

- fully booked;
- holiday;
- temporary closure;
- maintenance;
- personal availability.

Pausing should remove the provider from appropriate booking discovery without deleting their profile.

---

# 45. Service Pausing

A provider can pause an individual service.

The service should disappear from relevant active search results while preserving:

- historical bookings;
- reviews;
- service history;
- analytics.

---

# 46. Business Unit Closure

T3 business units can be:

- active;
- temporarily closed;
- permanently inactive.

Inactive units should not receive new bookings.

Historical data remains available according to authorization and retention rules.

---

# 47. Geospatial Data Model

Provider/service locations should store:

- latitude;
- longitude;
- location type;
- source;
- last updated timestamp;
- accuracy where available.

Business units should have their own coordinates.

Customer discovery location should be represented separately from provider location.

---

# 48. Geospatial Indexing

The database should support efficient radius queries.

Use an appropriate geospatial index for the selected database architecture.

The search layer should avoid calculating distance against every provider in application memory.

---

# 49. Search Performance

Marketplace search should be designed for:

- low-latency category browsing;
- fast 10 km radius queries;
- scalable provider counts;
- efficient filtering;
- pagination;
- indexed service search.

Potential architecture:

```text
API
 ↓
Marketplace Search Service
 ├── Geospatial Query
 ├── Service Index
 ├── Availability
 └── Filters
```

A dedicated search engine can be introduced later if database search no longer meets scale requirements.

---

# 50. Pagination

Search results must use pagination.

Preferred API pattern:

```text
GET /marketplace/providers
```

with:

```text
page
page_size
cursor
```

A cursor-based approach is preferable for large dynamic result sets.

---

# 51. Stable Results

Search results should avoid unexpectedly changing order during pagination.

Use stable ranking/tie-breakers.

Example:

```text
relevance score
+
distance
+
provider/service ID
```

Do not rely only on random ordering.

---

# 52. Search Caching

Cache carefully.

Safe candidates:

- category metadata;
- public service information;
- popular search data.

Avoid stale caching for:

- real-time availability;
- booking slots;
- provider active status;
- price-sensitive checkout information.

Search may be cached briefly, but booking must revalidate current state.

---

# 53. Search vs Booking Validation

Marketplace results are informational.

When the customer selects a service and books:

```text
Marketplace result
      ↓
Booking validation
      ↓
Current price
      ↓
Current availability
      ↓
Current provider status
      ↓
Booking created
```

Never trust stale search results as booking authority.

---

# 54. Search API

Representative endpoints:

```text
GET /marketplace/categories

GET /marketplace/providers
GET /marketplace/services

GET /marketplace/providers/:id
GET /marketplace/services/:id

GET /marketplace/search
GET /marketplace/nearby

POST /customers/favourites
DELETE /customers/favourites/:id

GET /customers/search-history
DELETE /customers/search-history
```

Exact routes must remain aligned with `WAASHA_API_SPEC.md`.

---

# 55. Search Parameters

Example:

```text
category_id
service_id
query
latitude
longitude
radius_km
min_price
max_price
available_date
available_time
service_mode
rating
business_unit_id
sort
cursor
limit
```

The API should validate every parameter.

---

# 56. Sorting Options

Potential customer-selected sorting:

- recommended;
- nearest;
- price low to high;
- price high to low;
- rating;
- availability.

"Recommended" must use transparent, defensible marketplace signals and must not simply mean higher subscription tier.

---

# 57. Marketplace Search Response

Example conceptual response:

```text
{
  provider_id,
  business_id,
  name,
  category,
  service,
  price,
  duration,
  rating,
  review_count,
  distance_km,
  service_mode,
  location_summary,
  availability_summary
}
```

Private provider/business fields must not be included.

---

# 58. Provider Eligibility and Verification

Verification may affect whether a provider can be published.

However:

```text
Training Centre Verified
```

must not automatically mean:

```text
Rank First
```

Verification and ranking remain separate concepts.

---

# 59. Provider Quality Signals

Legitimate marketplace signals can include:

- verified status;
- accurate profile;
- completed bookings;
- reviews;
- service quality indicators;
- response reliability;
- availability accuracy.

These should be designed carefully to avoid unfairly penalizing new providers.

---

# 60. New Provider Fairness

A new provider may have:

- zero reviews;
- limited booking history.

The marketplace should not permanently bury new providers simply because they lack historical activity.

Consider exploration/fairness mechanisms if ranking becomes sophisticated.

---

# 61. No Hidden Tier Boost

Do not implement:

```text
score += T3_bonus
```

or:

```text
T3 results first
```

unless a future explicit product decision changes the marketplace policy.

Current rule:

> **Tier is capability, not ranking.**

---

# 62. No Training-Centre Boost

Do not implement:

```text
training_centre_provider += ranking_bonus
```

Training-centre attribution exists for:

- onboarding;
- partner attribution;
- partner earnings.

It does not create marketplace privilege.

---

# 63. Search Security

Marketplace search must protect:

- private provider information;
- customer locations;
- internal business data;
- staff records;
- financial data;
- admin fields.

Public APIs should return only approved marketplace fields.

---

# 64. Abuse Protection

Protect search against:

- excessive automated scraping;
- query flooding;
- malicious filters;
- enumeration;
- location probing.

Use:

- rate limits;
- pagination;
- result limits;
- query normalization;
- abuse monitoring.

---

# 65. Analytics

Track marketplace metrics such as:

- searches;
- category selections;
- provider profile views;
- service views;
- booking conversion;
- favourite actions;
- zero-result searches;
- search-to-booking conversion;
- radius expansion;
- custom-request fallback.

Do not expose private analytics to providers unless explicitly intended.

---

# 66. Provider Analytics

Providers can see appropriate aggregate marketplace performance, such as:

- profile views;
- service views;
- booking conversion;
- favourites where privacy rules allow aggregate reporting;
- search impressions where supported.

Do not reveal individual customer search behaviour.

---

# 67. Marketplace Observability

Monitor:

- search latency;
- zero-result rate;
- location query failures;
- geocoding failures;
- indexing failures;
- availability-query latency;
- search API error rate.

Alerts should identify marketplace degradation.

---

# 68. Failure Handling

If geolocation fails:

```text
Offer manual location.
```

If search service fails:

```text
Show safe error + retry.
```

If availability cannot be confirmed:

```text
Do not claim a slot is available.
```

If a provider becomes inactive after appearing in search:

```text
Booking validation rejects stale/ineligible state.
```

---

# 69. Offline Behaviour

Previously loaded marketplace information can be cached for limited offline viewing.

However:

- current availability must be revalidated;
- current price must be revalidated;
- booking must require synchronization;
- location-sensitive discovery should indicate stale information.

Offline data must not create false booking confirmation.

---

# 70. Customer Journey

Recommended flow:

```text
Open Waasha
   ↓
Set/confirm location
   ↓
Near You — 10 km
   ↓
Choose category
   ↓
Browse/search service
   ↓
Apply filters
   ↓
Compare providers
   ↓
Open provider
   ↓
Choose service
   ↓
Check availability
   ↓
Book
```

This should remain simple enough for first-time users.

---

# 71. Business Journey

T3 business discovery:

```text
Customer
 ↓
Business
 ↓
Location
 ↓
Category
 ↓
Service
 ↓
Available staff/slot
 ↓
Booking
```

The customer should not need to understand internal business-unit structures.

---

# 72. Custom Request Journey

```text
Customer searches
 ↓
Cannot find suitable service
 ↓
Create custom request
 ↓
Upload up to 3 images
 ↓
Describe requirement
 ↓
Set preferred date/time/location
 ↓
Eligible providers notified
 ↓
Proposals received
 ↓
Customer chooses provider
 ↓
Booking
```

---

# 73. Marketplace Data Freshness

Search indexes should update when:

- provider publishes profile;
- provider pauses profile;
- service changes;
- service price changes;
- location changes;
- business unit changes;
- staff/service availability changes.

Critical booking data must still be revalidated at booking time.

---

# 74. Price Integrity

Marketplace cards may show the current published price.

At booking:

```text
Published price
      ↓
Server revalidation
      ↓
Booking price snapshot
```

The customer must see the final price before confirming.

---

# 75. Availability Integrity

Marketplace may show:

> Available today

but the booking engine must perform the final slot validation.

This prevents:

- double booking;
- stale availability;
- staff conflicts.

---

# 76. Marketplace and Payments

Marketplace does not process payment directly.

Flow:

```text
Marketplace
 ↓
Service selection
 ↓
Booking engine
 ↓
Payment architecture
```

This keeps discovery separate from financial processing.

---

# 77. Marketplace and Notifications

Marketplace actions can trigger notifications only when they create meaningful events.

Examples:

- custom request submitted;
- proposal received;
- favourite-related reminder if explicitly designed.

Browsing/search itself should not generate notifications to providers.

---

# 78. Marketplace and Security

Marketplace must follow:

`WAASHA_AUTHENTICATION_AUTHORIZATION_SECURITY.md`

Important rules:

- public search returns only public fields;
- private locations are protected;
- business data is tenant-isolated;
- provider controls are authenticated;
- customer addresses are protected;
- admin ranking/configuration is protected.

---

# 79. Database/Search Components

Relevant data includes:

```text
provider_profiles
businesses
business_units
provider_locations
business_locations
service_categories
services
service_images
skills
availability
availability_exceptions
reviews
provider_status
favourites
search_history
```

A separate search index can be introduced later without changing the source-of-truth database model.

---

# 80. Admin Marketplace Controls

Admin should be able to configure:

- default radius;
- maximum radius;
- category availability;
- marketplace visibility;
- search configuration;
- ranking signal weights;
- quality controls;
- provider publication rules;
- abuse/rate limits.

Any ranking configuration must respect the marketplace equality principle.

---

# 81. Marketplace Configuration Example

```text
default_radius_km = 10
maximum_radius_km = configurable

tier_ranking_boost = 0
training_centre_ranking_boost = 0
```

The explicit zero values reinforce the current product policy.

---

# 82. Definition of Done

The marketplace/discovery system is complete when:

- all five approved categories are supported;
- customer location works;
- manual location works;
- 10 km is the default discovery radius;
- radius is configurable;
- provider/business locations are stored correctly;
- geospatial search works;
- service search works;
- provider search works;
- category filtering works;
- price filtering works;
- availability filtering works;
- service-mode filtering works;
- provider profiles work;
- service detail pages work;
- service images support a maximum of 3;
- T1/T2/T3 all appear fairly;
- training-centre providers receive no ranking boost;
- tier receives no ranking boost;
- T2 team availability works;
- T3 business-unit availability works;
- empty-result recovery works;
- custom requests can act as a fallback;
- favourites work;
- search history can be cleared;
- pagination works;
- stale marketplace data is revalidated at booking;
- search is protected from abuse;
- private location/data is protected;
- search performance is observable;
- automated marketplace tests pass.

---

# 83. Non-Negotiable Marketplace Rules

1. The default discovery radius is **10 km**.
2. The five approved categories are the only core marketplace categories.
3. T1, T2 and T3 receive equal marketplace treatment.
4. Provider tier is not a default ranking boost.
5. Training-centre affiliation is not a default ranking boost.
6. Customers choose providers based on relevant marketplace information.
7. Location must be calculated using proper geographic coordinates.
8. Exact private customer locations must be protected.
9. Service images are limited to 3 per service/style.
10. Search results are not booking authority.
11. Price must be revalidated at booking.
12. Availability must be revalidated at booking.
13. Inactive/suspended providers must not receive normal new bookings.
14. Empty results should offer useful alternatives.
15. Custom requests are available only to providers who opt in.
16. Customer custom requests allow up to 3 images.
17. Marketplace search must not expose private business/staff/financial data.
18. Search must be rate-limited and abuse-protected.
19. Marketplace browsing must not create provider notifications merely from views/searches.
20. Driver functionality is not part of this marketplace architecture and remains deferred to Phase 2.

---

# 84. Source of Truth

This document must be implemented together with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`
- `WAASHA_PROVIDER_TIERS.md`
- `WAASHA_PAYMENT_FINANCE_ARCHITECTURE.md`
- `WAASHA_NOTIFICATION_COMMUNICATION_ARCHITECTURE.md`
- `WAASHA_AUTHENTICATION_AUTHORIZATION_SECURITY.md`

The Stitch export remains the visual source of truth for the designed marketplace experience.

Stitch copy corrections remain:

- **“Secure Checkout”** instead of “T3 Encrypted Checkout”
- **“Cash change requested”** instead of “Guaranteed Cash Change”

---


<!-- ============================================================ -->
<!-- DOCUMENT 10: FRONTEND APPLICATION ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA FRONTEND APPLICATION ARCHITECTURE
## Splash → Authentication → Marketplace → Booking → Provider Operations → Business → Admin

**Document:** Frontend Application Architecture Specification  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Build specification  
**Scope:** Complete production application  
**Primary market:** South Africa, globally extensible

---

# 1. Purpose

This document defines the frontend architecture for Waasha.

The objective is to turn the approved Stitch design direction and backend specifications into a production application that is:

- responsive;
- fast;
- accessible;
- consistent;
- secure;
- maintainable;
- mobile-friendly;
- desktop-friendly;
- API-driven;
- role-aware;
- tier-aware;
- offline-tolerant where appropriate.

The frontend must not contain business rules that belong exclusively to the backend.

---

# 2. Frontend Architecture Principle

The frontend is responsible for:

- presentation;
- navigation;
- user interaction;
- local state;
- form handling;
- client-side validation;
- optimistic UX where safe;
- API communication;
- local caching;
- notification presentation.

The backend remains authoritative for:

- permissions;
- provider tier;
- pricing;
- commission;
- payment status;
- booking availability;
- booking state;
- tenant access;
- financial calculations;
- verification;
- marketplace eligibility.

---

# 3. Application Surfaces

Waasha should be designed as one coherent product with role-aware experiences.

Primary surfaces:

```text
Public / Marketing
        ↓
Authentication
        ↓
Customer Experience
        ↓
Provider Experience
        ├── T1 Individual
        ├── T2 Teams
        └── T3 Business
        ↓
Training Centre
        ↓
Admin
```

The user should not need separate applications for each provider tier.

---

# 4. Responsive Strategy

The application must support:

- mobile;
- tablet;
- desktop;
- large desktop.

Design from mobile upward, while taking advantage of larger screens for dashboards and business operations.

Recommended behaviour:

```text
Mobile
→ single-column flows
→ bottom navigation
→ compact cards

Tablet
→ expanded cards
→ two-column layouts where useful

Desktop
→ sidebar/dashboard navigation
→ multi-column marketplace
→ tables and operational panels
```

---

# 5. Stitch as Visual Source of Truth

The Stitch export establishes the approved visual direction for the screens already designed.

The implementation should preserve:

- white/light backgrounds;
- Waasha navy;
- Waasha teal;
- clean typography;
- premium/simple aesthetic;
- 10 km marketplace concept;
- category cards;
- provider/service cards;
- checkout direction;
- logo treatment.

Production logic is added around the design rather than redesigning the approved experience unnecessarily.

---

# 6. Brand System

Primary colours:

```text
Navy       #0B1F33
Teal       #19B6A5
White      #FFFFFF
Background #F6F8FA
Text       #17212B
Muted      #667085
```

Use the established typography system from Stitch.

The visual language should feel:

- modern;
- human;
- premium;
- trustworthy;
- neutral;
- futuristic without being cold.

---

# 7. Logo Animation

The approved Waasha logo includes:

- geometric W;
- navy left side;
- teal right side;
- teal diamond above the W.

On splash/load:

- W/wordmark/tagline remain still;
- diamond rotates horizontally around its vertical axis;
- animation moves from front → thin side → front.

The animation should be subtle and performant.

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled, show the logo without continuous animation.

---

# 8. Application Shell

Use a shared application shell.

Conceptually:

```text
AppShell
├── Header
├── Navigation
├── Main Content
├── Notification Access
└── User Menu
```

Different contexts can use different navigation configurations.

---

# 9. Navigation Contexts

### Customer

```text
Home
Explore
Bookings
Favourites
Profile
```

### Provider

```text
Dashboard
Bookings
Services
Calendar
Earnings
Profile
```

### T2

Adds:

```text
Team
Team Calendar
Team Performance
```

### T3

Adds:

```text
Business
Locations
Staff
Services
Analytics
Finance
```

### Admin

Separate administrative navigation.

---

# 10. Splash Screen

The splash screen should establish the brand immediately.

Elements:

- Waasha logo;
- tagline;
- subtle logo animation;
- loading state where required.

Tagline:

> **The Future of Service, Today.**

The splash should not unnecessarily delay application startup.

---

# 11. Public Landing Experience

The public experience should explain:

- what Waasha is;
- how customers find services;
- how providers join;
- the five categories;
- key benefits;
- call-to-action.

Primary actions:

```text
Find a Service
Become a Provider
Sign In
```

The public website and authenticated application should share the same design system.

---

# 12. Authentication Screens

Required screens:

- sign in;
- create account;
- verify email;
- verify phone where enabled;
- forgot password;
- reset password;
- session/security messaging.

Forms must be clear and minimal.

---

# 13. Account-Type Selection

During onboarding, the user may choose the intended experience.

Examples:

```text
I'm looking for a service
I'm offering services
I'm joining a business
```

The backend determines actual permissions and account state.

Do not allow frontend selection to grant privileged access.

---

# 14. Customer Home

The customer home screen follows the Stitch direction.

Core elements:

```text
Location
Near You
10 km
Five categories
Service/provider discovery
Upcoming booking
Favourites/recent activity
```

The primary objective is fast discovery.

---

# 15. Customer Location UI

Show:

```text
Near:
[Current location]
```

or:

```text
Set location
```

Allow:

- current location;
- manual location.

If location permission is unavailable, provide a clear fallback.

---

# 16. Category UI

Display exactly:

- 💈 Barbers
- 💇 Hair Salons & Stylists
- 💅 Nail Technicians
- 💄 Beauty Services
- 🚗 Car Wash

Do not introduce additional core categories through the main navigation.

---

# 17. Marketplace UI

Provider/service cards should show:

- profile/business image;
- name;
- service;
- price;
- duration;
- rating;
- review count;
- distance;
- availability summary.

Cards should be scannable.

Avoid excessive information density.

---

# 18. Search UI

Search should support:

- service name;
- provider/business name;
- category;
- skills.

Include:

- search field;
- recent searches;
- filters;
- sort;
- clear actions.

Search should remain fast and usable on mobile.

---

# 19. Filter UI

Recommended filters:

```text
Category
Service
Distance
Price
Availability
Rating
Service Mode
Location
```

Use a mobile bottom-sheet/filter drawer pattern where appropriate.

---

# 20. Empty Marketplace State

When no provider is found:

```text
No services found within 10 km.
```

Offer:

- expand radius;
- change location;
- change category;
- search again;
- create custom request where applicable.

Do not silently expand the search radius.

---

# 21. Provider Profile UI

Show:

- provider/business identity;
- profile image;
- description;
- skills;
- qualifications where public;
- services;
- portfolio;
- ratings/reviews;
- location/service mode;
- availability;
- booking CTA.

Keep private information hidden.

---

# 22. Service Detail UI

Show:

- service images;
- service name;
- description;
- price;
- duration;
- provider;
- service mode;
- location;
- availability;
- booking CTA.

Maximum service/style images:

> **3**

---

# 23. Booking Flow

Recommended flow:

```text
Service
 ↓
Date
 ↓
Time
 ↓
Location
 ↓
Assigned provider/team member where applicable
 ↓
Payment method
 ↓
Cash/EFT details if needed
 ↓
Review booking
 ↓
Confirm
```

The frontend should guide the user step-by-step.

---

# 24. Booking Summary

Before confirmation show:

- provider/business;
- service;
- date;
- time;
- duration;
- location;
- service price;
- applicable charges;
- payment method;
- cash change information where applicable;
- total.

The customer must see the final applicable amount before confirming.

---

# 25. Cash Change UI

If Cash is selected:

```text
Cash payment

Service total: R150

Will you need change?
[Yes] [No]

If yes:
Amount you'll pay: R200

Expected change:
R50
```

Confirmation copy:

> **Cash change requested**

Provider-facing message:

> Customer is expected to tender R200. Bring R50 change.

Do not use:

> Guaranteed Cash Change

---

# 26. EFT UI

If EFT is selected:

Show:

- provider payment instructions;
- amount;
- reference;
- proof submission if enabled;
- payment status.

Possible status:

```text
Payment pending verification
```

Do not display EFT as paid until backend confirmation.

---

# 27. Waasha Payment UI

For digital payment:

```text
Confirm booking
 ↓
Secure Checkout
 ↓
Payment gateway
 ↓
Return to Waasha
 ↓
Server verification
 ↓
Payment result
```

Use:

> **Secure Checkout**

Do not use:

> T3 Encrypted Checkout

---

# 28. Payment Result Screens

### Success

Show:

- booking reference;
- payment status;
- booking status;
- provider;
- date/time;
- next action.

### Failed

Show:

- safe failure message;
- retry;
- alternative payment method where allowed.

Do not expose gateway internals.

---

# 29. Booking Details

Customer booking details should show:

```text
Booking reference
Provider/business
Service
Date/time
Location
Payment status
Booking status
Assigned staff where applicable
Cancellation options
```

Sensitive internal information should remain hidden.

---

# 30. Customer Bookings

Separate:

```text
Upcoming
Past
Cancelled
```

Optional filters:

- status;
- category;
- date.

The list should make the next action obvious.

---

# 31. Customer Notifications

Notification centre should support:

- unread count;
- category;
- timestamps;
- deep links;
- mark read;
- mark all read.

Notifications follow:

`WAASHA_NOTIFICATION_COMMUNICATION_ARCHITECTURE.md`

---

# 32. Customer Profile

Profile includes:

- name;
- photo;
- contact information;
- saved locations/addresses;
- favourites;
- notification preferences;
- payment-related preferences where appropriate;
- security settings.

Private information must remain protected.

---

# 33. Customer Favourites

Customers can save:

- providers;
- businesses;
- services.

Favourites should be easily accessible.

---

# 34. Custom Request UI

Custom request form:

```text
What do you need?
Description
Up to 3 images
Preferred date
Preferred time
Location
Optional budget
```

Show clear explanation:

> Providers who accept custom requests may respond with proposals.

---

# 35. Custom Request Images

Maximum:

> **3 images**

The UI should:

- show upload count;
- preview images;
- allow removal;
- validate size/type;
- prevent fourth upload.

---

# 36. Custom Request Status

Customer can see:

```text
OPEN
PROPOSALS_RECEIVED
ACCEPTED
EXPIRED
CANCELLED
```

Selecting a proposal should clearly show:

- provider;
- proposed service;
- price;
- date/time;
- relevant notes.

---

# 37. Provider Onboarding UI

Provider onboarding should be guided.

### Step 1

Account.

### Step 2

Provider type/tier.

### Step 3

Profile.

### Step 4

Category.

### Step 5

Services.

### Step 6

Images.

### Step 7

Location.

### Step 8

Availability.

### Step 9

Payment methods.

### Step 10

Custom requests.

### Step 11

Verification.

### Step 12

Publish.

---

# 38. T1 Provider Dashboard

T1 dashboard should show:

- today's bookings;
- upcoming bookings;
- earnings;
- service performance;
- notifications;
- availability;
- profile completion.

No team-management UI should appear for T1.

---

# 39. T2 Provider Dashboard

T2 dashboard adds:

- team overview;
- team bookings;
- assignments;
- team availability;
- team performance;
- team earnings.

The owner should have clear team-management access.

---

# 40. T2 Team Management

Screens:

```text
Team
 ↓
Members
 ↓
Member Profile
 ↓
Skills
 ↓
Services
 ↓
Availability
 ↓
Permissions
 ↓
Compensation
```

Member access must follow backend permissions.

---

# 41. T2 Booking Assignment UI

Provider can:

- view eligible team members;
- see availability;
- assign booking;
- reassign booking;
- view assignment history.

Assignment must be validated by the backend.

---

# 42. T3 Business Dashboard

T3 dashboard should provide a business-level view:

```text
Business performance
Bookings
Revenue
Locations
Staff
Services
Analytics
Notifications
```

The business owner should be able to move between business units.

---

# 43. T3 Business Unit UI

Business unit management:

```text
Business
 ↓
Business Units
 ↓
Unit Details
 ├── Location
 ├── Categories
 ├── Services
 ├── Staff
 ├── Availability
 └── Analytics
```

A T3 business can operate across all five approved categories.

---

# 44. T3 Staff UI

Staff management should include:

- add staff;
- edit staff;
- activate/deactivate;
- skills;
- services;
- availability;
- permissions;
- compensation;
- assigned bookings.

Removing staff must not erase historical booking records.

---

# 45. T3 Multi-Category UI

Business owners should be able to configure:

```text
Categories
☑ Barbers
☑ Hair Salons & Stylists
☑ Nail Technicians
☑ Beauty Services
☑ Car Wash
```

The business may use any combination of the five.

A single T3 business can use all five.

---

# 46. Services Management

Provider/business service manager:

```text
Services
 ├── Active
 ├── Paused
 └── Draft
```

Actions:

- create;
- edit;
- pause;
- publish;
- archive where appropriate.

Service changes must preserve historical booking data.

---

# 47. Service Editor

Fields:

- name;
- category;
- description;
- price;
- duration;
- service mode;
- images;
- availability;
- active status.

Image maximum:

**3 per service/style.**

---

# 48. Availability UI

Provider calendar should support:

- operating hours;
- working days;
- breaks;
- unavailable periods;
- exceptions;
- bookings.

T2/T3 must support staff/team availability.

---

# 49. Calendar UI

Customer/provider calendars should clearly distinguish:

- available;
- booked;
- unavailable;
- pending;
- cancelled.

Avoid claiming availability from stale client data.

---

# 50. Earnings UI

Provider earnings dashboard:

```text
Gross
Commission
Partner allocation
Staff allocation where applicable
Net earnings
Pending
Available
Paid out
```

T2/T3 can view appropriate team/business breakdowns.

---

# 51. Finance UI

Finance screens should include:

- transactions;
- earnings;
- payouts;
- refunds;
- adjustments where permitted.

Access is permission-controlled.

---

# 52. Provider Payment Settings

Provider can configure:

```text
Waasha Payment
Cash
EFT
```

For each:

```text
Enabled / Disabled
```

Additional payout configuration must be protected with appropriate security controls.

---

# 53. Tier Management UI

Provider should see:

```text
Current Tier
T1 Individual
```

or:

```text
T2 Teams
```

or:

```text
T3 Business
```

Show:

- available capabilities;
- plan/subscription information where applicable;
- upgrade options;
- requirements.

Do not imply that a higher tier guarantees better marketplace placement.

---

# 54. Tier Upgrade UI

Upgrade flow:

```text
Current Tier
 ↓
Compare capabilities
 ↓
Requirements
 ↓
Confirm
 ↓
Payment/subscription where applicable
 ↓
Backend validation
 ↓
Tier activated
```

The frontend must never activate the tier independently.

---

# 55. Tier Downgrade UI

Show warnings where the user has incompatible data.

Example:

> Your current account contains 5 business units. T1 does not support business units.

The user must resolve incompatible configuration before downgrade.

Never silently delete business data.

---

# 56. Profile Completion

Provider profile should show a completion indicator.

Examples:

```text
Profile 80% complete
```

Missing items:

- profile photo;
- service;
- price;
- availability;
- location;
- verification.

Completeness is for usability, not an automatic marketplace ranking boost.

---

# 57. Verification UI

Provider/business verification screen:

```text
Verification
Status: Pending

Required:
✓ Identity
✓ Contact
○ Document
```

Show safe explanations for rejection/requested changes.

Private documents should not be publicly accessible.

---

# 58. Training Centre UI

Training-centre users can manage:

- referred providers;
- attribution;
- onboarding status;
- eligible earnings;
- partner payouts.

They should not receive marketplace-ranking controls.

---

# 59. Admin Frontend

Admin should be a separate protected interface.

Areas:

```text
Dashboard
Users
Providers
Businesses
Bookings
Payments
Finance
Training Centres
Verification
Marketplace
Notifications
Settings
Audit Logs
```

Admin UI should use stronger authentication controls.

---

# 60. Admin Marketplace Controls

Admin can configure:

- default 10 km radius;
- maximum radius;
- marketplace visibility;
- categories;
- ranking configuration;
- provider publication rules.

Admin must not accidentally introduce tier-based ranking preference.

---

# 61. Admin Finance Controls

Admin can manage:

- commission;
- partner shares;
- refunds;
- adjustments;
- payouts;
- reconciliation.

Changing the commission rate must affect future applicable transactions, not rewrite history.

---

# 62. Admin Notification Controls

Admin can:

- view notification health;
- inspect failures;
- send controlled broadcasts;
- manage templates where authorized.

Broadcast actions require authorization and audit logging.

---

# 63. State Management

Separate state into:

### Server state

- bookings;
- services;
- providers;
- marketplace;
- payments;
- notifications.

### Client state

- modal state;
- temporary form state;
- filters;
- UI preferences.

Use a predictable server-state/data-fetching architecture.

Avoid duplicating server truth unnecessarily.

---

# 64. API Client

Create a centralized API client.

Responsibilities:

- base URL;
- authentication;
- request headers;
- serialization;
- error handling;
- retry policy;
- refresh/session handling;
- request IDs.

Do not scatter raw HTTP calls throughout components.

---

# 65. API Error Model

Frontend should understand standard backend errors.

Example:

```text
{
  code,
  message,
  details,
  request_id
}
```

Display user-friendly messages.

Use `request_id` for support/debugging where appropriate.

---

# 66. Loading States

Every network-dependent screen should handle:

- initial loading;
- refresh;
- pagination loading;
- mutation loading;
- empty state;
- error state.

Avoid blank screens.

---

# 67. Error States

Examples:

### Marketplace

> We couldn't load nearby services. Try again.

### Booking

> We couldn't confirm that slot. Please choose another time.

### Payment

> Your payment could not be completed.

Never expose internal stack traces.

---

# 68. Optimistic UI

Use optimistic updates only where failure can be safely reversed.

Good candidates:

- marking notification read;
- favourite toggle.

Avoid optimistic confirmation for:

- payments;
- booking creation;
- booking completion;
- refunds;
- payouts;
- tier upgrades.

---

# 69. Offline Support

The application should tolerate temporary connectivity loss.

Safe offline features:

- cached marketplace content;
- cached provider/service information;
- previously loaded bookings;
- notification history;
- drafts.

Do not present:

```text
Payment successful
```

or:

```text
Booking confirmed
```

without server confirmation.

---

# 70. Local Persistence

Store only necessary local data.

Do not persist sensitive information unnecessarily.

Authentication tokens should use secure platform storage appropriate to the client.

---

# 71. Accessibility

Frontend must support:

- keyboard navigation;
- semantic labels;
- screen readers;
- adequate contrast;
- focus states;
- accessible forms;
- reduced motion;
- touch-friendly controls.

Do not rely only on colour to communicate state.

---

# 72. Form Architecture

Reusable form components should support:

- validation;
- server errors;
- field-level errors;
- loading;
- disabled states;
- accessible labels;
- autosave where appropriate.

Client validation improves UX but backend validation remains authoritative.

---

# 73. Component Architecture

Recommended structure:

```text
src/
├── app/
├── core/
│   ├── auth/
│   ├── api/
│   ├── permissions/
│   ├── routing/
│   └── security/
├── features/
│   ├── marketplace/
│   ├── bookings/
│   ├── payments/
│   ├── notifications/
│   ├── customer/
│   ├── provider/
│   ├── team/
│   ├── business/
│   ├── training-centre/
│   └── admin/
├── shared/
│   ├── components/
│   ├── forms/
│   ├── layouts/
│   └── utilities/
└── assets/
```

Exact framework conventions can adapt to the chosen frontend stack.

---

# 74. Routing

Routes should be protected by authentication/authorization guards.

Conceptually:

```text
/public/*
/auth/*
/customer/*
/provider/*
/business/*
/training-centre/*
/admin/*
```

The backend still enforces access regardless of route guards.

---

# 75. Route Protection

Example:

```text
/customer/bookings
```

requires:

```text
authenticated user
+
customer capability
```

Example:

```text
/business/staff
```

requires:

```text
authenticated user
+
business membership
+
staff-management permission
```

---

# 76. Tier-Aware UI

The frontend can use entitlements to determine whether to display features.

Example:

```text
T1:
Team menu hidden

T2:
Team menu visible

T3:
Business menu visible
```

But the API must reject unauthorized requests even if a malicious client manually calls them.

---

# 77. Feature Entitlements

Frontend should consume backend-provided capability data.

Example:

```text
team_management: true
business_units: false
business_staff: false
```

Do not duplicate commercial entitlement logic in multiple frontend files.

---

# 78. Security UX

Show clear feedback for:

- expired session;
- unauthorized action;
- suspended account;
- verification required;
- payment failure;
- permission denied.

Avoid exposing security-sensitive details.

---

# 79. Session Expiry

When a session expires:

```text
API 401
 ↓
Attempt safe refresh
 ↓
If successful → continue
 ↓
If failed → sign in
```

Avoid infinite refresh loops.

---

# 80. Sensitive Screens

Finance/security screens may require recent authentication.

Examples:

- payout details;
- bank details;
- password;
- MFA;
- business ownership;
- financial adjustment.

The frontend should support step-up authentication flows.

---

# 81. Notification Integration

Notification badges should be globally available where appropriate.

Example:

```text
Bookings   2
Messages/Notifications   4
```

Do not imply a notification was delivered if the server has not confirmed creation.

---

# 82. Analytics Integration

Frontend analytics can track product UX events such as:

- category selected;
- search;
- provider viewed;
- service viewed;
- booking started;
- booking completed;
- custom request created.

Do not capture sensitive payment data or unnecessary personal data.

---

# 83. Marketplace Analytics Privacy

Do not send:

- exact customer addresses;
- payment credentials;
- private financial information;
- sensitive verification documents

to analytics providers.

Analytics should use pseudonymous IDs where practical.

---

# 84. Performance

Optimize:

- initial load;
- image loading;
- route loading;
- marketplace scrolling;
- dashboard data;
- network requests.

Use:

- lazy loading;
- responsive images;
- pagination/infinite scroll where appropriate;
- caching;
- request deduplication.

---

# 85. Image Handling

Provider/service/customer-uploaded images should:

- show progress;
- support previews;
- validate before upload;
- handle upload failures;
- support retry;
- use optimized delivery.

Never expose private upload URLs without authorization.

---

# 86. Image Compression

Client-side compression can improve upload speed.

However:

- original quality requirements must be respected;
- compression must not bypass backend validation;
- private images remain private.

---

# 87. Mobile Navigation

Customer mobile experience should prioritize:

```text
Home
Explore
Bookings
Favourites
Profile
```

Provider mobile experience should prioritize:

```text
Dashboard
Bookings
Calendar
Services
Earnings
```

T2/T3 can expose additional navigation through menus.

---

# 88. Desktop Navigation

Desktop can use:

- left sidebar;
- top header;
- contextual subnavigation.

Dashboards should use larger screen space for:

- tables;
- charts;
- calendar;
- operational panels.

---

# 89. Tables

Admin/business tables should support:

- sorting;
- filtering;
- pagination;
- responsive behaviour;
- export where authorized.

On mobile, tables should collapse into cards or horizontal scrolling as appropriate.

---

# 90. Charts

Analytics charts should be:

- accessible;
- responsive;
- understandable;
- based on server-authoritative data.

Do not show false precision.

---

# 91. Booking Conflict UX

If a selected slot becomes unavailable:

> That time is no longer available. Please choose another time.

Offer nearby available slots if the backend provides them.

Do not automatically change the booking without customer confirmation.

---

# 92. Provider Reassignment UX

If a T2/T3 booking must be reassigned:

Show:

- current assignment;
- eligible replacement;
- availability;
- reassignment confirmation.

Record the action in backend audit history.

---

# 93. Cancellation UX

Cancellation should show:

- cancellation policy;
- potential financial impact;
- confirmation;
- resulting status.

Do not hide potential refund consequences.

---

# 94. Refund UX

Customers should see:

- refund requested;
- refund processing;
- refund completed;
- refund failed.

Do not promise an exact refund timing unless the backend has a defined guarantee.

---

# 95. Provider Cash Workflow

Provider dashboard should clearly display:

```text
Payment method: Cash
Customer tender: R200
Change requested: R50
```

This should be visible on the relevant booking.

---

# 96. Provider EFT Workflow

Provider should see:

```text
EFT
Status: Pending
Reference: XXXXX
Proof: Submitted / Not submitted
```

Only authorized users can confirm EFT.

---

# 97. Business Finance UX

T3 finance dashboard can show:

```text
Gross
Waasha commission
Staff allocations
Partner allocations
Refunds
Net business earnings
Pending
Available
Paid out
```

Exact visibility follows business permissions.

---

# 98. Admin Audit UX

Admin audit interface should support:

- event;
- actor;
- entity;
- timestamp;
- action;
- request/reference ID;
- before/after where appropriate.

Sensitive values should be redacted.

---

# 99. Testing Strategy

Frontend testing should include:

### Unit

- components;
- utilities;
- validation;
- formatting;
- state logic.

### Integration

- API interaction;
- auth flows;
- booking flow;
- payment flow;
- notifications.

### End-to-End

- customer registration;
- marketplace search;
- booking;
- Cash/change;
- EFT;
- digital payment;
- T1/T2/T3 workflows;
- business management;
- admin security.

---

# 100. Accessibility Testing

Test:

- keyboard-only navigation;
- screen readers;
- mobile accessibility;
- reduced motion;
- form errors;
- focus management.

---

# 101. Security Testing

Test that frontend cannot bypass:

- route guards;
- permission checks;
- tier restrictions.

More importantly, verify backend authorization independently.

---

# 102. Browser Support

Support current mainstream:

- Safari;
- Chrome;
- Edge;
- Firefox.

Mobile web should support current iOS/Android browsers.

The final supported-version matrix should be maintained as a build/deployment policy.

---

# 103. Frontend Environment Configuration

Use environment-specific configuration for:

```text
API_BASE_URL
APP_ENV
PUBLIC_PAYMENT_KEY
PUSH_CONFIG
ANALYTICS_CONFIG
```

Never expose secret backend keys in frontend configuration.

---

# 104. Build Pipeline

Recommended:

```text
Git
 ↓
Lint
 ↓
Type Check
 ↓
Unit Tests
 ↓
Build
 ↓
Security Checks
 ↓
Staging
 ↓
E2E Tests
 ↓
Production
```

Production deployment should be repeatable.

---

# 105. Error Monitoring

Use an application monitoring solution to track:

- frontend crashes;
- API errors;
- route failures;
- payment UI failures;
- performance issues.

Sanitize personal/financial information before sending error context.

---

# 106. Feature Flags

Feature flags can be used for:

- new UI;
- experimental functionality;
- staged rollout;
- provider capabilities.

Do not use feature flags as a substitute for authorization.

---

# 107. Design System

Create reusable primitives:

```text
Button
Input
Select
Modal
Drawer
Card
Badge
Avatar
Tabs
Toast
Skeleton
EmptyState
ErrorState
DataTable
Calendar
```

This prevents visual drift.

---

# 108. Design Tokens

Centralize:

- colours;
- spacing;
- typography;
- radius;
- shadows;
- breakpoints;
- animation durations.

Use the Stitch-approved values as the starting design system.

---

# 109. Human-Centred UX

Waasha should feel human.

Use:

- clear language;
- friendly confirmations;
- simple error messages;
- contextual guidance;
- minimal jargon.

Avoid overly technical language in customer-facing screens.

---

# 110. Neutral Premium Design

The design should not become overly feminine or overly masculine.

Use:

- strong typography;
- balanced navy/teal;
- clean whitespace;
- restrained motion;
- professional imagery.

The product should feel appropriate for:

- barbers;
- hair salons/stylists;
- nail technicians;
- beauty services;
- car wash businesses.

---

# 111. Customer Choice

The UI should make comparison easy without declaring one provider superior solely because of tier.

Show meaningful signals:

- rating;
- reviews;
- distance;
- price;
- availability;
- portfolio;
- service details.

---

# 112. No Tier Ranking UI

Do not create labels such as:

> Premium provider because T3

or:

> Featured because T2

unless explicitly introduced as a separate, transparent product feature.

Current rule:

> Tier defines capability, not marketplace quality.

---

# 113. Training Centre UI Rule

Training-centre attribution may be visible where useful, but must not imply:

> Training-centre provider = preferred provider.

Partner attribution is an operational/financial relationship.

---

# 114. Accessibility + Motion

The diamond logo animation and other motion should respect reduced-motion settings.

Do not use motion as the only way to communicate:

- loading;
- success;
- errors;
- state changes.

---

# 115. Internationalization

Prepare frontend for:

- language;
- currency;
- timezone;
- date formats;
- number formats.

South Africa is the initial market.

Do not hard-code:

```text
R
+27
Africa/Johannesburg
```

throughout the application.

These should come from locale/configuration where appropriate.

---

# 116. Data Formatting

Centralize formatting utilities for:

- currency;
- dates;
- times;
- distance;
- phone numbers.

Example:

```text
R150.00
2.4 km
10 September 2026
17:00
```

---

# 117. Final Frontend Architecture

Conceptually:

```text
                    WAASHA FRONTEND
                           │
          ┌────────────────┴────────────────┐
          │                                 │
     Public/Auth                       App Shell
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
                Customer                 Provider                Admin
                    │                       │
              Marketplace             T1 / T2 / T3
                    │                       │
                 Booking              Team / Business
                    │                       │
                Payments               Earnings/Finance
                    │
              Notifications
                    │
                 API Layer
                    │
              Backend Services
```

---

# 118. Definition of Done

The frontend architecture is complete when:

- one coherent application architecture exists;
- public/authenticated experiences are separated;
- customer experience is complete;
- T1 provider experience is complete;
- T2 team experience is complete;
- T3 business experience is complete;
- training-centre experience is defined;
- admin experience is defined;
- responsive layouts are supported;
- Stitch design direction is preserved;
- five categories are implemented;
- 10 km discovery is implemented;
- marketplace search/filtering is implemented;
- provider/service profiles are implemented;
- booking flow is implemented;
- Cash/change flow is implemented;
- EFT flow is implemented;
- Waasha Payment flow is implemented;
- notification centre is implemented;
- custom requests are implemented;
- service image limit of 3 is enforced;
- custom request image limit of 3 is enforced;
- tier-aware UI uses backend entitlements;
- permissions are enforced server-side;
- finance screens are permission-controlled;
- secure session handling exists;
- offline-safe UX exists;
- accessibility requirements are met;
- automated tests exist;
- error monitoring exists;
- production build pipeline exists.

---

# 119. Non-Negotiable Frontend Rules

1. Backend authorization is authoritative.
2. Frontend hiding is not security.
3. Provider tier is not marketplace ranking.
4. Training-centre affiliation is not marketplace ranking.
5. Exactly five core categories are supported.
6. 10 km is the default discovery radius.
7. Service/style images are limited to 3.
8. Custom-request images are limited to 3.
9. Payment success requires backend confirmation.
10. Booking confirmation requires backend confirmation.
11. Availability must be revalidated by the backend.
12. Cash change is a request, not a guarantee.
13. “Secure Checkout” is the approved checkout wording.
14. Sensitive financial information requires permission.
15. Private media requires authorization.
16. Offline mode must never fabricate payment or booking success.
17. T1/T2/T3 UI is capability-aware but backend-enforced.
18. T3 can manage all five approved categories.
19. Driver functionality is deferred to Phase 2.
20. The approved Stitch visual direction must be preserved unless a deliberate product/design decision changes it.

---

# 120. Source of Truth

This document must be implemented together with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`
- `WAASHA_PROVIDER_TIERS.md`
- `WAASHA_PAYMENT_FINANCE_ARCHITECTURE.md`
- `WAASHA_NOTIFICATION_COMMUNICATION_ARCHITECTURE.md`
- `WAASHA_AUTHENTICATION_AUTHORIZATION_SECURITY.md`
- `WAASHA_MARKETPLACE_DISCOVERY_SEARCH_ARCHITECTURE.md`

The Stitch export remains the visual source of truth for the screens already designed.

Stitch copy corrections remain:

- **“Secure Checkout”** instead of “T3 Encrypted Checkout”
- **“Cash change requested”** instead of “Guaranteed Cash Change”

---


<!-- ============================================================ -->
<!-- DOCUMENT 11: ADMIN PLATFORM ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA ADMIN PLATFORM ARCHITECTURE

**Document:** 11 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

The Waasha Admin Platform is the secure control centre used by authorized Waasha staff to operate, configure, monitor, support, and govern the marketplace.

It must provide operational visibility without becoming a shortcut around normal security, payment, booking, tenant-isolation, or audit rules.

The admin platform is an internal operational product. It is separate from the customer, provider, business, training-centre, and public marketplace experiences.

---

# 2. Admin Platform Principles

The platform must follow these principles:

1. **Least privilege** — administrators only receive the permissions required for their role.
2. **Full auditability** — important administrative actions are recorded.
3. **No silent data changes** — sensitive changes require a reason and create an audit event.
4. **Tenant isolation** — T2 and T3 data must never leak across organizations/business units.
5. **Financial integrity** — admins cannot casually alter completed financial records.
6. **Operational control** — admins can resolve legitimate marketplace and support issues.
7. **Configuration over hard-coding** — commissions, fees, limits, thresholds, and feature settings should be configurable.
8. **Separation of duties** — high-risk operations should require additional approval where appropriate.
9. **Privacy by default** — admins only see sensitive information when their role permits it.
10. **Evidence before action** — important decisions should be based on recorded events, history, and supporting data.

---

# 3. Admin Roles

The system should support granular permissions rather than one universal super-admin account.

| Role | Purpose |
|---|---|
| Platform Owner | Full platform governance |
| Super Admin | Broad operational administration |
| Operations Admin | Providers, businesses, bookings, marketplace operations |
| Support Admin | Customer/provider support and issue resolution |
| Finance Admin | Payments, commissions, payouts, reconciliation |
| Verification Admin | Provider/business verification |
| Moderation Admin | Profiles, services, images, reviews, reports |
| Marketing Admin | Content, campaigns, broadcasts, marketplace messaging |
| Analyst | Read-only reporting and analytics |
| Auditor | Read-only audit/compliance access |

Roles should be composed from permissions.

Example permission format:

```text
users.read
users.suspend
providers.verify
providers.suspend
businesses.read
bookings.read
bookings.intervene
payments.read
refunds.create
payouts.approve
commission.configure
training_centres.manage
reviews.moderate
reports.read
settings.manage
audit.read
```

---

# 4. Admin Dashboard

The main dashboard should provide a real-time operational snapshot.

## 4.1 Core KPIs

Display configurable cards for:

- Registered customers
- Active providers
- Verified providers
- Active businesses
- Active business units
- Today's bookings
- Upcoming bookings
- Completed bookings
- Cancelled bookings
- No-shows
- Custom requests
- Pending provider verification
- Pending business verification
- Gross transaction value
- Platform commission
- Training-centre earnings
- Pending payouts
- Failed payments
- Open disputes
- Reported content
- Suspended accounts

Admins must be able to choose which KPI cards are displayed.

---

# 5. Operational Command Centre

The dashboard should surface issues requiring action.

Examples:

- Payment failures
- Booking conflicts
- Provider no-shows
- Customer disputes
- Pending verification
- Suspicious activity
- Failed notifications
- Failed payouts
- Unresolved reports
- Businesses approaching suspension thresholds
- System errors affecting bookings

Each alert should link directly to the relevant record.

---

# 6. User Management

Admins can search and manage platform identities.

## 6.1 Search

Search by:

- Name
- Email
- Phone
- User ID
- Account status
- Role
- Provider tier
- Business
- Training-centre attribution
- Registration date

## 6.2 User Profile

Admin view should include:

- Identity information
- Roles
- Account status
- Verification status
- Provider/customer profile
- Businesses
- Team memberships
- Booking history
- Payment history where authorized
- Reviews
- Reports
- Notifications
- Audit history
- Security events

Sensitive fields should be masked unless permission allows access.

## 6.3 Account Actions

Authorized admins can:

- Suspend account
- Reinstate account
- Force verification review
- Require password reset
- Revoke active sessions
- Disable specific capabilities
- Add/remove administrative roles

Every sensitive action requires an audit record.

---

# 7. Provider Management

The provider management area covers T1, T2, and T3.

## 7.1 Provider Search

Filter by:

- Tier
- Category
- Location
- Verification status
- Account status
- Availability
- Business
- Team
- Training-centre attribution
- Performance indicators

The system must not rank providers higher merely because they are T2, T3, or training-centre affiliated.

## 7.2 Provider Profile

Display:

- Profile
- Skills
- Services
- Service images
- Portfolio
- Location
- Availability
- Payment methods
- Tier
- Team memberships
- Business relationships
- Verification
- Booking performance
- Reviews
- Earnings
- Training-centre attribution
- Audit history

## 7.3 Provider Actions

Authorized admins can:

- Approve verification
- Reject verification
- Request additional information
- Suspend provider
- Reinstate provider
- Hide a service
- Remove prohibited media
- Trigger re-verification
- Review complaints
- Correct eligible administrative metadata

Admins must not silently alter provider-owned commercial information.

---

# 8. Business Management

T3 businesses require additional administration.

Admin visibility includes:

- Business profile
- Owner
- Business units
- Locations
- Categories
- Staff
- Staff roles
- Compensation model
- Services
- Bookings
- Earnings
- Verification
- Compliance
- Status
- Audit history

Admins can:

- Approve/reject business verification
- Suspend business
- Reinstate business
- Suspend individual business units
- Review staff access
- Review category eligibility
- Investigate operational issues

---

# 9. Booking Administration

Bookings are operational records and should be treated carefully.

Admins can search by:

- Booking ID
- Customer
- Provider
- Business
- Category
- Date
- Status
- Payment status
- Location
- Booking type
- Dispute status

## 9.1 Booking Timeline

Every booking should expose an event timeline:

```text
Created
→ Accepted
→ Payment initiated
→ Payment confirmed
→ Provider/customer notifications
→ Started
→ Completed
→ Review
→ Settlement
```

Actual state transitions depend on the booking lifecycle defined in the Booking Engine.

## 9.2 Admin Intervention

Authorized operations admins may:

- Reassign eligible bookings
- Cancel bookings
- Resolve operational exceptions
- Correct non-financial metadata
- Initiate approved refunds
- Mark a dispute for review
- Contact participants
- Add internal notes

Admins should not bypass booking-state validation.

---

# 10. Marketplace Administration

Admins must be able to govern the marketplace without manipulating provider ranking unfairly.

Controls include:

- Category management
- Service visibility
- Provider visibility
- Business visibility
- Location configuration
- Default discovery radius
- Maximum discovery radius
- Search filters
- Marketplace availability
- Content moderation
- Suspended provider exclusion

Default discovery radius:

**10 km**

The radius must remain configurable by platform settings.

---

# 11. Category Administration

Waasha launches with exactly five core categories:

1. Barbers
2. Hair Salons & Stylists
3. Nail Technicians
4. Beauty Services
5. Car Wash

Admins can configure:

- Category name
- Description
- Icon
- Visibility
- Required provider information
- Category-specific service attributes
- Moderation rules

The admin interface must not accidentally introduce additional marketplace categories without an explicit product decision.

---

# 12. Custom Request Administration

Admins can monitor:

- Open requests
- Submitted proposals
- Accepted proposals
- Expired requests
- Cancelled requests
- Reported requests

A request can include:

- Description
- Preferred date/time
- Location
- Up to 3 customer images
- Optional budget/payment preference

Admins should be able to investigate abuse or disputes but must not arbitrarily choose a provider for a customer.

---

# 13. Verification Centre

Verification should have a dedicated workspace.

## Verification Queue

Statuses:

```text
Pending
Under Review
More Information Required
Approved
Rejected
Expired
Suspended
```

Admin reviewers can inspect:

- Identity information
- Documents
- Provider profile
- Business information
- Submitted evidence
- Previous verification decisions

Every decision should record:

- Reviewer
- Timestamp
- Decision
- Reason
- Evidence/reference
- Previous status

---

# 14. Payments & Finance Administration

Finance operations must be separated from ordinary admin functions.

## 14.1 Finance Dashboard

Display:

- Gross transaction value
- Successful payments
- Failed payments
- Refunds
- Platform commission
- Training-centre share
- Staff compensation
- Provider earnings
- Pending payouts
- Available payouts
- Reconciliation exceptions

## 14.2 Payment Records

Each payment should expose:

- Payment ID
- Booking ID
- Customer
- Provider/business
- Amount
- Currency
- Payment method
- Provider transaction reference
- Payment status
- Webhook events
- Refunds
- Commission
- Settlement status
- Timestamps

## 14.3 Financial Integrity

Completed financial records must be immutable wherever possible.

Corrections should use:

- Reversal
- Adjustment
- Refund
- Credit/debit ledger entry

rather than editing the original financial event.

---

# 15. Commission Administration

The platform commission is currently:

**25%**

However, it must never be hard-coded.

Admins should configure:

- Default commission percentage
- Effective dates
- Category-specific rules if introduced
- Provider/business eligibility
- Training-centre allocation
- Promotional overrides
- Minimum/maximum limits where applicable

Every commission rule change must record:

- Previous value
- New value
- Admin
- Reason
- Effective date
- Audit event

Historical transactions must retain their original commission snapshot.

---

# 16. Training Centre Partner Administration

Admins can manage training-centre partnerships.

Records include:

- Training centre
- Partner status
- Contact information
- Referral attribution
- Referred providers
- Eligible transactions
- Earnings
- Payouts
- Agreement/configuration
- Audit history

Training-centre partners must not receive permanent marketplace ranking preference.

Their financial benefit is tied to eligible completed transactions according to configured rules.

---

# 17. Payout Administration

Finance admins can review:

- Provider payout balances
- Business balances
- Training-centre balances
- Payout requests
- Pending payouts
- Completed payouts
- Failed payouts
- Reversed payouts

High-risk payout actions should support approval workflows.

Recommended:

```text
Requested
→ Reviewed
→ Approved
→ Processing
→ Paid
```

Failed payouts must remain traceable and retryable.

---

# 18. Refunds & Disputes

The admin platform should support controlled dispute handling.

## Dispute workflow

```text
Opened
→ Under Review
→ Evidence Requested
→ Decision
→ Refund/Adjustment/Reject
→ Closed
```

Admins should capture:

- Reason
- Evidence
- Internal notes
- Decision
- Financial impact
- Responsible reviewer

Refunds must flow through the payment abstraction rather than directly modifying booking amounts.

---

# 19. Reviews & Moderation

Admins can review:

- Customer reviews
- Provider reviews
- Reported reviews
- Suspicious review activity

Possible moderation actions:

- Keep
- Hide
- Remove where policy permits
- Escalate
- Suspend abusive account

Moderation must be logged.

Admins should not alter review content to improve marketplace reputation.

---

# 20. Media & Content Moderation

The admin platform should provide moderation queues for:

- Profile images
- Service images
- Portfolio images
- Custom-request images
- Business media

The service-image limit remains:

**Maximum 3 images per service/style.**

Moderators can:

- Approve
- Reject
- Hide
- Request replacement
- Escalate

Media deletion must preserve an audit trail.

---

# 21. Notification Administration

Admins can inspect:

- Notification delivery
- Push tokens/devices
- Email delivery
- SMS readiness
- WhatsApp readiness
- Failed notifications
- Retry attempts
- Dead-letter events

Authorized admins can send controlled broadcasts.

Broadcasts must support:

- Audience filters
- Preview
- Scheduling
- Template selection
- Approval where required
- Delivery statistics

---

# 22. Reports & Analytics

The admin platform should provide reporting across:

### Marketplace

- Providers by category
- Customers by location
- Booking volume
- Search activity
- Conversion
- Cancellation rate
- No-show rate

### Finance

- GMV
- Commission
- Refunds
- Provider earnings
- Training-centre earnings
- Payouts

### Operations

- Average response time
- Booking acceptance
- Completion
- Support issues
- Disputes
- Verification turnaround

### Growth

- New customers
- New providers
- Active providers
- Repeat bookings
- Customer retention
- Provider retention

Reports must support date ranges and export where authorized.

---

# 23. Platform Configuration

Admins should manage configuration from a central settings area.

Examples:

- Default discovery radius: 10 km
- Commission: 25%
- Maximum service images: 3
- Maximum custom-request images: 3
- Booking cancellation rules
- Review rules
- Verification requirements
- Notification defaults
- Feature flags
- Rate limits
- Upload limits
- Supported payment methods
- Currency
- Timezone defaults
- Maintenance mode

Configuration changes require permission and audit logging.

---

# 24. Feature Flags

Feature flags should support controlled rollout.

Examples:

```text
custom_requests_enabled
cash_payments_enabled
eft_payments_enabled
paystack_enabled
training_centre_program_enabled
business_multi_unit_enabled
push_notifications_enabled
```

Feature flags should support:

- Global enable/disable
- Environment-specific configuration
- Role-based testing where appropriate
- Audit history

Driver functionality is **not part of the initial launch** and should not be exposed as an active launch feature.

---

# 25. Audit Log

The audit system is mandatory.

Record events such as:

- Login/security events
- User suspension
- Provider verification
- Business verification
- Booking intervention
- Refund
- Payout approval
- Commission changes
- Settings changes
- Role changes
- Media moderation
- Review moderation
- Data exports
- Administrative impersonation, if ever implemented

Example:

```text
2026-09-03 14:22
Admin: admin_123
Action: PROVIDER_SUSPENDED
Target: provider_456
Reason: Repeated no-show complaints
IP: recorded
Request ID: req_789
```

Audit logs should be append-only and protected from ordinary modification.

---

# 26. Admin Search

Global search should support:

```text
Customer
Provider
Business
Business Unit
Booking
Payment
Payout
Training Centre
Custom Request
Review
Report
Audit Event
```

Search must enforce authorization before returning results.

---

# 27. Admin Notes

Internal notes should be available for support and operational investigations.

Notes should include:

- Author
- Timestamp
- Related entity
- Note content
- Visibility scope

Internal notes must never be exposed to customers/providers unless explicitly intended.

---

# 28. Data Export

Authorized admins may export operational data.

Exports must support:

- Date filtering
- Entity filtering
- Column selection
- Role-based restrictions
- Export logging
- Secure download
- Expiration

Sensitive exports should require elevated permission and preferably additional confirmation.

---

# 29. Security Controls

The admin platform must use stronger security than normal customer/provider interfaces.

Required:

- MFA
- Secure sessions
- Short admin session lifetime
- Session revocation
- IP/device/security logging
- Rate limiting
- Role-based permissions
- Object-level authorization
- Audit logging
- Re-authentication for high-risk actions
- Secure secrets management
- No shared administrator accounts

High-risk actions should support step-up authentication.

---

# 30. Tenant Isolation

For T2 and T3:

```text
Admin
  ↓
Authorized Platform Scope
  ↓
Business
  ↓
Business Units
  ↓
Staff / Services / Bookings
```

An admin must never accidentally expose one business's private data to another.

All tenant-sensitive queries must enforce authorization at the service/data-access layer.

---

# 31. Impersonation

If administrative impersonation is introduced, it must be tightly controlled.

Requirements:

- Explicit permission
- Reason required
- Clear "Admin acting as user" indicator
- Full audit trail
- Restricted duration
- No access to credentials
- No access to raw payment secrets
- High-risk actions blocked or separately authorized

Impersonation should be avoided unless operationally necessary.

---

# 32. Admin API

The frontend must consume secured admin APIs rather than directly accessing database records.

Suggested structure:

```text
/api/v1/admin/dashboard
/api/v1/admin/users
/api/v1/admin/providers
/api/v1/admin/businesses
/api/v1/admin/bookings
/api/v1/admin/marketplace
/api/v1/admin/verification
/api/v1/admin/payments
/api/v1/admin/payouts
/api/v1/admin/commissions
/api/v1/admin/training-centres
/api/v1/admin/reviews
/api/v1/admin/moderation
/api/v1/admin/notifications
/api/v1/admin/reports
/api/v1/admin/settings
/api/v1/admin/audit-logs
```

Every endpoint requires explicit permission.

---

# 33. Observability

Admin operations should expose platform health indicators:

- API errors
- Payment failures
- Webhook failures
- Notification failures
- Queue backlog
- Database health
- Storage failures
- Authentication failures
- Booking conflicts
- Payout failures

The admin dashboard should link operational alerts to logs/traces where available.

---

# 34. Data Retention

Retention rules should be configurable and aligned with applicable South African and international privacy obligations.

The platform should distinguish:

- Active operational data
- Historical financial records
- Audit records
- Deleted/anonymized user data
- Temporary files
- Security logs

Deletion and anonymization actions must themselves be auditable.

---

# 35. Emergency Controls

Platform Owner/Super Admin should have controlled emergency capabilities:

- Global maintenance mode
- Disable new bookings
- Disable payments
- Disable payouts
- Disable custom requests
- Disable provider onboarding
- Disable customer registration
- Disable marketplace visibility

Emergency actions require:

- Reason
- Timestamp
- Actor
- Scope
- Audit event

---

# 36. Admin Navigation

Recommended structure:

```text
Dashboard

Marketplace
├── Providers
├── Businesses
├── Categories
├── Services
└── Locations

Bookings
├── All Bookings
├── Custom Requests
├── Disputes
└── Exceptions

Users
├── Customers
├── Providers
├── Staff
└── Admins

Verification
├── Providers
├── Businesses
└── Documents

Finance
├── Payments
├── Commissions
├── Provider Earnings
├── Training Centre Earnings
├── Payouts
└── Reconciliation

Partners
└── Training Centres

Moderation
├── Reviews
├── Media
└── Reports

Communications
├── Notifications
├── Templates
└── Broadcasts

Analytics
├── Marketplace
├── Operations
├── Finance
└── Growth

System
├── Settings
├── Feature Flags
├── Audit Logs
└── Platform Health
```

---

# 37. API / Database Rules

The admin platform must respect the core architecture:

- MySQL 8.x
- API-first architecture
- Service-layer authorization
- Transaction-safe financial operations
- Idempotency for financial actions
- Historical snapshots
- Soft deletion where appropriate
- Audit trails
- Tenant isolation
- No direct client-side database access

---

# 38. Testing Requirements

Admin functionality requires:

### Unit tests

- Permission checks
- Commission calculations
- Status transitions
- Configuration validation

### Integration tests

- Verification workflows
- Booking intervention
- Refund workflows
- Payout approval
- Moderation
- Tenant isolation

### Security tests

- Privilege escalation
- IDOR/object access
- Cross-tenant access
- Session attacks
- MFA bypass
- Unauthorized exports

### Audit tests

Every sensitive action must produce the expected audit event.

---

# 39. Definition of Done

The Admin Platform Architecture is complete when:

- All administrative domains have defined ownership.
- Roles and permissions are explicit.
- Sensitive operations are audited.
- T2/T3 tenant isolation is enforced.
- Financial operations are separated and protected.
- Verification workflows are defined.
- Marketplace controls are defined.
- Moderation workflows are defined.
- Reporting requirements are defined.
- Platform configuration is centralized.
- Feature flags are supported.
- Emergency controls are protected.
- Admin APIs are defined.
- Security and testing requirements are explicit.
- Driver functionality remains excluded from initial launch.

---

# 40. Non-Negotiable Rules

1. **Exactly five core launch categories.**
2. **10 km remains the default marketplace discovery radius.**
3. **25% commission is configurable, not hard-coded.**
4. **Maximum 3 images per service/style.**
5. **Maximum 3 images per custom request.**
6. **T1, T2, and T3 are capability tiers, not ranking advantages.**
7. **Training-centre affiliation does not create permanent marketplace ranking priority.**
8. **Payment status and service completion remain separate.**
9. **Financial history must not be overwritten.**
10. **Admin actions affecting sensitive records must be auditable.**
11. **T2/T3 business data must remain tenant-isolated.**
12. **Driver functionality is deferred to Phase 2.**
13. **Paystack remains behind the payment abstraction.**
14. **Security controls apply to every admin API and interface.**
15. **No shared administrator accounts.**

---

# 41. Relationship to Other Waasha Documents

This document integrates with:

- `WAASHA_PRODUCT_BUILD_SPEC.md`
- `WAASHA_DATABASE_ARCHITECTURE.md`
- `WAASHA_API_SPEC.md`
- `WAASHA_BOOKING_ENGINE.md`
- `WAASHA_PROVIDER_TIERS.md`
- `WAASHA_PAYMENT_FINANCE_ARCHITECTURE.md`
- `WAASHA_NOTIFICATION_COMMUNICATION_ARCHITECTURE.md`
- `WAASHA_AUTHENTICATION_AUTHORIZATION_SECURITY.md`
- `WAASHA_MARKETPLACE_DISCOVERY_SEARCH_ARCHITECTURE.md`
- `WAASHA_FRONTEND_APPLICATION_ARCHITECTURE.md`

It establishes the administrative control layer that operates above these systems without bypassing their rules.

---

# 42. Final Architecture Principle

**The Waasha Admin Platform is not simply an admin dashboard. It is the operational control centre for the entire marketplace.**

It should give Waasha's internal team enough visibility and authority to operate the platform confidently while ensuring that:

- customer trust is protected,
- provider fairness is protected,
- business data remains isolated,
- money remains traceable,
- decisions remain auditable,
- security remains enforceable,
- and the marketplace can scale without becoming operationally fragile.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 12: MEDIA & FILE STORAGE ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA MEDIA & FILE STORAGE ARCHITECTURE

**Document:** 12 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

The Waasha Media & File Storage Architecture defines how images, documents, uploads, generated assets, and other files are uploaded, validated, stored, processed, delivered, secured, moderated, retained, and deleted.

Media is a core part of Waasha because customers and providers depend on visual information for discovery, portfolios, services, custom requests, and business profiles.

The architecture must support production scale while protecting user privacy, preventing malicious uploads, preserving tenant isolation, and keeping storage costs manageable.

---

# 2. Media Principles

1. **Secure by default**
2. **Private files remain private**
3. **Public marketplace media is delivered safely**
4. **Never trust client-provided file metadata**
5. **Validate content server-side**
6. **Process uploads asynchronously where practical**
7. **Store originals separately from optimized derivatives**
8. **Use signed URLs for protected assets**
9. **Keep database records separate from binary file storage**
10. **Every important media action is auditable**
11. **Deletion and retention rules are explicit**
12. **Media limits are enforced server-side**

---

# 3. Media Categories

Waasha should distinguish media by business purpose.

| Media type | Example | Visibility |
|---|---|---|
| Profile media | Provider profile image | Public/controlled |
| Service media | Service/style images | Public marketplace |
| Portfolio media | Provider work | Public/controlled |
| Business media | Business/unit images | Public marketplace |
| Custom request media | Customer reference images | Private |
| Verification documents | Identity/business evidence | Highly private |
| Payment documents | Supporting financial documents | Highly private |
| User attachments | Support evidence | Private |
| System assets | Logos/icons | Public |
| Admin uploads | Platform content | Controlled |

---

# 4. Image Limits

The following launch rules are mandatory:

### Service/style images

**Maximum: 3 images per service/style**

### Custom requests

**Maximum: 3 customer images per custom request**

The API must enforce these limits.

The frontend may prevent additional selection, but frontend validation is not sufficient.

---

# 5. Supported File Types

Initial supported media should be deliberately limited.

## Images

Recommended:

```text
JPEG
PNG
WebP
HEIC/HEIF where supported by processing pipeline
```

## Documents

Where required:

```text
PDF
JPEG
PNG
```

Additional formats should require an explicit product/security decision.

Executable files must never be accepted as ordinary uploads.

---

# 6. File Size Limits

File size limits should be configurable by media type.

Example initial policy:

| Media | Suggested limit |
|---|---:|
| Profile image | 10 MB |
| Service image | 15 MB |
| Portfolio image | 15 MB |
| Custom request image | 15 MB |
| Verification document | 20 MB |
| Admin content | 25 MB |

These values should be configuration rather than application constants.

---

# 7. Upload Architecture

Recommended flow:

```text
Client
  ↓
Request Upload Permission
  ↓
API Authentication & Authorization
  ↓
Create Upload Record
  ↓
Generate Secure Upload Target
  ↓
Client Uploads File
  ↓
Storage
  ↓
Validation / Malware Scan
  ↓
Image Processing
  ↓
Generate Derivatives
  ↓
Mark Media Ready
  ↓
Serve via CDN / Secure URL
```

The client should never be trusted to declare that a file is safe.

---

# 8. Upload Sessions

Each upload should have an upload record.

Example:

```text
upload_id
owner_id
tenant_id
media_type
original_filename
declared_mime_type
detected_mime_type
size_bytes
storage_key
status
checksum
created_at
completed_at
deleted_at
```

Recommended states:

```text
INITIATED
UPLOADING
UPLOADED
SCANNING
PROCESSING
READY
REJECTED
FAILED
DELETED
```

---

# 9. Storage Strategy

Binary files should not be stored directly inside MySQL.

Use object storage.

Conceptually:

```text
MySQL
  └── Media metadata

Object Storage
  ├── Original files
  ├── Optimized files
  ├── Thumbnails
  └── Private documents
```

The database stores metadata and relationships.

The object store stores the actual file bytes.

---

# 10. Storage Namespaces

Storage keys should be generated by the system.

Example:

```text
waasha/
  public/
    providers/{provider_id}/
    services/{service_id}/
    businesses/{business_id}/
  private/
    custom-requests/{request_id}/
    verification/{verification_id}/
    support/{case_id}/
```

Do not use raw user filenames as storage paths.

---

# 11. Tenant Isolation

T2/T3 business media must be scoped correctly.

Example:

```text
tenant_id
business_id
business_unit_id
owner_id
```

Every protected media access request must verify authorization against the associated entity.

A valid media URL must never be sufficient proof of authorization for private files.

---

# 12. Public vs Private Media

## Public

Examples:

- Approved provider profile images
- Approved service images
- Approved portfolio images
- Approved business images

Public media may use CDN caching.

## Private

Examples:

- Custom-request images
- Verification documents
- Support attachments
- Financial documents

Private media must require authorization and preferably use short-lived signed URLs.

---

# 13. Signed URLs

For private files:

```text
User requests file
        ↓
API verifies permission
        ↓
API generates short-lived signed URL
        ↓
User retrieves object
```

Signed URLs should:

- Expire quickly
- Be scoped to the specific object
- Not expose storage credentials
- Not allow arbitrary object traversal

---

# 14. Image Processing

Uploaded images should be processed into standardized derivatives.

Possible outputs:

```text
original
large
medium
thumbnail
```

Example responsive sizes:

```text
thumbnail: 200px
medium: 600px
large: 1200px
```

Exact dimensions should be configurable.

Processing should preserve acceptable quality while reducing bandwidth.

---

# 15. Image Optimization

The processing pipeline should support:

- Resize
- Compression
- Orientation correction
- Metadata stripping where appropriate
- WebP/modern format derivatives
- Thumbnail generation
- Aspect-ratio handling
- Quality normalization

Do not blindly upscale low-resolution images.

---

# 16. EXIF & Metadata

Images may contain EXIF data including:

- GPS coordinates
- Device information
- Camera information
- Timestamp

For public marketplace images, sensitive metadata should normally be stripped before public delivery.

This is especially important for:

- Customer uploads
- Custom requests
- Provider personal media

Original files should remain protected according to retention policy.

---

# 17. Malware & Content Scanning

All uploaded files must pass validation.

Security pipeline:

```text
Upload
 ↓
File signature detection
 ↓
MIME validation
 ↓
Size validation
 ↓
Malware scanning
 ↓
Content validation
 ↓
Processing
 ↓
Ready / Rejected
```

Do not trust:

- Filename extension
- Client MIME type
- Browser-provided file type

---

# 18. Image Content Moderation

Marketplace-facing media should support moderation.

Possible outcomes:

```text
Pending
Approved
Rejected
Needs Review
Hidden
```

Moderation can combine:

- Automated checks
- Human review
- User reports
- Admin decisions

Automated moderation should not permanently delete media without a defined policy and recovery path.

---

# 19. Verification Documents

Verification documents require stronger controls.

Requirements:

- Private storage
- Strict authorization
- Encryption at rest
- Short-lived access URLs
- Access logging
- Download logging
- Retention policy
- Deletion/anonymization process
- No public CDN caching

Only authorized verification/admin personnel should access these files.

---

# 20. Custom Request Images

Custom-request images are customer-provided reference material.

Rules:

- Maximum 3 images
- Private by default
- Visible to the customer and authorized providers involved in the request
- Accessible to authorized admins for support/moderation
- Never exposed as general marketplace content
- Removed according to retention policy

Providers responding to a custom request must only access the images belonging to that request.

---

# 21. Portfolio & Service Media

Provider-owned public media should support:

- Upload
- Preview
- Reordering
- Replacement
- Hide/unhide where supported
- Delete
- Moderation status
- CDN delivery

Deleting a media item should not break historical booking records.

Historical records should retain a safe reference or placeholder where necessary.

---

# 22. Media Ownership

Every media object should have an explicit owner/reference.

Examples:

```text
user
provider
service
business
business_unit
custom_request
verification_case
support_case
admin
```

Avoid orphaned files.

A media record without a valid business relationship should enter an orphan-cleanup process.

---

# 23. Media Database Model

Recommended core entity:

```text
media_assets
```

Fields should include concepts such as:

```text
id
uuid
owner_type
owner_id
tenant_id
media_type
storage_key
original_filename
mime_type
detected_mime_type
extension
size_bytes
checksum
width
height
duration
visibility
moderation_status
processing_status
metadata_json
created_by
created_at
updated_at
deleted_at
```

A separate relationship table can be used where one media asset can belong to multiple supported entities.

---

# 24. Checksums & Deduplication

Calculate a cryptographic checksum for uploaded files.

Purpose:

- Detect duplicate uploads
- Verify integrity
- Support safe retries
- Identify corrupted objects
- Reduce unnecessary storage

Do not rely on checksum alone for security decisions.

---

# 25. CDN

Public optimized marketplace images should be delivered through a CDN where practical.

Benefits:

- Faster discovery
- Lower application-server load
- Better mobile performance
- Geographic caching
- Reduced bandwidth costs

Private files should not be placed in publicly cacheable CDN paths.

---

# 26. Caching

Media caching should distinguish:

### Public immutable derivatives

Long cache lifetime.

### Mutable media

Use versioned URLs or cache invalidation.

### Private media

Short-lived signed access.

Example:

```text
/service/123/image.webp?v=8
```

When an image is replaced, increment its version.

---

# 27. Offline Uploads

The application should tolerate interrupted uploads.

Recommended approach:

```text
Select image
 ↓
Create upload session
 ↓
Upload
 ↓
Network interruption
 ↓
Resume/retry
 ↓
Validate
 ↓
Process
```

The frontend should show:

- Upload progress
- Pending
- Retry
- Failed
- Ready

An upload failure must not create a broken service or custom request.

---

# 28. Mobile Image Handling

Before upload, mobile clients should be able to:

- Compress large images
- Correct orientation
- Resize where appropriate
- Show preview
- Retry failed uploads

However, server-side validation and processing remain authoritative.

---

# 29. Storage Security

Object storage must use:

- Private buckets/containers by default
- Least-privilege service accounts
- Encryption at rest
- TLS in transit
- Restricted administrative access
- Access logging
- Lifecycle rules
- Backup strategy

Storage credentials must never be embedded in frontend code.

---

# 30. Deletion

Deletion should distinguish:

### Soft deletion

Media record is marked deleted but retained temporarily.

### Hard deletion

Object is permanently removed after retention requirements are satisfied.

Example:

```text
User deletes image
 ↓
Media marked DELETED
 ↓
Public reference removed
 ↓
Retention window
 ↓
Permanent storage deletion
```

Financial, audit, and legal requirements may require exceptions.

---

# 31. Orphan Cleanup

A scheduled cleanup process should detect:

- Files with no database record
- Database records with missing files
- Abandoned upload sessions
- Failed processing outputs
- Expired temporary files

Cleanup must be conservative and auditable.

Never automatically delete a file simply because it appears unused without checking retention and business relationships.

---

# 32. Storage Lifecycle

Different media should have different lifecycle policies.

Example:

```text
Temporary uploads
→ short retention

Rejected uploads
→ limited retention

Public marketplace media
→ active while referenced

Custom-request media
→ business-defined retention

Verification documents
→ policy/legal retention

Audit evidence
→ longer controlled retention
```

Exact retention periods should be configurable and reviewed against applicable requirements.

---

# 33. Backup & Disaster Recovery

Critical media should be recoverable.

The strategy should consider:

- Object versioning
- Replication
- Backup
- Recovery testing
- Database/media consistency
- Restore procedures

A database backup without corresponding media recovery is incomplete.

---

# 34. Upload Abuse Protection

Protect the upload system against:

- Oversized uploads
- Upload flooding
- Malicious files
- Automated abuse
- Repeated failed uploads
- Excessive storage consumption

Controls include:

- Authentication
- Rate limits
- Per-user quotas
- Per-tenant quotas
- File limits
- Request limits
- Abuse monitoring

---

# 35. Media Quotas

Configurable quotas can apply to:

- Individual providers
- Businesses
- Training centres
- Customers
- Admins

Quotas should consider:

- File count
- Storage size
- Upload frequency

Quota failures should return clear API errors.

---

# 36. Admin Media Management

Admins should be able to:

- Search media
- Filter by type
- View moderation status
- View owner
- Hide media
- Reject media
- Restore where permitted
- Delete media
- Review access history
- Investigate reports

Administrative media actions must be audited.

---

# 37. API Design

Suggested endpoints:

```text
POST   /api/v1/media/uploads
GET    /api/v1/media/{id}
PATCH  /api/v1/media/{id}
DELETE /api/v1/media/{id}

POST   /api/v1/media/{id}/complete
POST   /api/v1/media/{id}/retry

GET    /api/v1/admin/media
POST   /api/v1/admin/media/{id}/approve
POST   /api/v1/admin/media/{id}/reject
POST   /api/v1/admin/media/{id}/hide
POST   /api/v1/admin/media/{id}/restore
```

Actual endpoint authorization must depend on the owning entity and the caller's role.

---

# 38. Upload Security Rules

The backend must:

1. Authenticate the uploader.
2. Authorize the target entity.
3. Validate file size.
4. Validate detected MIME type.
5. Validate file signature.
6. Scan for malware.
7. Generate safe storage keys.
8. Process the media.
9. Strip unsafe metadata where appropriate.
10. Apply visibility rules.
11. Record audit events.
12. Return only authorized URLs.

---

# 39. Observability

Track:

- Upload success rate
- Upload failure rate
- Average upload size
- Processing duration
- Scan failures
- Rejected files
- Storage usage
- CDN performance
- Broken media references
- Orphaned files
- Download/access errors
- Moderation queue size

Alerts should be triggered for abnormal failure rates or storage growth.

---

# 40. Testing

## Unit tests

- File limits
- Media ownership
- Visibility
- Permissions
- State transitions
- Image rules

## Integration tests

- Upload
- Scan
- Processing
- CDN delivery
- Signed URLs
- Deletion
- Tenant isolation

## Security tests

- Malicious file upload
- MIME spoofing
- Path traversal
- Unauthorized download
- Cross-tenant access
- Signed URL abuse
- Storage credential exposure

## Reliability tests

- Interrupted uploads
- Duplicate uploads
- Processing failures
- Storage outage
- CDN failure
- Retry behaviour

---

# 41. Definition of Done

The media architecture is complete when:

- Object storage is defined.
- Database metadata is defined.
- Public/private separation is defined.
- Upload states are defined.
- File validation is defined.
- Malware scanning is defined.
- Image processing is defined.
- Moderation is defined.
- Signed URLs are defined.
- Tenant isolation is defined.
- Offline/retry behaviour is defined.
- Deletion and retention are defined.
- Backup/recovery is defined.
- Admin controls are defined.
- API requirements are defined.
- Observability is defined.
- Security testing is defined.

---

# 42. Non-Negotiable Rules

1. **Maximum 3 images per service/style.**
2. **Maximum 3 images per custom request.**
3. **Private documents must never be publicly accessible.**
4. **Custom-request images are private by default.**
5. **Verification documents require strict authorization.**
6. **Object storage, not MySQL, stores binary media.**
7. **Client-provided MIME types are never trusted.**
8. **All uploads must pass server-side validation.**
9. **Public media must not expose sensitive EXIF metadata where inappropriate.**
10. **Storage credentials never enter frontend code.**
11. **T2/T3 tenant isolation applies to media as well as business data.**
12. **Deleted media must follow retention rules.**
13. **Media actions affecting sensitive content must be auditable.**
14. **Upload failures must not create broken business records.**
15. **Driver functionality is not part of this launch architecture.**

---

# 43. Relationship to Existing Architecture

This document integrates with:

- Product Build Specification
- Database Architecture
- API Specification
- Booking Engine
- Provider Tiers
- Payment & Finance Architecture
- Notification & Communication Architecture
- Authentication, Authorization & Security
- Marketplace, Discovery & Search Architecture
- Frontend Application Architecture
- Admin Platform Architecture

Media is therefore treated as a shared platform capability rather than a feature belonging to only one frontend.

---

# 44. Final Architecture Principle

**Every Waasha file must have a clear owner, purpose, visibility level, security policy, lifecycle, and audit trail.**

The media system should make Waasha visually rich without allowing media to become a security, privacy, performance, or operational weakness.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 13: ANALYTICS, REPORTING & OBSERVABILITY ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA ANALYTICS, REPORTING & OBSERVABILITY ARCHITECTURE

**Document:** 13 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

This document defines how Waasha measures product usage, marketplace performance, financial activity, operational health, system reliability, security events, and business growth.

Analytics and observability are separate but connected disciplines:

- **Product analytics** explains what users and businesses are doing.
- **Business reporting** explains what the marketplace is producing.
- **Operational observability** explains whether the platform is working correctly.
- **Security monitoring** explains whether the platform is being abused or attacked.

Waasha must be measurable from the beginning so that product decisions are based on evidence rather than assumptions.

---

# 2. Core Principles

1. **Measure outcomes, not vanity metrics.**
2. **Every critical workflow should produce useful events.**
3. **Financial reporting must reconcile with the financial ledger.**
4. **Operational metrics must be actionable.**
5. **Sensitive personal data must not be unnecessarily collected in analytics.**
6. **Analytics must respect authorization and privacy.**
7. **Events should have consistent names and schemas.**
8. **Historical reporting must remain reproducible.**
9. **Alerts should identify problems before users experience widespread impact.**
10. **Observability data must have defined retention policies.**

---

# 3. Analytics Domains

Waasha analytics should be divided into:

```text
Product Analytics
Marketplace Analytics
Booking Analytics
Provider Analytics
Business Analytics
Customer Analytics
Finance Analytics
Training Centre Analytics
Marketing Analytics
Support Analytics
Security Analytics
Infrastructure Observability
```

---

# 4. Event Architecture

The application should emit structured events.

Example:

```json
{
  "event_name": "booking_completed",
  "event_version": 1,
  "event_id": "evt_123",
  "timestamp": "2026-09-03T12:30:00Z",
  "actor_type": "provider",
  "actor_id": "user_123",
  "booking_id": "booking_456",
  "category": "barber",
  "properties": {}
}
```

Events should contain identifiers and useful context without unnecessarily copying sensitive personal information.

---

# 5. Event Naming

Use predictable naming:

```text
user_registered
user_logged_in
provider_profile_completed
provider_verified
service_created
service_published
service_viewed
search_performed
provider_viewed
booking_created
booking_accepted
booking_declined
booking_cancelled
booking_started
booking_completed
payment_initiated
payment_succeeded
payment_failed
refund_created
payout_requested
payout_completed
review_created
custom_request_created
proposal_submitted
proposal_accepted
notification_sent
notification_failed
```

Event names should describe an actual business action or state transition.

---

# 6. Product Funnel

The main customer journey should be measurable:

```text
Visit
 ↓
Register
 ↓
Set Location
 ↓
Browse Category
 ↓
Search
 ↓
View Provider
 ↓
View Service
 ↓
Start Booking
 ↓
Payment / Cash / EFT
 ↓
Booking Accepted
 ↓
Service Started
 ↓
Service Completed
 ↓
Review
 ↓
Repeat Booking
```

Track conversion and drop-off between each major stage.

---

# 7. Customer Analytics

Customer metrics include:

- New customers
- Active customers
- Returning customers
- Searches
- Provider views
- Service views
- Booking attempts
- Successful bookings
- Completed bookings
- Cancellation rate
- No-show rate
- Average booking value
- Repeat booking rate
- Review rate
- Custom-request usage

Avoid storing unnecessary behavioral information that is not required for product or operational purposes.

---

# 8. Customer Retention

Track cohorts by:

- Registration week/month
- First booking date
- First completed service
- Category
- Geographic area where appropriately aggregated

Useful measures:

```text
D1
D7
D30
D60
D90
```

Retention should distinguish:

- Registered user
- Active user
- Booking user
- Completed-service user

---

# 9. Provider Analytics

Provider metrics include:

- Profile completion
- Verification conversion
- Service publication
- Search impressions
- Profile views
- Booking requests
- Acceptance rate
- Decline rate
- Cancellation rate
- No-show rate
- Completion rate
- Average response time
- Average booking value
- Earnings
- Reviews
- Repeat customers

Providers should have access only to data they are authorized to see.

---

# 10. Provider Tier Analytics

Track T1/T2/T3 usage as capability adoption, not marketplace ranking.

Examples:

- T1 active providers
- T2 active teams
- T3 active businesses
- Team members added
- Business units created
- Multi-category adoption
- Staff assignments
- Team booking volume

Do not use tier analytics to justify automatic marketplace ranking preference.

---

# 11. Business Analytics

T3 businesses should receive:

- Booking volume
- Revenue
- Average booking value
- Category performance
- Business-unit performance
- Staff activity
- Staff response time
- Completion rate
- Cancellation rate
- No-show rate
- Customer repeat rate
- Review performance
- Service performance

Business-unit data must remain tenant-isolated.

---

# 12. Marketplace Analytics

Measure:

- Searches
- Search results
- Zero-result searches
- Provider impressions
- Provider profile views
- Service views
- Category demand
- Geographic demand
- Booking conversion
- Search-to-booking conversion
- Availability gaps
- Custom-request demand

The marketplace should reveal where demand exists without creating unfair ranking advantages.

---

# 13. Geographic Analytics

Because discovery is location-based, measure demand geographically.

Examples:

- Search density
- Booking density
- Provider density
- Supply/demand ratio
- Zero-result areas
- Category demand by area

Default discovery radius:

**10 km**

Location analytics should use appropriate aggregation and privacy controls rather than exposing individual customer movement patterns.

---

# 14. Category Analytics

Exactly five launch categories:

1. Barbers
2. Hair Salons & Stylists
3. Nail Technicians
4. Beauty Services
5. Car Wash

Track per category:

- Providers
- Active providers
- Services
- Searches
- Views
- Bookings
- Completed services
- Revenue
- Average booking value
- Cancellation rate
- Repeat rate

---

# 15. Booking Analytics

Track the booking lifecycle:

```text
Created
Accepted
Declined
Cancelled
Started
Completed
Disputed
```

Key metrics:

- Booking acceptance rate
- Time to acceptance
- Cancellation rate
- No-show rate
- Completion rate
- Time from booking to service
- Repeat booking rate

---

# 16. Custom Request Analytics

Track:

- Requests created
- Requests receiving proposals
- Average proposals/request
- Proposal acceptance rate
- Request-to-booking conversion
- Expired requests
- Cancelled requests
- Average proposed value
- Category demand

Customer reference images must never be copied into analytics datasets.

---

# 17. Payment Analytics

Payment reporting should distinguish:

```text
Payment initiated
Payment authorized
Payment successful
Payment failed
Refunded
Partially refunded
Settled
```

Analyze by:

- Payment method
- Category
- Provider
- Business
- Date
- Amount
- Failure reason
- Currency

Supported launch payment methods:

- Waasha Payment
- Cash
- EFT

Waasha Payment remains behind the payment abstraction and Paystack adapter.

---

# 18. Financial Reconciliation

Analytics must not become the source of truth for money.

The financial ledger remains authoritative.

Reporting should reconcile:

```text
Gross transaction value
- Refunds
= Net transaction value

Platform commission
+ Training-centre allocation
+ Provider/business earnings
+ Other configured allocations
= Financial distribution
```

Any discrepancy should create a reconciliation exception.

---

# 19. Commission Analytics

Current configured platform commission:

**25%**

Analytics should show:

- Commission generated
- Commission by category
- Commission by provider/business
- Commission by date
- Commission rule version
- Training-centre allocation
- Adjustments

Historical transactions must use their recorded commission snapshot.

---

# 20. Training Centre Analytics

Track:

- Referred providers
- Activated providers
- Verified providers
- First bookings
- Completed eligible transactions
- Partner earnings
- Payouts
- Conversion rate

The system must distinguish:

```text
Registration
→ Attribution
→ Activation
→ Completed eligible transaction
→ Partner earning
```

Training-centre attribution should not affect marketplace ranking.

---

# 21. Marketing Analytics

Track acquisition sources where consent and privacy requirements allow.

Possible sources:

- Organic
- Social
- Referral
- Training-centre
- Campaign
- Direct
- Partner
- Other configured source

Measure:

- Registrations
- Activated users
- First bookings
- Completed bookings
- Customer acquisition cost where available
- Provider acquisition cost where available
- Conversion

---

# 22. Notification Analytics

Track:

- Notification created
- Queued
- Sent
- Delivered where supported
- Opened where supported
- Failed
- Retried
- Dead-lettered

Analyze by channel:

```text
In-app
Push
Email
SMS-ready
WhatsApp-ready
```

Do not use message content as an analytics payload unless necessary.

---

# 23. Support Analytics

Support operations should measure:

- Tickets/cases opened
- First response time
- Resolution time
- Escalation rate
- Reopened cases
- Dispute volume
- Top issue categories
- Booking-related support
- Payment-related support
- Verification-related support

---

# 24. Security Analytics

Security events include:

- Failed login
- MFA failure
- Password reset
- Session revocation
- Suspicious access
- Rate-limit violations
- Unauthorized resource attempts
- Admin privilege changes
- Admin sensitive actions
- Data exports
- Media access to protected documents

Security analytics should integrate with alerting and incident response.

---

# 25. Application Observability

Waasha backend services should produce:

### Logs

Structured application events.

### Metrics

Numeric measurements over time.

### Traces

Request-level distributed tracing where multiple services/processes are involved.

Conceptually:

```text
Request
 ↓
API
 ↓
Authentication
 ↓
Booking Service
 ↓
Payment Service
 ↓
Notification Queue
 ↓
Database
```

A request should be traceable across relevant components.

---

# 26. Correlation IDs

Every important request should have a correlation/request ID.

Example:

```text
request_id: req_123456
```

Use it across:

- API logs
- Booking events
- Payment events
- Notification events
- Error logs
- Admin actions

This allows support and engineering teams to trace failures.

---

# 27. Core System Metrics

Monitor:

- Request rate
- Error rate
- Response time
- CPU
- Memory
- Database connections
- Database query latency
- Queue depth
- Worker failures
- Storage usage
- Cache performance
- External API failures

---

# 28. Service Level Indicators

Important SLIs include:

### Availability

Percentage of successful requests.

### Latency

Percentage of requests completed within target thresholds.

### Booking reliability

Percentage of booking workflows completed without system error.

### Payment reliability

Percentage of payment attempts successfully processed or correctly handled.

### Notification reliability

Percentage of notifications successfully processed.

---

# 29. Suggested SLO Areas

Exact targets should be established from real production data, but Waasha should define targets for:

| Area | Example target |
|---|---:|
| API availability | 99.9% |
| Booking API success | 99.9% |
| Payment webhook processing | 99.99% |
| Critical notification processing | 99.9% |
| Admin availability | 99.9% |

These are engineering targets, not promises to users, until formally adopted.

---

# 30. Alerting

Alerts should be actionable.

Examples:

```text
API error rate > threshold
Payment failures spike
Webhook processing delayed
Booking creation failures spike
Database connection exhaustion
Queue backlog increasing
Payout failures spike
Storage capacity approaching limit
Authentication failures spike
```

Avoid alerts for normal, expected events.

---

# 31. Alert Severity

Recommended:

| Level | Meaning |
|---|---|
| P1 Critical | Major platform/business impact |
| P2 High | Significant degraded service |
| P3 Medium | Limited operational impact |
| P4 Low | Informational/non-urgent |

P1 alerts require defined incident procedures.

---

# 32. Dashboards

Create dedicated dashboards:

### Executive

- Customers
- Providers
- Businesses
- Bookings
- GMV
- Commission
- Growth

### Marketplace

- Supply
- Demand
- Search
- Conversion
- Geography
- Categories

### Operations

- Booking health
- Verification
- Support
- Notifications
- Disputes

### Finance

- Payments
- Refunds
- Commission
- Earnings
- Payouts
- Reconciliation

### Engineering

- API
- Database
- Queues
- Storage
- Errors
- Latency

### Security

- Authentication
- Suspicious activity
- Admin actions
- Access violations

---

# 33. Data Warehouse / Reporting Layer

As Waasha grows, operational database queries should not carry the full burden of analytics.

Architecture:

```text
Production Database
        ↓
Event / Data Pipeline
        ↓
Analytics Store / Warehouse
        ↓
Reporting & BI
```

Operational queries remain optimized for the application.

Analytical queries can run against an appropriate reporting layer.

---

# 34. Data Model for Analytics

Analytics should use stable identifiers and dimensions.

Possible dimensions:

```text
date
time
category
provider
business
business_unit
location
customer cohort
payment method
booking type
provider tier
acquisition source
```

Sensitive attributes should only be included when genuinely necessary and authorized.

---

# 35. Data Quality

Analytics must include validation for:

- Missing events
- Duplicate events
- Invalid timestamps
- Invalid category
- Invalid booking references
- Impossible state transitions
- Financial mismatches

Example:

A `booking_completed` event without a corresponding valid booking should be flagged.

---

# 36. Event Idempotency

Events may be delivered more than once.

Analytics ingestion should use:

```text
event_id
event_version
source
timestamp
```

Duplicate events should not double-count bookings, payments, or revenue.

---

# 37. Time & Timezones

Waasha is South Africa-first but globally ready.

Store canonical timestamps in UTC.

Display times using the user's/business location timezone.

Reports should explicitly identify the timezone used for date boundaries.

This prevents incorrect daily/weekly reporting around midnight.

---

# 38. Privacy

Analytics must follow privacy-by-design principles.

Avoid collecting:

- Unnecessary personal information
- Raw payment credentials
- Private document contents
- Full message content without need
- Precise location history unrelated to product needs

Use aggregated geographic analytics where individual-level precision is unnecessary.

---

# 39. Data Retention

Different data classes require different retention.

Example:

```text
High-volume product events
→ defined analytics retention

Operational logs
→ shorter operational retention

Security logs
→ controlled longer retention

Financial reporting
→ financial/legal retention requirements

Audit logs
→ controlled long-term retention
```

Retention must be documented and configurable.

---

# 40. Analytics Access Control

Analytics permissions should follow the user's role.

Examples:

```text
Executive → broad business reporting
Operations → operational metrics
Finance → financial metrics
Provider → own performance
Business → own organization
Analyst → approved aggregate data
Auditor → read-only controlled access
```

A provider must not see another provider's private performance data.

A T3 business must not see another business's tenant data.

---

# 41. Exports

Reports may support:

- CSV
- XLSX
- PDF where appropriate

Exports should:

- Respect permissions
- Record the requester
- Record filters
- Record timestamp
- Protect sensitive information
- Use secure download links

---

# 42. Real-Time vs Historical Analytics

Not every metric needs real-time computation.

### Real-time

Use for:

- Platform health
- Booking exceptions
- Payment failures
- Queue backlog
- Security incidents

### Near-real-time

Use for:

- Marketplace activity
- Operational dashboards
- Notification delivery

### Batch

Use for:

- Cohorts
- Monthly reporting
- Historical trends
- Long-term business analysis

---

# 43. Performance Analytics

Monitor performance at:

```text
Frontend
 ↓
Network
 ↓
API
 ↓
Database
 ↓
External service
```

Frontend metrics may include:

- Page load
- API latency
- Failed requests
- Crash/error rate
- Upload performance
- Offline synchronization failures

---

# 44. Mobile / Offline Observability

Track:

- Offline mode entered
- Offline actions queued
- Sync attempts
- Sync success
- Sync conflicts
- Failed synchronization
- Retry count

Do not record sensitive user content simply to measure offline performance.

---

# 45. Third-Party Monitoring

External observability tools may be used, but the architecture should remain vendor-neutral.

Examples of capabilities:

- Error tracking
- Log aggregation
- Metrics
- Tracing
- Uptime monitoring
- Alerting

Vendor selection should consider:

- Cost
- South African/global availability
- Data residency
- Privacy
- Integration
- Exportability
- Lock-in

---

# 46. Incident Analytics

During incidents, capture:

- Incident ID
- Start time
- Detection time
- Impact
- Affected systems
- Affected users
- Root cause
- Mitigation
- Recovery time
- Follow-up actions

Important incidents should produce a post-incident review.

---

# 47. Business Intelligence Questions

The reporting layer should eventually answer:

### Customers

- Who books?
- What services are demanded?
- Which customers return?

### Providers

- Which providers are active?
- Where is supply insufficient?
- What causes cancellations?

### Businesses

- Which units perform best?
- Which services generate demand?
- Where are operational bottlenecks?

### Marketplace

- Where is demand exceeding supply?
- Which searches return no useful results?
- How does availability affect conversion?

### Finance

- How much transaction value is processed?
- How much commission is generated?
- Where are reconciliation exceptions?

---

# 48. AI Readiness

The analytics architecture should prepare clean, permissioned data for future AI features.

Potential future use:

- Demand forecasting
- Provider recommendations
- Service recommendations
- Operational anomaly detection
- Churn prediction
- Customer support assistance
- Business performance insights

AI systems must use approved datasets and respect privacy and authorization.

---

# 49. Testing

## Event tests

Verify critical actions emit correct events.

## Analytics tests

Verify:

- Events are not duplicated
- Metrics calculate correctly
- Financial totals reconcile
- Date boundaries work
- Timezones work
- Filters work

## Observability tests

Verify:

- Errors are captured
- Correlation IDs propagate
- Alerts trigger
- Dashboards receive data

## Security tests

Verify:

- Unauthorized users cannot access restricted analytics
- Tenant boundaries are enforced
- Sensitive information is not leaked through events

---

# 50. Definition of Done

The analytics and observability architecture is complete when:

- Critical business events are defined.
- Product funnels are measurable.
- Marketplace metrics are defined.
- Booking metrics are defined.
- Provider and business analytics are defined.
- Financial reporting reconciles with the ledger.
- Training-centre analytics are defined.
- Security events are monitored.
- Logs, metrics, and traces are defined.
- Correlation IDs are supported.
- Dashboards are defined.
- Alerting is defined.
- Data quality checks are defined.
- Privacy controls are defined.
- Retention is defined.
- Analytics permissions are defined.
- Incident reporting is defined.
- AI-readiness is considered.

---

# 51. Non-Negotiable Rules

1. **Financial analytics never replaces the financial ledger as the source of truth.**
2. **Exactly five core launch categories remain.**
3. **10 km is the default discovery radius.**
4. **25% commission remains configurable and historical transactions retain snapshots.**
5. **T1/T2/T3 analytics must not create marketplace ranking preference.**
6. **Training-centre attribution must not create permanent ranking preference.**
7. **Sensitive personal data must not be unnecessarily copied into analytics.**
8. **Duplicate events must not double-count business or financial activity.**
9. **T2/T3 tenant isolation applies to reporting and analytics.**
10. **Security and admin events must be auditable.**
11. **UTC is the canonical timestamp standard.**
12. **Critical workflows must be observable end-to-end.**
13. **Analytics exports must respect permissions.**
14. **Driver functionality is excluded from launch analytics.**

---

# 52. Relationship to Existing Architecture

This document integrates with:

- Product Build Specification
- Database Architecture
- API Specification
- Booking Engine
- Provider Tiers
- Payment & Finance Architecture
- Notification & Communication Architecture
- Authentication, Authorization & Security
- Marketplace, Discovery & Search Architecture
- Frontend Application Architecture
- Admin Platform Architecture
- Media & File Storage Architecture

It establishes the measurement and visibility layer across the Waasha platform.

---

# 53. Final Architecture Principle

**If Waasha cannot measure a critical workflow, it cannot reliably improve it.**

The platform should make important customer, provider, business, financial, operational, and technical outcomes visible while keeping the underlying data secure, permissioned, accurate, and useful.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 14: INFRASTRUCTURE, DEVOPS & DEPLOYMENT ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA INFRASTRUCTURE, DEVOPS & DEPLOYMENT ARCHITECTURE

**Document:** 14 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

This document defines the production infrastructure, environments, deployment model, CI/CD, secrets, networking, scaling, backups, disaster recovery, infrastructure security, and operational practices required to run Waasha reliably.

Waasha is intended to be a complete production platform rather than a temporary prototype. Infrastructure must therefore support:

- Customers
- Providers
- T1/T2/T3 capabilities
- Businesses and business units
- Bookings
- Payments
- Custom requests
- Notifications
- Media
- Analytics
- Admin operations
- Future international expansion

---

# 2. Infrastructure Principles

1. **Infrastructure as code**
2. **Repeatable deployments**
3. **Separate environments**
4. **No production credentials in source code**
5. **Automated testing before deployment**
6. **Safe database migrations**
7. **Observability from day one**
8. **Automated backups**
9. **Least-privilege access**
10. **Horizontal scalability where practical**
11. **Graceful failure**
12. **Fast rollback**
13. **Vendor abstraction where it protects the product**
14. **Production parity between staging and production**
15. **Security is part of deployment, not an afterthought**

---

# 3. Recommended High-Level Architecture

Conceptually:

```text
Users
  │
  ├── Web
  ├── Mobile / PWA
  └── Admin
        │
        ▼
   CDN / Edge
        │
        ▼
   Load Balancer
        │
        ▼
   Application/API Layer
        │
   ┌────┼───────────────┐
   ▼    ▼               ▼
 MySQL Cache        Queue/Workers
   │                    │
   │              Notifications
   │              Media Processing
   │              Background Jobs
   │
   ├──────── Payment Provider
   ├──────── Email/SMS/Push
   ├──────── Object Storage
   └──────── Analytics
```

The exact cloud/vendor implementation can change without changing the application architecture.

---

# 4. Environments

At minimum:

```text
Development
Staging
Production
```

Optional:

```text
Preview / Review
Disaster Recovery
```

## Development

Used by developers and AI-assisted development workflows.

Characteristics:

- Local services
- Test data
- Development credentials
- Debug logging
- No production customer data

## Staging

Used for:

- Integration testing
- QA
- Release validation
- Payment sandbox testing
- Migration testing
- Acceptance testing

Staging should closely resemble production.

## Production

Contains live:

- Customer data
- Provider data
- Business data
- Bookings
- Financial records
- Media
- Notifications

Production access must be restricted.

---

# 5. Environment Isolation

Each environment should have separate:

- Databases
- Storage
- API credentials
- Payment credentials
- Notification credentials
- Encryption keys
- Logging destinations
- Analytics datasets where appropriate

Never point development or staging at the production database.

---

# 6. Infrastructure as Code

Infrastructure should be reproducible from code.

Possible technologies include:

```text
Terraform
OpenTofu
CloudFormation
Pulumi
```

Vendor selection can be finalized during implementation.

Infrastructure definitions should include:

- Networking
- Compute
- Database
- Storage
- Queues
- Cache
- CDN
- DNS
- Monitoring
- Secrets
- IAM
- Backups

---

# 7. Source Control

All application and infrastructure code should be version controlled.

Recommended repository organization:

```text
waasha/
├── frontend/
├── backend/
├── admin/
├── workers/
├── infrastructure/
├── database/
├── docs/
└── tests/
```

Exact repository structure can change if the implementation stack requires it.

---

# 8. Branching Strategy

Recommended:

```text
main
develop
feature/*
hotfix/*
release/*
```

Production deployments should originate from controlled branches.

Every production release should have:

- Version
- Commit reference
- Release notes
- Migration status
- Rollback plan

---

# 9. CI/CD Pipeline

Recommended pipeline:

```text
Commit
 ↓
Lint
 ↓
Unit Tests
 ↓
Security Scan
 ↓
Build
 ↓
Integration Tests
 ↓
Package
 ↓
Deploy Staging
 ↓
Smoke Tests
 ↓
Approval
 ↓
Deploy Production
 ↓
Health Checks
 ↓
Monitor
```

Automated deployments should be preferred over manual server changes.

---

# 10. Pull Request Requirements

Production code should require:

- Code review
- Automated tests
- Linting
- Security checks
- Build success
- Migration review where applicable

Direct production code modification should be prohibited except under documented emergency procedures.

---

# 11. Build Artifacts

Build artifacts should be immutable.

Examples:

```text
waasha-api:<git-sha>
waasha-web:<git-sha>
waasha-worker:<git-sha>
```

Do not deploy an artifact that changes after it has been built.

---

# 12. Containerization

Where containers are used, services should be packaged consistently.

Potential services:

```text
API
Worker
Scheduler
Frontend
Admin
Media processor
Notification worker
```

Containers should:

- Run as non-root where possible
- Use minimal base images
- Pin dependencies appropriately
- Receive secrets at runtime
- Expose only required ports
- Include health checks

---

# 13. Application Runtime

The backend architecture must remain compatible with the approved application stack.

The infrastructure should support:

- API services
- Background workers
- Scheduled jobs
- WebSocket/realtime capability if required
- File/media processing
- Notification processing

Scaling should not require rewriting core business logic.

---

# 14. Database Infrastructure

Waasha uses:

**MySQL 8.x**

Production database requirements:

- Managed database where practical
- Automated backups
- Encryption
- Restricted network access
- Monitoring
- Connection limits
- Read replicas when justified by scale
- Point-in-time recovery where supported

---

# 15. Database High Availability

As Waasha scales, the production database should support high availability.

Potential architecture:

```text
Application
    ↓
Database Endpoint
    ↓
Primary
 ┌──┴──┐
Replica Replica
```

Failover strategy should be tested rather than assumed.

---

# 16. Database Migrations

Every schema change must use versioned migrations.

Example:

```text
001_initial_schema
002_add_provider_tiers
003_add_business_units
004_add_payment_events
```

Rules:

- Never manually modify production schema without a migration record.
- Backward-compatible migrations should be preferred.
- Destructive changes should be staged.
- Large migrations require performance planning.
- Rollback strategy must be defined.

---

# 17. Zero / Low-Downtime Migrations

For high-traffic production:

```text
Expand
 ↓
Deploy compatible application
 ↓
Migrate data
 ↓
Switch application behaviour
 ↓
Contract old structure
```

Avoid migrations that require long table locks during peak traffic.

---

# 18. Cache

A cache layer may be used for:

- Sessions where appropriate
- Marketplace results
- Configuration
- Frequently accessed public data
- Rate limiting
- Temporary workflow state

Do not treat cache as the source of truth.

The database remains authoritative for persistent business records.

---

# 19. Queue & Worker Infrastructure

Background processing should be asynchronous where appropriate.

Jobs include:

- Notifications
- Email
- Push
- Media processing
- Malware scanning
- Analytics events
- Cleanup
- Scheduled reminders
- Reconciliation
- Payout processing
- Report generation

Architecture:

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Result / Event
```

---

# 20. Queue Reliability

Workers must support:

- Retries
- Exponential backoff
- Idempotency
- Dead-letter queues
- Visibility timeouts
- Job timeouts
- Failure logging

A failed notification should not cause the booking transaction itself to fail.

---

# 21. Scheduled Jobs

Use a scheduler for recurring operations.

Examples:

```text
Booking reminders
Expired custom requests
Temporary upload cleanup
Orphan media cleanup
Analytics aggregation
Payout processing
Reconciliation checks
Retention processing
Health checks
```

Scheduled jobs must be idempotent.

---

# 22. Secrets Management

Secrets must never be committed to Git.

Secrets include:

- Database passwords
- API keys
- Payment credentials
- Webhook secrets
- Encryption keys
- SMTP credentials
- Push credentials
- Storage credentials

Use a dedicated secrets manager or secure environment configuration.

---

# 23. Paystack Credentials

Paystack credentials must be environment-specific.

Example:

```text
Development → Paystack test credentials
Staging → Paystack test credentials
Production → Paystack live credentials
```

The application must access Paystack through the payment abstraction defined in the Payment & Finance Architecture.

The frontend must never receive secret Paystack credentials.

---

# 24. Networking

Production should separate public and private resources.

Conceptually:

```text
Internet
   ↓
CDN / Load Balancer
   ↓
Public application edge
   ↓
Private application services
   ↓
Private database / cache / queues
```

Database and internal services should not be directly exposed to the public internet.

---

# 25. Firewall / Security Groups

Restrict traffic using least privilege.

Examples:

```text
Internet → HTTPS only
Load Balancer → API
API → MySQL
API → Cache
API → Queue
Worker → Database
Worker → External APIs
```

Unused ports should remain closed.

---

# 26. TLS

All production traffic must use HTTPS/TLS.

Required for:

- Web
- API
- Admin
- Webhooks
- Storage
- Third-party integrations

HTTP should redirect to HTTPS where applicable.

---

# 27. DNS

Production domains should be centrally managed.

Recommended separation:

```text
www.waasha.<domain>
api.waasha.<domain>
admin.waasha.<domain>
assets.waasha.<domain>
```

Exact domains can be finalized later.

DNS changes should be controlled and auditable.

---

# 28. CDN & Edge

Use CDN/edge delivery for:

- Public web assets
- Public marketplace media
- Static frontend files

Benefits:

- Faster page loads
- Lower origin load
- Geographic performance
- Better scalability

Private media must continue using protected access mechanisms.

---

# 29. Autoscaling

Application services should be capable of scaling horizontally.

Example:

```text
Low traffic
→ 2 API instances

High traffic
→ 5 API instances

Peak traffic
→ 10+ API instances
```

Exact thresholds should be established using production metrics.

State should not depend on one application instance.

---

# 30. Stateless Application Design

API instances should be stateless where practical.

Do not store important state only in:

- Local filesystem
- Process memory
- One server instance

Use:

- Database
- Cache
- Object storage
- Queue
- External session store where needed

---

# 31. Health Checks

Services should expose health endpoints.

Example:

```text
GET /health
GET /ready
```

Distinguish:

### Liveness

Is the process running?

### Readiness

Can the service safely receive traffic?

A service that cannot connect to required dependencies should not necessarily receive production traffic.

---

# 32. Deployment Strategy

Supported strategies may include:

### Rolling

Gradually replace instances.

### Blue/Green

Maintain old and new environments and switch traffic.

### Canary

Send a small percentage of traffic to the new version before full rollout.

Start with the simplest reliable strategy and evolve as traffic grows.

---

# 33. Rollback

Every production deployment must have a rollback plan.

Rollback should consider:

- Application version
- Database migration
- Configuration
- Queue jobs
- Media processing
- External integrations

A database migration that cannot be safely reversed requires a forward-compatible recovery strategy.

---

# 34. Feature Flags

Feature flags allow code to deploy before a capability becomes active.

Examples:

```text
paystack_enabled
custom_requests_enabled
cash_payments_enabled
eft_payments_enabled
training_centre_program_enabled
business_multi_unit_enabled
```

Driver functionality remains deferred to Phase 2.

It should not be enabled through launch feature flags.

---

# 35. Deployment Gates

Production deployment should verify:

- Tests passed
- Security scan passed
- Build succeeded
- Migration reviewed
- Required environment variables exist
- Health checks pass
- Critical integrations available
- Rollback plan exists

---

# 36. Database Connection Management

Applications must use controlled connection pools.

Monitor:

- Active connections
- Idle connections
- Connection errors
- Pool exhaustion
- Query latency

Never allow uncontrolled connection creation by every request.

---

# 37. Performance

Infrastructure should monitor:

- API latency
- Database latency
- Queue latency
- Upload performance
- CDN response
- External API latency

Performance budgets should be established for critical user journeys.

---

# 38. Backups

Production must have automated backups for:

### Database

- Scheduled full backups
- Incremental/binlog/PITR strategy where supported

### Media

- Object versioning/replication
- Backup or recovery strategy

### Configuration

- Infrastructure code
- Application configuration
- Deployment artifacts

Backups must be encrypted and access-controlled.

---

# 39. Backup Testing

A backup is not considered reliable until recovery has been tested.

Test:

```text
Backup
 ↓
Restore
 ↓
Validate schema/data
 ↓
Validate media references
 ↓
Validate application
```

Recovery tests should be scheduled periodically.

---

# 40. Disaster Recovery

Define:

### RPO

Maximum acceptable data loss.

### RTO

Maximum acceptable recovery time.

Targets should be formally selected based on business requirements.

The architecture should support recovery from:

- Database failure
- Application failure
- Storage failure
- Region/provider outage
- Credential compromise
- Accidental deletion

---

# 41. Disaster Recovery Separation

Where justified by scale, critical backups should be stored separately from the primary production environment.

A compromised production account should not automatically allow deletion of every backup.

---

# 42. Infrastructure Monitoring

Monitor:

- CPU
- Memory
- Disk
- Network
- Database
- Cache
- Queue
- Storage
- CDN
- API
- Worker health

Connect these metrics to the observability architecture.

---

# 43. Cost Monitoring

Infrastructure should track:

- Compute
- Database
- Storage
- CDN
- Bandwidth
- Queue
- Monitoring
- Third-party services

Set alerts for unexpected cost increases.

---

# 44. Scaling Triggers

Potential scaling signals:

```text
CPU sustained above threshold
Memory pressure
Request latency increase
Queue backlog
Database CPU
Database connections
Storage growth
Traffic growth
```

Scaling rules should be based on measured production behaviour.

---

# 45. Production Access

Production access should be restricted to authorized personnel.

Requirements:

- MFA
- Individual accounts
- No shared credentials
- Least privilege
- Session logging
- Access reviews
- Emergency access process

Admin application access and infrastructure access should be separately controlled.

---

# 46. CI/CD Credentials

CI/CD systems should use short-lived or tightly scoped credentials where possible.

Do not place production secrets inside:

```text
source code
frontend bundles
logs
Docker images
public configuration
Git history
```

---

# 47. Security Scanning

CI/CD should support:

- Dependency scanning
- Container scanning
- Secret scanning
- Static analysis
- Infrastructure scanning

Critical vulnerabilities should block production releases according to the defined security policy.

---

# 48. Dependency Management

Dependencies should be:

- Version controlled
- Regularly updated
- Security monitored
- Tested before upgrade

Avoid uncontrolled dependency upgrades in production.

---

# 49. Infrastructure Logging

Record:

- Deployments
- Infrastructure changes
- Scaling events
- Authentication
- Configuration changes
- Database migrations
- Backup jobs
- Recovery events

Logs should integrate with the observability architecture.

---

# 50. Maintenance

Maintenance procedures should cover:

- Dependency updates
- OS/base-image updates
- Database maintenance
- Certificate renewal
- Secret rotation
- Backup validation
- Infrastructure upgrades

Maintenance should be planned where possible.

---

# 51. Secret Rotation

Sensitive credentials should have defined rotation procedures.

Examples:

- Database credentials
- Payment credentials
- Webhook secrets
- Storage credentials
- Notification credentials
- Encryption keys

Rotation must avoid unnecessary service interruption.

---

# 52. Incident Deployment Controls

During an incident:

- Freeze non-essential releases
- Identify current production version
- Preserve logs
- Assess rollback
- Communicate internally
- Deploy emergency fix through controlled pipeline
- Monitor recovery
- Document the incident

Emergency changes still require an audit trail.

---

# 53. Staging Data

Never copy production personal or financial data into staging unless there is an explicitly approved, privacy-safe process.

Prefer:

- Synthetic data
- Anonymized data
- Masked data

Payment credentials must always remain environment-specific.

---

# 54. Production Data Protection

Production data must be protected through:

- Encryption
- Network isolation
- Access control
- Backups
- Audit logging
- Monitoring
- Data retention
- Incident response

This applies to:

- Customers
- Providers
- Businesses
- Bookings
- Payments
- Verification data
- Media

---

# 55. Release Versioning

Use a consistent versioning strategy.

Example:

```text
Waasha 1.0.0
Waasha 1.0.1
Waasha 1.1.0
```

Every release should reference:

- Source commit
- Build artifact
- Database migration
- Deployment time
- Deployed environment

---

# 56. Launch Architecture

Initial production should prioritize simplicity and reliability.

A reasonable starting structure:

```text
CDN
 ↓
Load Balancer
 ↓
API instances
 ↓
MySQL 8.x
 ↓
Cache + Queue
 ↓
Workers
```

Plus:

```text
Object Storage
Payment Provider
Notification Providers
Monitoring
Backup
```

The architecture should allow individual components to scale independently as demand grows.

---

# 57. Vendor Abstraction

The application should avoid unnecessary dependence on a single infrastructure provider.

Where practical, abstract:

- Payments
- Notifications
- Storage
- Email
- SMS
- Analytics

This does not mean every provider must be interchangeable immediately. It means core business logic should not be tightly coupled to one vendor's implementation.

---

# 58. Deployment Definition of Done

Infrastructure is ready for production when:

- Development, staging, and production are isolated.
- Infrastructure is reproducible.
- CI/CD is operational.
- Production builds are immutable.
- Database migrations are automated and controlled.
- Secrets are protected.
- TLS is enabled.
- Database is private.
- Backups are automated.
- Recovery has been tested.
- Monitoring is active.
- Alerts are active.
- Rollback is documented.
- Scaling is supported.
- Costs are monitored.
- Production access is controlled.

---

# 59. Testing Requirements

## Infrastructure tests

- Infrastructure provisioning
- Network rules
- IAM permissions
- Database connectivity
- Storage permissions
- Queue connectivity

## Deployment tests

- Build
- Migration
- Smoke test
- Health check
- Rollback

## Security tests

- Secret exposure
- Network exposure
- Privilege escalation
- Container security
- Dependency vulnerabilities

## Disaster recovery tests

- Database restore
- Media recovery
- Service recovery
- Failover

---

# 60. Non-Negotiable Rules

1. **MySQL 8.x is the production relational database standard.**
2. **Production, staging, and development must be isolated.**
3. **Production secrets must never be committed to source control.**
4. **Paystack credentials must remain environment-specific and behind the payment abstraction.**
5. **Production databases must not be publicly exposed.**
6. **Production traffic must use HTTPS/TLS.**
7. **Critical infrastructure must be monitored.**
8. **Backups must be automated and recovery-tested.**
9. **Deployments must be reproducible.**
10. **Database changes must use versioned migrations.**
11. **Production releases must have rollback/recovery procedures.**
12. **Application instances should be stateless where practical.**
13. **Financial records must not be altered simply to repair an analytics/reporting problem.**
14. **T2/T3 tenant isolation applies throughout infrastructure and data access.**
15. **Exactly five core launch categories remain.**
16. **10 km remains the default discovery radius.**
17. **25% commission remains configurable.**
18. **Driver functionality remains deferred to Phase 2.**

---

# 61. Relationship to Existing Architecture

This document integrates with:

- Product Build Specification
- Database Architecture
- API Specification
- Booking Engine
- Provider Tiers
- Payment & Finance Architecture
- Notification & Communication Architecture
- Authentication, Authorization & Security
- Marketplace, Discovery & Search Architecture
- Frontend Application Architecture
- Admin Platform Architecture
- Media & File Storage Architecture
- Analytics, Reporting & Observability Architecture

It provides the infrastructure layer required to operate those systems reliably in production.

---

# 62. Final Architecture Principle

**Waasha infrastructure must make the product easy to deploy, difficult to break, and recoverable when things go wrong.**

The production environment should be treated as a controlled system: observable, secure, reproducible, scalable, backed up, and capable of safe recovery.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 15: TESTING & QUALITY ASSURANCE ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA TESTING & QUALITY ASSURANCE ARCHITECTURE

**Document:** 15 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

This document defines the testing and quality assurance strategy required to make Waasha a reliable production platform.

Testing must cover not only individual pieces of code, but the complete customer, provider, business, financial, administrative, media, notification, security, and infrastructure workflows.

The objective is not simply to achieve high test coverage. The objective is to ensure that **critical Waasha behaviour remains correct as the platform changes.**

---

# 2. Quality Principles

1. **Test business behaviour, not implementation alone.**
2. **Critical financial and booking workflows require stronger coverage.**
3. **Security testing is mandatory.**
4. **Automate repeatable tests.**
5. **Use realistic production-like environments.**
6. **Test failure paths, not only successful paths.**
7. **Protect tenant isolation with dedicated tests.**
8. **Never use real production payment credentials in automated tests.**
9. **Every production bug should result in a regression test where appropriate.**
10. **Release quality is a shared engineering responsibility.**

---

# 3. Testing Pyramid

Recommended structure:

```text
                 E2E Tests
               /           \
        Integration Tests
           /           \
      Component Tests
        /           \
          Unit Tests
```

Use many fast unit/component tests and fewer expensive end-to-end tests.

---

# 4. Test Layers

Waasha should include:

- Unit tests
- Component tests
- Integration tests
- API tests
- Database tests
- Contract tests
- End-to-end tests
- Security tests
- Performance tests
- Accessibility tests
- Compatibility tests
- Offline/synchronization tests
- Disaster-recovery tests
- User acceptance testing

---

# 5. Criticality Classification

Tests should be prioritized according to business impact.

### P0 — Critical

Failure could cause:

- Incorrect financial transaction
- Unauthorized access
- Booking corruption
- Cross-tenant data exposure
- Platform-wide outage

### P1 — High

Failure could seriously disrupt:

- Booking
- Provider operations
- Business operations
- Notifications
- Verification

### P2 — Standard

Normal product functionality.

### P3 — Low

Minor UI or non-critical behaviour.

---

# 6. Unit Testing

Unit tests should cover isolated business rules.

Examples:

```text
CommissionCalculator
BookingStateValidator
AvailabilityValidator
CashChangeCalculator
PermissionChecker
TierEntitlementChecker
PricingCalculator
DistanceCalculator
NotificationPreferenceResolver
PayoutEligibilityCalculator
```

Unit tests should be deterministic and fast.

---

# 7. Booking Engine Testing

The booking engine is a critical system.

Test every valid and invalid state transition.

Example:

```text
Created
 ↓
Accepted
 ↓
Started
 ↓
Completed
```

Also test:

```text
Created → Declined
Created → Cancelled
Accepted → Cancelled
Accepted → No-show
Accepted → Started
Started → Completed
```

Invalid transitions must be rejected.

---

# 8. Booking Concurrency Tests

Test simultaneous actions such as:

```text
Customer A books time slot
Customer B books same slot
```

Only valid booking(s) should succeed according to the defined availability rules.

Also test:

- Double acceptance
- Double cancellation
- Simultaneous provider assignment
- Duplicate completion
- Duplicate payment callback

---

# 9. Booking Pricing Tests

Verify:

- Service price
- Item/add-on price where supported
- Discounts if introduced
- Fees
- Commission
- Training-centre allocation
- Staff compensation
- Total payable amount

Historical booking snapshots must remain unchanged after provider pricing changes.

---

# 10. Custom Request Testing

Test:

- Request creation
- Up to 3 images
- Provider eligibility
- Proposal creation
- Multiple proposals
- Proposal acceptance
- Proposal rejection
- Proposal expiry
- Customer cancellation
- Conversion to booking

Test that the customer cannot accept conflicting proposals simultaneously.

---

# 11. Payment Testing

Payment is a P0 area.

Test:

```text
Initiated
→ Successful
→ Failed
→ Refunded
```

Also test:

- Duplicate webhook
- Delayed webhook
- Invalid webhook
- Wrong amount
- Wrong booking reference
- Signature failure
- Timeout
- Provider payment failure
- Partial refund where supported

---

# 12. Paystack Testing

Use Paystack test/sandbox credentials in development and staging.

Test:

- Payment initialization
- Successful payment
- Failed payment
- Webhook verification
- Duplicate webhook
- Timeout
- Refund
- Reconciliation

Production credentials must never appear in test code or CI logs.

---

# 13. Cash Testing

Cash flows require separate tests.

Example:

```text
Service = R150
Customer cash = R200
Change requested = R50
```

Verify that:

- Correct change amount is calculated
- Provider receives notification
- Customer sees correct status
- Booking does not automatically become completed
- Payment/service completion remain separate

Do not describe physical change as guaranteed by Waasha.

---

# 14. EFT Testing

Test:

- EFT selected
- Payment instructions generated
- Reference generated
- Pending state
- Manual/automated confirmation
- Incorrect reference
- Duplicate confirmation
- Expiry
- Cancellation

---

# 15. Financial Ledger Testing

Test that financial records:

- Are created exactly once
- Preserve historical snapshots
- Cannot be silently overwritten
- Support adjustments/reversals
- Reconcile with payments
- Reconcile with commissions
- Reconcile with payouts

Financial totals should be independently tested.

---

# 16. Commission Testing

Current platform commission:

**25%**

But it remains configurable.

Test:

- Default commission
- Changed commission
- Effective dates
- Historical snapshots
- Training-centre share
- Provider/business allocation
- Rounding
- Refund effects
- Adjustments

Example:

```text
Transaction
 ↓
Commission rule resolved
 ↓
Snapshot stored
 ↓
Ledger entries created
```

Changing the current commission must not rewrite old transactions.

---

# 17. Provider Tier Testing

Test T1, T2, and T3 capabilities independently.

### T1

Verify:

- Solo provider
- Own services
- Own availability
- Own bookings

### T2

Verify:

- Team creation
- Member permissions
- Assignments
- Team availability
- Compensation

### T3

Verify:

- Business
- Multiple business units
- Multiple categories
- Staff
- Staff assignments
- Compensation models

Tier differences must enforce capabilities, not marketplace ranking.

---

# 18. Tenant Isolation Testing

This is a P0 security requirement.

Test:

```text
Business A
    X
Business B
```

Business A must never access:

- Business B staff
- Business B bookings
- Business B earnings
- Business B customers' private data
- Business B media
- Business B reports

Test tenant isolation through:

- API
- Database queries
- Media URLs
- Admin workflows
- Exports
- Background jobs

---

# 19. Authorization Testing

Test every protected action:

```text
Can this user perform this action
on this resource
in this tenant
at this time?
```

Test:

- Customer permissions
- Provider permissions
- T2 team roles
- T3 staff roles
- Training-centre permissions
- Admin permissions
- Finance permissions
- Verification permissions

---

# 20. Authentication Testing

Test:

- Registration
- Login
- Logout
- Password reset
- Session expiry
- Token expiry
- Token rotation
- MFA
- Device/session revocation
- Suspended accounts
- Brute-force protection

---

# 21. Admin Security Testing

Admin actions require stronger testing.

Test:

- Role escalation
- Permission bypass
- Unauthorized refunds
- Unauthorized payouts
- Unauthorized exports
- Audit bypass
- Impersonation controls if implemented
- MFA bypass
- Session theft

---

# 22. Marketplace Testing

Test:

- 10 km default discovery
- Location permissions
- Manual location
- Provider location
- Category filters
- Availability filters
- Search
- Pagination
- Sorting
- Zero-result searches

Verify that T1/T2/T3 status does not automatically create ranking preference.

---

# 23. Geographic Testing

Test:

- Exact radius boundary
- Inside radius
- Outside radius
- Missing provider coordinates
- Invalid coordinates
- Changed provider location
- Customer location changes
- Multiple providers at similar distance

Default:

**10 km**

---

# 24. Category Testing

The launch marketplace must contain exactly:

1. Barbers
2. Hair Salons & Stylists
3. Nail Technicians
4. Beauty Services
5. Car Wash

Test:

- Category creation
- Category visibility
- Service assignment
- Provider eligibility
- Search
- Reporting

Any accidental sixth launch category should be caught by validation/configuration tests.

---

# 25. Media Testing

Test:

- Upload
- File size limits
- File type validation
- MIME spoofing
- Malware scanning
- Image processing
- Thumbnail generation
- EXIF stripping
- Public/private visibility
- Signed URLs
- Deletion
- Retry
- Orphan cleanup

Verify:

**Maximum 3 service/style images.**

Verify:

**Maximum 3 custom-request images.**

---

# 26. Notification Testing

Test:

- In-app
- Push
- Email
- SMS-ready
- WhatsApp-ready

Test:

- Correct recipient
- Correct event
- Preferences
- Quiet hours
- Duplicate prevention
- Retry
- Failure handling
- Deep links

A notification failure must not corrupt the underlying booking or payment.

---

# 27. Offline Testing

Test:

```text
Online
 ↓
Action begins
 ↓
Network lost
 ↓
Action queued
 ↓
Network restored
 ↓
Sync
```

Test:

- Duplicate sync
- Conflict
- Retry
- Partial sync
- Authentication expiry during sync
- App restart before sync

Financial actions require especially strict handling.

---

# 28. API Testing

Every API endpoint should test:

- Authentication
- Authorization
- Validation
- Success response
- Error response
- Pagination
- Filtering
- Rate limiting
- Idempotency where applicable

API contracts should be versioned.

---

# 29. Database Testing

Test:

- Constraints
- Foreign keys
- Unique keys
- Indexes
- Transactions
- Migration scripts
- Rollback/recovery strategy
- Concurrent writes

Production-like data volumes should be used for performance testing.

---

# 30. Integration Testing

Test real interactions between:

```text
Frontend
 ↕
API
 ↕
Database
 ↕
Queue
 ↕
Workers
 ↕
Payment Provider
 ↕
Notification Provider
 ↕
Object Storage
```

External systems should use sandbox/test environments when available.

---

# 31. Contract Testing

Contracts should be tested between:

- Frontend ↔ API
- API ↔ payment adapter
- API ↔ notification provider
- API ↔ storage service
- Workers ↔ queue
- Analytics pipeline ↔ event producers

A breaking API change should be detected before production deployment.

---

# 32. End-to-End Customer Tests

Automate major journeys.

### Customer booking

```text
Register
→ Set location
→ Browse
→ Select provider
→ Select service
→ Book
→ Pay
→ Receive confirmation
→ Service
→ Review
```

### Custom request

```text
Create request
→ Upload images
→ Receive proposal
→ Accept proposal
→ Booking
→ Complete service
→ Review
```

---

# 33. End-to-End Provider Tests

### T1

```text
Register
→ Verify
→ Create service
→ Set availability
→ Receive booking
→ Accept
→ Complete
→ Earnings
```

### T2

```text
Create team
→ Add member
→ Assign permissions
→ Assign booking
→ Complete service
→ Compensation
```

### T3

```text
Create business
→ Create units
→ Add categories
→ Add staff
→ Create services
→ Receive booking
→ Assign staff
→ Complete
→ Financial settlement
```

---

# 34. Admin E2E Tests

Test:

- User lookup
- Provider verification
- Business verification
- Booking intervention
- Refund workflow
- Payout approval
- Moderation
- Commission configuration
- Reports
- Audit logs
- Emergency controls

---

# 35. Accessibility Testing

Waasha should target WCAG 2.2 AA where practical.

Test:

- Keyboard navigation
- Screen readers
- Focus states
- Contrast
- Form labels
- Error messaging
- Touch target sizes
- Reduced motion
- Responsive layouts

The Stitch diamond animation must respect reduced-motion preferences.

---

# 36. Browser Testing

Test supported browsers according to the final support policy.

At minimum, validate current major versions of:

- Chrome
- Safari
- Edge
- Firefox

---

# 37. Mobile Testing

Test:

- iOS
- Android
- Small screens
- Large screens
- Slow networks
- Intermittent connectivity
- Camera/image upload
- Location permissions
- Push notifications

---

# 38. Performance Testing

Measure:

- API response time
- Page load
- Search response
- Booking creation
- Payment initiation
- Media upload
- Dashboard loading
- Database query performance

---

# 39. Load Testing

Simulate:

- Normal traffic
- Peak traffic
- Booking spikes
- Marketplace searches
- Notification bursts
- Media upload bursts
- Payment bursts

Test horizontal scaling and queue behaviour.

---

# 40. Stress Testing

Push systems beyond expected capacity to determine:

- Failure thresholds
- Recovery behaviour
- Queue saturation
- Database saturation
- Memory limits
- API limits

The objective is controlled failure rather than unpredictable failure.

---

# 41. Security Testing

Security testing should cover:

- OWASP web risks
- API authorization
- IDOR
- SQL injection
- XSS
- CSRF where applicable
- Authentication attacks
- Session attacks
- File upload attacks
- Path traversal
- Rate-limit bypass
- Secrets exposure

---

# 42. Dependency Security

CI/CD should scan dependencies.

Flag:

- Critical vulnerabilities
- High vulnerabilities
- Malicious packages
- Deprecated dependencies

Critical issues should block release according to policy.

---

# 43. Penetration Testing

Before major production launch, perform an independent security assessment covering:

- Web
- API
- Admin
- Authentication
- Authorization
- Media
- Payment workflows
- Tenant isolation

Findings should be prioritized and remediated.

---

# 44. Regression Testing

Every resolved production defect should be evaluated for a regression test.

Example:

```text
Production bug
 ↓
Root cause
 ↓
Fix
 ↓
Automated regression test
 ↓
Future releases protected
```

---

# 45. Test Data

Test environments should use synthetic or anonymized data.

Test fixtures should cover:

- Customer
- T1 provider
- T2 team
- T3 business
- Training centre
- Admin
- Bookings
- Payments
- Reviews
- Custom requests

---

# 46. Payment Test Data

Never use real payment credentials.

Use:

- Paystack sandbox/test data
- Mock payment adapter
- Controlled webhook fixtures

Payment test cases should be deterministic.

---

# 47. Failure Injection

Test controlled failures:

```text
Database unavailable
Payment provider unavailable
Notification provider unavailable
Storage unavailable
Queue unavailable
Network interruption
Worker crash
```

Verify graceful degradation.

---

# 48. Disaster Recovery Testing

Periodically test:

- Database restore
- Media recovery
- Application redeployment
- Infrastructure recreation
- Secret restoration/rotation
- Queue recovery

Record recovery time and issues discovered.

---

# 49. Test Environments

Recommended:

```text
Local
CI
Development
Staging
Production-like performance environment
```

Staging should remain close enough to production to detect deployment problems.

---

# 50. Quality Gates

A production release should not proceed if:

- Critical tests fail
- Security scan has blocking findings
- Database migration is unsafe
- Tenant isolation tests fail
- Payment tests fail
- Build fails
- Critical E2E journey fails

---

# 51. Test Reporting

CI should report:

- Passed
- Failed
- Skipped
- Flaky
- Duration
- Coverage
- Security findings

Track trends rather than focusing only on one build.

---

# 52. Code Coverage

Coverage should be treated as a signal, not the goal.

Prioritize high coverage for:

- Payments
- Booking state
- Authorization
- Commission
- Payouts
- Tenant isolation
- Availability

A high percentage of meaningless tests is not acceptable quality.

---

# 53. Flaky Tests

Flaky tests must be tracked separately.

Process:

```text
Detect
→ Quarantine temporarily
→ Diagnose
→ Fix
→ Restore to required suite
```

Do not permanently ignore flaky tests.

---

# 54. Release Candidate Process

Recommended:

```text
Feature complete
 ↓
Automated CI
 ↓
Deploy staging
 ↓
Integration tests
 ↓
E2E
 ↓
Security checks
 ↓
Performance smoke
 ↓
UAT
 ↓
Release candidate
 ↓
Production
```

---

# 55. User Acceptance Testing

UAT should include realistic participants representing:

- Customer
- T1 provider
- T2 provider/team
- T3 business
- Training-centre partner
- Support admin
- Finance admin

UAT should focus on actual business workflows.

---

# 56. Production Smoke Tests

Immediately after deployment verify:

```text
Homepage
Login
Marketplace
Provider profile
Service
Booking
Payment sandbox/controlled production verification
Notifications
Admin login
Health endpoint
```

Production payment verification must use safe operational procedures.

---

# 57. Monitoring After Release

For each release monitor:

- Error rate
- API latency
- Booking failures
- Payment failures
- Notification failures
- Queue depth
- Database performance
- User-reported issues

Increase monitoring attention immediately after major releases.

---

# 58. Bug Severity

Recommended:

| Severity | Example |
|---|---|
| Critical | Payment corruption, data breach, platform outage |
| High | Booking unavailable, major tenant issue |
| Medium | Important feature broken with workaround |
| Low | Minor UI issue |

Critical issues require immediate escalation.

---

# 59. Quality Metrics

Track:

- Production defects
- Escaped defects
- Test pass rate
- Test duration
- Flaky test rate
- Deployment failure rate
- Rollback rate
- Mean time to detect
- Mean time to recover

---

# 60. Definition of Done

Testing and QA are complete when:

- All critical workflows have automated coverage.
- Booking state transitions are tested.
- Payment flows are tested.
- Commission and financial calculations are tested.
- T1/T2/T3 permissions are tested.
- Tenant isolation is tested.
- Media security is tested.
- Notification failures are tested.
- Offline behaviour is tested.
- APIs are contract-tested.
- E2E customer/provider/admin journeys exist.
- Accessibility is tested.
- Performance is tested.
- Security testing is completed.
- Disaster recovery is tested.
- Release quality gates are enforced.

---

# 61. Non-Negotiable Rules

1. **Financial workflows are P0 testing areas.**
2. **Booking concurrency must be tested.**
3. **Tenant isolation must be tested at API, data, media, and admin layers.**
4. **25% commission is tested as a configurable value, not a hard-coded constant.**
5. **Historical financial snapshots must remain immutable.**
6. **Exactly five launch categories must be enforced by tests/configuration.**
7. **10 km is the default discovery radius and must have boundary tests.**
8. **Maximum 3 service/style images must be tested server-side.**
9. **Maximum 3 custom-request images must be tested server-side.**
10. **T1/T2/T3 tiers must not automatically affect marketplace ranking.**
11. **Training-centre attribution must not automatically affect marketplace ranking.**
12. **Production credentials must never be used in automated tests.**
13. **Every critical production defect should create a regression test where appropriate.**
14. **Driver functionality is excluded from launch testing.**

---

# 62. Relationship to Existing Architecture

This document integrates with:

- Product Build Specification
- Database Architecture
- API Specification
- Booking Engine
- Provider Tiers
- Payment & Finance Architecture
- Notification & Communication Architecture
- Authentication, Authorization & Security
- Marketplace, Discovery & Search Architecture
- Frontend Application Architecture
- Admin Platform Architecture
- Media & File Storage Architecture
- Analytics, Reporting & Observability Architecture
- Infrastructure, DevOps & Deployment Architecture

It provides the quality-control layer across the entire Waasha platform.

---

# 63. Final Architecture Principle

**Waasha should not rely on users to discover whether the system works. Testing must discover failures before users do.**

Every release should protect the workflows that matter most: finding a provider, booking a service, completing the service, moving money, protecting data, operating a business, and running the marketplace.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 16: OFFLINE-FIRST & SYNCHRONIZATION ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA OFFLINE-FIRST & SYNCHRONIZATION ARCHITECTURE

**Document:** 16 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

This document defines how Waasha behaves when customers, providers, staff, businesses, or administrators experience weak, intermittent, or unavailable network connectivity.

Hospitality and service environments can have unreliable connectivity. A production Waasha application must therefore remain useful when temporarily offline while ensuring that sensitive actions—especially bookings, payments, financial records, and permissions—never become inconsistent.

The core principle is:

> **Offline tolerance must improve resilience without creating false certainty.**

---

# 2. Offline Principles

1. **Read useful data offline where safe.**
2. **Queue safe user actions when connectivity is unavailable.**
3. **Never fabricate successful server-side outcomes.**
4. **Server state remains authoritative.**
5. **Financial actions require strict synchronization.**
6. **Every queued mutation receives an idempotency key.**
7. **Conflicts must be detected, not silently overwritten.**
8. **Sensitive data must have limited local retention.**
9. **Users must clearly understand pending vs confirmed actions.**
10. **Synchronization must be observable and recoverable.**

---

# 3. What Offline Means

Waasha should distinguish:

```text
ONLINE
LIMITED CONNECTIVITY
OFFLINE
SYNCING
SYNC ERROR
```

The application should not assume that a device being connected to Wi-Fi means that the Waasha API is reachable.

Connectivity must be determined through actual application/API health checks where necessary.

---

# 4. Offline-Capable Areas

Potentially offline-tolerant areas include:

- Previously viewed marketplace content
- Provider profiles previously loaded
- Service information previously loaded
- Draft custom requests
- Draft profile/service edits
- Draft business/staff changes
- Draft media uploads
- Notification viewing for already-synced notifications
- Cached dashboard information
- Locally queued operational actions

Not every area should permit offline mutation.

---

# 5. Server-Authoritative Areas

The server remains authoritative for:

- Booking availability
- Booking confirmation
- Booking assignment
- Payment status
- Financial ledger
- Commission
- Payouts
- Verification status
- Account suspension
- Permissions
- Marketplace availability
- Provider availability conflicts

A device must never display these as definitively successful merely because an action was queued locally.

---

# 6. Offline State Indicator

The interface should clearly communicate connectivity.

Example:

```text
● Online
```

```text
● Limited connection
```

```text
● Offline — changes will sync when connection returns
```

For critical operations:

```text
Booking request pending confirmation
```

rather than:

```text
Booking confirmed
```

---

# 7. Local Storage

The frontend may use a secure local data store for offline capability.

Potential local data:

- Cached marketplace results
- Cached provider/service information
- User drafts
- Pending actions
- Notification state
- Offline queue
- Temporary upload metadata

Sensitive data should be minimized.

---

# 8. Local Storage Security

Local storage must not contain:

- Payment secrets
- Raw card credentials
- Paystack secret keys
- Administrative secrets
- Unnecessary verification documents
- Long-lived authentication credentials in insecure storage

Where sensitive data must be cached, use platform-secure storage mechanisms.

---

# 9. Offline Queue

Mutations that are safe to defer may enter a local queue.

Example:

```text
Action
 ↓
Validate locally
 ↓
Create idempotency key
 ↓
Store pending action
 ↓
Wait for connectivity
 ↓
Send to API
 ↓
Server validates
 ↓
Success / Conflict / Rejection
 ↓
Update local state
```

---

# 10. Queue Record

Conceptually:

```text
queue_id
action_id
user_id
entity_type
entity_id
operation
payload
idempotency_key
created_at
attempt_count
last_attempt_at
status
error_code
```

Statuses:

```text
PENDING
SYNCING
SYNCED
CONFLICT
FAILED
CANCELLED
```

---

# 11. Idempotency

Every retryable mutation must have a stable idempotency key.

Example:

```text
idempotency_key = device_uuid + action_uuid
```

The same action retried multiple times must not create:

- Duplicate bookings
- Duplicate payments
- Duplicate proposals
- Duplicate payouts
- Duplicate ledger entries

---

# 12. Booking Offline Rules

Booking is a sensitive workflow.

A customer may prepare a booking while offline, but the booking is **not confirmed** until the server validates:

- Provider availability
- Service availability
- Price
- Location
- Booking rules
- Account status
- Conflicting booking

Recommended flow:

```text
Offline
 ↓
Prepare booking
 ↓
"Waiting for connection"
 ↓
Submit to server
 ↓
Server validates availability
 ↓
Confirmed / rejected
```

---

# 13. Stale Availability

Availability shown offline may be stale.

The UI must indicate that previously cached availability is not a guarantee.

Before final confirmation, the server must perform authoritative availability validation.

---

# 14. Booking Conflict

If a previously cached slot is no longer available:

```text
Local booking
      ↓
Server validation
      ↓
Conflict
```

The user should see:

> “That time is no longer available. Please choose another time.”

Do not silently move the booking to another time.

---

# 15. Provider Offline Behaviour

Providers may temporarily lose connectivity while operating.

The provider application should allow safe local viewing of:

- Today's cached schedule
- Previously synchronized bookings
- Customer/service information needed for the current workflow
- Pending operational actions

But server confirmation remains authoritative.

---

# 16. Provider Assignment

T2/T3 staff assignment is sensitive to concurrency.

Offline assignment may be queued, but the server must validate:

- Staff permission
- Staff membership
- Business/unit scope
- Booking status
- Assignment conflicts

An invalid assignment must return a conflict rather than silently overwrite another assignment.

---

# 17. Service Start

If the provider marks a service as started while temporarily offline:

```text
START_PENDING_SYNC
```

Once synchronized:

```text
STARTED
```

The application must clearly distinguish local pending state from server-confirmed state.

---

# 18. Service Completion

Completion may be queued only if the business rules explicitly allow offline completion.

Recommended:

```text
Completion requested
 ↓
Local pending
 ↓
Sync
 ↓
Server validates
 ↓
Completed
```

Payment status remains separate.

Completing a service must never automatically mean:

```text
Paid
```

unless the server already has valid payment evidence.

---

# 19. Cash Offline Behaviour

Cash may be recorded locally when connectivity is unavailable if the provider is authorized.

Example:

```text
Service = R150
Cash received = R200
Change = R50
```

The device can record:

```text
Cash change requested
```

The server must reconcile the transaction once connectivity returns.

The system must never claim that Waasha physically guaranteed the provider had R50 available.

---

# 20. Payment Offline Rules

Online payment cannot be falsely marked successful while offline.

For Waasha Payment:

```text
Offline
→ Payment cannot be confirmed
→ User sees pending/unavailable state
→ Retry when connected
```

The system must not store raw payment credentials for later submission.

---

# 21. EFT Offline Behaviour

EFT instructions can be cached if already generated.

The application may allow the user to prepare the payment, but confirmation remains server-controlled.

Pending EFT states must not be interpreted as successful payment.

---

# 22. Paystack Offline Behaviour

Paystack payment flows require connectivity.

If the user loses connectivity:

```text
Payment initiated
 ↓
Connection lost
 ↓
Unknown payment state
```

The client must not assume failure or success.

The server should reconcile through payment-provider status/webhook mechanisms.

---

# 23. Unknown Payment State

This is a critical state.

Example:

```text
Client thinks:
"Payment may have happened"

Server:
"Awaiting provider confirmation"
```

The UI should say:

> “We’re confirming your payment. Please don’t pay again.”

This helps prevent duplicate payment attempts.

---

# 24. Notification Synchronization

Notifications should synchronize after reconnection.

Use:

```text
last_synced_cursor
```

or an equivalent server-side synchronization token.

Avoid downloading the entire notification history repeatedly.

---

# 25. Incremental Sync

Synchronization should preferably be incremental.

Example:

```text
Client last sync:
cursor_123

Server:
Changes after cursor_123

Returns:
cursor_124
```

This reduces bandwidth.

---

# 26. Sync Endpoint

A generic sync endpoint may be introduced:

```text
POST /api/v1/sync
```

or domain-specific synchronization endpoints.

The architecture should avoid one enormous synchronization endpoint that exposes unrelated data.

Synchronization should respect authorization and tenant boundaries.

---

# 27. Sync Payload

A synchronization request may include:

```json
{
  "device_id": "device_123",
  "cursor": "cursor_456",
  "operations": []
}
```

The server should return:

```json
{
  "accepted": [],
  "rejected": [],
  "conflicts": [],
  "changes": [],
  "next_cursor": "cursor_457"
}
```

---

# 28. Conflict Resolution

Conflicts must have explicit policies.

Possible strategies:

### Server wins

Use for:

- Booking availability
- Payment status
- Financial records
- Permissions

### Client draft wins

May be acceptable for:

- Unsaved profile drafts
- Local UI preferences

### Merge

May be appropriate for:

- Non-conflicting profile fields
- Certain business configuration fields

Do not use blind last-write-wins for financial or booking-critical data.

---

# 29. Version Numbers

Entities that support offline editing should use versioning.

Example:

```text
entity_version = 12
```

Client submits:

```text
expected_version = 12
```

Server currently has:

```text
version = 13
```

Result:

```text
CONFLICT
```

The client then refreshes and asks the user how to proceed where necessary.

---

# 30. Optimistic UI

Optimistic UI may be used for low-risk actions.

Example:

```text
Favourite provider
```

The interface can immediately show the favourite state and synchronize later.

For high-risk actions:

- Booking
- Payment
- Refund
- Payout
- Verification
- Permission changes

use a clearly pending state instead of pretending the server already accepted the action.

---

# 31. Offline Drafts

Drafts should be supported for:

- Custom requests
- Provider profiles
- Services
- Business information
- Staff configuration
- Portfolio/media preparation

Drafts should be recoverable after:

- App restart
- Browser refresh where supported
- Temporary network loss

---

# 32. Media Offline Queue

Media uploads can be queued.

Example:

```text
Select image
 ↓
Compress
 ↓
Store upload task
 ↓
Offline
 ↓
Wait
 ↓
Reconnect
 ↓
Upload
 ↓
Scan
 ↓
Process
 ↓
Ready
```

Maximum image rules still apply:

- 3 service/style images
- 3 custom-request images

---

# 33. Media Conflict

If a user changes an image while another upload is pending:

```text
Old upload
New upload
```

The system should track each upload independently.

Only the intended current relationship should become active.

Unused successful uploads should enter safe cleanup rather than becoming permanent orphan files.

---

# 34. Authentication During Offline Mode

Authentication state must be handled carefully.

If a session expires while offline:

```text
Offline session
 ↓
Action queued
 ↓
Connection restored
 ↓
Session invalid
 ↓
Re-authentication required
```

Queued actions should remain safe and recoverable where possible.

Never bypass authorization because an action was created while previously authenticated.

---

# 35. Account Suspension

If an account becomes suspended while the device is offline, the server must reject subsequent synchronized mutations.

The local application must not continue to assume that previous permissions remain valid indefinitely.

---

# 36. T2/T3 Offline Isolation

Offline caches must preserve tenant boundaries.

For example:

```text
Business A cache
≠
Business B cache
```

A staff member changing business/unit context must not receive another tenant's cached data.

Local identifiers and server authorization must both be checked.

---

# 37. Training Centre Offline Behaviour

Training-centre users may view previously synchronized data offline.

Financial attribution and earnings remain server-authoritative.

A local offline state must never create or confirm partner earnings.

---

# 38. Admin Offline Behaviour

The admin application should be conservative.

Recommended offline capabilities:

- View previously loaded non-sensitive data
- Draft internal notes where appropriate
- View cached dashboard information

High-risk actions should require online server validation:

- Refund
- Payout approval
- User suspension
- Provider verification
- Commission change
- Role/permission change
- Emergency platform control

---

# 39. Sync Retry Strategy

Use exponential backoff.

Example:

```text
Attempt 1 → immediately
Attempt 2 → short delay
Attempt 3 → longer delay
Attempt 4 → longer delay
...
```

Add jitter to prevent many devices retrying simultaneously.

---

# 40. Retry Limits

Retries must not continue forever.

After a defined threshold:

```text
PENDING
→ RETRYING
→ FAILED / NEEDS_ATTENTION
```

The user should receive a clear action where manual intervention is required.

---

# 41. Dead-Letter / Failed Sync

Failed synchronization should preserve:

- Action ID
- Entity
- Error
- Attempts
- Last attempt
- Server response
- Client version

The system should allow safe retry after the underlying issue is resolved.

---

# 42. Data Freshness

Cached data should have freshness metadata.

Example:

```text
Updated 2 minutes ago
```

For critical data:

```text
Availability last checked 8 minutes ago
```

The UI should not present stale data as live truth.

---

# 43. Cache Expiration

Different data should have different TTLs.

Example:

| Data | Suggested approach |
|---|---|
| Static category data | Long cache |
| Provider profile | Moderate cache |
| Service information | Moderate cache |
| Availability | Short cache |
| Booking status | Very short / event driven |
| Payment status | Server authoritative |
| Financial balances | Server authoritative |

Exact TTLs should be determined from production behaviour.

---

# 44. Connectivity Detection

Use multiple signals:

- Network availability
- API health
- Request failures
- Timeout patterns

Do not rely exclusively on the operating system's network indicator.

---

# 45. Background Synchronization

Where platform capabilities allow, synchronize when:

- Connection returns
- App resumes
- Device is charging where appropriate
- User manually triggers sync

Battery and mobile-data usage must be considered.

---

# 46. Sync Ordering

Some operations depend on earlier operations.

Example:

```text
Create service
 ↓
Publish service
```

The publish action cannot succeed if the service creation has not synchronized.

The queue should understand dependencies.

---

# 47. Transactional Grouping

Related local operations may be grouped.

Example:

```text
Create business
Create business unit
Create service
```

The server may process them sequentially or through an appropriate transactional workflow.

Partial failures must be recoverable.

---

# 48. Offline Search

Search may use cached data when offline.

The UI should clearly indicate:

> “Showing saved results. Connect to refresh.”

Do not imply that offline search reflects current marketplace availability.

---

# 49. Offline Location

Previously saved/manual location can remain available.

Live location should be refreshed when connectivity and permissions permit.

Location data should not be retained longer than necessary.

---

# 50. Offline Analytics

Analytics events may be queued locally.

Example:

```text
search_performed
provider_viewed
service_viewed
```

Events should synchronize later using event IDs.

Do not queue sensitive payment credentials or private document content as analytics.

---

# 51. Duplicate Analytics Events

The analytics pipeline must tolerate retries.

Use:

```text
event_id
```

to prevent duplicate counting.

---

# 52. Device Identity

Each device/app installation should have a non-sensitive internal identifier.

Example:

```text
device_id
installation_id
```

Do not use device identifiers as a substitute for authentication.

---

# 53. Multi-Device Synchronization

A user may use:

- Phone
- Tablet
- Web
- Admin device

Changes from one device should eventually synchronize to others.

Server events should be authoritative.

---

# 54. Realtime + Offline

When online, real-time updates can reduce stale state.

Example:

```text
Booking accepted
 ↓
Server event
 ↓
Customer device receives update
```

When offline:

```text
Event retained server-side
 ↓
Device reconnects
 ↓
Incremental sync
```

The user should not lose important state because a device was offline.

---

# 55. Error Messaging

Offline errors should be human-readable.

Good:

> “You’re offline. Your draft is saved and will sync when you reconnect.”

Good:

> “We couldn’t confirm this booking. The time may no longer be available.”

Avoid:

> “HTTP 503”

in normal user-facing interfaces.

---

# 56. Offline Security

Attackers may attempt to manipulate local state.

Therefore:

- Local state is untrusted
- Server revalidates every sensitive mutation
- Queued payloads are authenticated
- Authorization is rechecked
- Integrity checks should be used where appropriate

Never trust a local flag such as:

```text
payment_status = paid
```

without server confirmation.

---

# 57. Data Synchronization Observability

Track:

- Offline sessions
- Queue length
- Sync success
- Sync failures
- Conflict rate
- Retry count
- Sync latency
- Failed uploads
- Stale-cache usage

These metrics should integrate with the Analytics & Observability architecture.

---

# 58. Testing

Test:

### Connectivity

- Full offline
- Slow network
- Intermittent network
- Network changes

### Queue

- Retry
- Duplicate
- Failure
- Dependency ordering
- App restart

### Booking

- Stale availability
- Conflict
- Duplicate booking attempt

### Payment

- Unknown payment state
- Delayed webhook
- Reconnect after payment

### Tenant isolation

- Offline cache separation
- Business switching
- Role changes

### Media

- Interrupted upload
- Retry
- Duplicate upload
- Processing failure

---

# 59. Definition of Done

Offline architecture is complete when:

- Connectivity states are defined.
- Offline-safe data is defined.
- Server-authoritative data is defined.
- Offline queue exists.
- Idempotency is enforced.
- Booking conflicts are handled.
- Payment uncertainty is handled safely.
- Media uploads can recover from interruption.
- Tenant isolation applies to local caches.
- Authentication expiry is handled.
- Retry/backoff exists.
- Failed sync is recoverable.
- Data freshness is visible.
- Incremental synchronization exists.
- Offline analytics are supported.
- Observability covers synchronization.
- Offline security is tested.

---

# 60. Non-Negotiable Rules

1. **Offline does not equal confirmed.**
2. **The server remains authoritative for bookings, payments, permissions, verification, and financial records.**
3. **No raw payment credentials are stored for offline submission.**
4. **Queued mutations require idempotency.**
5. **Booking availability must be revalidated online before confirmation.**
6. **Payment success must come from authoritative payment confirmation.**
7. **Payment and service completion remain separate.**
8. **T2/T3 offline caches must remain tenant-isolated.**
9. **Maximum 3 service/style images remains enforced offline and server-side.**
10. **Maximum 3 custom-request images remains enforced offline and server-side.**
11. **Exactly five launch categories remain.**
12. **10 km remains the default marketplace discovery radius.**
13. **25% commission remains configurable and server-authoritative.**
14. **Training-centre earnings cannot be created solely by local state.**
15. **Driver functionality is excluded from launch.**

---

# 61. Relationship to Existing Architecture

This document integrates with:

- Product Build Specification
- Database Architecture
- API Specification
- Booking Engine
- Provider Tiers
- Payment & Finance Architecture
- Notification & Communication Architecture
- Authentication, Authorization & Security
- Marketplace, Discovery & Search Architecture
- Frontend Application Architecture
- Admin Platform Architecture
- Media & File Storage Architecture
- Analytics, Reporting & Observability Architecture
- Infrastructure, DevOps & Deployment Architecture
- Testing & Quality Assurance Architecture

It defines the resilience and synchronization layer required to make Waasha dependable under imperfect connectivity.

---

# 62. Final Architecture Principle

**Waasha should remain useful when the network is unreliable, but it must never pretend that an unverified local action is a confirmed server outcome.**

Offline capability exists to protect continuity of service—not to bypass the systems that protect booking integrity, financial integrity, security, and user trust.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 17: AI & AUTOMATION ARCHITECTURE -->
<!-- ============================================================ -->

# WAASHA AI & AUTOMATION ARCHITECTURE

**Document:** 17 of 18  
**Status:** Production Architecture  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

This document defines how artificial intelligence and automation may be incorporated into Waasha without compromising user trust, financial integrity, privacy, security, marketplace fairness, or operational control.

AI is a supporting capability—not the authority for critical platform decisions.

The architecture must allow Waasha to introduce useful AI features progressively while keeping core business rules deterministic and auditable.

---

# 2. AI Principles

1. **AI assists; deterministic systems decide critical outcomes.**
2. **Never let AI directly control money without deterministic validation.**
3. **Never let AI bypass authorization.**
4. **AI recommendations must respect marketplace fairness.**
5. **Private data must remain protected.**
6. **Users should understand when AI is involved where material.**
7. **High-impact decisions require human oversight where appropriate.**
8. **AI outputs must be treated as potentially incorrect.**
9. **Every automated action must have traceability.**
10. **AI features must be independently disableable.**

---

# 3. AI Architecture

Conceptually:

```text
Waasha Application
       ↓
AI / Automation Gateway
       ↓
Policy & Authorization Layer
       ↓
AI Provider / Model
       ↓
Validation Layer
       ↓
Waasha Business Service
```

The AI layer must not directly modify core production data without going through authorized application services.

---

# 4. AI Gateway

All AI integrations should use a central abstraction.

Example:

```text
AI Gateway
├── Text generation
├── Classification
├── Extraction
├── Summarization
├── Recommendation
├── Moderation
└── Forecasting
```

Benefits:

- Provider flexibility
- Central logging
- Cost controls
- Prompt/version management
- Safety policies
- Rate limits
- Model switching
- Feature-level enable/disable

---

# 5. AI Provider Abstraction

Avoid hard-coding the product to one AI vendor.

Conceptually:

```text
Waasha AI Service
      ↓
Provider Adapter
 ┌────┼─────┐
 ▼    ▼     ▼
Model A  Model B  Model C
```

The business application should depend on Waasha's AI service rather than directly calling a model provider throughout the codebase.

---

# 6. AI Use Cases

Potential AI capabilities include:

### Customer

- Service discovery assistance
- Natural-language search
- Service recommendations
- Booking assistance
- Custom-request assistance
- Review summarization

### Provider

- Profile writing assistance
- Service description generation
- Portfolio tagging
- Business insights
- Demand insights
- Operational recommendations

### Business

- Performance summaries
- Service demand analysis
- Staffing insights
- Operational anomaly detection
- Customer trend summaries

### Admin

- Support summarization
- Case classification
- Moderation assistance
- Search assistance
- Report summaries
- Anomaly detection

---

# 7. Natural-Language Marketplace Search

Customers may eventually search using natural language.

Example:

> “Find a barber near me this Saturday afternoon under R300.”

AI may interpret:

```text
category = Barbers
location = current customer location
date = Saturday
time_window = afternoon
max_price = R300
```

The AI extracts intent.

The deterministic marketplace engine performs the actual search.

AI must not invent providers or availability.

---

# 8. AI Booking Assistant

An AI assistant may help customers navigate booking.

It can:

- Explain services
- Compare options
- Interpret preferences
- Guide the booking process
- Explain payment methods
- Explain cancellation rules

It must not independently confirm a booking without the normal booking engine.

---

# 9. Custom Request Assistant

AI can help customers create clearer custom requests.

Example:

Customer provides:

> “I want something similar to this but shorter.”

AI may help generate:

```text
Description:
Customer wants a shorter variation of the referenced style.

Preferred timing:
Saturday afternoon

Additional notes:
Customer should confirm exact style with provider.
```

The customer must be able to review and edit AI-generated content before submission.

AI must not alter the customer's uploaded reference images.

---

# 10. Provider Profile Assistant

AI may help providers create:

- Bio
- Service descriptions
- Portfolio captions
- Business descriptions

Example workflow:

```text
Provider enters rough notes
 ↓
AI generates draft
 ↓
Provider reviews
 ↓
Provider edits
 ↓
Provider publishes
```

AI-generated content remains provider-controlled.

---

# 11. Service Description Assistant

AI may generate structured descriptions from provider input.

It should not invent:

- Prices
- Qualifications
- Certifications
- Guarantees
- Service availability
- Experience claims

The system should clearly distinguish provider-supplied facts from generated wording.

---

# 12. AI Review Summaries

For businesses and providers, AI may summarize large sets of reviews.

Example:

```text
Positive themes:
- Friendly service
- Good results

Improvement themes:
- Waiting time
- Appointment delays
```

The underlying reviews remain accessible.

AI summaries should not replace individual reviews.

---

# 13. AI Moderation

AI can assist with:

- Image classification
- Prohibited content detection
- Spam detection
- Review abuse detection
- Suspicious profile content
- Fraud indicators

AI moderation should initially produce:

```text
ALLOW
REVIEW
REJECT
```

High-impact or uncertain decisions should be escalated to human moderation.

---

# 14. AI Moderation Safety

AI must not be the sole authority for sensitive account decisions where a false positive could materially harm a provider or business.

Example:

```text
AI detects suspicious profile
 ↓
Flag
 ↓
Human review
 ↓
Decision
```

Moderation decisions must remain auditable.

---

# 15. Marketplace Fairness

AI must never create hidden marketplace favoritism.

The recommendation system must not automatically boost providers because they are:

- T2
- T3
- Training-centre affiliated
- AI-assisted
- Higher-paying

Unless an explicit product policy is introduced and approved.

Marketplace ranking remains governed by the Marketplace Architecture.

---

# 16. Recommendation Engine

Future recommendations may use:

- Location
- Category
- Service interest
- Availability
- Customer preferences
- Previous bookings
- Provider/service quality signals

Recommendations must respect:

- 10 km default discovery
- Provider eligibility
- Availability
- Privacy
- Marketplace fairness

AI recommendations must still be filtered by deterministic business rules.

---

# 17. AI Availability Reasoning

AI may help explain availability.

Example:

> “Sarah has openings on Saturday afternoon.”

But the availability engine must supply the actual availability.

AI cannot invent time slots.

---

# 18. AI Pricing Rules

AI may provide insights such as:

> “Demand for this service has increased recently.”

But AI must not independently change:

- Provider prices
- Commission
- Fees
- Training-centre allocation
- Staff compensation

Any pricing/configuration change must go through authorized deterministic workflows.

---

# 19. AI Financial Restrictions

AI must never directly:

- Authorize payment
- Confirm payment
- Issue payout
- Change ledger records
- Change commission rules
- Approve refunds
- Modify financial balances

AI can assist finance teams by:

- Summarizing transactions
- Detecting anomalies
- Explaining reconciliation exceptions
- Generating reports

Final financial actions remain controlled by finance services and authorized users.

---

# 20. AI Fraud Detection

AI may identify suspicious patterns.

Examples:

- Unusual booking frequency
- Repeated payment failures
- Suspicious refund activity
- Multiple accounts with unusual behaviour
- Abnormal payout patterns
- Review manipulation

Recommended:

```text
Signal
 ↓
Risk score
 ↓
Rule evaluation
 ↓
Human/system action
```

AI should create a signal, not silently punish users.

---

# 21. AI Support Assistant

Support agents may use AI to:

- Summarize conversations
- Classify issues
- Suggest responses
- Find relevant policies
- Summarize booking history
- Draft customer replies

Agents remain responsible for final responses where appropriate.

---

# 22. AI Knowledge Base

The support assistant should use an approved knowledge base.

Sources may include:

- Waasha policies
- Booking rules
- Payment rules
- Cancellation rules
- Provider rules
- Support procedures

AI should not invent policy.

Responses should be grounded in current approved information.

---

# 23. Retrieval-Augmented Generation

For policy and operational answers, use a retrieval architecture where appropriate.

Conceptually:

```text
User Question
 ↓
Permission Check
 ↓
Retrieve Approved Information
 ↓
AI Context
 ↓
Generate Answer
 ↓
Validation
```

The retrieval layer must enforce permissions.

---

# 24. Private Data Boundaries

AI must not receive data that the requesting user is not authorized to access.

Example:

```text
T3 Business A
      X
T3 Business B private data
```

Tenant isolation applies to AI retrieval as well as normal APIs.

---

# 25. AI Input Filtering

Before sending data to an external AI provider:

- Remove unnecessary personal information
- Remove payment credentials
- Remove secrets
- Remove unnecessary verification data
- Minimize location precision where possible

Use only the data required for the task.

---

# 26. AI Output Validation

AI output should pass deterministic validation before becoming application state.

Example:

```text
AI says:
price = R1500

Validation:
Provider price = R150
 ↓
Reject unsafe AI value
```

AI must not bypass domain validation.

---

# 27. Prompt Management

Prompts should be version controlled.

Example:

```text
provider_profile_v1
provider_profile_v2
support_summary_v1
custom_request_assistant_v1
```

Store:

- Prompt version
- Model
- Configuration
- Timestamp
- Feature
- Output status

---

# 28. AI Observability

Track:

- Request count
- Response latency
- Token/input usage where available
- Output usage
- Error rate
- Cost
- Model
- Prompt version
- Safety flags
- User feedback

Do not log sensitive prompts or outputs unnecessarily.

---

# 29. AI Cost Controls

AI usage can become expensive.

Controls:

- Per-feature limits
- Per-user limits
- Per-business limits
- Token budgets
- Model selection
- Caching
- Request deduplication
- Usage alerts

AI should never create an uncontrolled recurring cost loop.

---

# 30. AI Rate Limiting

Rate-limit AI requests separately from ordinary API requests.

Examples:

```text
Customer AI search
Provider profile assistant
Admin support assistant
```

Limits should be configurable.

---

# 31. Automation Engine

Automation should be separate from AI.

Conceptually:

```text
Event
 ↓
Rule
 ↓
Condition
 ↓
Action
```

Example:

```text
Booking created
 ↓
Reminder rule
 ↓
Time threshold reached
 ↓
Send notification
```

AI may help determine content, but deterministic rules control important timing and state transitions.

---

# 32. Automation Examples

Safe automation includes:

- Booking reminders
- Review reminders
- Verification follow-ups
- Expired custom-request handling
- Notification retries
- Payout processing
- Reconciliation checks
- Media cleanup
- Analytics aggregation

---

# 33. Event-Driven Automation

Use platform events:

```text
booking_created
booking_accepted
booking_started
booking_completed
payment_succeeded
payment_failed
custom_request_created
proposal_accepted
review_created
```

Events can trigger appropriate workers.

---

# 34. Automation Idempotency

Every automated action should be safe to retry.

Example:

```text
booking_completed
 ↓
send_review_request
```

If the worker runs twice, the user should not receive duplicate notifications.

Use:

```text
event_id
automation_id
execution_id
idempotency_key
```

---

# 35. Automation Failure Handling

Use:

```text
Queued
→ Running
→ Completed
```

or:

```text
Queued
→ Running
→ Failed
→ Retry
→ Dead Letter
```

Failures should be observable.

---

# 36. Human Approval Workflows

High-impact automation may require approval.

Examples:

- Provider suspension
- Large refund
- Payout exception
- Commission configuration
- Sensitive moderation
- Account restriction

Architecture:

```text
AI / Automation
 ↓
Recommendation
 ↓
Human approval
 ↓
Deterministic action
```

---

# 37. AI Feature Flags

Every AI capability should be independently controlled.

Examples:

```text
ai_customer_search
ai_booking_assistant
ai_custom_request_assistant
ai_provider_profile_assistant
ai_review_summary
ai_moderation_assistant
ai_support_assistant
ai_fraud_detection
```

If an AI provider becomes unavailable, the core product must continue functioning.

---

# 38. AI Provider Failure

If an AI service fails:

```text
AI unavailable
 ↓
Fallback
 ↓
Normal deterministic workflow
```

Example:

Natural-language search may fall back to normal filters.

AI-assisted profile writing may simply be unavailable.

Booking and payments must continue.

---

# 39. AI Hallucination Protection

AI may produce incorrect information.

Therefore:

- Ground factual responses
- Validate structured outputs
- Show source/context where appropriate
- Avoid unsupported claims
- Give users correction controls
- Never treat generated text as authoritative business data without validation

---

# 40. AI Evaluation

Before launching an AI feature, define evaluation datasets.

Measure:

- Accuracy
- Relevance
- Safety
- Hallucination rate
- Latency
- Cost
- User satisfaction

Critical workflows should have deterministic test cases.

---

# 41. AI Regression Testing

AI output can change when models change.

Tests should therefore validate:

- Required fields
- Safety constraints
- Business-rule compliance
- Output structure
- Prohibited claims

Do not require identical wording from every model response.

---

# 42. AI Security

Test:

- Prompt injection
- Data exfiltration
- Unauthorized retrieval
- Cross-tenant leakage
- Tool abuse
- Malicious uploaded content
- Sensitive information disclosure

Treat user-provided text and documents as untrusted input.

---

# 43. AI Tool Access

If AI agents are eventually allowed to call tools, tools must have explicit permissions.

Example:

```text
AI Agent
  ↓
Tool Registry
  ├── Search marketplace
  ├── View booking
  ├── Draft message
  └── Request action
```

High-risk tools should require human confirmation.

AI should not receive unrestricted database access.

---

# 44. AI Agent Restrictions

AI agents must not have unrestricted capabilities such as:

```text
DELETE ANY USER
CHANGE COMMISSION
ISSUE PAYOUT
ALTER LEDGER
ACCESS ALL TENANTS
```

Instead:

```text
AI
 ↓
Authorized API
 ↓
Permission
 ↓
Validation
 ↓
Action
```

---

# 45. Customer Transparency

Where an interaction is materially AI-assisted, the experience should make this clear where appropriate.

Do not present AI-generated information as human-authored when that distinction matters.

---

# 46. Provider Transparency

Providers should know when AI is assisting with:

- Profile text
- Service descriptions
- Business insights
- Moderation flags

Providers should retain control over publishable content.

---

# 47. Admin Transparency

Admins should be able to see:

- AI recommendation
- Model
- Prompt version
- Confidence/risk information where available
- Relevant evidence
- Final human decision

---

# 48. Data Retention for AI

AI inputs and outputs require explicit retention rules.

Avoid retaining:

- Unnecessary private conversations
- Payment data
- Verification documents
- Sensitive personal information

Retention should depend on feature purpose and legal/privacy requirements.

---

# 49. AI Audit Trail

For consequential AI-assisted actions, record:

```text
AI feature
Model
Prompt version
Input reference
Output
Risk/flag
Human reviewer
Final action
Timestamp
```

Do not store sensitive content unnecessarily just to create an audit trail.

---

# 50. Automation Audit Trail

Record:

- Event
- Rule
- Action
- Execution
- Result
- Retry
- Actor/system
- Timestamp

Automated actions should be distinguishable from human actions.

---

# 51. AI Analytics

Track:

- AI feature usage
- Completion rate
- User acceptance
- User edits
- User rejection
- Cost
- Latency
- Error rate
- Safety incidents

For provider-generated content:

```text
AI draft
→ Provider edited
→ Provider published
```

This is useful for measuring actual value rather than raw AI usage.

---

# 52. Future AI Opportunities

Once enough high-quality data exists, Waasha may explore:

- Demand forecasting
- Supply forecasting
- Provider recommendations
- Customer retention prediction
- Business performance prediction
- Service demand prediction
- Operational anomaly detection
- Intelligent support
- Automated insights

These should only be introduced after appropriate data quality and governance exist.

---

# 53. AI and Marketplace Equality

AI must never become a hidden pay-to-win system.

A provider should not receive greater exposure merely because:

- They use AI
- They pay for an AI feature
- They belong to T3
- They are associated with a training centre

Any marketplace ranking change requires an explicit product decision and transparent rules.

---

# 54. Testing

AI systems require:

### Functional tests

- Correct structured output
- Correct tool calls
- Correct fallback

### Safety tests

- Prompt injection
- Data leakage
- Unsafe instructions
- Unauthorized access

### Quality tests

- Accuracy
- Relevance
- Hallucination

### Fairness tests

- Provider treatment
- Category treatment
- Business treatment

### Reliability tests

- Provider outage
- Timeout
- Rate limit
- Model failure

---

# 55. Definition of Done

AI and automation architecture is complete when:

- AI gateway is defined.
- Provider abstraction is defined.
- AI use cases are identified.
- Business-critical AI restrictions are defined.
- Marketplace fairness is protected.
- AI data boundaries are defined.
- Prompt/version management is defined.
- AI observability is defined.
- Cost controls are defined.
- Automation engine is defined.
- Event-driven automation is defined.
- Idempotency is defined.
- Human approval workflows are defined.
- AI feature flags are defined.
- Failure fallbacks are defined.
- AI security testing is defined.
- AI auditability is defined.

---

# 56. Non-Negotiable Rules

1. **AI never bypasses authentication or authorization.**
2. **AI never directly controls financial truth.**
3. **AI never independently confirms payments.**
4. **AI never independently modifies the financial ledger.**
5. **AI never independently changes commission.**
6. **AI never independently approves payouts.**
7. **AI never invents booking availability.**
8. **AI never overrides the booking engine.**
9. **AI never bypasses T2/T3 tenant isolation.**
10. **AI must not create hidden marketplace ranking advantages.**
11. **Training-centre affiliation must not create AI ranking preference.**
12. **Exactly five launch categories remain.**
13. **10 km remains the default discovery radius.**
14. **25% commission remains configurable.**
15. **Maximum 3 service/style images remains enforced.**
16. **Maximum 3 custom-request images remains enforced.**
17. **AI features must be independently disableable.**
18. **Critical AI-assisted decisions require deterministic validation and/or human oversight.**
19. **Driver functionality is excluded from launch AI/automation.**

---

# 57. Relationship to Existing Architecture

This document integrates with:

- Product Build Specification
- Database Architecture
- API Specification
- Booking Engine
- Provider Tiers
- Payment & Finance Architecture
- Notification & Communication Architecture
- Authentication, Authorization & Security
- Marketplace, Discovery & Search Architecture
- Frontend Application Architecture
- Admin Platform Architecture
- Media & File Storage Architecture
- Analytics, Reporting & Observability Architecture
- Infrastructure, DevOps & Deployment Architecture
- Testing & Quality Assurance Architecture
- Offline-First & Synchronization Architecture

It establishes AI and automation as controlled platform capabilities rather than uncontrolled intelligence embedded throughout the application.

---

# 58. Final Architecture Principle

**AI should make Waasha more helpful, not less trustworthy.**

The best architecture uses AI for interpretation, assistance, summarization, prediction, and operational support while keeping critical business truth under deterministic, auditable systems.

**Waasha — The Future of Service, Today.**

---


<!-- ============================================================ -->
<!-- DOCUMENT 18: PRODUCTION LAUNCH & OPERATIONS RUNBOOK -->
<!-- ============================================================ -->

# WAASHA PRODUCTION LAUNCH & OPERATIONS RUNBOOK

**Document:** 18 of 18  
**Status:** Production Architecture & Operations Runbook  
**Product:** Waasha  
**Tagline:** The Future of Service, Today.

---

## 1. Purpose

This runbook defines how Waasha moves from a completed production build into a controlled live launch and how the platform is operated thereafter.

It is the final operational document in the Waasha Production Blueprint.

The runbook connects:

```text
Build
 ↓
Test
 ↓
Secure
 ↓
Deploy
 ↓
Launch
 ↓
Monitor
 ↓
Support
 ↓
Improve
 ↓
Scale
```

The objective is a stable, measurable, recoverable marketplace—not merely a successful first deployment.

---

# 2. Launch Principles

1. **Production launch is a controlled process.**
2. **No critical known defects at launch.**
3. **Financial workflows must reconcile before real transactions.**
4. **Security must be verified before customer data is introduced.**
5. **Backups must be tested before launch.**
6. **Monitoring must be active before traffic arrives.**
7. **Rollback must be possible before deployment.**
8. **Support procedures must exist before users arrive.**
9. **Every incident must produce evidence and learning.**
10. **Scale only after reliability is understood.**

---

# 3. Production Readiness Gate

Waasha should not launch until all critical areas are approved.

| Area | Required |
|---|---|
| Product functionality | Complete |
| Database | Production-ready |
| API | Production-ready |
| Frontend | Production-ready |
| Admin | Production-ready |
| Payments | Tested |
| Booking engine | Tested |
| Security | Reviewed |
| Media | Secured |
| Notifications | Tested |
| Offline behaviour | Tested |
| Analytics | Active |
| Monitoring | Active |
| Backups | Tested |
| Disaster recovery | Tested |
| Support | Ready |
| Legal/privacy requirements | Reviewed |

---

# 4. Launch Checklist

Before launch:

```text
[ ] Production infrastructure provisioned
[ ] DNS configured
[ ] TLS certificates active
[ ] Database provisioned
[ ] Database migrations tested
[ ] Storage configured
[ ] CDN configured where applicable
[ ] Queue configured
[ ] Workers running
[ ] Secrets configured
[ ] Monitoring active
[ ] Alerts active
[ ] Error tracking active
[ ] Backups active
[ ] Recovery tested
[ ] Payment integration verified
[ ] Notification providers verified
[ ] Admin accounts created
[ ] MFA enabled
[ ] Support process ready
[ ] Analytics verified
[ ] Smoke tests passed
[ ] Rollback plan confirmed
```

---

# 5. Production Environment Verification

Verify:

- Application version
- Infrastructure version
- Environment variables
- Database version
- Migration state
- Storage configuration
- Queue configuration
- Cache
- External integrations
- Monitoring
- Security controls

No secrets should be displayed during verification.

---

# 6. Domain & DNS Verification

Verify:

```text
Web
API
Admin
Assets/CDN
```

Confirm:

- Correct DNS records
- TLS
- Redirects
- Certificate validity
- API routing
- CDN behaviour

---

# 7. Database Launch Procedure

Recommended:

```text
Backup
 ↓
Verify backup
 ↓
Run migration
 ↓
Validate schema
 ↓
Run smoke tests
 ↓
Enable application traffic
```

Database migrations should be version-controlled.

---

# 8. Initial Database Configuration

Seed only approved configuration.

Core categories:

1. Barbers
2. Hair Salons & Stylists
3. Nail Technicians
4. Beauty Services
5. Car Wash

Default marketplace discovery:

**10 km**

Current default platform commission:

**25%**

Commission must remain configurable.

---

# 9. Initial Admin Configuration

Configure:

- Platform settings
- Roles
- Permissions
- Categories
- Verification rules
- Booking rules
- Cancellation rules
- Payment methods
- Notification templates
- Feature flags
- Moderation rules
- Analytics
- Support configuration

Review every production setting before opening the platform.

---

# 10. Admin Access

Create individual administrator accounts.

Required:

- MFA
- Strong credentials
- Least privilege
- Individual identity
- Audit logging

Never create a shared:

```text
admin@waasha
```

style operational account for multiple people.

---

# 11. Payment Launch Procedure

Payment launch must be treated as a separate readiness gate.

Verify:

```text
Payment initialization
 ↓
Customer payment
 ↓
Provider confirmation
 ↓
Webhook
 ↓
Payment record
 ↓
Ledger
 ↓
Commission
 ↓
Earnings
 ↓
Payout eligibility
```

Use controlled transactions for the final production verification.

---

# 12. Paystack Production Verification

Before enabling live payments:

- Confirm live credentials are correct
- Confirm webhook URL
- Confirm webhook secret
- Confirm signature verification
- Confirm transaction references
- Confirm callback handling
- Confirm reconciliation
- Confirm refund procedure

Never expose secret credentials to frontend clients.

---

# 13. Cash Launch Procedure

Verify:

- Cash payment selection
- Cash amount
- Change calculation
- Provider notification
- Booking state
- Payment state
- Service completion

Example:

```text
Service R150
Cash received R200
Change R50
```

The UI should use:

**“Cash change requested”**

not:

**“Guaranteed Cash Change.”**

---

# 14. EFT Launch Procedure

Verify:

- EFT instructions
- Reference generation
- Pending state
- Confirmation process
- Reconciliation
- Duplicate confirmation handling
- Expiry/cancellation

Pending EFT must never be treated as successful payment.

---

# 15. Booking Launch Verification

Test a complete booking:

```text
Customer
 ↓
Search within 10 km
 ↓
Provider
 ↓
Service
 ↓
Availability
 ↓
Booking
 ↓
Payment method
 ↓
Confirmation
 ↓
Provider notification
 ↓
Service
 ↓
Completion
 ↓
Settlement
 ↓
Review
```

Test both normal and failure paths.

---

# 16. Provider Launch Verification

Create controlled accounts for:

### T1

Verify:

- Profile
- Service
- Availability
- Booking
- Completion
- Earnings

### T2

Verify:

- Team
- Permissions
- Assignment
- Compensation

### T3

Verify:

- Business
- Business unit
- Categories
- Staff
- Assignment
- Compensation
- Business reporting

---

# 17. Marketplace Launch Verification

Verify:

- Five categories
- 10 km default radius
- Location handling
- Search
- Filters
- Provider visibility
- Service visibility
- Availability
- Pagination
- Custom requests

Confirm there is no unintended ranking advantage for:

- T2
- T3
- Training-centre referrals

---

# 18. Media Launch Verification

Verify:

- Profile image upload
- Service images
- Portfolio
- Business media
- Custom-request images
- Verification documents
- Moderation
- CDN
- Signed URLs
- Storage permissions

Confirm:

**Maximum 3 service/style images.**

Confirm:

**Maximum 3 custom-request images.**

---

# 19. Notification Launch Verification

Verify:

- In-app
- Push
- Email
- SMS-ready architecture
- WhatsApp-ready architecture

Test:

- Booking created
- Booking accepted
- Booking cancelled
- Payment success
- Payment failure
- Reminder
- Review request
- Payout update

---

# 20. Offline Launch Verification

Test:

```text
Online
 ↓
Disconnect
 ↓
Create safe draft/action
 ↓
Reconnect
 ↓
Sync
 ↓
Server validation
 ↓
Correct result
```

Verify that offline state never falsely represents:

- Confirmed booking
- Successful payment
- Completed financial settlement
- Approved verification

---

# 21. Security Launch Gate

Before production launch verify:

- Authentication
- Authorization
- MFA
- Tenant isolation
- API security
- Admin security
- File security
- Payment security
- Rate limiting
- Secrets
- TLS
- Audit logging

No unresolved critical security vulnerability should remain.

---

# 22. Penetration Test

Before major launch, perform appropriate security testing of:

- Web application
- API
- Admin
- Authentication
- Authorization
- File uploads
- Payment workflows
- Tenant isolation

Track findings to closure.

---

# 23. Privacy Launch Gate

Verify:

- Privacy notices
- Consent where required
- Data collection
- Data retention
- Account deletion process
- Data export process
- Marketing preferences
- Analytics privacy
- Location handling
- Verification-document handling

Exact legal requirements should be reviewed with qualified legal/privacy professionals.

---

# 24. Analytics Launch Verification

Verify events for:

```text
registration
search
provider_view
service_view
booking_created
booking_accepted
payment_succeeded
payment_failed
booking_completed
review_created
```

Confirm events are:

- Correct
- Non-duplicated
- Authorized
- Privacy-conscious

---

# 25. Observability Launch Gate

Before launch, confirm dashboards for:

- API
- Database
- Queue
- Payments
- Notifications
- Storage
- Security
- Bookings

Confirm alerts are tested.

---

# 26. Backup Launch Gate

Verify:

- Database backup
- Media recovery
- Backup encryption
- Backup access
- Retention
- Restore procedure

A successful backup job without a tested restore is insufficient.

---

# 27. Disaster Recovery Launch Gate

Document:

```text
RPO
RTO
Recovery owner
Recovery steps
Escalation contacts
```

Test at least one realistic recovery scenario before major production launch.

---

# 28. Launch Strategy

Recommended progression:

```text
Internal Testing
 ↓
Private Pilot
 ↓
Controlled Public Launch
 ↓
Expanded Launch
 ↓
Scale
```

A controlled pilot allows real-world issues to be discovered before broad traffic.

---

# 29. Private Pilot

Use a controlled set of:

- Customers
- T1 providers
- T2 teams
- T3 businesses
- Training-centre partners

Monitor closely.

The pilot should validate:

- Booking
- Payments
- Notifications
- Support
- Marketplace discovery
- Provider operations

---

# 30. Pilot Success Criteria

Define measurable targets for:

- Booking success
- Payment success
- Completion rate
- Notification delivery
- Support issues
- Critical errors
- Customer satisfaction
- Provider satisfaction

Do not expand traffic if critical reliability issues remain unresolved.

---

# 31. Go-Live Procedure

Recommended:

```text
Final backup
 ↓
Final deployment
 ↓
Database migration
 ↓
Health check
 ↓
Smoke tests
 ↓
Enable marketplace
 ↓
Monitor
 ↓
Open support channel
```

Record the exact launch timestamp and production version.

---

# 32. Launch Monitoring

For the first launch period, closely monitor:

- API errors
- Booking failures
- Payment failures
- Webhook failures
- Notification failures
- Database performance
- Queue depth
- Storage
- Authentication failures
- Customer support reports

---

# 33. Go-Live Rollback

Rollback may be required if:

- Critical booking failure occurs
- Payments are corrupted
- Tenant isolation fails
- Major security vulnerability appears
- Platform availability collapses

Procedure:

```text
Detect
 ↓
Assess
 ↓
Stop harmful operation
 ↓
Rollback or disable feature
 ↓
Verify recovery
 ↓
Investigate
```

Financial integrity takes priority over deployment convenience.

---

# 34. Emergency Feature Controls

If a feature is causing harm, disable it independently where possible.

Examples:

```text
paystack_enabled
custom_requests_enabled
cash_payments_enabled
eft_payments_enabled
```

The platform should remain usable where possible.

---

# 35. Incident Management

Every significant incident should have:

- Incident ID
- Severity
- Start time
- Detection time
- Impact
- Systems affected
- Owner
- Mitigation
- Resolution
- Root cause
- Follow-up actions

---

# 36. Incident Severity

### P1 — Critical

Examples:

- Data breach
- Payment corruption
- Major booking outage
- Platform-wide outage

### P2 — High

Examples:

- Major feature degraded
- Significant payment failures
- Major notification outage

### P3 — Medium

Limited impact.

### P4 — Low

Minor operational issue.

---

# 37. Incident Response

Recommended:

```text
Detect
 ↓
Declare
 ↓
Assign owner
 ↓
Assess impact
 ↓
Contain
 ↓
Recover
 ↓
Validate
 ↓
Communicate
 ↓
Review
```

Do not delete evidence during incident response.

---

# 38. Post-Incident Review

For important incidents document:

- What happened
- Why it happened
- How it was detected
- User impact
- Financial impact
- Resolution
- What went well
- What failed
- Preventive actions

Avoid blame-focused reviews.

---

# 39. Customer Support Operations

Support should be able to handle:

- Account issues
- Booking issues
- Payment issues
- Provider issues
- Business issues
- Verification
- Reviews
- Custom requests
- Refund/dispute cases

Support agents should have controlled access to relevant information.

---

# 40. Support Escalation

Example:

```text
Customer Support
 ↓
Operations
 ↓
Finance / Verification / Engineering
 ↓
Platform Owner
```

Escalation should be based on issue type and severity.

---

# 41. Provider Support

Provider support should cover:

- Profile
- Verification
- Services
- Availability
- Bookings
- Team management
- Business units
- Payments
- Earnings
- Payouts
- Reviews

Support should never bypass security or financial controls simply to resolve a complaint.

---

# 42. Business Support

T3 business support includes:

- Business setup
- Units
- Categories
- Staff
- Permissions
- Bookings
- Compensation
- Reporting
- Payments
- Payouts

Tenant isolation must remain enforced during support.

---

# 43. Finance Operations

Finance operations should include:

### Daily

- Payment failures
- Webhook failures
- Reconciliation exceptions
- Refunds
- Payout exceptions

### Periodic

- Commission review
- Earnings review
- Training-centre allocations
- Payout reconciliation
- Financial reporting

---

# 44. Marketplace Operations

Operations should monitor:

- Supply
- Demand
- Zero-result searches
- Provider availability
- Category demand
- Booking conversion
- Cancellation
- No-show patterns

Do not manipulate marketplace ranking simply to solve supply problems.

---

# 45. Verification Operations

Maintain queues for:

- New provider verification
- Business verification
- Re-verification
- Rejected applications
- Missing information

Track:

- Queue size
- Age of oldest case
- Average processing time
- Rejection reasons

---

# 46. Moderation Operations

Monitor:

- Reported media
- Reported reviews
- Provider complaints
- Customer abuse reports
- Suspicious activity

Moderation decisions must be consistent and auditable.

---

# 47. Scheduled Operations

Automated jobs should include:

```text
Booking reminders
Expired request handling
Notification retries
Analytics aggregation
Reconciliation checks
Payout processing
Media cleanup
Retention processing
System health checks
```

Each job must be observable and idempotent.

---

# 48. Daily Operations Checklist

```text
[ ] Platform health
[ ] API errors
[ ] Database health
[ ] Queue health
[ ] Payment failures
[ ] Webhook failures
[ ] Payout exceptions
[ ] Notification failures
[ ] Verification queue
[ ] Moderation queue
[ ] Support queue
[ ] Security alerts
[ ] Backup status
```

---

# 49. Weekly Operations Review

Review:

- Bookings
- Completed services
- Cancellations
- No-shows
- Payments
- Refunds
- Commission
- Payouts
- Provider activity
- Customer activity
- Marketplace demand
- Support
- Security
- Infrastructure cost

---

# 50. Monthly Operations Review

Review:

- Revenue/GMV
- Commission
- Provider growth
- Customer growth
- Business growth
- Retention
- Category performance
- Geographic performance
- Infrastructure cost
- Security posture
- Product reliability
- Incident trends

---

# 51. Release Management

Every release should have:

```text
Version
Scope
Risk
Tests
Migration
Rollback plan
Owner
Release timestamp
```

High-risk releases should receive additional review.

---

# 52. Hotfix Procedure

For critical production defects:

```text
Identify
 ↓
Create hotfix
 ↓
Run targeted tests
 ↓
Security review where relevant
 ↓
Deploy
 ↓
Smoke test
 ↓
Monitor
 ↓
Add regression test
```

Avoid bypassing the release process unless the situation genuinely requires emergency action.

---

# 53. Dependency Maintenance

Maintain:

- Backend dependencies
- Frontend dependencies
- Containers
- OS/base images
- Database
- Infrastructure tools
- Security libraries

Prioritize critical security updates.

---

# 54. Secret Rotation Operations

Maintain procedures for rotating:

- Database credentials
- Payment credentials
- Webhook secrets
- Storage credentials
- Notification credentials
- Encryption keys

Rotation should be tested before emergencies require it.

---

# 55. Capacity Planning

Monitor growth in:

- Customers
- Providers
- Businesses
- Bookings
- Media
- Database size
- Storage
- API traffic
- Queue volume

Use trends to plan infrastructure before limits are reached.

---

# 56. Scaling Procedure

When demand increases:

```text
Measure bottleneck
 ↓
Confirm root cause
 ↓
Scale affected component
 ↓
Monitor
 ↓
Optimize
```

Do not scale everything automatically without identifying the actual bottleneck.

---

# 57. Cost Operations

Review:

- Compute
- Database
- Storage
- CDN
- Bandwidth
- Queue
- Monitoring
- AI
- Third-party services

Unexpected increases require investigation.

---

# 58. AI Operations

Monitor:

- AI feature usage
- Model failures
- Cost
- Latency
- Safety incidents
- Hallucination reports
- Provider/model availability

If AI fails:

```text
AI unavailable
 ↓
Fallback to deterministic workflow
```

AI failure must not bring down core booking/payment functionality.

---

# 59. Data Governance Operations

Maintain processes for:

- Data retention
- Deletion
- Anonymization
- Export
- Access review
- Audit review

Sensitive data access should be reviewed periodically.

---

# 60. Access Reviews

Periodically review:

- Admin accounts
- Finance access
- Verification access
- Infrastructure access
- Database access
- Cloud/IAM permissions

Remove access that is no longer required.

---

# 61. Security Operations

Monitor:

- Failed authentication
- Suspicious activity
- Admin actions
- Permission changes
- Data exports
- File access
- Rate-limit violations

Escalate serious events according to the incident response plan.

---

# 62. Business Continuity

Waasha should maintain documented procedures for:

- Major infrastructure outage
- Payment provider outage
- Notification provider outage
- Storage outage
- Database outage
- Security incident
- Key-person unavailability

Critical operational knowledge must not exist only in one person's memory.

---

# 63. Vendor Outage Procedures

### Payment provider unavailable

Allow supported alternatives where safe:

- Cash
- EFT

Do not fake payment success.

### Notification provider unavailable

Queue/retry notifications.

### AI provider unavailable

Use deterministic fallback.

### Storage unavailable

Prevent unsafe uploads and retry safely.

---

# 64. Phase 2 Boundary

The initial production launch does **not** include driver functionality.

Driver-related functionality should be introduced only through a separately approved architecture and release process.

Do not introduce driver registration, matching, ride workflows, or driver payouts into the launch system simply because infrastructure exists.

---

# 65. Product Governance

Changes to core architecture should be documented.

Examples:

- New category
- New payment method
- New provider capability
- New commission rule
- New marketplace ranking logic
- New financial flow
- New AI capability
- Driver Phase 2

Major changes should update the relevant architecture document.

---

# 66. Launch Definition of Done

Waasha is launch-ready when:

- Production infrastructure is stable.
- Database migrations are verified.
- Payments are verified.
- Booking workflows are verified.
- T1/T2/T3 workflows are verified.
- Marketplace discovery works.
- Media is secured.
- Notifications work.
- Offline behaviour is safe.
- Admin platform is operational.
- Analytics are working.
- Monitoring is active.
- Security is reviewed.
- Backups are tested.
- Disaster recovery is documented.
- Support is ready.
- Rollback is tested.
- Critical defects are resolved.

---

# 67. Operational Definition of Done

Waasha is operationally mature when:

- Daily health checks are routine.
- Incidents have defined ownership.
- Releases are controlled.
- Backups are regularly tested.
- Access is reviewed.
- Financial reconciliation is routine.
- Marketplace performance is monitored.
- Security monitoring is active.
- Costs are understood.
- Capacity is planned.
- Production bugs become regression tests.
- Architecture evolves through documented decisions.

---

# 68. Final Production Checklist

```text
PRODUCT
[ ] Customer journeys verified
[ ] Provider journeys verified
[ ] T2/T3 journeys verified
[ ] Admin journeys verified

MARKETPLACE
[ ] Five categories
[ ] 10 km default discovery
[ ] Search verified
[ ] Availability verified
[ ] Ranking fairness verified

BOOKING
[ ] Standard booking
[ ] Custom request
[ ] Assignment
[ ] Cancellation
[ ] Completion
[ ] Review

FINANCE
[ ] Waasha Payment
[ ] Cash
[ ] EFT
[ ] Commission
[ ] Training-centre allocation
[ ] Payouts
[ ] Reconciliation

SECURITY
[ ] Authentication
[ ] MFA
[ ] Authorization
[ ] Tenant isolation
[ ] Media security
[ ] Admin security
[ ] Audit

INFRASTRUCTURE
[ ] Production
[ ] Monitoring
[ ] Backups
[ ] Recovery
[ ] CI/CD
[ ] Rollback

OPERATIONS
[ ] Support
[ ] Verification
[ ] Moderation
[ ] Finance operations
[ ] Incident response
[ ] Access review
```

---

# 69. Non-Negotiable Launch Rules

1. **Exactly five core launch categories.**
2. **10 km is the default discovery radius.**
3. **25% commission is configurable, never hard-coded.**
4. **Maximum 3 service/style images.**
5. **Maximum 3 custom-request images.**
6. **T1/T2/T3 are capability tiers, not marketplace ranking advantages.**
7. **Training-centre referrals do not receive permanent ranking preference.**
8. **Payment status and service completion remain separate.**
9. **Financial records remain traceable and historically consistent.**
10. **Tenant isolation is mandatory.**
11. **Production secrets must remain protected.**
12. **Backups must be tested, not merely created.**
13. **Critical workflows must be observable.**
14. **AI must not override deterministic business rules.**
15. **AI must not directly control financial truth.**
16. **Offline state must never be presented as confirmed server state.**
17. **Driver functionality is deferred to Phase 2.**
18. **Major product changes require architecture review.**

---

# 70. The Complete Waasha Production Blueprint

With this document completed, the Waasha architecture set contains:

1. Product Build Specification
2. Database Architecture
3. API Specification
4. Booking Engine
5. Provider Tiers
6. Payment & Finance Architecture
7. Notification & Communication Architecture
8. Authentication, Authorization & Security
9. Marketplace, Discovery & Search Architecture
10. Frontend Application Architecture
11. Admin Platform Architecture
12. Media & File Storage Architecture
13. Analytics, Reporting & Observability Architecture
14. Infrastructure, DevOps & Deployment Architecture
15. Testing & Quality Assurance Architecture
16. Offline-First & Synchronization Architecture
17. AI & Automation Architecture
18. Production Launch & Operations Runbook

Together these documents form the **Waasha Production Blueprint**.

---

# 71. Final Principle

**Build it correctly. Test it thoroughly. Launch it deliberately. Operate it continuously. Improve it from evidence.**

Waasha is designed to become a scalable service marketplace—not simply an application that happens to accept bookings.

Every major layer has now been defined:

```text
Customer
Provider
Business
Training Centre
Admin
      ↓
Frontend
      ↓
API
      ↓
Business Logic
      ↓
Database / Payments / Media / Notifications
      ↓
Analytics / Observability
      ↓
Infrastructure
      ↓
Security / Testing / Operations
```

**Waasha — The Future of Service, Today.**

---

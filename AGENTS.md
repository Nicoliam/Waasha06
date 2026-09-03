# WAASHA — AI DEVELOPMENT OPERATING INSTRUCTIONS

**Project:** Waasha  
**Tagline:** The Future of Service, Today.  
**Status:** Production build  
**Authoritative architecture document:** `docs/WAASHA_PRODUCTION_BLUEPRINT_MASTER.md`

---

## 1. Purpose

This file defines how AI coding agents must work inside the Waasha codebase.

Waasha is being built as a complete production platform, not as a throwaway prototype or limited MVP.

The goal is to produce secure, maintainable, scalable, testable production software while preserving the product decisions and architecture already defined for Waasha.

---

# 2. Source-of-Truth Hierarchy

When making implementation decisions, use the following hierarchy:

### 1. Explicit current user instruction

The user's current, specific instruction takes priority for the task, unless it conflicts with a higher-level safety or platform constraint.

### 2. Waasha Master Blueprint

```text
docs/WAASHA_PRODUCTION_BLUEPRINT_MASTER.md
```

This is the authoritative source for:

- Product requirements
- Business rules
- Architecture
- Data model
- API contracts
- Booking behaviour
- Provider capabilities
- Payments
- Notifications
- Security
- Marketplace discovery
- Frontend architecture
- Admin architecture
- Media
- Analytics
- Infrastructure
- Testing
- Offline behaviour
- AI boundaries
- Production operations

### 3. Existing codebase

The existing implementation represents the current technical state.

Do not assume that existing code is correct simply because it exists.

If existing code conflicts with the Master Blueprint, identify the conflict and implement the correct architecture rather than blindly copying legacy behaviour.

### 4. Stitch design assets

```text
design/stitch/
```

These are the visual/design source of truth for approved UI direction, layouts, styling, branding, and interaction references.

---

# 3. Mandatory Blueprint Consultation Rule

Before implementing or materially changing a feature:

1. Identify which Waasha architecture areas the feature touches.
2. Read the relevant sections of the Master Blueprint.
3. Inspect the existing implementation.
4. Determine whether the current implementation matches the blueprint.
5. Implement the smallest coherent change that satisfies the architecture.
6. Add or update tests.
7. Verify that the change does not violate another subsystem.

Do **not** reread the entire Master Blueprint for trivial changes.

Examples of changes that normally require blueprint consultation:

- Database schema changes
- API changes
- Authentication
- Authorization
- Booking logic
- Payments
- Provider tiers
- Business accounts
- Team management
- Marketplace/search
- Custom requests
- Notifications
- Media/storage
- Analytics
- Offline synchronization
- AI functionality
- Admin functionality
- Infrastructure
- Security
- Financial logic

Examples that normally do not require the entire blueprint:

- Small spacing changes
- Typography adjustments
- Minor visual refinements
- Copy corrections
- Non-functional UI polish

---

# 4. Do Not Invent Business Rules

If the Master Blueprint already defines a business rule, do not invent a different rule.

Examples:

- Waasha has exactly five core launch categories.
- Default discovery radius is 10 km.
- Provider tiers are T1, T2 and T3.
- Provider tiers represent capabilities, not marketplace ranking priority.
- Platform commission is currently 25% but must remain configurable.
- Service/style images are limited to 3.
- Custom-request images are limited to 3.
- Payment status and service completion are separate.
- Training-centre attribution does not create permanent marketplace ranking priority.
- Driver functionality is excluded from the initial launch and deferred to Phase 2.

If a requirement is genuinely undefined, do not silently create a permanent business rule.

Prefer:

1. Configuration where appropriate.
2. A clearly isolated implementation decision.
3. Documentation of the decision.
4. Asking the user when the decision materially affects architecture or business behaviour.

---

# 5. Core Waasha Categories

The initial Waasha marketplace contains exactly:

1. 💈 Barbers
2. 💇 Hair Salons & Stylists
3. 💅 Nail Technicians
4. 💄 Beauty Services
5. 🚗 Car Wash

Do not introduce additional core launch categories without an explicit product decision.

---

# 6. Provider Model

Waasha supports three provider capability tiers:

### T1 — Individual

A solo provider.

### T2 — Teams

A provider that can manage team members, assignments, permissions, and applicable compensation.

### T3 — Business

A business that can manage:

- Staff
- Business units/locations
- Multiple Waasha categories
- Orders/bookings
- Permissions
- Compensation
- Business reporting

T3 can support all five Waasha categories.

Provider tiers must not automatically determine marketplace ranking.

---

# 7. Marketplace Rules

Default discovery radius:

```text
10 km
```

The radius should be configurable at the platform level where appropriate, but 10 km is the default product behaviour.

Marketplace equality is important.

Do not automatically rank providers higher because they are:

- T2
- T3
- Training-centre referrals
- Larger businesses

Discovery ranking should be based on approved marketplace signals, not provider tier favouritism.

---

# 8. Custom Requests

Providers choose whether to accept custom requests.

If enabled:

Customers may submit:

- Description
- Preferred date/time
- Location
- Up to 3 images
- Optional budget/payment preference

Eligible providers may submit proposals.

The selected proposal becomes a booking.

Do not build custom requests as an unrelated booking system. They must integrate with the booking lifecycle defined by the blueprint.

---

# 9. Media Rules

Service/style images:

```text
Maximum: 3
```

Custom-request images:

```text
Maximum: 3
```

Media must follow the approved storage, security, ownership, processing, moderation, and access architecture.

Never expose private media directly when signed/private access is required.

---

# 10. Payments & Financial Integrity

Waasha supports:

- Waasha Payment
- Cash
- EFT

Paystack is the intended payment provider integration.

Paystack must remain behind a payment abstraction/adapter rather than being hard-wired throughout the application.

Never hard-code the commission rate into business logic.

Current platform commission:

```text
25%
```

It must remain configurable.

### Critical rule

Payment status and service completion are separate states.

A successful payment must never automatically mean that the service has been completed.

Financial records must be:

- Traceable
- Idempotent
- Auditable
- Reconciliable
- Historically consistent

Never modify historical financial records merely to make a current calculation look correct.

---

# 11. Cash Change

For cash bookings, use:

**“Cash change requested”**

Example:

```text
Service: R150
Customer cash: R200
Change requested: R50
```

Do not use language implying that Waasha physically guarantees or supplies change.

---

# 12. Training-Centre Attribution

Training centres may:

- Refer/recruit providers.
- Receive a configurable share from eligible completed services.
- Help with provider onboarding/verification.

Training-centre earnings should be tied to eligible completed transactions, not simply registrations.

Training-centre referrals do not create permanent marketplace ranking priority.

---

# 13. Driver Functionality

Driver functionality is **not part of the initial Waasha launch**.

Do not implement:

- Driver registration
- Driver matching
- Ride workflows
- Driver payouts
- Driver-specific marketplace flows

Driver functionality is deferred to Phase 2 and should have a separate architecture when introduced.

---

# 14. Security Rules

Security is a first-class requirement.

Always consider:

- Authentication
- Authorization
- Object-level access
- Tenant isolation
- Input validation
- Rate limiting
- Secrets
- Encryption
- Audit logging
- File security
- Payment security
- Admin security
- Session/token security

Never trust IDs supplied by the client.

Every protected resource must verify that the authenticated user is authorized to access that resource.

---

# 15. Tenant Isolation

T2 and T3 structures may contain multiple people, teams, units, and business records.

A user must only access resources they are authorized to access.

Do not rely solely on frontend filtering for authorization.

Authorization must be enforced server-side.

---

# 16. AI Rules

AI may assist with:

- Search
- Writing
- Recommendations
- Review summaries
- Support
- Moderation
- Custom-request assistance
- Provider profile/service creation
- Operational insights

AI must not become the source of truth for deterministic critical outcomes.

AI must not directly control:

- Money
- Payment success
- Commission calculations
- Booking availability
- Permissions
- Tenant access
- Financial settlement
- Marketplace ranking decisions

Deterministic backend logic must make critical decisions.

AI failures must have safe fallbacks.

---

# 17. Offline Rules

Waasha supports offline-tolerant behaviour where defined by the architecture.

Offline UI must never falsely claim that a server-authoritative action has succeeded.

Examples:

Do not show:

```text
Booking confirmed
```

when the booking is only queued locally.

Use appropriate pending/sync states.

Payment confirmation must always be server-authoritative.

---

# 18. API Rules

API changes must consider:

- Authentication
- Authorization
- Validation
- Idempotency
- Error contracts
- Pagination
- Versioning
- Rate limits
- Audit requirements
- Tenant isolation

Do not casually break existing API contracts.

If a breaking change is necessary, document it and update dependent clients/tests.

---

# 19. Database Rules

Database changes must:

- Be migration-based.
- Preserve existing production data.
- Include appropriate indexes.
- Enforce critical constraints.
- Avoid unnecessary duplication.
- Preserve historical snapshots where required.
- Support tenant isolation.
- Be tested before deployment.

Do not store critical business logic only in frontend code.

---

# 20. Booking Rules

Booking logic must remain server-authoritative.

Always account for:

- Availability
- Conflicts
- Assignment
- Location
- Pricing
- Snapshots
- Payment state
- Cancellation
- Completion
- No-show
- Disputes
- Notifications
- Commission
- Training-centre attribution

Concurrency must be handled safely.

Do not assume that a slot is still available merely because it was available when the page loaded.

---

# 21. Frontend Rules

The frontend should:

- Follow the approved Stitch visual direction.
- Remain responsive.
- Support accessibility.
- Handle loading/error/empty states.
- Handle offline/pending states appropriately.
- Never be the final authority for permissions or financial truth.

Use the approved Waasha branding.

The official Waasha logo should not be recreated or altered when an approved asset is available.

---

# 22. Design Rules

Stitch is the visual reference.

Approved direction includes:

- White/light backgrounds
- Deep navy
- Waasha teal
- Clean typography
- Premium SaaS aesthetic
- Neutral, modern, innovative presentation
- Human and approachable experience
- No unnecessary visual complexity

Logo behaviour:

- W/wordmark remains still.
- Teal diamond above the W may spin horizontally around its vertical axis.
- Respect reduced-motion preferences.

Do not introduce a completely different visual identity without an explicit design decision.

---

# 23. Testing Rules

Every meaningful feature should include appropriate tests.

At minimum, consider:

- Unit
- Component
- Integration
- API
- Database
- End-to-end
- Security
- Accessibility

Critical workflows require stronger coverage.

Especially protect:

- Booking
- Payments
- Cash
- EFT
- Commission
- Payouts
- Provider tiers
- Tenant isolation
- Authentication
- Media
- Offline synchronization

A bug fix should normally include a regression test.

---

# 24. Observability Rules

Production functionality should be observable.

Where appropriate use:

- Structured logs
- Metrics
- Traces
- Correlation IDs
- Error tracking
- Alerts

Do not log:

- Passwords
- Payment secrets
- Access tokens
- Sensitive personal data unnecessarily

---

# 25. Infrastructure Rules

Production infrastructure must be:

- Reproducible
- Version-controlled
- Secure
- Observable
- Recoverable

Use migrations and deployment automation rather than manual production changes wherever practical.

---

# 26. Error Handling

Errors should be:

- Predictable
- User-safe
- Developer-actionable
- Logged appropriately

Do not expose stack traces, secrets, SQL errors, or internal infrastructure details to customers.

---

# 27. Dependency Rules

Before adding a dependency:

1. Check whether existing dependencies already solve the problem.
2. Consider security and maintenance.
3. Consider bundle/runtime impact.
4. Prefer established, well-supported libraries.
5. Keep the dependency isolated if it is vendor-specific.

Do not add libraries unnecessarily.

---

# 28. Code Quality

Prefer:

- Clear names
- Small cohesive modules
- Explicit interfaces
- Strong validation
- Reusable services
- Testable logic
- Consistent error handling

Avoid:

- Giant functions
- Hidden global state
- Duplicate business logic
- Hard-coded financial rules
- Hard-coded permissions
- Copy-pasted workflows

---

# 29. Vendor Abstraction

Where a third-party provider may eventually change, isolate it behind an internal interface.

Examples:

```text
PaymentProvider
NotificationProvider
StorageProvider
AIProvider
```

The application should depend primarily on Waasha's internal interfaces, not vendor-specific implementation details.

---

# 30. Configuration

Use configuration for values that are intended to change.

Examples:

- Commission
- Discovery radius
- Feature flags
- Notification settings
- Payment availability
- AI feature availability

Do not scatter configuration values throughout source code.

---

# 31. Feature Flags

High-risk features should be capable of controlled enablement where practical.

Examples:

```text
custom_requests_enabled
paystack_enabled
cash_payments_enabled
eft_payments_enabled
ai_features_enabled
```

A feature flag must not replace proper authorization or business logic.

---

# 32. Change Management

Before a major change:

1. Identify affected architecture.
2. Consult the Master Blueprint.
3. Inspect dependencies.
4. Implement.
5. Test.
6. Review migration/API impacts.
7. Update documentation if architecture changes.

If the implementation introduces a new architectural decision, document it.

---

# 33. Conflict Handling

If code, design, documentation, and requirements conflict:

### Step 1

Identify the conflict.

### Step 2

Determine whether the conflict is:

- Cosmetic
- Technical
- Business
- Security
- Financial
- Architectural

### Step 3

Do not silently choose a solution when the decision materially changes Waasha.

Explain the conflict and recommend the safest consistent approach.

---

# 34. Never Hide Architectural Problems

Do not:

- Suppress errors merely to make tests pass.
- Disable security checks to make a feature work.
- Bypass authorization.
- Fake payment success.
- Pretend offline actions are confirmed.
- Remove validation to avoid errors.
- Delete audit information to hide a problem.

Fix the underlying issue.

---

# 35. Production Mindset

Every implementation should be evaluated against:

```text
Correctness
Security
Reliability
Scalability
Maintainability
Observability
Testability
User experience
```

Do not optimize only for "it works on my machine."

---

# 36. Definition of Done for Implementation

A feature is not complete merely because the UI exists.

Where applicable, completion means:

```text
Requirements
 ↓
Database
 ↓
API
 ↓
Business logic
 ↓
Frontend
 ↓
Authorization
 ↓
Validation
 ↓
Error handling
 ↓
Tests
 ↓
Analytics
 ↓
Observability
 ↓
Documentation
```

Not every feature needs every layer, but the agent must consciously assess them.

---

# 37. Working With the User

When the user asks for implementation:

- Be decisive.
- Do not repeatedly ask questions that are already answered in the blueprint.
- Reuse existing architecture.
- Explain important architectural trade-offs.
- Flag genuine conflicts.
- Avoid unnecessary rewrites.
- Preserve working functionality unless there is a clear reason to change it.

If a decision is already explicitly defined, follow it.

---

# 38. Final Instruction

Before making a major implementation decision, consult:

```text
docs/WAASHA_PRODUCTION_BLUEPRINT_MASTER.md
```

Then implement against the architecture.

**Do not treat the Master Blueprint as optional background reading.**

It is the primary Waasha engineering reference.

---

# WAASHA ENGINEERING PRINCIPLE

> **Build the right thing, build it correctly, protect the data, test the critical paths, and keep the architecture coherent as Waasha grows.**

**Waasha — The Future of Service, Today.**

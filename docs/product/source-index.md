# Source Index

Phase: 1 - Source Inventory

Scope:
- Historical reference source: `/Users/matthewlevine/Repos/yado`
- Target repo for this document: `/Users/matthewlevine/MyYado`
- This is an index only. It records where ideas, features, flows, entities, and integrations appear in the historical source.
- No Sharetribe mapping, product normalization, or implementation decisions are made here.
- Source paths below are references, not dependencies.

Tags:
- `core`: active Yado/MyYado marketplace source material or currently represented product surface.
- `nice-to-have`: present source material that appears supportive or future-facing rather than essential to the first marketplace pass.
- `legacy/unknown`: pre-pivot, stale, inconsistent, or unverified material retained in the historical repo.

## Product Positioning

Feature: Yado product thesis
Source: `/Users/matthewlevine/Repos/yado/README.md`
Type: core
Notes: Defines Yado as a specialized investment, booking, and management platform for authentic Japanese inns. Focuses on ryokan and minshuku, rural/traditional property owners, international travelers, stewardship-first operations, and eventually aligned capital.

Feature: Public site metadata and route metadata
Source: `/Users/matthewlevine/Repos/yado/shared/site.ts`
Type: core
Notes: Defines canonical origin `https://www.yado.travel`, page metadata, route resolution, public links, legal links, platform links, inquiry mailto links, and lingering legacy product/compliance paths.

Feature: Public homepage
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/SiteHome.tsx`
Type: core
Notes: Landing page for authentic Japanese stays. Includes fixed header, hero, curated collections, featured stays, trust points, host inquiry link, platform link, and links into `/app`.

Feature: Platform overview
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/PlatformPage.tsx`
Type: core
Notes: Explains the platform as booking, management, and investment for authentic yado. Includes audience tracks for travelers, owners, and investors; supply curation; guest experience; owner enablement; capital alignment; launch priorities.

Feature: Legal/trust copy
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/LegalPage.tsx`
Type: core
Notes: Contains privacy policy, terms of service, and disclaimer for site, platform materials, traveler/owner/investor conversations, booking, property discussions, payment providers, and investment-related disclaimers.

Feature: Brand and visual assets
Source: `/Users/matthewlevine/Repos/yado/client/public/*`
Type: core
Notes: Includes Yado/Nikko logos, favicon, and hero imagery used by homepage, app pages, listings, collections, and platform pages.

## Current MyYado App Surface

Feature: App router and top-level page selection
Source: `/Users/matthewlevine/Repos/yado/client/src/App.tsx`
Type: core
Notes: Routes between MyYado app paths, platform page, billing success page, homepage, and legal pages. Updates document metadata client-side.

Feature: MyYado app route model
Source: `/Users/matthewlevine/Repos/yado/client/src/lib/myyado.ts`
Type: core
Notes: Defines `/app` base path and routes for home, explore, stay detail, booking, checkout, confirmation, collection, account tabs, login, signup, host, host application, host dashboard, static pages, and not found.

Feature: MyYado staged marketplace UI
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: Single file containing staged marketplace pages for guest discovery, listing detail, booking, checkout, confirmation, collections, account, login/signup, host landing, host application, host dashboard, static pages, and fallback not found.

Feature: App header/navigation
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: Navigation includes Explore, Collections, Host, Trust, Marketing site, Log in, and Create account.

Feature: App static informational pages
Source: `/Users/matthewlevine/Repos/yado/client/src/lib/myyado.ts`
Type: nice-to-have
Notes: Static page definitions for About MyYado, How MyYado Works, Trust & Quality, MyYado Terms, and MyYado Privacy.

## Entities And Seed Data

Entity: Listing
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: `YadoListing` fields include id, title, location, city, homeType, descriptor, nightlyRate, guests, bedrooms, beds, bathrooms, heroImage, gallery, about, special, amenities, reviews, and collectionSlugs.

Entity: Home type
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: Home type values are `Ryokan`, `Minshuku`, `Machiya`, and `Villa`.

Entity: Listing review
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: `YadoListingReview` fields include author, date, rating, and body. Reviews are seeded and displayed on listing detail pages.

Entity: Collection
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: `YadoCollection` fields include slug, title, intro, and listingIds. Seed collections are `quiet-kyoto`, `design-stays`, and `cedar-and-onsen`.

Entity: Booking
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: `YadoBooking` fields include id, listingId, guestName, guestEmail, checkin, checkout, guests, total, status, and createdAt. Booking statuses are `Confirmed`, `Upcoming`, and `Completed`.

Entity: Host application
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: `YadoHostApplication` fields include id, propertyName, propertyType, location, email, contactName, about, status, and submittedAt. Application statuses are `pending`, `approved`, and `rejected`.

Entity: Guest profile
Source: `/Users/matthewlevine/Repos/yado/client/src/lib/myyado.ts`
Type: nice-to-have
Notes: Static guest profile fields include name, email, phone, travelerNote, and paymentMethod.

Entity: Host dashboard data
Source: `/Users/matthewlevine/Repos/yado/client/src/lib/myyado.ts`
Type: nice-to-have
Notes: Static host dashboard data includes listingId, upcoming reservations, earningsYtd, occupancy, responseTime, and availability statuses.

## Guest Flows

Flow: Homepage to marketplace app
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/SiteHome.tsx`
Type: core
Notes: Homepage links into `/app/collections/{slug}`, `/app/explore`, and listing detail routes. The featured stay link uses `/app/stays/{id}` in this file.

Flow: App home to explore
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: `/app` home page contains a search panel that submits to `/app/explore`.

Flow: Explore/search
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: Explore page shows a lightweight results page with location, check-in, checkout, guests, price, and home type controls. It displays filtered listing cards and an empty state.

Flow: Listing detail
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: Stay page displays gallery, home type, title, location, rating, price, guests, bedrooms, beds, bathrooms, about text, special note, amenities, reviews, and a request-to-book form.

Flow: Booking initiation
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: `/app/booking/{id}` confirms dates, guests, price summary, and continues to checkout. Pricing uses nightly rate, service fee, taxes, and total.

Flow: Checkout
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: `/app/checkout` shows guest details, a sample card value, cancellation summary, final total, and link to confirmation. The UI copy calls this a simple MVP checkout.

Flow: Confirmation
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: `/app/confirmation` shows confirmed stay request, booking summary, final price, support contact, and notes that arrival coordination remains email-based for the MVP.

Flow: Guest account
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: nice-to-have
Notes: Account pages include overview, trips, profile, and payments. Data is static in the client-side MyYado helper.

Flow: Login and signup
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: nice-to-have
Notes: UI pages exist for login and signup. They use static form defaults and link to account overview.

## Host And Supply Flows

Flow: Host landing page
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: `/app/host` presents a curated host funnel, emphasizes application rather than open publishing, and links to `/app/host/apply`.

Flow: Host application
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: core
Notes: `/app/host/apply` is a five-step staged form: contact details, property basics, property description/amenities, photos placeholder, and review/submit.

Flow: Host application API
Source: `/Users/matthewlevine/Repos/yado/server/routes.ts`
Type: core
Notes: `POST /api/host/apply` validates propertyName, location, email, and contactName, then creates a host application with status `pending`.

Flow: Host dashboard
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/MyYadoApp.tsx`
Type: nice-to-have
Notes: `/app/host/dashboard` shows upcoming bookings, availability, earnings summary, occupancy, response time, and listing preview from static helper data.

## Search And Discovery

Feature: Client listing filtering
Source: `/Users/matthewlevine/Repos/yado/client/src/lib/myyado.ts`
Type: core
Notes: Filters listings by location substring against location/city, exact home type, and maximum nightly rate. Date and guests are preserved in query strings but not used by this filter helper.

Feature: Server listing filtering
Source: `/Users/matthewlevine/Repos/yado/server/persistence.ts`
Type: core
Notes: `listYadoListings` applies location, homeType, and maxPrice filters to file-backed listing data.

Feature: Listing API client
Source: `/Users/matthewlevine/Repos/yado/client/src/lib/api.ts`
Type: core
Notes: Client functions fetch listings, individual listing, collections, bookings, and host application endpoints.

Feature: Collections as discovery model
Source: `/Users/matthewlevine/Repos/yado/shared/yado.ts`
Type: core
Notes: Collections group listings by listingIds and are used by homepage and `/app/collections/{slug}` routes.

## Server, Persistence, And Runtime

Feature: Express API route registration
Source: `/Users/matthewlevine/Repos/yado/server/routes.ts`
Type: core
Notes: Registers health, auth, analytics, enquiries, billing lookup/reconcile/webhook, listings, collections, bookings, host application, and API 404 routes.

Feature: Health endpoint
Source: `/Users/matthewlevine/Repos/yado/server/routes.ts`
Type: core
Notes: `GET /api/health` returns a JSON health response with mode `client-first-mvp` and product `Yado`.

Feature: File-backed persistence
Source: `/Users/matthewlevine/Repos/yado/server/persistence.ts`
Type: core
Notes: Persistent store writes to `data/app-store.json` by default or `APP_DATA_PATH`. Store seeds Yado listings and collections when no data exists.

Feature: Booking API
Source: `/Users/matthewlevine/Repos/yado/server/routes.ts`
Type: core
Notes: `POST /api/bookings` validates listing, guest name/email, dates, guests, calculates nights, service fee, taxes, and creates a confirmed booking. `GET /api/bookings` can filter by email.

Feature: Collections API
Source: `/Users/matthewlevine/Repos/yado/server/routes.ts`
Type: core
Notes: `GET /api/collections` returns collections from persistent store.

Feature: Listing API
Source: `/Users/matthewlevine/Repos/yado/server/routes.ts`
Type: core
Notes: `GET /api/listings` supports location, homeType, and price query parameters. `GET /api/listings/:id` returns a single listing or `listing_not_found`.

Feature: Runtime host/port resolution
Source: `/Users/matthewlevine/Repos/yado/server/http.ts`
Type: nice-to-have
Notes: Resolves local or hosted listen options using PORT, HOST, LISTEN_HOST, and hosted runtime environment keys.

Feature: Static serving and Vite development
Source: `/Users/matthewlevine/Repos/yado/server/static.ts`, `/Users/matthewlevine/Repos/yado/server/vite.ts`, `/Users/matthewlevine/Repos/yado/server/index.ts`
Type: nice-to-have
Notes: Supports built static app serving and Vite middleware during development.

Feature: Build/deploy scripts
Source: `/Users/matthewlevine/Repos/yado/package.json`, `/Users/matthewlevine/Repos/yado/script/build.ts`, `/Users/matthewlevine/Repos/yado/render.yaml`
Type: nice-to-have
Notes: Scripts include dev, build, start, typecheck, node tests, production acceptance, and Playwright e2e. Runtime is Express plus Vite-built frontend.

## Integrations

Integration: Stripe checkout lookup and webhook handling
Source: `/Users/matthewlevine/Repos/yado/server/billing.ts`, `/Users/matthewlevine/Repos/yado/server/stripe.ts`, `/Users/matthewlevine/Repos/yado/server/routes.ts`, `/Users/matthewlevine/Repos/yado/shared/billing.ts`
Type: legacy/unknown
Notes: Stripe helpers resolve config, look up prices, create Checkout sessions, retrieve sessions, summarize sessions, verify webhook signatures, and persist checkout/webhook records. Registered routes cover session lookup, session reconcile, and webhook handling.

Integration: Billing success page
Source: `/Users/matthewlevine/Repos/yado/client/src/pages/BillingSuccessPage.tsx`
Type: legacy/unknown
Notes: Reads `session_id`, reconciles Stripe session, shows payment status, and redirects to legacy flow when `draftId` is present. Otherwise links back to the Yado platform.

Integration: Public enquiries
Source: `/Users/matthewlevine/Repos/yado/shared/workspace.ts`, `/Users/matthewlevine/Repos/yado/server/routes.ts`, `/Users/matthewlevine/Repos/yado/server/persistence.ts`
Type: nice-to-have
Notes: `POST /api/enquiries` validates email and either name or phone, stores enquiry data with sourcePath, and creates audit event.

Integration: Auth/session/team model
Source: `/Users/matthewlevine/Repos/yado/shared/workspace.ts`, `/Users/matthewlevine/Repos/yado/server/auth.ts`, `/Users/matthewlevine/Repos/yado/server/routes.ts`, `/Users/matthewlevine/Repos/yado/server/persistence.ts`
Type: legacy/unknown
Notes: Server supports register, login, logout, session lookup, teams, users, roles, session cookies, password hashing, and audit events. Cookie name is `finsure_session`. Current MyYado login/signup UI appears staged/static.

Integration: Funnel analytics
Source: `/Users/matthewlevine/Repos/yado/shared/analytics.ts`, `/Users/matthewlevine/Repos/yado/server/routes.ts`, `/Users/matthewlevine/Repos/yado/server/persistence.ts`
Type: legacy/unknown
Notes: Event types are `str_started`, `str_completed`, `export_initiated`, and `payment_completed`. Summary calculates counts, rates, drop-offs, and last event time.

## Marketing And Growth Sources

Feature: Marketing workspace structure
Source: `/Users/matthewlevine/Repos/yado/marketing/README.md`
Type: legacy/unknown
Notes: Explicitly marked as pre-pivot compliance-product marketing. Defines off-site, on-site capture, on-site conversion, shared context, agents, and contracts.

Feature: On-site capture lane
Source: `/Users/matthewlevine/Repos/yado/marketing/on-site-capture/README.md`, `/Users/matthewlevine/Repos/yado/marketing/on-site-capture/agent-brief.md`, `/Users/matthewlevine/Repos/yado/marketing/on-site-capture/validation-funnel.md`
Type: legacy/unknown
Notes: Defines validation funnel for FINTRAC/KYC compliance, email capture, questionnaire, gated output, pricing exposure, waitlist, and willingness-to-pay signals.

Feature: On-site conversion lane
Source: `/Users/matthewlevine/Repos/yado/marketing/on-site-conversion/README.md`, `/Users/matthewlevine/Repos/yado/marketing/on-site-conversion/agent-brief.md`, `/Users/matthewlevine/Repos/yado/marketing/on-site-conversion/routing-rules.md`
Type: legacy/unknown
Notes: Defines product checkout as primary path and service lead capture as fallback for CAMLO as a Service, Compliance as a Service, and Levine Law.

Feature: Off-site channel testing
Source: `/Users/matthewlevine/Repos/yado/marketing/off-site/README.md`, `/Users/matthewlevine/Repos/yado/marketing/off-site/agent-brief.md`, `/Users/matthewlevine/Repos/yado/marketing/off-site/experiment-system.md`
Type: legacy/unknown
Notes: Defines traffic and awareness experiment system with channel hypotheses, timeboxes, budget caps, success thresholds, kill criteria, and decision outcomes.

Feature: LinkedIn channel hypothesis
Source: `/Users/matthewlevine/Repos/yado/marketing/off-site/linkedin/README.md`, `/Users/matthewlevine/Repos/yado/marketing/off-site/linkedin/agent-brief.md`, `/Users/matthewlevine/Repos/yado/marketing/off-site/linkedin/hypothesis-01.md`
Type: legacy/unknown
Notes: Current channel hypothesis is LinkedIn for founder-led posts, paid/boosted tests, qualified sessions, pricing/service-route reach, payment attempts, and service leads.

Feature: Marketing agent system
Source: `/Users/matthewlevine/Repos/yado/marketing/agents/README.md`, `/Users/matthewlevine/Repos/yado/marketing/agents/system-map.md`, `/Users/matthewlevine/Repos/yado/marketing/agents/skills-matrix.md`
Type: legacy/unknown
Notes: Agent definitions include ICP builder, lead sourcing, cold outreach, lead magnet creator, landing page agent, marketing orchestrator, growth strategy architect, problem discovery, content strategy, and demand capture optimizer.

Feature: Marketing artifact contracts
Source: `/Users/matthewlevine/Repos/yado/marketing/contracts/README.md`, `/Users/matthewlevine/Repos/yado/marketing/contracts/artifact-schemas.md`
Type: legacy/unknown
Notes: Defines schema-bound artifacts such as channel experiment plan/report, problem signal report, content strategy map, ICP profile, lead list, outreach sequence, lead magnet, landing page spec, demand capture report, campaign plan, and growth strategy proposal.

Feature: Marketing operating rules and objective stack
Source: `/Users/matthewlevine/Repos/yado/marketing/shared/README.md`, `/Users/matthewlevine/Repos/yado/marketing/shared/agent-operating-rules.md`, `/Users/matthewlevine/Repos/yado/marketing/shared/objective-stack.md`
Type: legacy/unknown
Notes: Defines marketing boundaries, authority, ownership, traceability, validation standards, channel experiment rules, learning priorities, and product checkout/service lead path split.

## Legacy Or Stale Compliance Product Material

Feature: Legacy FinSure/STR roadmap
Source: `/Users/matthewlevine/Repos/yado/MVP_STATUS_AND_ROADMAP.md`
Type: legacy/unknown
Notes: Explicitly marked as pre-pivot FinSure compliance product. Describes STR drafting assistant, deterministic rules, readiness-gated narrative generation, saved drafts, payment/export unlock, analytics, deployment, and Stage 2/3 compliance roadmap.

Feature: Legacy FinSure route references
Source: `/Users/matthewlevine/Repos/yado/README.md`, `/Users/matthewlevine/Repos/yado/shared/site.ts`
Type: legacy/unknown
Notes: References `/finsure`, `FinSure`, compliance checklist paths, and old STR product anchors. Some README-linked files such as `client/src/pages/StrAssistant.tsx` and `shared/str.ts` were not present in the scanned first-party file list.

Feature: Legacy deployment notes
Source: `/Users/matthewlevine/Repos/yado/DEPLOYMENT_NOTES.md`
Type: legacy/unknown
Notes: Explicitly marked as prior FinSure deployment notes. References `https://fintechlawyer.ca`, STR rule changes, production acceptance, copy/download limitations, and a 2026-03-29 release.

Feature: Legacy compliance checklist e2e
Source: `/Users/matthewlevine/Repos/yado/e2e/capture-funnel.spec.ts`
Type: legacy/unknown
Notes: Tests `/compliance-checklist` and `/compliance-checklist/start`, FINTRAC/KYC checklist copy, questionnaire choices, email capture, pricing, and selected route. Corresponding current source pages were not found in the scanned first-party file list.

Feature: Legacy STR e2e flows
Source: `/Users/matthewlevine/Repos/yado/e2e/guidance-flow.spec.ts`, `/Users/matthewlevine/Repos/yado/e2e/str-flow.spec.ts`
Type: legacy/unknown
Notes: Tests `/finsure`, workspace registration, STR draft presets, saved drafts, risk signal review, narrative builder, export gating, billing-success unlock, and `/api/drafts`/`/api/workspace` interactions. Current scanned route file does not register `/api/drafts` or `/api/workspace`.

Feature: Product funnel event names
Source: `/Users/matthewlevine/Repos/yado/shared/analytics.ts`
Type: legacy/unknown
Notes: Funnel event names use STR-specific labels even though current public positioning is Yado/MyYado.

## Test And Validation Sources

Test: MyYado homepage/app e2e
Source: `/Users/matthewlevine/Repos/yado/e2e/site-home.spec.ts`
Type: core
Notes: Tests root homepage, legal page navigation, platform page navigation, and staged `/app` exploration to listing detail. Some tested link labels appear inconsistent with the current `SiteHome.tsx` text scanned in this inventory.

Test: API route integration
Source: `/Users/matthewlevine/Repos/yado/server/routes.integration.ts`
Type: core
Notes: Tests auth registration/session/logout/login, listings list/detail/filter/not-found, collections, booking create/list/invalid booking, and host application create/invalid application.

Test: Persistence behavior
Source: `/Users/matthewlevine/Repos/yado/server/persistence.test.ts`
Type: core
Notes: Tests user/session persistence, public enquiries, Stripe webhook idempotency, checkout session upsert, seed listing/collection data, listing filters, booking creation/retrieval, host applications, and funnel summary calculations.

Test: Stripe billing helpers
Source: `/Users/matthewlevine/Repos/yado/server/billing.test.ts`, `/Users/matthewlevine/Repos/yado/server/stripe.test.ts`
Type: legacy/unknown
Notes: Tests Stripe config, session summarization, checkout session creation, session retrieval, webhook signature verification, invalid signatures, and stale timestamps.

Test: Runtime helpers
Source: `/Users/matthewlevine/Repos/yado/server/http.test.ts`, `/Users/matthewlevine/Repos/yado/server/env.test.ts`
Type: nice-to-have
Notes: Tests host/port resolution and `.env` parsing.

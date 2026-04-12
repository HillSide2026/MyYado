# Decision Log

Purpose:
- Record product-model decisions that should remain stable across later mapping and implementation phases.
- Each decision should state the outcome, reason, date, and status.

## 2026-04-12 - Use Provider As The Canonical Supply-Side Actor

Decision:
Use `Provider` as the canonical product term for the person or business responsible for a listed stay.

Reason:
The historical material used host, operator, and owner in overlapping ways. `Provider` is broad enough
to cover owner-operated inns, management companies, and stewardship partners without forcing a legal
ownership assumption.

Status:
adopt

## 2026-04-12 - Use Traveler As The Canonical Demand-Side Actor

Decision:
Use `Traveler` as the canonical product term for the person searching for, requesting, booking, and
managing a stay.

Reason:
`Guest` is accurate after confirmation, but too narrow for discovery, inquiry, and pre-booking flows.
`Traveler` covers the full journey.

Status:
adopt

## 2026-04-12 - Use Listing As The Canonical Marketplace Supply Object

Decision:
Use `Listing` as the canonical record travelers discover and transact around.

Reason:
Property, home, stay, and accommodation can each mean something slightly different. `Listing` is the
marketplace object that can represent a ryokan, minshuku, machiya, villa, unit, or other future supply
shape.

Status:
adopt

## 2026-04-12 - Use Stay Type For Accommodation Category

Decision:
Use `Stay Type` for category values such as ryokan, minshuku, machiya, and villa.

Reason:
`Home Type` is too generic and urban-rental-coded. `Property Type` can imply legal real estate
classification. `Stay Type` is closer to the traveler-facing marketplace decision.

Status:
adopt

## 2026-04-12 - Keep Transaction Mode Open Until Phase 4

Decision:
Use `Transaction` as the umbrella object in Phase 2, with inquiry, booking request, and instant
booking treated as candidate transaction modes.

Reason:
The product model needs a stable relationship between Traveler, Provider, and Listing before choosing
the exact transaction process. Phase 4 is dedicated to locking inquiry vs booking vs instant booking.

Status:
defer

## 2026-04-12 - Exclude Legacy Compliance Workflows From MyYado Product Model

Decision:
Do not include compliance checklist, STR drafting, compliance scoring, service lead routing, or draft
export unlock workflows in the clean MyYado domain model.

Reason:
Those concepts belong to a prior compliance-product surface and do not support the Japanese-stay
marketplace MVP.

Status:
drop

## 2026-04-12 - Treat Investment As Positioning Context, Not MVP Workflow

Decision:
Keep investment language out of core use cases and entities unless a later phase explicitly adds an
investment workflow.

Reason:
Investment is part of the broader platform thesis, but the MVP product model is a marketplace for
curated stays. Adding investment execution now would blur the transaction model and create regulatory
and operational complexity.

Status:
defer

## 2026-04-12 - Use Sharetribe Listing As The Source Of Truth

Decision:
Map MyYado supply to the native Sharetribe Listing entity, using built-in listing attributes plus
configured `publicData` and `privateData` fields.

Reason:
The historical repo modeled listings in custom seed data and a file-backed API. Sharetribe already
owns listing identity, location, price, media, availability, provider relationship, and search/query
behavior, so duplicating that layer would create unnecessary synchronization risk.

Status:
adopt

## 2026-04-12 - Rename Home Type To Stay Type In Configuration

Decision:
Represent ryokan, minshuku, machiya, and villa as a `stayType` listing `publicData` enum.

Reason:
`Stay Type` is the canonical product vocabulary from Phase 2, and an indexed public enum maps cleanly
to Sharetribe listing fields and search filters.

Status:
adapt

## 2026-04-12 - Represent Collections As Listing Tags For MVP

Decision:
Represent editorial collections with an indexed `collectionTags` listing `publicData` multi-enum and
link Landing/CMS content to filtered search results.

Reason:
The old repo treated collections as first-class records with ordered listing ids. Sharetribe does not
need a separate custom collection entity for the MVP discovery loop, and filtered search links are
enough to preserve the traveler-facing intent.

Status:
adapt

## 2026-04-12 - Use Default Booking For The MVP Stay Transaction Candidate

Decision:
Use Sharetribe `default-booking/release-1` with unit type `night` as the primary candidate for stay
transactions, pending Phase 4 confirmation of inquiry vs booking request vs instant booking.

Reason:
The historical booking flow captured dates, traveler count, price, payment, and reservation state.
Those map most naturally to the native booking process. Phase 4 still needs to lock the precise
transaction behavior before UI work.

Status:
adopt

## 2026-04-12 - Do Not Change Transaction Processes In Phase 3

Decision:
Keep Phase 3 to documentation and mapping only. Do not edit transaction process definitions or create
custom processes without explicit approval.

Reason:
Transaction process changes require matching backend process configuration in Sharetribe and can
break checkout, inbox, and transaction state handling if made casually.

Status:
defer

## 2026-04-12 - Drop The Old Custom Product API Layer

Decision:
Do not port the old Express listing, collection, booking, host application, auth/session, health, or
file-backed persistence routes into MyYado.

Reason:
Sharetribe Marketplace API, hosted assets, native auth, listings, transactions, and reviews cover the
core marketplace model. Rebuilding the old API would couple MyYado to the historical implementation
and duplicate platform responsibilities.

Status:
drop

## 2026-04-12 - Drop Custom Stripe Checkout And Webhook Handling

Decision:
Use Sharetribe's native payment and Stripe Connect flow instead of the historical custom Stripe
Checkout session and webhook code.

Reason:
The Sharetribe template already routes checkout and provider payout readiness through native
transaction/payment surfaces. Custom Stripe code should only be introduced later for a clearly
unsupported payment requirement.

Status:
drop

## 2026-04-12 - Defer Full Provider Application Workflow

Decision:
For MVP mapping, treat provider intake as provider signup plus listing draft/submission, with manual
review or admin operations outside the app. Defer a bespoke pending/approved/rejected application
workflow.

Reason:
The historical host application was a separate custom entity and endpoint. Sharetribe can support
provider onboarding and listing drafts natively, while a full application review workflow would
require extra backend or admin process design.

Status:
defer

## 2026-04-12 - Prefer Hosted Configuration For Product Fields

Decision:
Define listing fields, search filters, user/profile fields, content, and branding in Sharetribe
hosted configuration where supported, using local config as a fallback or development aid.

Reason:
The Web Template fetches hosted assets on page load and validates merged configuration. Keeping
product fields in hosted config where possible makes marketplace administration safer and avoids
hard-coding product taxonomy in the app unnecessarily.

Status:
adopt

## 2026-04-12 - Defer Persistent User Type Modeling

Decision:
Do not require a persistent `Traveler` or `Provider` user type field in the MVP mapping. Use native
transaction roles and provider/listing actions first; add explicit user type configuration only if
later onboarding requires it.

Reason:
The Sharetribe template can distinguish transaction customer/provider roles without a custom user
type. The local user type comments also note hosted configuration limitations, so forcing user types
now would add complexity before the need is proven.

Status:
defer

## 2026-04-12 - Use Request-To-Book As The MVP Transaction Mode

Decision:
Use request-to-book as the primary MyYado stay transaction mode. Traveler payment is preauthorized
before Provider acceptance, and a Reservation exists only after the Provider accepts.

Reason:
MyYado's curated supply model benefits from Provider review before confirmation. Sharetribe
`default-booking/release-1` already supports the needed path through payment, preauthorization,
acceptance, decline, expiration, completion, and review states.

Status:
adopt

## 2026-04-12 - Defer Instant Booking

Decision:
Do not support instant booking in the MVP transaction model.

Reason:
Instant booking would require stronger availability confidence, Provider readiness, and cancellation
operations. The product can launch with clearer expectations by requiring Provider acceptance.

Status:
defer

## 2026-04-12 - Keep Inquiry Inside The Booking Process For MVP

Decision:
Use the `transition/inquire` path in `default-booking/release-1` for pre-booking questions, then let
the same Transaction advance through `transition/request-payment-after-inquiry` if the Traveler wants
to book.

Reason:
This preserves a low-commitment Inquiry path without introducing a separate non-bookable listing type
or custom inquiry backend. The native booking process already contains a convertible inquiry state.

Status:
adopt

## 2026-04-12 - Use Nightly Stay As The Single MVP Listing Type

Decision:
Define one MVP listing type, `nightly-stay`, backed by `default-booking/release-1` and unit type
`night`.

Reason:
The old product model focused on stays with check-in/check-out dates and nightly pricing. A single
listing type keeps search, listing creation, checkout, and transaction behavior clear before adding
other supply formats.

Status:
adopt

## 2026-04-12 - Expose Only Search Filters With Concrete Data Fields

Decision:
Expose MVP search filters only for native listing data or indexed listing `publicData`: location,
dates, price, `stayType`, `maxTravelers`, and `collectionTags`.

Reason:
The search UI must not imply behavior that Sharetribe cannot query. Bedrooms, beds, bathrooms,
amenities, bathing, dining, transfer availability, and languages remain listing detail fields until
they are intentionally indexed.

Status:
adopt

## 2026-04-12 - Model Traveler Count With Listing Capacity And Transaction Field

Decision:
Use listing `publicData.maxTravelers` for capacity search and a required transaction field
`travelersCount` for the actual Booking Request party size.

Reason:
Capacity is a Listing attribute, while the selected party size belongs to the specific Transaction.
Keeping both avoids mixing searchable supply constraints with per-request traveler data.

Status:
adapt

## 2026-04-12 - Use Native Single-Currency Price Search

Decision:
Use Sharetribe's built-in listing `price` and native `price` search filter. Do not add custom
multi-currency pricing fields in the MVP.

Reason:
Sharetribe marketplace environments operate with a configured marketplace currency. A custom
multi-currency layer would complicate search, checkout, payouts, and traveler expectations.

Status:
adopt

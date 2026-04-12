# Domain Model

Phase: 2 - Normalize Product Model

Purpose:
- Define MyYado independently of any prior implementation.
- Establish one canonical vocabulary for the marketplace.
- Define high-level entities, fields, and relationships before Sharetribe mapping.
- Flag legacy concepts that should not enter the product model by accident.

## Product Definition

MyYado is a curated marketplace for authentic Japanese inns and other intimate traditional stays.

The marketplace connects travelers looking for place-rooted accommodation with providers who operate
or steward stays that fit the platform's quality and hospitality thesis. The MVP is focused on
discovery, trust-building, listing detail, provider intake, and a clear path into booking or inquiry.

MyYado is not a generic vacation rental marketplace, compliance product, legal-service funnel, or
investment platform in the MVP product model.

## Canonical Vocabulary

| Canonical term | Meaning | Avoid as canonical |
| --- | --- | --- |
| Traveler | Demand-side user looking for a stay | guest, customer, visitor |
| Provider | Supply-side user responsible for a listed stay | host, operator, owner |
| Listing | Marketplace record for a bookable or requestable stay | property, home, stay record |
| Stay Type | Listing category such as ryokan or minshuku | home type, property type |
| Collection | Curated group of listings | category, campaign, playlist |
| Transaction | Commercial or pre-commercial interaction between traveler and provider around a listing | order, checkout, case |
| Booking Request | Traveler-initiated request for specific dates, guests, and listing | reservation request |
| Reservation | Confirmed stay after the transaction is accepted or completed | booking when status is unclear |
| Inquiry | Non-binding traveler-provider question or availability request | lead, support ticket |
| Provider Application | Provider's request to join or submit supply for review | host application |
| Review | Traveler feedback tied to a completed reservation | testimonial |
| Platform Admin | Internal user who curates supply, reviews applications, and resolves issues | operator, staff |

Term rules:
- Use `Provider` for the supply-side actor in product specs and configuration.
- Use `Traveler` for the demand-side actor in product specs and UI copy.
- Use `Listing` for the marketplace object being discovered and transacted on.
- Use `Stay Type` for ryokan, minshuku, machiya, villa, or future accommodation categories.
- Use `Transaction` as the umbrella object until Phase 4 locks inquiry vs booking behavior.

## Core Entities

### Traveler

Definition:
The person searching for, requesting, booking, and managing a stay.

High-level fields:
- identity: display name, account id
- contact: email, phone
- preferences: trip style, languages, accessibility notes, dietary notes, arrival needs
- saved discovery: saved listings, saved collections
- transaction history: booking requests, inquiries, reservations
- payment context: payment method state, billing contact, receipts

Relationships:
- Traveler can create many Transactions.
- Traveler can save many Listings and Collections.
- Traveler can leave Reviews for completed Reservations.

### Provider

Definition:
The person or business responsible for operating, managing, or stewarding one or more listings.

High-level fields:
- identity: display name, legal or business name
- contact: email, phone, preferred language
- profile: short description, hospitality background, languages supported
- status: applicant, active, paused, rejected, suspended
- trust context: verification state, response expectations, platform notes
- payout context: payout readiness and payment account state

Relationships:
- Provider can submit one or more Provider Applications.
- Provider can manage one or more Listings.
- Provider participates in Transactions tied to their Listings.

### Provider Application

Definition:
The supply-side intake object used before a provider or listing is approved for the marketplace.

High-level fields:
- applicant contact: name, email, phone
- proposed listing: name, location, Stay Type, capacity, short description
- hospitality context: what makes the stay distinctive, services offered, readiness notes
- media intake: photos or photo placeholders
- status: draft, submitted, under review, approved, rejected
- review notes: internal comments, requested follow-up, decision reason

Relationships:
- Provider Application can become a Provider profile.
- Provider Application can become a Listing draft.
- Platform Admin reviews Provider Applications.

### Listing

Definition:
The marketplace record travelers discover, evaluate, and transact around.

High-level fields:
- identity: title, slug, short descriptor
- provider: Provider reference
- taxonomy: Stay Type, collection tags
- location: country, region, city, area, public approximate location, private arrival location
- capacity: max travelers, bedrooms, beds, bathrooms
- hospitality details: bathing, dining, transfers, local guidance, house rules
- amenities: structured amenity list
- content: about, what makes it special, traveler expectations, accessibility notes
- media: hero image, gallery images, captions
- commerce: nightly price, currency, fees, taxes, cancellation policy
- operations: availability, minimum nights, listing status
- trust: reviews, platform curation notes, verification state

Relationships:
- Listing belongs to one Provider.
- Listing can appear in many Collections.
- Listing can have many Transactions.
- Listing can have many Reviews after completed Reservations.

### Collection

Definition:
A curated discovery surface that groups listings by theme, region, experience, or editorial intent.

High-level fields:
- title, slug, intro
- theme or editorial angle
- ordered listing references
- visibility status
- hero image or representative listing

Relationships:
- Collection contains many Listings.
- Listing can appear in many Collections.
- Platform Admin curates Collections.

### Transaction

Definition:
The umbrella object connecting a Traveler, Provider, and Listing around a specific stay intent.

High-level fields:
- participants: Traveler, Provider
- listing: Listing reference
- request details: check-in, checkout, travelers count, traveler note
- transaction mode: inquiry, booking request, instant booking
- transaction status: draft, requested, accepted, declined, canceled, confirmed, completed
- pricing: nightly price, fees, taxes, total, currency
- payment state: not required, pending, authorized, paid, refunded, failed
- operational state: arrival details sent, stay in progress, completed
- message context: traveler-provider notes and platform support notes

Relationships:
- Transaction belongs to one Traveler.
- Transaction belongs to one Listing.
- Transaction indirectly belongs to one Provider through the Listing.
- Transaction can produce one Reservation if confirmed.
- Transaction can produce one Review after completion.

### Reservation

Definition:
A confirmed stay resulting from an accepted or completed Transaction.

High-level fields:
- confirmation id
- listing, provider, traveler
- dates and traveler count
- confirmed price and currency
- arrival instructions state
- cancellation state
- completion state

Relationships:
- Reservation is derived from one Transaction.
- Reservation can lead to a Review.

### Review

Definition:
Traveler feedback about a completed Reservation.

High-level fields:
- rating
- written feedback
- author display name
- stay date or review date
- moderation status

Relationships:
- Review belongs to one Traveler.
- Review belongs to one Listing.
- Review should be tied to one completed Reservation.

### Platform Admin

Definition:
Internal role responsible for curation, marketplace quality, operational review, and issue handling.

High-level responsibilities:
- review Provider Applications
- approve, pause, or reject Listings
- curate Collections
- resolve support issues
- monitor marketplace quality and trust

Relationships:
- Platform Admin can review Provider Applications.
- Platform Admin can curate Collections.
- Platform Admin can moderate Listings and Reviews.

## Supporting Concepts

### Stay Type

Canonical values for the initial model:
- Ryokan
- Minshuku
- Machiya
- Villa

Future values should be added only when they are needed for marketplace supply or search behavior.

### Listing Status

Suggested high-level values:
- draft
- submitted
- in review
- listed
- paused
- rejected

### Provider Status

Suggested high-level values:
- applicant
- active
- paused
- rejected
- suspended

### Transaction Mode

Suggested high-level values:
- inquiry
- booking request
- instant booking

Phase 4 will choose which transaction mode is the MVP default.

### Transaction Status

Suggested high-level values:
- draft
- requested
- accepted
- declined
- canceled
- confirmed
- completed

Phase 4 will define the exact state transitions.

## Relationships Summary

Provider -> Provider Application:
- A Provider may start as an applicant through one or more applications.

Provider -> Listing:
- A Provider can manage many Listings.
- Each Listing has one responsible Provider.

Traveler -> Transaction:
- A Traveler can create many Transactions.
- Each Transaction has one Traveler.

Listing -> Transaction:
- A Listing can have many Transactions.
- Each Transaction references one Listing.

Transaction -> Reservation:
- A Transaction may become one Reservation once confirmed.

Reservation -> Review:
- A completed Reservation may produce one Traveler Review.

Collection -> Listing:
- A Collection contains many Listings.
- A Listing can belong to many Collections.

Platform Admin -> Provider Application / Listing / Collection:
- Platform Admin reviews supply and curates discovery surfaces.

## Legacy Or Excluded Concepts

The following concepts are explicitly outside the clean MyYado product model unless reintroduced by
a later decision:

| Concept | Status | Reason |
| --- | --- | --- |
| STR drafting assistant | legacy | Not part of a marketplace for Japanese stays |
| FINTRAC/KYC checklist | legacy | Compliance-product workflow, not lodging marketplace behavior |
| Compliance scoring or readiness gates | legacy | Does not map to traveler/provider marketplace decisions |
| CAMLO as a Service lead routing | legacy | Legal/compliance service funnel, not current product model |
| Levine Law service lead capture | legacy | Separate business-development path |
| Draft export unlock | legacy | Payment mechanism tied to prior STR product |
| STR-specific funnel analytics | legacy | Event names and milestones do not match MyYado marketplace journeys |
| Investment transaction workflow | excluded from MVP | Investment is positioning context, not a current user workflow |
| Full hospitality operations system | excluded from MVP | Provider tools should remain limited to marketplace readiness and transactions |
| Generic travel OTA inventory expansion | excluded from MVP | MyYado stays narrow around curated, place-rooted supply |

## Model Boundaries

Core MVP model:
- Traveler discovery and listing evaluation
- Provider application and curated supply intake
- Listing content, taxonomy, search, and collection discovery
- Transaction path for inquiry or booking request
- Basic reservation confirmation and account context

Deferred model:
- Exact transaction process and state machine
- Search index schema and filter configuration
- Payment capture model
- Messaging depth
- Provider payout operations
- Review moderation workflow
- Admin tooling depth

Out of model:
- Compliance/legal product workflows
- STR draft generation
- Managed-service sales funnels
- Securities or investment execution workflows

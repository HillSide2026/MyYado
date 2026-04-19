# Use Cases

Phase: 2 - Normalize Product Model

Purpose:

- Define the core MyYado journeys in product terms.
- Map each use case to canonical entities from the domain model.
- Keep provider, traveler, and admin flows separate enough to map cleanly later.
- Avoid legacy compliance, legal-service, and old product workflow language.

## Actors

Traveler: The demand-side user searching for, evaluating, requesting, booking, and managing a stay.

Provider: The supply-side user responsible for operating, managing, or stewarding one or more
listings.

Platform Admin: The internal user responsible for curation, supply review, trust, and marketplace
operations.

## Entity Reference

Canonical entities used in these use cases:

- Traveler
- Provider
- Provider Application
- Listing
- Stay Type
- Collection
- Transaction
- Booking Request
- Inquiry
- Reservation
- Review
- Platform Admin

## Traveler Flows

### TRV-01 - Discover Curated Supply

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Listing
- Collection

Trigger:

- Traveler arrives at MyYado looking for an authentic Japanese stay.

Flow:

1. Traveler lands on the marketplace entry point.
2. Traveler sees curated positioning, featured listings, and collections.
3. Traveler chooses to explore listings or open a collection.

Outcome:

- Traveler reaches a discovery surface with relevant listings.

Notes:

- This flow prioritizes curated discovery over generic inventory browsing.

### TRV-02 - Search And Filter Listings

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Listing
- Stay Type

Trigger:

- Traveler wants to narrow available listings by basic trip criteria.

Flow:

1. Traveler enters location, dates, traveler count, price preference, or Stay Type.
2. MyYado returns matching listings.
3. Traveler can adjust filters or open a listing.

Outcome:

- Traveler sees a manageable set of listings matching concrete criteria.

Notes:

- Date and traveler count are search intent inputs even if availability logic is simplified at
  first.
- Every search filter must later map to a concrete listing or transaction field.

### TRV-03 - Browse A Collection

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Collection
- Listing

Trigger:

- Traveler wants guided discovery by theme, region, or experience.

Flow:

1. Traveler opens a Collection.
2. MyYado presents the collection thesis and included Listings.
3. Traveler opens a Listing from the Collection.

Outcome:

- Traveler evaluates supply through editorial context rather than a broad search list.

Notes:

- Collections are a core discovery primitive, not just marketing content.

### TRV-04 - Evaluate A Listing

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Listing
- Provider
- Review
- Transaction

Trigger:

- Traveler opens a listing from search, a collection, or a featured surface.

Flow:

1. Traveler reviews title, location, Stay Type, images, price, capacity, and amenities.
2. Traveler reads the description, special context, traveler expectations, and trust signals.
3. Traveler checks reviews or platform curation notes.
4. Traveler enters trip details and starts an Inquiry or Booking Request.

Outcome:

- Traveler has enough context to decide whether to proceed.

Notes:

- Listing detail should reduce uncertainty before a transaction begins.

### TRV-05 - Start A Booking Request

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Listing
- Provider
- Transaction
- Booking Request

Trigger:

- Traveler selects a Listing and provides desired dates and traveler count.

Flow:

1. Traveler confirms check-in, checkout, traveler count, and listing.
2. MyYado calculates an estimated total.
3. Traveler adds required contact or account details.
4. MyYado creates a Transaction in booking request mode.

Outcome:

- A Booking Request exists and can be accepted, declined, or completed according to the transaction
  model.

Notes:

- Phase 4 will determine whether provider acceptance is required before payment or confirmation.

### TRV-06 - Make An Inquiry

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Listing
- Provider
- Transaction
- Inquiry

Trigger:

- Traveler needs clarification before requesting a stay.

Flow:

1. Traveler opens a Listing.
2. Traveler submits a question or availability note.
3. Provider receives the Inquiry.
4. Provider responds or invites the Traveler to continue into a Booking Request.

Outcome:

- Traveler gets a lower-commitment path when booking confidence is not yet high.

Notes:

- Inquiry depth should stay modest in the MVP unless Phase 4 chooses inquiry-first transactions.

### TRV-07 - Complete Payment Or Confirmation

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Transaction
- Reservation

Trigger:

- A Booking Request is ready to become a confirmed Reservation.

Flow:

1. Traveler reviews final dates, travelers, price, fees, taxes, and cancellation terms.
2. Traveler completes the required payment or confirmation step.
3. MyYado updates the Transaction status.
4. MyYado creates or confirms the Reservation.

Outcome:

- Traveler receives a confirmed Reservation or a clear failure/next-step state.

Notes:

- Payment timing and authorization behavior are locked in Phase 4.

### TRV-08 - Receive Arrival Details

Status: core

Primary actor:

- Traveler

Entities:

- Traveler
- Provider
- Listing
- Transaction
- Reservation

Trigger:

- Reservation is confirmed.

Flow:

1. MyYado confirms the Reservation.
2. Provider or MyYado shares arrival coordination details.
3. Traveler can reference stay summary, dates, contact path, and listing context.

Outcome:

- Traveler has enough information to arrive confidently.

Notes:

- Precise arrival location may be private until Reservation confirmation.

### TRV-09 - Manage Trips

Status: nice-to-have

Primary actor:

- Traveler

Entities:

- Traveler
- Transaction
- Reservation
- Listing

Trigger:

- Traveler returns after creating an Inquiry, Booking Request, or Reservation.

Flow:

1. Traveler signs in or opens account context.
2. Traveler views upcoming, pending, completed, or canceled stay records.
3. Traveler opens a stay record for details or support.

Outcome:

- Traveler can orient around past and upcoming marketplace activity.

Notes:

- This can start as a lightweight account surface before deeper messaging or notifications.

### TRV-10 - Manage Traveler Profile

Status: nice-to-have

Primary actor:

- Traveler

Entities:

- Traveler

Trigger:

- Traveler wants to store contact details or trip preferences.

Flow:

1. Traveler opens profile settings.
2. Traveler updates contact details, travel notes, or preferences.
3. MyYado uses the profile to prefill future transaction steps.

Outcome:

- Traveler reduces repeat data entry and improves provider context.

Notes:

- Sensitive preference fields should remain minimal until there is a clear operational use.

### TRV-11 - Leave A Review

Status: nice-to-have

Primary actor:

- Traveler

Entities:

- Traveler
- Reservation
- Listing
- Review

Trigger:

- Reservation is completed.

Flow:

1. Traveler receives a review prompt.
2. Traveler submits rating and written feedback.
3. MyYado moderates or publishes the Review.

Outcome:

- Listing gains authentic trust signal tied to a completed stay.

Notes:

- Review authenticity depends on connecting reviews to completed Reservations.

## Provider Flows

### PRV-01 - Apply To Join MyYado

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Provider Application
- Listing
- Platform Admin

Trigger:

- Provider wants to submit supply or an operating relationship for review.

Flow:

1. Provider enters contact details.
2. Provider enters proposed listing basics.
3. Provider adds hospitality context and media.
4. Provider submits the Provider Application.
5. Platform Admin reviews the application.

Outcome:

- Provider Application is submitted for review.

Notes:

- Supply should not auto-publish in the MVP.

### PRV-02 - Create Or Complete A Listing Draft

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Listing
- Stay Type

Trigger:

- Provider is approved or invited to complete a listing.

Flow:

1. Provider enters title, Stay Type, location, capacity, amenities, description, pricing, and media.
2. Provider saves a draft.
3. Provider returns to continue editing if needed.

Outcome:

- Listing exists as a draft with enough data for review.

Notes:

- Listing fields should support search, evaluation, and transaction setup.

### PRV-03 - Submit Listing For Review

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Listing
- Platform Admin

Trigger:

- Provider believes a Listing is ready to go live.

Flow:

1. Provider reviews the Listing draft.
2. Provider submits it for review.
3. Platform Admin evaluates quality, fit, completeness, and trust context.
4. Platform Admin approves, requests changes, or rejects.

Outcome:

- Listing becomes listed, remains in review, or returns to Provider for edits.

Notes:

- Curation is part of the supply model.

### PRV-04 - Manage Listing Content

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Listing

Trigger:

- Provider needs to update public listing information.

Flow:

1. Provider opens a managed Listing.
2. Provider edits description, amenities, media, house expectations, or operational notes.
3. MyYado saves changes and applies review rules if needed.

Outcome:

- Listing content remains accurate and trustworthy.

Notes:

- Some edits may require admin review before publication.

### PRV-05 - Manage Pricing And Availability

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Listing
- Transaction

Trigger:

- Provider needs to set rates or availability windows.

Flow:

1. Provider opens Listing operations.
2. Provider updates nightly price, minimum nights, availability, or blocked dates.
3. MyYado uses those values in search, listing detail, and transaction pricing.

Outcome:

- Travelers see accurate pricing and availability context.

Notes:

- Exact availability and pricing mechanics are locked in Phase 4 and Phase 5.

### PRV-06 - Respond To Inquiry

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Traveler
- Listing
- Transaction
- Inquiry

Trigger:

- Traveler submits an Inquiry.

Flow:

1. Provider receives the Inquiry.
2. Provider reviews the Listing, requested details, and Traveler note.
3. Provider responds or recommends a Booking Request path.

Outcome:

- Traveler receives a response and can decide whether to proceed.

Notes:

- The MVP can keep Inquiry responses lightweight.

### PRV-07 - Respond To Booking Request

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Traveler
- Listing
- Transaction
- Booking Request
- Reservation

Trigger:

- Traveler submits a Booking Request that requires provider action.

Flow:

1. Provider receives the Booking Request.
2. Provider reviews dates, traveler count, price, and any notes.
3. Provider accepts, declines, or asks for clarification.
4. If accepted, MyYado advances the Transaction toward Reservation.

Outcome:

- Booking Request becomes accepted, declined, or pending clarification.

Notes:

- Phase 4 determines whether this flow is mandatory or only used for request-to-book listings.

### PRV-08 - Coordinate Confirmed Reservation

Status: core

Primary actor:

- Provider

Entities:

- Provider
- Traveler
- Listing
- Reservation

Trigger:

- Reservation is confirmed.

Flow:

1. Provider receives Reservation details.
2. Provider confirms arrival expectations or instructions.
3. Traveler receives support-ready stay details.

Outcome:

- Provider and Traveler have operational alignment before arrival.

Notes:

- Arrival coordination can begin as email-based or support-mediated.

### PRV-09 - View Provider Dashboard

Status: nice-to-have

Primary actor:

- Provider

Entities:

- Provider
- Listing
- Transaction
- Reservation

Trigger:

- Provider wants an operational snapshot.

Flow:

1. Provider opens dashboard.
2. Provider sees listings, upcoming reservations, pending requests, availability, and earnings
   summary.
3. Provider opens the next item requiring action.

Outcome:

- Provider can prioritize operations without needing full hospitality operations software.

Notes:

- Dashboard should stay focused on marketplace actions.

## Platform Admin Flows

### ADM-01 - Review Provider Application

Status: core

Primary actor:

- Platform Admin

Entities:

- Platform Admin
- Provider Application
- Provider
- Listing

Trigger:

- Provider submits an application.

Flow:

1. Platform Admin reviews provider contact, proposed supply, photos, and fit.
2. Platform Admin approves, rejects, or requests more information.
3. Approved application creates or enables a Provider and Listing draft.

Outcome:

- Supply intake moves into an explicit review outcome.

Notes:

- This protects marketplace quality before open publishing exists.

### ADM-02 - Review Listing Before Publication

Status: core

Primary actor:

- Platform Admin

Entities:

- Platform Admin
- Provider
- Listing

Trigger:

- Provider submits a Listing for review.

Flow:

1. Platform Admin checks Listing completeness, category fit, pricing, media, and trust context.
2. Platform Admin approves, requests edits, pauses, or rejects.
3. MyYado updates Listing status.

Outcome:

- Only reviewed Listings become visible to Travelers.

Notes:

- Listing review is part of curation, not a back-office afterthought.

### ADM-03 - Curate Collections

Status: core

Primary actor:

- Platform Admin

Entities:

- Platform Admin
- Collection
- Listing

Trigger:

- Platform needs a curated discovery surface.

Flow:

1. Platform Admin defines a Collection theme.
2. Platform Admin selects ordered Listings.
3. Platform Admin publishes the Collection.

Outcome:

- Travelers can discover supply through a coherent editorial path.

Notes:

- Collections are especially useful while inventory is small.

### ADM-04 - Resolve Marketplace Support Issue

Status: nice-to-have

Primary actor:

- Platform Admin

Entities:

- Platform Admin
- Traveler
- Provider
- Listing
- Transaction
- Reservation

Trigger:

- Traveler or Provider needs help with a Transaction or Reservation.

Flow:

1. Platform Admin receives support context.
2. Platform Admin reviews relevant entities.
3. Platform Admin coordinates a response or resolution.

Outcome:

- Marketplace issue reaches a clear operational outcome.

Notes:

- Support tooling can stay lightweight until transaction volume justifies deeper workflows.

### ADM-05 - Moderate Reviews

Status: nice-to-have

Primary actor:

- Platform Admin

Entities:

- Platform Admin
- Traveler
- Listing
- Reservation
- Review

Trigger:

- Traveler submits a Review or a Provider flags one.

Flow:

1. Platform Admin verifies the Review is tied to a completed Reservation.
2. Platform Admin approves, rejects, or requests correction.
3. Published Review appears on the Listing.

Outcome:

- Reviews remain trustworthy and connected to real marketplace activity.

Notes:

- Review moderation is deferred until Reviews become active product behavior.

## Use Case Coverage By Entity

Traveler:

- TRV-01 through TRV-11
- PRV-06 through PRV-08 as counterparty context
- ADM-04 and ADM-05 as support/moderation context

Provider:

- PRV-01 through PRV-09
- TRV-04 through TRV-08 as counterparty context
- ADM-01, ADM-02, and ADM-04

Provider Application:

- PRV-01
- ADM-01

Listing:

- TRV-01 through TRV-06
- TRV-08, TRV-09, TRV-11
- PRV-01 through PRV-09
- ADM-01 through ADM-05

Stay Type:

- TRV-02
- PRV-02

Collection:

- TRV-01, TRV-03
- ADM-03

Transaction:

- TRV-04 through TRV-09
- PRV-05 through PRV-09
- ADM-04

Booking Request:

- TRV-05
- PRV-07

Inquiry:

- TRV-06
- PRV-06

Reservation:

- TRV-07 through TRV-11
- PRV-07 through PRV-09
- ADM-04, ADM-05

Review:

- TRV-04, TRV-11
- ADM-05

Platform Admin:

- ADM-01 through ADM-05

## Legacy Concepts Excluded From Use Cases

The following are not MyYado use cases:

- Compliance checklist completion
- STR drafting or narrative generation
- Compliance scoring
- Legal-service lead routing
- Draft export payment unlock
- Compliance funnel analytics
- Investment execution or securities workflow

These can only re-enter the product through an explicit future decision.

## Phase 6 Route Coverage

These route surfaces make the normalized use cases reachable through the Sharetribe app without
recreating the old `/app` router.

Traveler routes:

| Use case                                  | Route surface                                                               | Notes                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| TRV-01 - Discover Curated Supply          | `/`, `/explore`, `/collections/:collectionSlug`                             | Landing content remains hosted/CMS-driven; collection routes redirect to filtered search |
| TRV-02 - Search And Filter Listings       | `/s`, `/explore`                                                            | Uses configured location, dates, price, Stay Type, capacity, and collection filters      |
| TRV-03 - Browse A Collection              | `/collections/:collectionSlug`                                              | Redirects to `/s?pub_collections=has_any:{collectionSlug}`                               |
| TRV-04 - Evaluate A Listing               | `/l/:slug/:id`, `/l/:id`                                                    | Native ListingPage with configured fields                                                |
| TRV-05 - Start A Booking Request          | `/l/:slug/:id`, `/l/:slug/:id/checkout`                                     | ListingPage starts checkout; CheckoutPage creates the transaction                        |
| TRV-06 - Make An Inquiry                  | `/l/:slug/:id`                                                              | Uses the native booking-process inquiry path where exposed by ListingPage                |
| TRV-07 - Complete Payment Or Confirmation | `/l/:slug/:id/checkout`, `/order/:id`                                       | CheckoutPage plus OrderDetailsPage                                                       |
| TRV-08 - Receive Arrival Details          | `/order/:id`, `/inbox/orders`, `/trips`                                     | Trip context lives on native order/inbox surfaces                                        |
| TRV-09 - Manage Trips                     | `/trips`, `/inbox/orders`, `/order/:id`                                     | `/trips` redirects to traveler orders                                                    |
| TRV-10 - Manage Traveler Profile          | `/profile-settings`, `/account/contact-details`, `/account/payment-methods` | Native account/profile pages                                                             |
| TRV-11 - Leave A Review                   | `/order/:id`                                                                | Native transaction review transitions after completion                                   |

Provider routes:

| Use case                                    | Route surface                                                   | Notes                                                                            |
| ------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| PRV-01 - Apply To Join MyYado               | `/providers`, `/l/new`                                          | MVP intake starts with signup and listing draft creation                         |
| PRV-02 - Create Or Complete A Listing Draft | `/l/new`, `/l/:slug/:id/:type/:tab`                             | Native EditListingPage with MyYado listing fields                                |
| PRV-03 - Submit Listing For Review          | `/l/:slug/:id/:type/:tab`                                       | Uses native publish/submission behavior; deeper review workflow remains deferred |
| PRV-04 - Manage Listing Content             | `/listings`, `/providers/listings`, `/l/:slug/:id/:type/:tab`   | Native ManageListings and EditListingPage                                        |
| PRV-05 - Manage Pricing And Availability    | `/l/:slug/:id/:type/pricing`, `/l/:slug/:id/:type/availability` | Native pricing and availability tabs                                             |
| PRV-06 - Respond To Inquiry                 | `/inbox/sales`, `/sale/:id`                                     | Native provider inbox and SaleDetailsPage                                        |
| PRV-07 - Respond To Booking Request         | `/inbox/sales`, `/sale/:id`                                     | Provider accepts or declines preauthorized requests                              |
| PRV-08 - Coordinate Confirmed Reservation   | `/sale/:id`, `/inbox/sales`                                     | Native transaction messages and sale details                                     |
| PRV-09 - View Provider Dashboard            | `/providers/listings`, `/listings`, `/inbox/sales`              | Starts with native listings and provider inbox                                   |

Platform Admin routes:

| Use case                                   | Route surface                                               | Notes                                                                 |
| ------------------------------------------ | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| ADM-01 - Review Provider Application       | Sharetribe Console/manual operations                        | Full application workflow remains deferred                            |
| ADM-02 - Review Listing Before Publication | Sharetribe Console/manual operations                        | Native app exposes provider draft/edit surfaces only                  |
| ADM-03 - Curate Collections                | Hosted CMS/config plus listing `collections`                | Admin curation happens through hosted content/config and listing tags |
| ADM-04 - Resolve Marketplace Support Issue | Sharetribe Console plus `/order/:id` or `/sale/:id` context | In-app support tooling remains deferred                               |
| ADM-05 - Moderate Reviews                  | Sharetribe Console/manual operations                        | Review moderation workflow remains deferred                           |

# Transaction And Search Model

Phase: 4 - Transaction & Search Definition

Purpose:
- Lock the MyYado MVP transaction mode before UI work.
- Define the end-to-end inquiry and booking request behavior in Sharetribe terms.
- Define the initial search filters and map each one to a concrete data source.
- Identify required listing and transaction schema for Phase 5 configuration.

Scope:
- This document is the source of truth for Phase 5 config work.
- No custom transaction process is introduced in Phase 4.
- No custom backend is introduced for bookings, inquiries, or search.
- If a field is not listed as an exposed filter here, it should not appear as a SearchPage filter
  later without updating this document and the search schema decision first.

## Transaction Decision

MVP transaction mode:
Use request-to-book as the primary commercial path.

Sharetribe target:
- Listing type: `nightly-stay`
- Transaction process: `default-booking/release-1`
- Unit type: `night`
- Availability model: whole-listing nightly availability
- Provider acceptance: required before a Reservation is confirmed
- Instant booking: deferred
- Separate `default-inquiry` listing type: deferred

Product rule:
A Transaction becomes a Reservation only when the Provider accepts the Booking Request. A payment
preauthorization or inquiry alone is not a Reservation.

## Transaction Flow Diagram

Primary request-to-book path:

```text
Traveler searches
  -> Traveler opens Listing
  -> Traveler selects check-in, checkout, traveler count, and optional note
  -> Traveler starts checkout
  -> Sharetribe transition/request-payment
  -> pending-payment
  -> Traveler confirms payment if required by Stripe
  -> Sharetribe transition/confirm-payment
  -> preauthorized
  -> Provider accepts
  -> Sharetribe transition/accept
  -> accepted
  -> Reservation confirmed
  -> Provider shares arrival coordination
  -> Sharetribe transition/complete after stay
  -> delivered
  -> review period
```

Inquiry-first path:

```text
Traveler opens Listing
  -> Traveler sends question or availability note
  -> Sharetribe transition/inquire
  -> inquiry
  -> Provider replies through transaction messaging
  -> Traveler decides to request the stay
  -> Sharetribe transition/request-payment-after-inquiry
  -> pending-payment
  -> confirm-payment
  -> preauthorized
  -> Provider accepts or declines
```

Failure and alternate outcomes:

```text
pending-payment
  -> transition/expire-payment
  -> payment-expired
  -> no Reservation

preauthorized
  -> transition/decline or transition/operator-decline
  -> declined
  -> no Reservation

preauthorized
  -> transition/expire
  -> expired
  -> no Reservation

accepted
  -> transition/cancel
  -> canceled
  -> Reservation canceled
```

## Transaction States

| Product state | Sharetribe state | Entry transition | Meaning | Who acts next |
| --- | --- | --- | --- | --- |
| Draft trip details | none | none | Traveler is entering dates, traveler count, and notes before creating a Transaction | Traveler |
| Inquiry | `inquiry` | `transition/inquire` | Traveler has asked a non-binding question about a Listing | Provider |
| Pending payment | `pending-payment` | `transition/request-payment` or `transition/request-payment-after-inquiry` | Payment intent exists and the Traveler must finish payment confirmation | Traveler |
| Booking Request | `preauthorized` | `transition/confirm-payment` | Payment is preauthorized and Provider must accept or decline | Provider |
| Declined | `declined` | `transition/decline` or `transition/operator-decline` | Provider or operator rejected the request | none |
| Expired | `expired` | `transition/expire` | Provider did not act before the request expired | none |
| Payment expired | `payment-expired` | `transition/expire-payment` | Traveler did not complete payment confirmation in time | none |
| Reservation confirmed | `accepted` | `transition/accept` or `transition/operator-accept` | Provider accepted the Booking Request; the stay is confirmed | Provider and Traveler |
| Reservation canceled | `canceled` | `transition/cancel` | Confirmed reservation was canceled | Platform/Admin or support process |
| Stay completed | `delivered` | `transition/complete` or `transition/operator-complete` | Stay is complete and review period can begin | Traveler and Provider |
| Reviewed | `reviewed`, `reviewed-by-customer`, `reviewed-by-provider` | review transitions or review expiration transitions | One or both sides reviewed, or review period ended | none |

## Actor Actions

Traveler actions:
- Search and filter listings.
- Open a Listing.
- Send an Inquiry before committing to payment.
- Select check-in, checkout, traveler count, and optional traveler note.
- Start a Booking Request through checkout.
- Confirm payment/3DS when Stripe requires it.
- Read confirmation, messages, and arrival coordination after provider acceptance.
- Leave a Review after completion when reviews are enabled.

Provider actions:
- Create and maintain the Listing, price, and availability.
- Reply to Inquiries.
- Review Booking Requests in `preauthorized` state.
- Accept or decline Booking Requests.
- Share arrival details after acceptance.
- Coordinate stay completion and leave a Review when reviews are enabled.

Platform/Admin/system actions:
- Operator may accept, decline, complete, or cancel only when support or marketplace operations
  require it.
- Sharetribe/Marketplace API expires payment and unanswered requests according to the configured
  transaction process.
- Platform Admin review of Provider Applications and listing publication remains outside the
  transaction process for MVP.

## Search Filters And Data Source

| Filter | Exposed in MVP | Query shape | Data source | Search schema/index | Config target | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Location | yes | `address`, `bounds`, and map query params | Sharetribe listing location/geolocation | Native location search | `src/config/configSearch.js` `mainSearch.searchType = location` | Public location can be approximate; precise arrival details remain private until confirmation |
| Dates | yes | `dates=start,end`, converted to API `start`, `end`, `availability`, `minDuration` | Sharetribe listing availability and existing bookings | Native availability search | `dateRangeFilter` with `dateRangeMode = night` | Required for bookable search; current local config uses `day` and must become `night` |
| Price | yes | `price=min,max` | Sharetribe built-in listing `price` | Native price search | `priceFilter` | One marketplace currency only; no custom multi-currency field |
| Stay Type | yes | `pub_stayType=value` or comma-separated values | `listing.attributes.publicData.stayType` | Public data search schema: `enum` | `listingFields` field `stayType` | Primary taxonomy filter |
| Travelers / Capacity | yes | `pub_maxTravelers=min,maxExclusive` | `listing.attributes.publicData.maxTravelers` | Public data search schema: `long` | `listingFields` field `maxTravelers` | A selected traveler count maps to a minimum capacity range, for example `4,21` when the configured maximum is 20 |
| Collection | yes | `pub_collectionTags=has_any:quiet-kyoto` | `listing.attributes.publicData.collectionTags` | Public data search schema: `multi-enum` | `listingFields` field `collectionTags` | Used by curated links and can also appear as a secondary filter |
| Sort | yes | `sort=createdAt`, `-createdAt`, `-price`, `price` | Built-in listing attributes | Native sort | `sortConfig` | Relevance sort only matters if keyword search is later enabled |
| Listing Type | hidden | optional `pub_listingType=nightly-stay` | Sharetribe listing type public data set by EditListingWizard | Public data search schema: `enum` only if enforcement is enabled | `listingTypes`, optional `enforceValidListingType` | Not a traveler-facing filter while there is only one MVP listing type |

Filters not exposed in MVP search:

| Field or intent | Data source | Reason |
| --- | --- | --- |
| Bedrooms | `publicData.bedrooms` | Listing detail only until there is enough supply to justify filtering |
| Beds | `publicData.beds` | Listing detail only |
| Bathrooms | `publicData.bathrooms` | Listing detail only |
| Amenities | `publicData.amenities` | Listing detail only in MVP; can become a secondary multi-enum filter later |
| Bathing style | `publicData.bathing` | Listing detail only |
| Dining | `publicData.dining` | Listing detail only |
| Transfer availability | `publicData.transferAvailable` | Listing detail only |
| Languages | `publicData.languages` or provider profile field | Listing/provider detail only |
| Keywords | built-in keyword search | Deferred; location search is the primary mode |
| Provider status | provider profile/admin state | Not traveler-facing search |
| Provider application status | custom/admin workflow | Not traveler-facing search |
| Private arrival details | `privateData.privateArrivalInstructions` | Never searchable |

## Required Listing Schema

Listing type:

| Key | Value |
| --- | --- |
| `listingType` | `nightly-stay` |
| Label | `Stay` |
| Transaction process | `default-booking` |
| Transaction alias | `default-booking/release-1` |
| Unit type | `night` |
| Availability type | `oneSeat` |
| Default location field | enabled |
| Default price field | enabled |
| Payout details | enabled |

Required public listing fields:

| Field | Scope | Schema type | Required | Indexed | Filter | Purpose |
| --- | --- | --- | --- | --- | --- | --- |
| `stayType` | `public` | `enum` | yes | yes | yes, primary | Ryokan, minshuku, machiya, villa |
| `maxTravelers` | `public` | `long` | yes | yes | yes, primary or secondary | Capacity filtering and booking validation |
| `collectionTags` | `public` | `multi-enum` | no | yes | yes, secondary | Curated discovery links and collection browsing |
| `bedrooms` | `public` | `long` | yes | no | no | Listing detail |
| `beds` | `public` | `long` | yes | no | no | Listing detail |
| `bathrooms` | `public` | `long` | yes | no | no | Listing detail |
| `amenities` | `public` | `multi-enum` | yes | no | no | Listing detail and trust-building |
| `bathing` | `public` | `multi-enum` | no | no | no | Listing detail |
| `dining` | `public` | `multi-enum` | no | no | no | Listing detail |
| `transferAvailable` | `public` | `boolean` | no | no | no | Listing detail |
| `languages` | `public` | `multi-enum` | no | no | no | Listing/provider detail |

Required private listing fields:

| Field | Scope | Schema type | Required | Indexed | Purpose |
| --- | --- | --- | --- | --- | --- |
| `privateArrivalInstructions` | `private` | `text` | no at draft; required operationally before first accepted stay | no | Precise arrival notes shared after confirmation |
| `providerInternalNotes` | `private` | `text` | no | no | Provider/platform notes that should not be public |
| `applicationNotes` | `private` | `text` | no | no | MVP provider intake/review notes if needed |

Built-in listing fields:

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | yes | Public listing name |
| `description` | yes | Main story, special context, expectations, and hospitality notes |
| `geolocation` / location | yes | Location search, map, public area display |
| `price` | yes | Nightly price |
| `images` | yes | Gallery and listing card media |
| `availability` | yes before booking | Native booking availability |

## Required Transaction Fields

Transaction fields on `nightly-stay`:

| Field | Show to | Schema type | Required | Purpose |
| --- | --- | --- | --- | --- |
| `travelersCount` | `customer` | `long` | yes | Number of travelers in the Booking Request |
| `arrivalNeeds` | `customer` | `text` | no | Accessibility, timing, dietary, or coordination note |

Traveler note:
- Use the template's existing checkout message field for the general note to Provider.
- Do not add a duplicate `travelerNote` transaction field unless the checkout message field is
  removed or no longer fits the booking path.

Validation rules:
- `travelersCount` minimum is `1`.
- `travelersCount` maximum should match the listing field maximum used for `maxTravelers`.
- UI should prevent creating a Booking Request when `travelersCount` exceeds the Listing
  `maxTravelers`.
- Payment amount comes from built-in listing price and booking dates, not a custom transaction field.

## End-To-End Booking Definition

1. Provider publishes a `nightly-stay` Listing with required public fields, price, location, images,
   and availability.
2. Traveler searches with location and optional filters.
3. Search returns published Listings whose native availability, price, and indexed public fields
   match the query.
4. Traveler opens a Listing and enters check-in, checkout, traveler count, and optional notes.
5. Traveler starts checkout and Sharetribe creates a booking Transaction through
   `transition/request-payment`.
6. Traveler completes payment confirmation. The Transaction enters `preauthorized`.
7. Provider accepts or declines the Booking Request.
8. If accepted, the Transaction enters `accepted` and MyYado treats it as a confirmed Reservation.
9. If declined, expired, or payment-expired, MyYado treats it as no Reservation.
10. After the stay, the Transaction completes and review behavior can run through native review
    transitions.

## End-To-End Inquiry Definition

1. Traveler opens a Listing and chooses the lower-commitment Inquiry path.
2. Traveler submits a question or availability note.
3. Sharetribe creates an inquiry on the booking process through `transition/inquire`.
4. Provider receives and responds through transaction messaging.
5. If the Traveler wants to book, the same Transaction can advance through
   `transition/request-payment-after-inquiry`.
6. After that point, the Transaction follows the same pending-payment, preauthorized, accepted,
   declined, and expired states as the primary booking path.
7. If the Traveler never proceeds, the Inquiry remains non-binding and no Reservation exists.

## Search Schema Required Before UI Work

Before Phase 6 exposes the search UI, these search schemas must exist in the Sharetribe environment
or hosted/local config must not expose the corresponding filter:

| Key | Scope | Schema type | Required before UI exposure |
| --- | --- | --- | --- |
| `stayType` | `publicData` | `enum` | yes |
| `maxTravelers` | `publicData` | `long` | yes |
| `collectionTags` | `publicData` | `multi-enum` | yes |
| `listingType` | `publicData` | `enum` | only if `enforceValidListingType` or `/s/:listingType` filtering is used |

Fields deliberately not indexed for MVP:
- `bedrooms`
- `beds`
- `bathrooms`
- `amenities`
- `bathing`
- `dining`
- `transferAvailable`
- `languages`
- any `privateData`
- any Traveler profile field
- any Provider Application status

## Non-Goals

- No instant booking in MVP.
- No separate custom booking API.
- No custom Stripe checkout or webhook layer.
- No custom collection entity for search.
- No multi-currency marketplace behavior.
- No traveler-facing Provider Application status search.
- No search filter without a concrete field and search schema.

# Validation Scenarios

Phase: 8 - Validation & Testing

Purpose:

- Define acceptance scenarios for the MyYado product model.
- Make manual validation possible before Playwright coverage exists.
- Keep every scenario tied to the Phase 4 transaction/search model and Phase 5 schema.

Status:

- Scenario definition: complete.
- Automated execution: not started.
- Manual execution in this workspace: blocked until dependencies and environment variables are
  available.

Execution prerequisites:

- Sharetribe environment has `default-booking/release-1`.
- Hosted or development-merged listing config includes `nightly-stay` and MyYado listing fields.
- Search schemas exist for `publicData.stayType`, `publicData.maxTravelers`, and
  `publicData.collections`.
- At least one Provider account has payout details ready.
- At least one Traveler account has a valid test payment method.
- At least one published Listing has location, price, images, availability, `stayType`,
  `maxTravelers`, `collections`, bedrooms, beds, bathrooms, and amenities.

## Scenario Matrix

| ID     | Flow                                    | Actor              | Route surface                                      | Priority     | Status         |
| ------ | --------------------------------------- | ------------------ | -------------------------------------------------- | ------------ | -------------- |
| VAL-01 | Search by core filters                  | Traveler           | `/explore`, `/s`                                   | core         | manual pending |
| VAL-02 | Browse collection                       | Traveler           | `/collections/:collectionSlug`                     | core         | manual pending |
| VAL-03 | View listing detail                     | Traveler           | `/l/:slug/:id`                                     | core         | manual pending |
| VAL-04 | Request booking                         | Traveler           | `/l/:slug/:id/checkout`                            | core         | manual pending |
| VAL-05 | Provider accepts booking request        | Provider           | `/sale/:id`                                        | core         | manual pending |
| VAL-06 | Provider declines booking request       | Provider           | `/sale/:id`                                        | core         | manual pending |
| VAL-07 | Inquiry before booking                  | Traveler, Provider | `/l/:slug/:id`, `/inbox/*`                         | core         | manual pending |
| VAL-08 | Provider creates listing draft          | Provider           | `/providers`, `/l/new`                             | core         | manual pending |
| VAL-09 | Provider edits pricing and availability | Provider           | `/l/:slug/:id/:type/pricing`, `/availability`      | core         | manual pending |
| VAL-10 | Traveler manages trips                  | Traveler           | `/trips`, `/inbox/orders`, `/order/:id`            | nice-to-have | manual pending |
| VAL-11 | Provider manages listing and requests   | Provider           | `/providers/listings`, `/listings`, `/inbox/sales` | nice-to-have | manual pending |
| VAL-12 | Review after completed stay             | Traveler, Provider | `/order/:id`, `/sale/:id`                          | nice-to-have | manual pending |

## VAL-01 - Search By Core Filters

Use cases:

- TRV-01
- TRV-02

Steps:

1. Open `/explore`.
2. Confirm the app lands on the SearchPage.
3. Search by location.
4. Apply `Stay type`.
5. Apply `Travelers`.
6. Apply `Collections`.
7. Apply date range.
8. Apply price range.

Expected:

- Results query uses native location, dates, price, and indexed public data filters.
- `pub_market` and `pub_collections` appear only when their filters are active.
- No unindexed detail fields appear as filters.
- Empty result state is clear if no listings match.

## VAL-02 - Browse Collection

Use cases:

- TRV-01
- TRV-03
- ADM-03

Steps:

1. Open `/collections/temple-town-stays`.
2. Confirm redirect/search state points to `/s?pub_collections=has_any:temple-town-stays`.
3. Open `/collections/mountain-onsen-retreats`.
4. Confirm redirect/search state points to `/s?pub_collections=has_any:mountain-onsen-retreats`.
5. Open a listing from the results.

Expected:

- Collection route does not render a dead page.
- Filtered search uses `publicData.collections`.
- Listing cards and detail pages remain native Sharetribe surfaces.

## VAL-03 - View Listing Detail

Use cases:

- TRV-04

Steps:

1. Open a published Listing.
2. Confirm title, images, location, price, availability context, provider block, and reviews render.
3. Confirm MyYado fields render: `Stay type`, `Sleeps`, bedrooms, beds, bathrooms, amenities,
   bathing, dining, transfer availability, and languages when set.
4. Confirm private fields do not render publicly.

Expected:

- Listing detail gives the Traveler enough context to decide whether to inquire or request booking.
- Private arrival instructions, provider internal notes, and application notes are not visible.

## VAL-04 - Request Booking

Use cases:

- TRV-05
- TRV-07

Steps:

1. Open a published `nightly-stay` Listing.
2. Select check-in and checkout dates.
3. Enter traveler count.
4. Add optional arrival needs.
5. Add optional checkout message to Provider.
6. Confirm payment.

Expected:

- Checkout uses `default-booking/release-1`.
- Transaction field `travelersCount` is required.
- Payment enters `pending-payment`, then `preauthorized` after confirmation.
- Product state is Booking Request, not Reservation, until Provider acceptance.

## VAL-05 - Provider Accepts Booking Request

Use cases:

- PRV-07
- TRV-07
- TRV-08

Steps:

1. Log in as Provider.
2. Open `/inbox/sales`.
3. Open the pending SaleDetailsPage.
4. Accept the request.
5. Log in as Traveler and open `/order/:id`.

Expected:

- Provider sees the request in `preauthorized`.
- Accepting transitions to `accepted`.
- Traveler sees the request accepted.
- MyYado treats `accepted` as the confirmed Reservation state.
- Arrival coordination can continue through messages and private/provider operations.

## VAL-06 - Provider Declines Booking Request

Use cases:

- PRV-07
- TRV-07

Steps:

1. Create a Booking Request.
2. Log in as Provider.
3. Open SaleDetailsPage.
4. Decline the request.
5. Log in as Traveler and open OrderDetailsPage.

Expected:

- Transaction transitions to `declined`.
- No Reservation is created.
- Traveler sees a clear declined state.
- Payment is not captured according to the default booking process.

## VAL-07 - Inquiry Before Booking

Use cases:

- TRV-06
- PRV-06

Steps:

1. Open a Listing.
2. Send an Inquiry.
3. Log in as Provider.
4. Open the inquiry from `/inbox/sales`.
5. Reply to Traveler.
6. Traveler proceeds to request booking from the same Transaction if supported by the UI.

Expected:

- Inquiry state is non-binding.
- No payment or Reservation exists during Inquiry.
- If Traveler proceeds, the same process advances through `request-payment-after-inquiry`.
- If Traveler does not proceed, Inquiry remains non-binding.

## VAL-08 - Provider Creates Listing Draft

Use cases:

- PRV-01
- PRV-02

Steps:

1. Open `/providers`.
2. Confirm route lands on listing creation flow after authentication.
3. Create a draft Listing.
4. Fill required MyYado fields.
5. Save draft.

Expected:

- Listing type is `nightly-stay`.
- Required fields include `stayType`, `maxTravelers`, bedrooms, beds, bathrooms, and amenities.
- Optional private fields are available for arrival/internal/application notes.
- Listing can remain draft until ready.

## VAL-09 - Provider Edits Pricing And Availability

Use cases:

- PRV-05

Steps:

1. Open an existing Listing from `/listings`.
2. Open pricing tab.
3. Set nightly price.
4. Open availability tab.
5. Set nightly availability.

Expected:

- Price uses the marketplace currency.
- Availability supports whole-listing nightly booking.
- Search date filter reflects availability after publishing.

## VAL-10 - Traveler Manages Trips

Use cases:

- TRV-09

Steps:

1. Open `/trips`.
2. Confirm route lands on `/inbox/orders`.
3. Open an order.

Expected:

- Traveler can find pending, accepted, declined, canceled, and completed stay Transactions.
- Labels use Traveler/Provider vocabulary where visible.

## VAL-11 - Provider Manages Listing And Requests

Use cases:

- PRV-04
- PRV-09

Steps:

1. Open `/providers/listings`.
2. Confirm route lands on `/listings`.
3. Open a Listing edit flow.
4. Open `/inbox/sales`.

Expected:

- Provider can reach managed listings and provider inbox from product-shaped routes.
- There are no dead provider dashboard placeholders.

## VAL-12 - Review After Completed Stay

Use cases:

- TRV-11
- ADM-05

Steps:

1. Complete an accepted booking through the default booking process.
2. Open OrderDetailsPage as Traveler.
3. Leave a Review.
4. Open SaleDetailsPage as Provider.
5. Leave the Provider-side Review if prompted.

Expected:

- Review transitions match `default-booking/release-1`.
- Reviews are tied to completed Transactions.
- Listing detail shows reviews only after valid review transitions.

## Transaction State Assertions

| Sharetribe state       | Product label         | Reservation exists |
| ---------------------- | --------------------- | ------------------ |
| `inquiry`              | Inquiry               | no                 |
| `pending-payment`      | Pending payment       | no                 |
| `payment-expired`      | Payment expired       | no                 |
| `preauthorized`        | Booking Request       | no                 |
| `declined`             | Declined              | no                 |
| `expired`              | Expired               | no                 |
| `accepted`             | Reservation confirmed | yes                |
| `canceled`             | Reservation canceled  | canceled           |
| `delivered`            | Stay completed        | yes                |
| `reviewed-by-customer` | Reviewed by Traveler  | yes                |
| `reviewed-by-provider` | Reviewed by Provider  | yes                |
| `reviewed`             | Reviewed              | yes                |

No UI should describe `pending-payment`, `preauthorized`, `declined`, `expired`, or
`payment-expired` as a confirmed Reservation.

## Automation Candidates

First Playwright candidates:

- VAL-01: route `/explore` redirects to `/s` and exposes configured filters.
- VAL-02: `/collections/temple-town-stays` and `/collections/mountain-onsen-retreats` redirect to
  collection-filtered search.
- VAL-08: `/providers` reaches the authenticated listing creation flow.
- VAL-10: `/trips` reaches the authenticated orders inbox.

Backend/API-level candidates:

- Search query construction includes `pub_market` and `pub_collections` only for configured filters.
- Transaction status labels match the state assertion table.

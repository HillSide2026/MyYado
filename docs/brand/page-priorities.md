# Page Priorities

## Discovery Model

- Default results are curated, not exhaustive.
- Collections are editorial and manually defined.
- Filters exist but are secondary.

Implementation baseline:
- Homepage directs Travelers into markets and collections.
- Collection routes redirect to indexed `collectionTags` search.
- Search still exposes location, dates, price, Stay Type, Travelers, and Collections.
- Search results must not imply that MyYado has exhaustive market coverage.

## Page-Level Branding Decisions

| Page | Role | Brand decisions | Sharetribe constraint |
| --- | --- | --- | --- |
| Homepage | Establish positioning and guide discovery | Hero, launch market entry points, collections, featured stays, trust explanation | Hosted CMS should own final content; local fallback may provide MyYado baseline |
| Search / Discovery | Help Travelers narrow curated supply | Entry via market or collection; curated results first; filters secondary | Keep native SearchPage and search schema |
| Listing Page | Convert interest into informed action | Clean gallery, Provider story prominent, trust signals near top, booking clarity preserved | Use native ListingPage, custom listing fields, reviews, and order panel |
| Booking Flow | Preserve confidence at the highest-risk step | Keep price, dates, party size, payment, and request-to-book state clear | Keep native checkout and `default-booking/release-1` |
| Provider Start | Explain curation and quality bar | Communicate review criteria, quality expectations, and marketplace difference | MVP route starts native listing creation; richer host page is backlog |
| Provider Dashboard | Let Providers manage supply and requests | Keep status labels clear; avoid decorative custom dashboard before need is proven | Keep native listing management and sales inbox |
| Traveler Trips | Let Travelers manage requests and Reservations | Clear state language: Inquiry, Booking Request, Reservation | Keep native orders inbox and order details |

## Homepage Structure

1. Hero: positioning
2. Market entry points: Nikko and Kamakura
3. Collections
4. Featured stays
5. Trust explanation

## Search / Discovery

Entry paths:
- market
- collection

Rules:
- Curated results come first.
- Filters support refinement.
- Empty states should preserve trust and suggest adjacent curated paths.

## Listing Page

Rules:
- Gallery stays clean and useful.
- Provider identity and story should be prominent.
- Trust signals should appear near the top.
- Booking clarity must not be sacrificed for atmosphere.

## Provider Page

Rules:
- Explain the curation model.
- Communicate the quality bar.
- Differentiate from high-volume listing platforms.
- Keep the path to creating a Listing obvious.

## Supply Constraint

- Minimum viable listings per launch market: 10 to 20.
- Consistent quality is required across the launch set.
- Delay launch rather than dilute.

Launch criteria:
- Each launch market has enough reviewed supply to support discovery.
- Each visible Listing has clear fields, strong images, Provider identity, price, and availability.
- Each market maps to at least one editorial collection.

# Phase 13 - Content And Market Seeding

Status: partially executable in repo, blocked on real Sharetribe supply entry.

Purpose:

- Turn Phase 11 schema into launchable inventory.
- Give operators a concrete seed slate before real listings are entered in Sharetribe.
- Prevent empty market and collection paths during launch review.

## What Exists In This Repo

- Seed slate: `docs/product/phase-13-seed-inventory.json`
- Sourced supply ledger: `docs/product/phase-13-sourced-supply.json`
- First target shortlist: `docs/product/phase-13-first-target-shortlist.md`
- Validator: `yarn validate-seed-inventory`
- Strict validator for publish readiness: `yarn validate-seed-inventory --strict`
- Sourced supply validator: `yarn validate-sourced-supply`
- Acquisition triage export: `yarn export-sourced-supply-triage`

The seed slate contains 40 content-draft listing briefs:

| Market   | Count | Collection coverage                            |
| -------- | ----: | ---------------------------------------------- |
| Nikko    |    10 | `temple-town-stays`, `mountain-onsen-retreats` |
| Kamakura |    10 | `coastal-culture`                              |
| Hakone   |    10 | `onsen-retreats`                               |
| Chiba    |    10 | `quiet-arrival`, `hidden-coast`                |

These are not real published listings. They are structured content briefs that must be replaced or
verified against actual providers, addresses, images, prices, and availability before launch.

The sourced supply ledger is different from seed content:

| Term                       | Meaning                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| Seed                       | Inventory-shaped content that does not yet match an actual verified property                |
| Sourced supply             | A real property has been identified but is not yet registered with MyYado or Sharetribe     |
| Pending verification       | A property name is known, but official site/contact details have not been confirmed cleanly |
| Manual sourcing cluster    | A real supply pattern to source manually, not a single identified property                  |
| Inactive benchmark         | A verified property is brand-relevant but is not currently active supply                    |
| Removed from active supply | A property should not be pursued for onboarding                                             |

## Acquisition Strategy

Phase 13 now has two acquisition motions:

| Motion               | When to use                                                                                   | Next action                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| OTA direct outreach  | The property already appears on Booking.com, Agoda, or another major booking platform         | Record the OTA URL, find direct operator contact, and ask the property to join MyYado as a real provider |
| Concierge-first      | The property is real but weakly digitized, not clearly OTA-listed, or hard for guests to book | Manually arrange a real traveler stay as MyYado concierge, then convert the relationship into a listing  |
| Verification-first   | The property name exists but contact, active status, or booking path is unclear               | Confirm official site/contact before deciding between OTA outreach and concierge-first                   |
| Do not pursue / hold | The property is closed, inactive, only a benchmark, or outside the trust bar                  | Keep for reference but do not put it into traveler-facing flows                                          |

Rules:

- Use OTAs as discovery and availability signals, not as a source for copied photos, rates, or copy.
- A concierge-first stay must be explained clearly to the Traveler: MyYado is helping arrange the
  stay, not pretending the Provider has already joined the marketplace.
- Do not publish a Sharetribe listing until the Provider has agreed to be represented and the real
  listing contract fields are verified.
- After a successful concierge booking, the conversion ask is concrete: verified copy, approved
  images, availability rules, price rules, and Provider onboarding.

Run `yarn export-sourced-supply-triage` to generate `docs/product/phase-13-acquisition-triage.csv`.
That worksheet is intentionally fact-light: it does not guess Booking.com or Agoda presence. Fill in
OTA URLs, official site URLs, direct contact, acquisition path, and next outreach action as each
property is checked.

The sourced-supply ledger may include an operator-supplied `otaPresence` probability:

| `otaPresence`                    | Meaning                                                                                         | Default motion       |
| -------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------- |
| `high-probability-booking-agoda` | Likely visible on Booking.com, Agoda, or both; verify by capturing the real URL before outreach | OTA direct outreach  |
| `mixed-partial-ota`              | May be Booking-only, Rakuten/Jalan-only, or limited inventory                                   | Check channels first |
| `low-ota-direct-first`           | Likely direct-only or hard to book through major OTAs                                           | Concierge-first      |

This is not verified OTA evidence. It is a prioritization layer that tells the operator what to
check first.

## Sharetribe Entry Contract

Every published launch listing must have:

| Field                          | Required value shape                        |
| ------------------------------ | ------------------------------------------- |
| `title`                        | Verified listing title                      |
| `description`                  | Real stay copy, no generic filler           |
| `geolocation`                  | Verified listing location                   |
| `price`                        | Real nightly price                          |
| `images`                       | Reviewed listing images                     |
| `availability`                 | Current nightly availability                |
| `publicData.market`            | `nikko`, `kamakura`, `hakone`, or `chiba`   |
| `publicData.collections`       | Array with 1 to 2 collection slugs          |
| `publicData.curationStatus`    | `approved` or `featured`                    |
| `publicData.stayType`          | `ryokan`, `minshuku`, `machiya`, or `villa` |
| `publicData.maxTravelers`      | Integer, 1 or greater                       |
| `publicData.bedrooms`          | Integer                                     |
| `publicData.beds`              | Integer                                     |
| `publicData.bathrooms`         | Integer                                     |
| `publicData.amenities`         | Non-empty array                             |
| `publicData.bathing`           | Non-empty array                             |
| `publicData.dining`            | Non-empty array                             |
| `publicData.transferAvailable` | Boolean                                     |
| `publicData.languages`         | Non-empty array                             |

Listings without `publicData.curationStatus` set to `approved` or `featured` will not appear in
default search.

## Market Copy

### Nikko

Nikko is for travelers who want nature and heritage to set the pace. Stays should feel calm,
walkable, and connected to older routes, forest paths, and slower mornings.

Primary collections: `temple-town-stays`, `mountain-onsen-retreats`

Quality bar:

- Strong reason to stay overnight, not just pass through.
- Clear access information for travelers without a car.
- Images should communicate quiet, materials, and nearby context.
- `temple-town-stays` is for JR Nikko, Toshogu, Takumi-cho, and shrine/town access.
- `mountain-onsen-retreats` is for Lake Chuzenji, Yumoto Onsen, Oku-Nikko, Kirifuri Highlands, and
  Kawaji Onsen.

### Kamakura

Kamakura is the accessible coastal entry point: culture, sea air, neighborhood texture, and stays
that feel close to daily life.

Primary collection: `coastal-culture`

Quality bar:

- Walkable or transit-friendly relationship to coast, temples, or local streets.
- Not a generic city apartment without Kamakura context.
- Copy should make the stay feel easy, local, and unhurried.

### Hakone

Hakone is for retreat, onsen, and premium calm. Supply should build trust through bathing details,
meal clarity, transport context, and comfort expectations.

Primary collection: `onsen-retreats`

Quality bar:

- Bathing setup must be clear: private, shared, onsen, or outdoor bath.
- Dinner/breakfast availability must be explicit.
- Transfer and transport notes matter more than broad sightseeing copy.

### Chiba

Chiba has two launch roles: a softer first or last night near Narita, and hidden-coast discovery
around quieter shoreline stays.

Primary collections: `quiet-arrival`, `hidden-coast`

Quality bar:

- Quiet Arrival listings must reduce arrival/departure friction.
- Hidden Coast listings must justify the extra effort through setting, host context, or coastline.
- Do not let Chiba become a catch-all for generic suburban supply.

## Operator Workflow

1. Source a real property.
2. Classify the acquisition path: OTA direct outreach, concierge-first, verification-first, or hold.
3. Match it to one seed brief or create a new brief using the same fields.
4. Verify provider identity, address, price, images, availability, cancellation expectations, and
   arrival requirements.
5. Enter the listing in Sharetribe as `nightly-stay`.
6. Assign `publicData.market` and `publicData.collections`.
7. Leave `publicData.curationStatus` unset until review is complete.
8. Review the listing page and search card.
9. Set `curationStatus` to `approved` or `featured`.
10. Confirm the listing appears in `/s`, the market route, and its collection route.

## Done Criteria

- At least 10 verified, published listings per market.
- Every launch listing has `approved` or `featured` curation status.
- Every launch listing belongs to at least one collection.
- No core route launches empty: `/nikko`, `/kamakura`, `/hakone`, `/chiba`, and each collection
  route must show credible supply.
- Strict seed validation passes after replacing content drafts with verified supply data.

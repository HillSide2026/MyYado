# Phase 14 - End-To-End Validation

Status: ready as a manual runbook, blocked on real Sharetribe environment and seeded listings.

Purpose:

- Test whether MyYado works for real Travelers and Providers.
- Find clarity, trust, friction, and broken-flow issues before launch.
- Keep validation grounded in Sharetribe-native behavior.

## Prerequisites

- `.env` exists and `yarn dev` starts the app.
- Hosted Sharetribe listing fields match `src/config/configListing.js`.
- Search schemas exist for `publicData.market`, `publicData.collections`, and
  `publicData.curationStatus`.
- At least 10 published listings per market have `curationStatus` set to `approved` or `featured`.
- At least one listing per market has live availability.
- One Traveler test account exists with a test payment method.
- One Provider test account exists with payout details ready.
- `yarn validate-seed-inventory --strict` passes or a separate verified launch inventory ledger
  exists.

## Latest Local Validation Attempt

Date: 2026-04-19

Result: blocked before full guest/host validation.

What passed:

- `yarn config-check`
- `yarn dev` started after running outside the sandbox and compiled the frontend at
  `http://localhost:3000`.
- `yarn dev-server` completed the web and server production builds.

What blocked validation:

- `yarn dev-server` crashed before serving SSR routes because `REACT_APP_SHARETRIBE_SDK_CLIENT_ID`
  and `SHARETRIBE_SDK_CLIENT_SECRET` are not set in `.env`.
- Direct curls to client routes in `yarn dev` mode returned 404 for `/nikko`,
  `/collections/mountain-onsen-retreats`, and `/providers`, so the server-backed route path is the
  correct validation target once credentials are present.
- No real Sharetribe test listings, Traveler test account, Provider test account, or admin approval
  pass was available in this run.

Current issues:

| ID      | Severity | Actor            | Route                                    | Issue                                                 | Evidence                                                                                              | Owner    | Status  |
| ------- | -------- | ---------------- | ---------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------- | ------- |
| E2E-001 | critical | Guest/Host/Admin | all SSR routes                           | Server-backed local app cannot start without SDK envs | `yarn dev-server` crash: missing `REACT_APP_SHARETRIBE_SDK_CLIENT_ID`, `SHARETRIBE_SDK_CLIENT_SECRET` | Operator | open    |
| E2E-002 | high     | Guest            | `/nikko`, `/collections/*`, `/providers` | Frontend-only dev server is not enough for route QA   | `yarn dev` served `/` but direct client route curls returned 404                                      | Operator | blocked |

## Validation Routes

| Surface                 | Route                                  |
| ----------------------- | -------------------------------------- |
| Homepage                | `/`                                    |
| Search                  | `/s`                                   |
| Nikko                   | `/nikko`                               |
| Kamakura                | `/kamakura`                            |
| Hakone                  | `/hakone`                              |
| Chiba                   | `/chiba`                               |
| Temple Town Stays       | `/collections/temple-town-stays`       |
| Mountain Onsen Retreats | `/collections/mountain-onsen-retreats` |
| Coastal Culture         | `/collections/coastal-culture`         |
| Onsen Retreats          | `/collections/onsen-retreats`          |
| Quiet Arrival           | `/collections/quiet-arrival`           |
| Hidden Coast            | `/collections/hidden-coast`            |
| Provider start          | `/providers`                           |
| Provider listings       | `/providers/listings`                  |
| Traveler trips          | `/trips`                               |

## Scenario 1 - Guest Browses And Requests

Steps:

1. Open `/`.
2. State what MyYado is after 5 seconds without scrolling.
3. Open each market route.
4. Open each collection route.
5. Apply market and collection filters from `/s`.
6. Open a listing card.
7. Check whether the listing page answers: where is it, who hosts it, what is included, how much it
   costs, how arrival works, and what happens next.
8. Select dates and traveler count.
9. Start checkout or inquiry.

Pass conditions:

- Homepage positioning is clear.
- Search results feel curated, not overwhelming.
- Market and collection routes do not feel empty or accidental.
- Listing cards show credible image, price, title, and curation signal.
- Listing page builds enough trust to continue.
- Checkout/inquiry does not introduce surprise terminology.

## Scenario 2 - Host Creates And Gets Approved

Steps:

1. Open `/providers`.
2. Sign up or log in as Provider.
3. Start a new listing.
4. Fill details, location, price, images, and availability.
5. Confirm provider-facing fields do not expose operator-only `curationStatus`.
6. Publish or submit the listing according to current Sharetribe permissions.
7. As operator/admin, review quality and set `publicData.curationStatus` to `approved` or
   `featured`.
8. Confirm the listing appears in default search, its market route, and its collection route.

Pass conditions:

- Provider can create a complete draft without seeing internal curation controls.
- The listing remains out of default search until approved or featured.
- After approval, the listing appears in the expected browse paths.
- Provider dashboard and listing management use native Sharetribe surfaces without dead ends.

## Scenario 3 - Trust Regression Pass

Run this on at least one listing from each market.

Questions:

- Does the card tell me why this is here?
- Does the listing page make location, price, capacity, bathing, dining, and arrival clear?
- Is any important information trapped in private/internal fields?
- Are there fake-looking claims, generic copy, or missing image context?
- Does `featured` feel earned, not decorative?
- Does booking language match the actual transaction state?

Fail if:

- A Traveler cannot tell what happens after payment/request.
- A Provider-only or operator-only field appears publicly.
- A collection route feels fake because supply is thin or off-theme.
- A listing is searchable without approval.

## Scenario 4 - Acquisition Path Validation

Run this before turning sourced supply into traveler-facing inventory.

Steps:

1. Pick one OTA direct outreach target and one concierge-first target.
2. For the OTA target, record the Booking.com, Agoda, or other OTA URL as a supply signal.
3. Find direct operator contact and confirm whether the operator is open to a MyYado listing.
4. For the concierge-first target, confirm there is a safe manual booking/contact path.
5. Explain the concierge role in traveler-facing language before any payment or confirmation.
6. After a successful concierge stay, ask the Provider to convert into a registered listing.

Pass conditions:

- OTA-listed properties are contacted directly before becoming MyYado listings.
- MyYado does not copy OTA photos, descriptions, rates, or policies into Sharetribe.
- Concierge-first stays are not presented as already-onboarded marketplace listings.
- Provider permission, availability, price, cancellation terms, and arrival instructions are
  confirmed before approval.
- A successful concierge booking produces a clear Provider onboarding follow-up.

## Issue Log Template

| ID      | Severity                 | Actor            | Route   | Issue                             | Evidence                                         | Owner | Status |
| ------- | ------------------------ | ---------------- | ------- | --------------------------------- | ------------------------------------------------ | ----- | ------ |
| E2E-001 | critical/high/medium/low | Guest/Host/Admin | `/path` | What broke or confused the tester | Screenshot, listing id, transaction id, or notes | Name  | open   |

Severity guide:

- Critical: blocks booking, inquiry, publishing, payment, login, or trust.
- High: creates serious confusion or makes a core route feel broken.
- Medium: damages clarity but has a workaround.
- Low: polish or copy issue that does not block confidence.

## Done Criteria

- No critical blockers.
- No unclear guest path from homepage to listing to booking/inquiry.
- No unclear host path from onboarding to listing creation to approval.
- No approved market or collection path is empty.
- Issues are logged with owner and next action.

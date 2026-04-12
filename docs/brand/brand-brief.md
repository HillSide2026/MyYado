# Brand Brief

## Positioning

MyYado is a curated marketplace for reviewed stays in Japan's quieter, culturally rich markets.

Primary line:
Not more stays. Better stays.

What this means:
- Supply is intentionally limited.
- Every visible Listing should feel reviewed, structured, and worth considering.
- Discovery starts with markets and editorial collections, not infinite inventory.
- Booking clarity matters as much as atmosphere.

## Brand Promise

Travelers can find a stay with enough context to choose confidently.

Providers can list with a quality bar that protects the marketplace and attracts thoughtful
Travelers.

## Curation Model

- Listings are reviewed before publication.
- Manual approval is required.
- Approval criteria:
  - image quality
  - description clarity
  - Provider responsiveness
- Enforcement:
  - listings must be approved before going live
  - visibility is shaped through curated collections

Sharetribe implementation baseline:
- Provider creates a `nightly-stay` Listing draft.
- Admin/manual review happens before publication or promotion.
- Collections are represented through `publicData.collectionTags`.
- Visibility is shaped by featured sections, collection entry points, and indexed search filters.

## Cultural Positioning

- Inspired by Japanese hospitality, including omotenashi, not themed UI.
- No literal Japanese motifs or cliches.
- Expressed through:
  - clarity
  - restraint
  - thoughtful interactions

Practical rule:
If a design choice depends on a decorative cultural symbol, do not use it. If it improves clarity,
care, pacing, or decision confidence, it is likely on-brand.

## Voice

The voice is:
- calm
- specific
- direct
- warm without being precious
- premium without sounding inaccessible

Use:
- "reviewed stays"
- "curated collections"
- "clear booking terms"
- "Provider"
- "Traveler"
- "Reservation" only after Provider acceptance

Avoid:
- hype
- faux-luxury language
- "hidden gem" overuse
- "authentic Japan" as a claim
- host/guest/operator drift when Provider/Traveler is the product vocabulary

## Anti-Patterns

MyYado should not feel like:

- a high-volume booking engine
- a luxury brand with inaccessible tone
- a generic Airbnb clone
- an editorial site with weak booking clarity

Reject any UI direction that:
- hides price, availability, cancellation, or Provider identity
- makes filters or booking actions harder to find
- turns calm into emptiness
- uses novelty where Sharetribe's native pattern is clearer
- adds visual decoration without improving trust, curation, or comprehension

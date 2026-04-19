# Collections Model

Collections are editorial and manual, not algorithmic.

They make curation visible and actionable without creating a separate custom collection backend in
the MVP.

## Initial Collections

| Collection              | Market   | Role                                 | `collections` value       |
| ----------------------- | -------- | ------------------------------------ | ------------------------- |
| Temple Town Stays       | Nikko    | Shrines, town access, heritage stays | `temple-town-stays`       |
| Mountain Onsen Retreats | Nikko    | Lake, forest, mountain onsen stays   | `mountain-onsen-retreats` |
| Coastal Culture         | Kamakura | Coast, access, local life            | `coastal-culture`         |
| Onsen Retreats          | Hakone   | Retreat, bathing, premium calm       | `onsen-retreats`          |
| Quiet Arrival           | Chiba    | Narita arrival/departure ease        | `quiet-arrival`           |
| Hidden Coast            | Chiba    | Ubara discovery, raw coastline       | `hidden-coast`            |

## Rules

- Each Listing belongs to 1 to 2 collections.
- Collections appear on the homepage.
- Collections appear as search entry points.
- Collections use `publicData.collections`.
- Collections should stay limited enough to feel intentional.
- A collection should not exist unless it can carry real supply quality.

## Market Coverage

| Market   | Collection coverage                        |
| -------- | ------------------------------------------ |
| Nikko    | Temple Town Stays, Mountain Onsen Retreats |
| Kamakura | Coastal Culture                            |
| Hakone   | Onsen Retreats                             |
| Chiba    | Quiet Arrival, Hidden Coast                |

## Enforcement

Collection slugs should be assigned during Listing review or content QA.

Do not use a collection tag as a loose marketing label. It should help Travelers understand why a
stay belongs in a curated path.

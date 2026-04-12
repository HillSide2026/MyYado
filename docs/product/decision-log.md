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

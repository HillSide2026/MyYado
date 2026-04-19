# Open Questions

Purpose:

- Track product questions that are intentionally deferred after the product-model baseline.
- Keep non-MVP work visible without blocking the Sharetribe-native MVP implementation.

Status:

- No open question below blocks the `product-model-v1` baseline.
- Each item should become a decision-log entry before implementation.

## Deferred Product Questions

| ID    | Question                                                                  | Current baseline                                                                                                         | When to answer                                                           |
| ----- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| OQ-01 | Should MyYado add a full Provider application workflow?                   | Deferred. MVP uses signup, listing draft/submission, and manual review/admin operations.                                 | Before building custom provider intake or approval UI                    |
| OQ-02 | Should MyYado support instant booking?                                    | Deferred. MVP uses request-to-book with Provider acceptance.                                                             | After supply availability quality and cancellation operations are proven |
| OQ-03 | Does MyYado need persistent user type fields?                             | Deferred. MVP uses native transaction roles and Provider listing actions.                                                | Before adding role-specific onboarding or permissions                    |
| OQ-04 | Should collections become first-class ordered editorial entities?         | Deferred. MVP uses `collections` and filtered search links.                                                              | Before building custom CMS collection pages or ordered merchandising     |
| OQ-05 | Which listing detail fields should become indexed filters next?           | Deferred. MVP indexes only `stayType`, `maxTravelers`, and `collections` beyond native search.                           | After observing Traveler search behavior                                 |
| OQ-06 | Should review moderation get in-app tooling?                              | Deferred. MVP assumes Sharetribe Console/manual operations.                                                              | Before giving platform admins a dedicated moderation surface             |
| OQ-07 | Should arrival details move into structured protected transaction fields? | Deferred. MVP uses native messaging plus private/provider operations.                                                    | Before automating arrival coordination or check-in workflows             |
| OQ-08 | How should hosted Sharetribe assets be promoted across environments?      | Deferred operational question. Local development merge validates the schema; hosted assets remain the production source. | Before staging/production rollout                                        |

## Validation Blockers

Manual validation of Phase 8 scenarios still needs:

- Installed dependencies for this workspace.
- Sharetribe environment variables and API access.
- Hosted or development-merged listing/search schema.
- Test Provider and Traveler accounts with payout/payment readiness.

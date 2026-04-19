# Phase 13 - First Target Shortlist

Status: working sales and concierge queue.

Purpose:

- Turn the 80-record sourced-supply ledger into an actionable first outreach pass.
- Keep first targets balanced across markets instead of over-indexing on whichever market has the
  most raw supply.
- Preserve the OTA-first strategy without guessing which properties are actually on Booking.com or
  Agoda.

## Tiers

| Tier                 | Meaning                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `tier-1-first-wave`  | First 15 targets to work before general sourcing or broader market cleanup     |
| `tier-2-second-wave` | Five useful runner-up targets to verify while first-wave outreach is in motion |

## First 15 Targets

| Rank | Source ID     | Property                | Market   | OTA probability                  | Suggested path        | First action                              |
| ---: | ------------- | ----------------------- | -------- | -------------------------------- | --------------------- | ----------------------------------------- |
|    1 | `KAM-SRC-001` | Kamakura Cocon          | Kamakura | `low-ota-direct-first`           | `concierge-first`     | Confirm safe direct booking/contact path  |
|    2 | `NIK-SRC-003` | STAY Nikko Guesthouse   | Nikko    | unknown                          | `needs-ota-check`     | Confirm OTA presence, then pitch operator |
|    3 | `HAK-SRC-007` | Ichinoyu Honkan         | Hakone   | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |
|    4 | `HAK-SRC-005` | Hakone Airu             | Hakone   | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |
|    5 | `CHI-SRC-001` | Narita Sando Guesthouse | Chiba    | unknown                          | `needs-ota-check`     | Confirm OTA presence, then contact direct |
|    6 | `HAK-SRC-006` | Senkyoro                | Hakone   | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |
|    7 | `NIK-SRC-019` | Hatago Nagomi           | Nikko    | `mixed-partial-ota`              | `needs-ota-check`     | Check OTAs, Rakuten, and Jalan            |
|    8 | `HAK-SRC-021` | Hakone Retreat Fore     | Hakone   | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |
|    9 | `KAM-SRC-008` | BIRD HOTEL Kamakura     | Kamakura | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |
|   10 | `NIK-SRC-011` | Nikko Tokanso           | Nikko    | `mixed-partial-ota`              | `needs-ota-check`     | Check OTAs, Rakuten, and Jalan            |
|   11 | `NIK-SRC-023` | Yumoto Itaya            | Nikko    | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |
|   12 | `CHI-SRC-002` | Wakamatsu Honten        | Chiba    | unknown                          | `needs-ota-check`     | Confirm OTA presence, then contact direct |
|   13 | `KAM-SRC-010` | Good Morning Zaimokuza  | Kamakura | unknown                          | `needs-ota-check`     | Confirm OTA presence, then contact direct |
|   14 | `HAK-SRC-017` | Gora Kansuiro           | Hakone   | `mixed-partial-ota`              | `needs-ota-check`     | Check OTAs, Rakuten, and Jalan            |
|   15 | `NIK-SRC-006` | Okunoin Hotel Tokugawa  | Nikko    | `high-probability-booking-agoda` | `ota-direct-outreach` | Capture OTA URL, then contact directly    |

## Second Wave

| Source ID     | Property                             | OTA probability                  | Suggested path        | Why it is next                                    |
| ------------- | ------------------------------------ | -------------------------------- | --------------------- | ------------------------------------------------- |
| `HAK-SRC-018` | Onsen Ryokan Yusakaso                | `mixed-partial-ota`              | `needs-ota-check`     | Family-run feel and accessible first-ryokan angle |
| `KAM-SRC-009` | THE HARBOR TERRACE                   | `high-probability-booking-agoda` | `ota-direct-outreach` | Premium coastal visual inventory                  |
| `NIK-SRC-022` | Nikko Station Hotel Classic          | unknown                          | `needs-ota-check`     | Highly usable JR Nikko arrival option             |
| `NIK-SRC-025` | Okunikko Yumoto Onsen Ryokan Kyokoku | `low-ota-direct-first`           | `concierge-first`     | Under-the-radar deep-nature onsen opportunity     |
| `CHI-SRC-003` | Meet Inn Narita                      | `high-probability-booking-agoda` | `ota-direct-outreach` | Utility-led Narita fallback supply                |

## Operating Rule

Do not treat `otaPresence` as verified evidence until the OTA/direct-contact check is done. For
unknown or mixed records, the first move is `needs-ota-check`: look for Booking.com and Agoda
presence, record the URL if present, then either contact the operator directly or use
concierge-first for properties with weak digital distribution but a safe manual booking path.

## OTA Probability Overlay

The sourced-supply ledger now carries an operator-supplied `otaPresence` field for properties that
have a known probability tier:

- `high-probability-booking-agoda`: capture the actual Booking.com or Agoda URL, then contact the
  operator directly.
- `mixed-partial-ota`: check Booking.com, Agoda, Rakuten, and Jalan before deciding between direct
  outreach and concierge-first.
- `low-ota-direct-first`: confirm a safe direct booking/contact path, then test concierge-first.

The acquisition triage CSV includes this field so the shortlist can be filtered into direct outreach
and concierge-first work queues.

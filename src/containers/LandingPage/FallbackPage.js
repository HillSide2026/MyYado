import React from 'react';

import { NamedLink } from '../../components';

import css from './FallbackPage.module.css';

const launchMarkets = [
  {
    name: 'Nikko',
    role: 'Nature and heritage',
    copy: 'Slow stays near forest paths, old routes, and quieter days.',
    collectionSlug: 'temple-town-stays',
    tone: 'nikko',
  },
  {
    name: 'Kamakura',
    role: 'Coastal culture',
    copy: 'Easy access, sea air, and stays close to daily life.',
    collectionSlug: 'coastal-culture',
    tone: 'kamakura',
  },
];

const collections = [
  {
    title: 'Temple Town Stays',
    market: 'Nikko',
    slug: 'temple-town-stays',
    copy: 'Nature, heritage, and time to slow down.',
    tone: 'nikko',
  },
  {
    title: 'Coastal Culture',
    market: 'Kamakura',
    slug: 'coastal-culture',
    copy: 'Light, movement, and a softer city edge.',
    tone: 'kamakura',
  },
  {
    title: 'Onsen Retreats',
    market: 'Hakone',
    slug: 'onsen-retreats',
    copy: 'Warm baths, quiet interiors, and restorative pacing.',
    tone: 'hakone',
  },
  {
    title: 'Quiet Arrival',
    market: 'Narita',
    slug: 'quiet-arrival',
    copy: 'A calmer first or last night in Japan.',
    tone: 'narita',
  },
  {
    title: 'Hidden Coast',
    market: 'Ubara',
    slug: 'hidden-coast',
    copy: 'Raw coastline, fewer crowds, and room to breathe.',
    tone: 'ubara',
  },
];

const qualitySignals = [
  'Reviewed before publication',
  'Clear fields for price, availability, and stay details',
  'Provider identity and reviews kept close to the booking decision',
];

const FallbackPage = props => {
  const { error } = props;
  const showContentWarning = error && error.status !== 404;

  return (
    <main className={css.root}>
      {showContentWarning ? (
        <section className={css.status} aria-live="polite">
          <div className={css.statusInner}>
            <h2 className={css.statusTitle}>The latest homepage content could not load.</h2>
            <p className={css.statusCopy}>{error?.message}</p>
          </div>
        </section>
      ) : null}

      <section className={css.hero}>
        <div className={css.heroInner}>
          <div className={css.heroCopy}>
            <p className={css.eyebrow}>Curated stays in quieter Japan</p>
            <h1 className={css.heroTitle}>Not more stays. Better stays.</h1>
            <p className={css.heroText}>
              Reviewed places to stay in Nikko, Kamakura, and the slower routes between arrival,
              retreat, coast, and heritage.
            </p>
            <div className={css.heroActions}>
              <NamedLink name="ExplorePage" className={css.primaryLink}>
                Explore stays
              </NamedLink>
              <NamedLink name="ProviderStartPage" className={css.secondaryLink}>
                List with MyYado
              </NamedLink>
            </div>
          </div>
          <div
            className={css.heroVisual}
            role="img"
            aria-label="Placeholder for calm Nikko and Kamakura stay photography"
          >
            <div className={css.heroVisualPrimary}>Nikko</div>
            <div className={css.heroVisualSecondary}>Kamakura</div>
            <div className={css.heroVisualNote}>Reviewed stays only</div>
          </div>
        </div>
      </section>

      <section className={css.section}>
        <div className={css.sectionInner}>
          <div className={css.sectionHeader}>
            <p className={css.eyebrow}>Launch markets</p>
            <h2 className={css.sectionTitle}>Start with places that have a reason to be here.</h2>
          </div>
          <div className={css.marketGrid}>
            {launchMarkets.map(market => (
              <NamedLink
                key={market.name}
                name="CollectionPage"
                params={{ collectionSlug: market.collectionSlug }}
                className={css.marketCard}
              >
                <div
                  className={[css.marketVisual, css[market.tone]].join(' ')}
                  role="img"
                  aria-label={`${market.name} placeholder photography`}
                />
                <div className={css.marketText}>
                  <p className={css.marketRole}>{market.role}</p>
                  <h3 className={css.cardTitle}>{market.name}</h3>
                  <p className={css.cardCopy}>{market.copy}</p>
                </div>
              </NamedLink>
            ))}
          </div>
        </div>
      </section>

      <section className={css.sectionAlt}>
        <div className={css.sectionInner}>
          <div className={css.sectionHeader}>
            <p className={css.eyebrow}>Collections</p>
            <h2 className={css.sectionTitle}>Editorial paths, not endless inventory.</h2>
          </div>
          <div className={css.collectionGrid}>
            {collections.map(collection => (
              <NamedLink
                key={collection.slug}
                name="CollectionPage"
                params={{ collectionSlug: collection.slug }}
                className={css.collectionCard}
              >
                <span className={[css.collectionStripe, css[collection.tone]].join(' ')} />
                <p className={css.marketRole}>{collection.market}</p>
                <h3 className={css.cardTitle}>{collection.title}</h3>
                <p className={css.cardCopy}>{collection.copy}</p>
              </NamedLink>
            ))}
          </div>
        </div>
      </section>

      <section className={css.section}>
        <div className={css.sectionInner}>
          <div className={css.featuredBand}>
            <div>
              <p className={css.eyebrow}>Featured stays</p>
              <h2 className={css.sectionTitle}>Promotion follows the same quality bar.</h2>
              <p className={css.sectionCopy}>
                A stay earns attention through clear images, responsive Providers, and booking
                details a Traveler can trust.
              </p>
            </div>
            <NamedLink name="ExplorePage" className={css.textLink}>
              Browse curated supply
            </NamedLink>
          </div>
        </div>
      </section>

      <section className={css.trustSection}>
        <div className={css.sectionInner}>
          <div className={css.sectionHeader}>
            <p className={css.eyebrow}>Trust</p>
            <h2 className={css.sectionTitle}>Calm comes from knowing what happens next.</h2>
          </div>
          <div className={css.signalGrid}>
            {qualitySignals.map(signal => (
              <div key={signal} className={css.signalItem}>
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FallbackPage;

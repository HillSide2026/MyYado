import React from 'react';
import loadable from '@loadable/component';

import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';
import { fetchFeaturedListings } from '../../ducks/featuredListings.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { getFeaturedListingsProps } from '../../util/data';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

const HOW_IT_WORKS_SECTION = {
  sectionType: 'columns',
  sectionId: 'myyado-how-it-works',
  numColumns: 3,
  title: { fieldType: 'heading2', content: 'How MyYado works' },
  description: {
    fieldType: 'paragraph',
    content: 'Find and book authentic Japan stays in three simple steps.',
  },
  blocks: [
    {
      blockId: 'how-step-1',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: '1. Search authentic stays' },
      text: {
        fieldType: 'markdown',
        content:
          'Browse curated stays across rural Japan — from farmhouses to traditional machiya townhouses.',
      },
    },
    {
      blockId: 'how-step-2',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: '2. Book securely' },
      text: {
        fieldType: 'markdown',
        content:
          'Reserve your stay online with confidence. Secure payments and clear cancellation policies.',
      },
    },
    {
      blockId: 'how-step-3',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: '3. Experience local Japan' },
      text: {
        fieldType: 'markdown',
        content:
          'Arrive and immerse yourself. Your host will welcome you and share their local knowledge.',
      },
    },
  ],
};

const WHAT_MAKES_DIFFERENT_SECTION = {
  sectionType: 'columns',
  sectionId: 'myyado-what-makes-different',
  numColumns: 4,
  title: { fieldType: 'heading2', content: 'What makes MyYado different' },
  blocks: [
    {
      blockId: 'diff-curated',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Curated, authentic stays' },
      text: {
        fieldType: 'markdown',
        content: 'Every listing is reviewed for character and authenticity. No generic hotel rooms.',
      },
    },
    {
      blockId: 'diff-rural',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Rural & local experiences' },
      text: {
        fieldType: 'markdown',
        content:
          'Discover Japan beyond Tokyo — quiet countryside, coastal towns, and mountain villages.',
      },
    },
    {
      blockId: 'diff-hosts',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Direct connection to hosts' },
      text: {
        fieldType: 'markdown',
        content:
          'Message your host directly. Local guidance, personal welcome, real hospitality.',
      },
    },
    {
      blockId: 'diff-simple',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Simple booking experience' },
      text: {
        fieldType: 'markdown',
        content:
          'Straightforward search, clear pricing, and easy reservations — no complexity.',
      },
    },
  ],
};

const STAY_TYPES_SECTION = {
  sectionType: 'columns',
  sectionId: 'myyado-stay-types',
  numColumns: 4,
  title: { fieldType: 'heading2', content: 'Explore by experience' },
  description: {
    fieldType: 'paragraph',
    content: 'Every kind of Japan stay, in one place.',
  },
  blocks: [
    {
      blockId: 'stay-countryside',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Countryside homes' },
      text: {
        fieldType: 'markdown',
        content:
          'Slow down in restored farmhouses and rural retreats surrounded by rice fields and mountains.',
      },
    },
    {
      blockId: 'stay-traditional',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Traditional stays' },
      text: {
        fieldType: 'markdown',
        content:
          'Sleep in tatami rooms, machiya townhouses, and heritage buildings that carry centuries of history.',
      },
    },
    {
      blockId: 'stay-family',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Family-friendly retreats' },
      text: {
        fieldType: 'markdown',
        content:
          'Spacious homes with room to gather. Hosts who make families feel welcome across every generation.',
      },
    },
    {
      blockId: 'stay-cultural',
      blockType: 'defaultBlock',
      alignment: 'center',
      title: { fieldType: 'heading3', content: 'Cultural escapes' },
      text: {
        fieldType: 'markdown',
        content:
          'Stay close to temples, festivals, and craft traditions. Let the place teach you something.',
      },
    },
  ],
};

const NEW_SECTIONS = [HOW_IT_WORKS_SECTION, WHAT_MAKES_DIFFERENT_SECTION, STAY_TYPES_SECTION];

const WHY_CHOOSE_UPDATED_TITLE = 'Why choose MyYado for your authentic Japan stays?';

const augmentPageData = pageData => {
  if (!pageData?.sections) {
    return pageData;
  }

  const sections = pageData.sections;

  // Update the "Why choose" section heading
  const updatedSections = sections.map(s => {
    const titleContent = s.title?.content || '';
    if (titleContent.includes('Why choose') && titleContent.includes('Japanese adventure')) {
      return { ...s, title: { ...s.title, content: WHY_CHOOSE_UPDATED_TITLE } };
    }
    return s;
  });

  // Insert after the hero section, or before the "Why choose" section, whichever comes first
  const heroIndex = updatedSections.findIndex(s => s.sectionType === 'hero');
  const whyChooseIndex = updatedSections.findIndex(
    s => s.title?.content?.includes('Why choose') || s.title?.content === WHY_CHOOSE_UPDATED_TITLE
  );

  let insertIndex;
  if (whyChooseIndex !== -1) {
    insertIndex = whyChooseIndex;
  } else if (heroIndex !== -1) {
    insertIndex = heroIndex + 1;
  } else {
    insertIndex = 1;
  }

  const finalSections = [
    ...updatedSections.slice(0, insertIndex),
    ...NEW_SECTIONS,
    ...updatedSections.slice(insertIndex),
  ];

  return { ...pageData, sections: finalSections };
};

export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress, error } = props;

  const rawPageData = pageAssetsData?.[camelize(ASSET_NAME)]?.data;
  const augmentedPageData = augmentPageData(rawPageData);

  return (
    <PageBuilder
      pageAssetsData={augmentedPageData}
      inProgress={inProgress}
      error={error}
      fallbackPage={<FallbackPage error={error} />}
      featuredListings={getFeaturedListingsProps(camelize(ASSET_NAME), props)}
    />
  );
};

LandingPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  const featuredListingData = state.featuredListings || {};

  const getListingEntitiesById = listingIds => getListingsById(state, listingIds);

  return { pageAssetsData, featuredListingData, getListingEntitiesById, inProgress, error };
};

const mapDispatchToProps = dispatch => ({
  onFetchFeaturedListings: (sectionId, parentPage, listingImageConfig, allSections) =>
    dispatch(fetchFeaturedListings({ sectionId, parentPage, listingImageConfig, allSections })),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPageComponent);

export default LandingPage;

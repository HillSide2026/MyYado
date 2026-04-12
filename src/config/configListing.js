/////////////////////////////////////////////////////////
// Configurations related to listing.                  //
// Main configuration here is the extended data config //
/////////////////////////////////////////////////////////

// Note: The listingFields come from listingFields asset nowadays by default.
//       To use this built-in configuration, you need to change the overwrite from configHelper.js
//       (E.g. use mergeDefaultTypesAndFieldsForDebugging func)

const NIGHTLY_STAY_LISTING_TYPE = 'nightly-stay';
const MAX_TRAVELERS = 20;

const nightlyStayListingTypeConfig = {
  limitToListingTypeIds: true,
  listingTypeIds: [NIGHTLY_STAY_LISTING_TYPE],
};

const requiredFieldMessage = 'This field is required.';

const stayTypeOptions = [
  { option: 'ryokan', label: 'Ryokan' },
  { option: 'minshuku', label: 'Minshuku' },
  { option: 'machiya', label: 'Machiya' },
  { option: 'villa', label: 'Villa' },
];

const collectionTagOptions = [
  { option: 'quiet-kyoto', label: 'Quiet Kyoto' },
  { option: 'design-stays', label: 'Design stays' },
  { option: 'cedar-and-onsen', label: 'Cedar and onsen' },
];

const amenityOptions = [
  { option: 'wifi', label: 'Wi-Fi' },
  { option: 'air-conditioning', label: 'Air conditioning' },
  { option: 'heating', label: 'Heating' },
  { option: 'breakfast', label: 'Breakfast' },
  { option: 'dinner', label: 'Dinner' },
  { option: 'kitchen', label: 'Kitchen' },
  { option: 'parking', label: 'Parking' },
  { option: 'washer', label: 'Washer' },
  { option: 'workspace', label: 'Workspace' },
  { option: 'local-guide', label: 'Local guide' },
];

const bathingOptions = [
  { option: 'private-bath', label: 'Private bath' },
  { option: 'shared-bath', label: 'Shared bath' },
  { option: 'onsen', label: 'Onsen' },
  { option: 'outdoor-bath', label: 'Outdoor bath' },
];

const diningOptions = [
  { option: 'breakfast', label: 'Breakfast' },
  { option: 'dinner', label: 'Dinner' },
  { option: 'self-catering', label: 'Self-catering' },
  { option: 'nearby-restaurants', label: 'Nearby restaurants' },
];

const languageOptions = [
  { option: 'japanese', label: 'Japanese' },
  { option: 'english', label: 'English' },
  { option: 'chinese', label: 'Chinese' },
  { option: 'korean', label: 'Korean' },
  { option: 'french', label: 'French' },
  { option: 'spanish', label: 'Spanish' },
];

export const listingFields = [
  {
    key: 'stayType',
    scope: 'public',
    schemaType: 'enum',
    enumOptions: stayTypeOptions,
    listingTypeConfig: nightlyStayListingTypeConfig,
    filterConfig: {
      indexForSearch: true,
      showFilter: true,
      filterType: 'SelectMultipleFilter',
      label: 'Stay type',
      group: 'primary',
    },
    showConfig: {
      label: 'Stay type',
      isDetail: true,
    },
    saveConfig: {
      label: 'Stay type',
      placeholderMessage: 'Select a stay type',
      isRequired: true,
      requiredMessage: 'Select a stay type.',
    },
  },
  {
    key: 'maxTravelers',
    scope: 'public',
    schemaType: 'long',
    numberConfig: {
      minimum: 1,
      maximum: MAX_TRAVELERS,
    },
    listingTypeConfig: nightlyStayListingTypeConfig,
    filterConfig: {
      indexForSearch: true,
      showFilter: true,
      label: 'Travelers',
      group: 'primary',
    },
    showConfig: {
      label: 'Sleeps',
      isDetail: true,
    },
    saveConfig: {
      label: 'Maximum travelers',
      placeholderMessage: 'Add the maximum number of travelers',
      isRequired: true,
      requiredMessage: 'Add the maximum number of travelers.',
    },
  },
  {
    key: 'collectionTags',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: collectionTagOptions,
    listingTypeConfig: nightlyStayListingTypeConfig,
    filterConfig: {
      indexForSearch: true,
      showFilter: true,
      label: 'Collections',
      searchMode: 'has_any',
      group: 'secondary',
    },
    showConfig: {
      label: 'Collections',
      isDetail: false,
    },
    saveConfig: {
      label: 'Collections',
      placeholderMessage: 'Select any curated collections',
      isRequired: false,
    },
  },
  {
    key: 'bedrooms',
    scope: 'public',
    schemaType: 'long',
    numberConfig: {
      minimum: 0,
      maximum: 20,
    },
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Bedrooms',
      isDetail: true,
    },
    saveConfig: {
      label: 'Bedrooms',
      placeholderMessage: 'Add bedrooms',
      isRequired: true,
      requiredMessage: requiredFieldMessage,
    },
  },
  {
    key: 'beds',
    scope: 'public',
    schemaType: 'long',
    numberConfig: {
      minimum: 1,
      maximum: 40,
    },
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Beds',
      isDetail: true,
    },
    saveConfig: {
      label: 'Beds',
      placeholderMessage: 'Add beds',
      isRequired: true,
      requiredMessage: requiredFieldMessage,
    },
  },
  {
    key: 'bathrooms',
    scope: 'public',
    schemaType: 'long',
    numberConfig: {
      minimum: 0,
      maximum: 20,
    },
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Bathrooms',
      isDetail: true,
    },
    saveConfig: {
      label: 'Bathrooms',
      placeholderMessage: 'Add bathrooms',
      isRequired: true,
      requiredMessage: requiredFieldMessage,
    },
  },
  {
    key: 'amenities',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: amenityOptions,
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Amenities',
      isDetail: false,
    },
    saveConfig: {
      label: 'Amenities',
      placeholderMessage: 'Select amenities',
      isRequired: true,
      requiredMessage: 'Select at least one amenity.',
    },
  },
  {
    key: 'bathing',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: bathingOptions,
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Bathing',
      isDetail: false,
    },
    saveConfig: {
      label: 'Bathing',
      placeholderMessage: 'Select bathing options',
      isRequired: false,
    },
  },
  {
    key: 'dining',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: diningOptions,
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Dining',
      isDetail: false,
    },
    saveConfig: {
      label: 'Dining',
      placeholderMessage: 'Select dining options',
      isRequired: false,
    },
  },
  {
    key: 'transferAvailable',
    scope: 'public',
    schemaType: 'boolean',
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Transfer available',
      isDetail: true,
    },
    saveConfig: {
      label: 'Transfer available',
      placeholderMessage: 'Select an option',
      isRequired: false,
    },
  },
  {
    key: 'languages',
    scope: 'public',
    schemaType: 'multi-enum',
    enumOptions: languageOptions,
    listingTypeConfig: nightlyStayListingTypeConfig,
    showConfig: {
      label: 'Languages',
      isDetail: false,
    },
    saveConfig: {
      label: 'Languages',
      placeholderMessage: 'Select supported languages',
      isRequired: false,
    },
  },
  {
    key: 'privateArrivalInstructions',
    scope: 'private',
    schemaType: 'text',
    listingTypeConfig: nightlyStayListingTypeConfig,
    saveConfig: {
      label: 'Private arrival instructions',
      placeholderMessage: 'Add precise arrival details for confirmed reservations',
      isRequired: false,
    },
  },
  {
    key: 'providerInternalNotes',
    scope: 'private',
    schemaType: 'text',
    listingTypeConfig: nightlyStayListingTypeConfig,
    saveConfig: {
      label: 'Provider internal notes',
      placeholderMessage: 'Add private notes for your team',
      isRequired: false,
    },
  },
  {
    key: 'applicationNotes',
    scope: 'private',
    schemaType: 'text',
    listingTypeConfig: nightlyStayListingTypeConfig,
    saveConfig: {
      label: 'Application notes',
      placeholderMessage: 'Add private review notes for MyYado',
      isRequired: false,
    },
  },
];

///////////////////////////////////////////////////////////////////////
// Configurations related to listing types and transaction processes //
///////////////////////////////////////////////////////////////////////

// Note: The listingTypes come from listingTypes asset nowadays by default.
//       To use this built-in configuration, you need to change the overwrite from configHelper.js
//       (E.g. use mergeDefaultTypesAndFieldsForDebugging func)

export const listingTypes = [
  {
    listingType: NIGHTLY_STAY_LISTING_TYPE,
    label: 'Stay',
    transactionType: {
      process: 'default-booking',
      alias: 'default-booking/release-1',
      unitType: 'night',
    },
    availabilityType: 'oneSeat',
    defaultListingFields: {
      location: true,
      payoutDetails: true,
    },
    transactionFields: [
      {
        showTo: 'customer',
        label: 'Travelers',
        key: 'travelersCount',
        schemaType: 'long',
        numberConfig: {
          minimum: 1,
          maximum: MAX_TRAVELERS,
        },
        saveConfig: {
          required: true,
        },
      },
      {
        showTo: 'customer',
        label: 'Arrival needs',
        key: 'arrivalNeeds',
        schemaType: 'text',
      },
    ],
  },
];

// SearchPage can enforce listing query to only those listings with valid listingType
// if you have set an enum search schema for listing public data field `listingType`.
export const enforceValidListingType = false;

const fs = require('fs');
const path = require('path');

const DEFAULT_INVENTORY_PATH = 'docs/product/phase-13-seed-inventory.json';
const MIN_LISTINGS_PER_MARKET = 10;

const allowedMarkets = ['nikko', 'kamakura', 'hakone', 'chiba'];
const allowedCollections = [
  'temple-town-stays',
  'mountain-onsen-retreats',
  'coastal-culture',
  'onsen-retreats',
  'quiet-arrival',
  'hidden-coast',
];
const allowedCurationStatuses = ['approved', 'featured'];

const requiredPublicDataFields = [
  'market',
  'collections',
  'curationStatus',
  'stayType',
  'maxTravelers',
  'bedrooms',
  'beds',
  'bathrooms',
  'amenities',
  'bathing',
  'dining',
  'transferAvailable',
  'languages',
];

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const inventoryArg = args.find(arg => arg !== '--strict');
const inventoryPath = path.resolve(process.cwd(), inventoryArg || DEFAULT_INVENTORY_PATH);

const readInventory = filePath => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    throw new Error(`Could not read seed inventory at ${filePath}: ${e.message}`);
  }
};

const isNonEmptyString = value => typeof value === 'string' && value.trim().length > 0;
const isNonEmptyArray = value => Array.isArray(value) && value.length > 0;
const hasValue = value => value !== null && typeof value !== 'undefined';

const validateListing = listing => {
  const errors = [];
  const label = listing.seedId || listing.title || 'unknown listing';
  const publicData = listing.publicData || {};

  if (!isNonEmptyString(listing.seedId)) {
    errors.push(`${label}: seedId is required`);
  }
  if (!isNonEmptyString(listing.title)) {
    errors.push(`${label}: title is required`);
  }
  if (!isNonEmptyString(listing.description)) {
    errors.push(`${label}: description is required`);
  }

  requiredPublicDataFields.forEach(field => {
    if (!hasValue(publicData[field])) {
      errors.push(`${label}: publicData.${field} is required`);
    }
  });

  if (!allowedMarkets.includes(publicData.market)) {
    errors.push(`${label}: publicData.market must be one of ${allowedMarkets.join(', ')}`);
  }
  if (listing.market && listing.market !== publicData.market) {
    errors.push(`${label}: market must match publicData.market`);
  }
  if (!allowedCurationStatuses.includes(publicData.curationStatus)) {
    errors.push(
      `${label}: publicData.curationStatus must be one of ${allowedCurationStatuses.join(', ')}`
    );
  }
  if (!isNonEmptyArray(publicData.collections)) {
    errors.push(`${label}: publicData.collections must include at least one collection`);
  } else {
    publicData.collections.forEach(collection => {
      if (!allowedCollections.includes(collection)) {
        errors.push(`${label}: unknown collection ${collection}`);
      }
    });
  }

  if (!Number.isInteger(publicData.maxTravelers) || publicData.maxTravelers < 1) {
    errors.push(`${label}: publicData.maxTravelers must be a positive integer`);
  }
  ['bedrooms', 'beds', 'bathrooms'].forEach(field => {
    if (!Number.isInteger(publicData[field]) || publicData[field] < 0) {
      errors.push(`${label}: publicData.${field} must be a non-negative integer`);
    }
  });

  ['amenities', 'bathing', 'dining', 'languages'].forEach(field => {
    if (!isNonEmptyArray(publicData[field])) {
      errors.push(`${label}: publicData.${field} must include at least one value`);
    }
  });

  if (typeof publicData.transferAvailable !== 'boolean') {
    errors.push(`${label}: publicData.transferAvailable must be boolean`);
  }

  if (strict) {
    if (listing.sourceStatus !== 'verified-for-sharetribe-entry') {
      errors.push(`${label}: strict mode requires sourceStatus verified-for-sharetribe-entry`);
    }
    if (listing.realPropertyVerified !== true) {
      errors.push(`${label}: strict mode requires realPropertyVerified true`);
    }
    if (!isNonEmptyString(listing.providerName)) {
      errors.push(`${label}: strict mode requires providerName`);
    }
    if (!isNonEmptyString(listing.verifiedAddress)) {
      errors.push(`${label}: strict mode requires verifiedAddress`);
    }
  }

  return errors;
};

const validateInventory = inventory => {
  const listings = inventory.listings || [];
  const errors = [];
  const counts = allowedMarkets.reduce((picked, market) => ({ ...picked, [market]: 0 }), {});

  if (!Array.isArray(listings)) {
    return { errors: ['Inventory must contain a listings array'], counts };
  }

  listings.forEach(listing => {
    const market = listing.publicData?.market;
    if (allowedMarkets.includes(market)) {
      counts[market] += 1;
    }
    errors.push(...validateListing(listing));
  });

  allowedMarkets.forEach(market => {
    if (counts[market] < MIN_LISTINGS_PER_MARKET) {
      errors.push(
        `${market}: expected at least ${MIN_LISTINGS_PER_MARKET} listings, found ${counts[market]}`
      );
    }
  });

  return { errors, counts };
};

const inventory = readInventory(inventoryPath);
const { errors, counts } = validateInventory(inventory);

if (errors.length > 0) {
  console.error(`Seed inventory validation failed for ${inventoryPath}`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Seed inventory validation passed for ${inventoryPath}`);
console.log(`Counts: ${allowedMarkets.map(market => `${market}=${counts[market]}`).join(', ')}`);
if (!strict) {
  console.log('Non-strict mode checks structure only. Use --strict before publishing real supply.');
}

const fs = require('fs');
const path = require('path');

const DEFAULT_LEDGER_PATH = 'docs/product/phase-13-sourced-supply.json';

const allowedMarkets = ['nikko', 'kamakura', 'hakone', 'chiba'];
const allowedCollections = [
  'temple-town-stays',
  'mountain-onsen-retreats',
  'coastal-culture',
  'onsen-retreats',
  'quiet-arrival',
  'hidden-coast',
];
const allowedSourceStatuses = [
  'sourced',
  'pending-verification',
  'manual-sourcing-cluster',
  'inactive-benchmark',
  'removed-from-active-supply',
];
const allowedConfidence = ['high', 'medium', 'pending', 'cluster', 'not-active'];
const allowedPriorities = ['high', 'medium', 'low', 'hold', 'remove'];
const allowedAcquisitionMotions = ['ota-direct-outreach', 'concierge-first'];
const allowedItemAcquisitionPaths = [
  'needs-ota-check',
  'ota-direct-outreach',
  'concierge-first',
  'verification-first',
  'hold',
];
const allowedOtaPresence = [
  'high-probability-booking-agoda',
  'mixed-partial-ota',
  'low-ota-direct-first',
];
const allowedPriorityTiers = ['tier-1-first-wave', 'tier-2-second-wave'];
const requiredTriageFields = [
  'bookingComUrl',
  'agodaUrl',
  'otaPresence',
  'officialSiteUrl',
  'directContact',
  'acquisitionPath',
  'nextOutreachAction',
];

const ledgerPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_LEDGER_PATH);

const readLedger = filePath => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    throw new Error(`Could not read sourced supply ledger at ${filePath}: ${e.message}`);
  }
};

const isNonEmptyString = value => typeof value === 'string' && value.trim().length > 0;
const isArray = value => Array.isArray(value);

const validateAcquisitionStrategy = ledger => {
  const strategy = ledger.acquisitionStrategy || {};
  const motions = strategy.primaryMotions || [];
  const errors = [];

  if (!isNonEmptyString(strategy.classificationRule)) {
    errors.push('acquisitionStrategy.classificationRule is required');
  }
  if (!isArray(strategy.triageFieldsToCapture)) {
    errors.push('acquisitionStrategy.triageFieldsToCapture must be an array');
  } else {
    requiredTriageFields.forEach(field => {
      if (!strategy.triageFieldsToCapture.includes(field)) {
        errors.push(`acquisitionStrategy.triageFieldsToCapture must include ${field}`);
      }
    });
  }
  if (!isArray(motions) || motions.length === 0) {
    errors.push('acquisitionStrategy.primaryMotions must include at least one motion');
  } else {
    const motionKeys = motions.map(motion => motion.key);
    allowedAcquisitionMotions.forEach(requiredMotion => {
      if (!motionKeys.includes(requiredMotion)) {
        errors.push(`acquisitionStrategy.primaryMotions must include ${requiredMotion}`);
      }
    });
    motions.forEach(motion => {
      if (!allowedAcquisitionMotions.includes(motion.key)) {
        errors.push(`acquisitionStrategy has unknown motion ${motion.key}`);
      }
      if (!isNonEmptyString(motion.goal)) {
        errors.push(`${motion.key}: goal is required`);
      }
      if (!isNonEmptyString(motion.nextAction)) {
        errors.push(`${motion.key}: nextAction is required`);
      }
    });
  }

  return errors;
};

const validatePriorityPlan = ledger => {
  const errors = [];
  const items = Array.isArray(ledger.items) ? ledger.items : [];
  const itemsById = new Map(items.map(item => [item.sourceId, item]));
  const tiers = ledger.priorityOutreachTiers || [];
  const shortlist = ledger.firstTargetShortlist || [];

  if (!isArray(tiers) || tiers.length === 0) {
    errors.push('priorityOutreachTiers must include at least one tier');
  } else {
    const tierKeys = tiers.map(tier => tier.key);
    allowedPriorityTiers.forEach(tier => {
      if (!tierKeys.includes(tier)) {
        errors.push(`priorityOutreachTiers must include ${tier}`);
      }
    });
    tiers.forEach(tier => {
      if (!allowedPriorityTiers.includes(tier.key)) {
        errors.push(`priorityOutreachTiers has unknown tier ${tier.key}`);
      }
      if (!isNonEmptyString(tier.meaning)) {
        errors.push(`${tier.key}: meaning is required`);
      }
    });
  }

  if (!isArray(shortlist) || shortlist.length < 10 || shortlist.length > 20) {
    errors.push('firstTargetShortlist must include 10 to 20 targets');
  } else {
    const ranks = new Set();
    shortlist.forEach(target => {
      const item = itemsById.get(target.sourceId);
      if (!item) {
        errors.push(`firstTargetShortlist references unknown sourceId ${target.sourceId}`);
        return;
      }
      if (!Number.isInteger(target.rank) || target.rank < 1) {
        errors.push(`${target.sourceId}: shortlist rank must be a positive integer`);
      } else if (ranks.has(target.rank)) {
        errors.push(`${target.sourceId}: duplicate shortlist rank ${target.rank}`);
      } else {
        ranks.add(target.rank);
      }
      if (!allowedItemAcquisitionPaths.includes(target.acquisitionPath)) {
        errors.push(
          `${target.sourceId}: unknown shortlist acquisitionPath ${target.acquisitionPath}`
        );
      }
      if (!isNonEmptyString(target.firstAction)) {
        errors.push(`${target.sourceId}: shortlist firstAction is required`);
      }
      if (!isNonEmptyString(target.rationale)) {
        errors.push(`${target.sourceId}: shortlist rationale is required`);
      }
      if (item.priorityOutreach?.shortlistRank !== target.rank) {
        errors.push(`${target.sourceId}: item priorityOutreach.shortlistRank must match shortlist`);
      }
    });
  }

  return errors;
};

const validateOtaPresenceTiers = ledger => {
  const tiers = ledger.otaPresenceTiers || [];
  const errors = [];

  if (!isArray(tiers) || tiers.length === 0) {
    errors.push('otaPresenceTiers must include at least one tier');
  } else {
    const tierKeys = tiers.map(tier => tier.key);
    allowedOtaPresence.forEach(tier => {
      if (!tierKeys.includes(tier)) {
        errors.push(`otaPresenceTiers must include ${tier}`);
      }
    });
    tiers.forEach(tier => {
      if (!allowedOtaPresence.includes(tier.key)) {
        errors.push(`otaPresenceTiers has unknown tier ${tier.key}`);
      }
      if (!allowedItemAcquisitionPaths.includes(tier.defaultAcquisitionPath)) {
        errors.push(`${tier.key}: defaultAcquisitionPath is invalid`);
      }
      if (!isNonEmptyString(tier.meaning)) {
        errors.push(`${tier.key}: meaning is required`);
      }
    });
  }

  return errors;
};

const validateItem = item => {
  const errors = [];
  const label = item.sourceId || item.propertyName || 'unknown sourced property';
  const targetPublicData = item.targetPublicData || {};
  const contact = item.contact || {};

  if (!isNonEmptyString(item.sourceId)) {
    errors.push(`${label}: sourceId is required`);
  }
  if (!isNonEmptyString(item.propertyName)) {
    errors.push(`${label}: propertyName is required`);
  }
  if (!allowedSourceStatuses.includes(item.sourceStatus)) {
    errors.push(`${label}: sourceStatus must be one of ${allowedSourceStatuses.join(', ')}`);
  }
  if (!allowedConfidence.includes(item.confidence)) {
    errors.push(`${label}: confidence must be one of ${allowedConfidence.join(', ')}`);
  }
  if (!allowedPriorities.includes(item.outreachPriority)) {
    errors.push(`${label}: outreachPriority must be one of ${allowedPriorities.join(', ')}`);
  }
  if (!allowedMarkets.includes(targetPublicData.market)) {
    errors.push(`${label}: targetPublicData.market must be one of ${allowedMarkets.join(', ')}`);
  }
  if (!isArray(targetPublicData.collections) || targetPublicData.collections.length === 0) {
    errors.push(`${label}: targetPublicData.collections must include at least one collection`);
  } else {
    targetPublicData.collections.forEach(collection => {
      if (!allowedCollections.includes(collection)) {
        errors.push(`${label}: unknown collection ${collection}`);
      }
    });
  }

  if (item.sourceStatus === 'sourced') {
    if (item.realPropertyVerified !== true) {
      errors.push(`${label}: sourced properties require realPropertyVerified true`);
    }
    if (item.sharetribeListingCreated !== false) {
      errors.push(`${label}: sourced properties should have sharetribeListingCreated false`);
    }
  }

  if (item.sourceStatus === 'manual-sourcing-cluster') {
    if (item.confidence !== 'cluster') {
      errors.push(`${label}: manual sourcing clusters should use confidence cluster`);
    }
    if (item.realPropertyVerified !== false) {
      errors.push(`${label}: manual sourcing clusters should not be marked property-verified`);
    }
  }

  if (item.sourceStatus === 'removed-from-active-supply' && item.outreachPriority !== 'remove') {
    errors.push(`${label}: removed properties should have outreachPriority remove`);
  }
  if (item.sourceStatus === 'inactive-benchmark' && item.outreachPriority !== 'hold') {
    errors.push(`${label}: inactive benchmarks should have outreachPriority hold`);
  }

  if (item.otaPresence && !allowedOtaPresence.includes(item.otaPresence)) {
    errors.push(`${label}: otaPresence must be one of ${allowedOtaPresence.join(', ')}`);
  }

  if (item.priorityOutreach) {
    const priority = item.priorityOutreach;
    if (!allowedPriorityTiers.includes(priority.tier)) {
      errors.push(
        `${label}: priorityOutreach.tier must be one of ${allowedPriorityTiers.join(', ')}`
      );
    }
    if (!allowedItemAcquisitionPaths.includes(priority.acquisitionPath)) {
      errors.push(
        `${label}: priorityOutreach.acquisitionPath must be one of ${allowedItemAcquisitionPaths.join(
          ', '
        )}`
      );
    }
    if (!isNonEmptyString(priority.firstAction)) {
      errors.push(`${label}: priorityOutreach.firstAction is required`);
    }
    if (!isNonEmptyString(priority.rationale)) {
      errors.push(`${label}: priorityOutreach.rationale is required`);
    }
    if (
      priority.shortlistRank != null &&
      (!Number.isInteger(priority.shortlistRank) || priority.shortlistRank < 1)
    ) {
      errors.push(`${label}: priorityOutreach.shortlistRank must be a positive integer`);
    }
  }

  return errors;
};

const validateLedger = ledger => {
  const items = ledger.items || [];
  const errors = [
    ...validateAcquisitionStrategy(ledger),
    ...validatePriorityPlan(ledger),
    ...validateOtaPresenceTiers(ledger),
  ];
  const counts = allowedMarkets.reduce(
    (picked, market) => ({ ...picked, [market]: { sourced: 0, pending: 0, inactive: 0 } }),
    {}
  );

  if (!Array.isArray(items)) {
    return { errors: ['Ledger must contain an items array'], counts };
  }

  items.forEach(item => {
    errors.push(...validateItem(item));
    const market = item.targetPublicData?.market;
    if (allowedMarkets.includes(market)) {
      if (item.sourceStatus === 'sourced') {
        counts[market].sourced += 1;
      } else if (item.sourceStatus === 'pending-verification') {
        counts[market].pending += 1;
      } else if (item.sourceStatus === 'manual-sourcing-cluster') {
        counts[market].pending += 1;
      } else if (item.sourceStatus === 'inactive-benchmark') {
        counts[market].inactive += 1;
      }
    }
  });

  return { errors, counts };
};

const ledger = readLedger(ledgerPath);
const { errors, counts } = validateLedger(ledger);

if (errors.length > 0) {
  console.error(`Sourced supply validation failed for ${ledgerPath}`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Sourced supply validation passed for ${ledgerPath}`);
Object.entries(counts).forEach(([market, marketCounts]) => {
  console.log(
    `${market}: sourced=${marketCounts.sourced}, pending=${marketCounts.pending}, inactive=${marketCounts.inactive}`
  );
});

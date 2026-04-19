const fs = require('fs');
const path = require('path');

const DEFAULT_LEDGER_PATH = 'docs/product/phase-13-sourced-supply.json';
const DEFAULT_OUTPUT_PATH = 'docs/product/phase-13-acquisition-triage.csv';

const ledgerPath = path.resolve(process.cwd(), process.argv[2] || DEFAULT_LEDGER_PATH);
const outputPath = path.resolve(process.cwd(), process.argv[3] || DEFAULT_OUTPUT_PATH);

const readLedger = filePath => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    throw new Error(`Could not read sourced supply ledger at ${filePath}: ${e.message}`);
  }
};

const csvEscape = value => {
  const stringValue = value == null ? '' : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
};

const contactSummary = contact => {
  if (!contact || Object.keys(contact).length === 0) {
    return '';
  }

  return Object.entries(contact)
    .map(([key, value]) => `${key}: ${value}`)
    .join(' | ');
};

const suggestedFirstStep = item => {
  if (item.sourceStatus === 'removed-from-active-supply') {
    return 'Do not pursue active onboarding.';
  }
  if (item.sourceStatus === 'inactive-benchmark') {
    return 'Hold as benchmark unless active operations resume.';
  }
  if (item.sourceStatus === 'pending-verification') {
    return 'Confirm official site, direct contact, and active booking path before outreach.';
  }
  if (item.sourceStatus === 'manual-sourcing-cluster') {
    return 'Identify concrete properties, then classify each one separately.';
  }
  if (item.otaPresence === 'high-probability-booking-agoda') {
    return 'Capture Booking.com and/or Agoda URL, then find direct operator contact and send onboarding outreach.';
  }
  if (item.otaPresence === 'mixed-partial-ota') {
    return 'Check Booking.com, Agoda, Rakuten, and Jalan. If major OTA presence is confirmed, contact directly; otherwise evaluate concierge-first.';
  }
  if (item.otaPresence === 'low-ota-direct-first') {
    return 'Confirm a safe direct booking/contact path, then test concierge-first before asking the provider to onboard.';
  }

  return 'Check Booking.com and Agoda. If present, capture URL and contact operator directly; otherwise evaluate concierge-first.';
};

const suggestedAcquisitionPath = item => {
  if (item.priorityOutreach?.acquisitionPath) {
    return item.priorityOutreach.acquisitionPath;
  }
  if (
    item.sourceStatus === 'removed-from-active-supply' ||
    item.sourceStatus === 'inactive-benchmark'
  ) {
    return 'hold';
  }
  if (
    item.sourceStatus === 'pending-verification' ||
    item.sourceStatus === 'manual-sourcing-cluster'
  ) {
    return 'verification-first';
  }
  if (item.otaPresence === 'high-probability-booking-agoda') {
    return 'ota-direct-outreach';
  }
  if (item.otaPresence === 'mixed-partial-ota') {
    return 'needs-ota-check';
  }
  if (item.otaPresence === 'low-ota-direct-first') {
    return 'concierge-first';
  }

  return 'needs-ota-check';
};

const buildRows = items => {
  const columns = [
    'sourceId',
    'market',
    'propertyName',
    'area',
    'sourceStatus',
    'confidence',
    'outreachPriority',
    'priorityTier',
    'shortlistRank',
    'otaPresence',
    'suggestedAcquisitionPath',
    'acquisitionPath',
    'bookingComUrl',
    'agodaUrl',
    'officialSiteUrl',
    'directContact',
    'nextOutreachAction',
    'priorityRationale',
    'sharetribeListingCreated',
    'collections',
    'stayType',
    'fitNotes',
  ];

  const rows = items.map(item => {
    const targetPublicData = item.targetPublicData || {};
    return [
      item.sourceId,
      targetPublicData.market,
      item.propertyName,
      item.area,
      item.sourceStatus,
      item.confidence,
      item.outreachPriority,
      item.priorityOutreach?.tier,
      item.priorityOutreach?.shortlistRank,
      item.otaPresence,
      suggestedAcquisitionPath(item),
      '',
      '',
      '',
      '',
      contactSummary(item.contact),
      item.priorityOutreach?.firstAction || suggestedFirstStep(item),
      item.priorityOutreach?.rationale,
      item.sharetribeListingCreated,
      (targetPublicData.collections || []).join('|'),
      targetPublicData.stayType,
      item.fitNotes,
    ];
  });

  return [columns, ...rows].map(row => row.map(csvEscape).join(',')).join('\n') + '\n';
};

const ledger = readLedger(ledgerPath);
if (!Array.isArray(ledger.items)) {
  throw new Error(`Ledger at ${ledgerPath} must contain an items array`);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, buildRows(ledger.items), 'utf8');

console.log(`Exported ${ledger.items.length} sourced supply rows to ${outputPath}`);

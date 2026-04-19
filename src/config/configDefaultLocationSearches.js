import { types as sdkTypes } from '../util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// Default location suggestions shown in the LocationAutocompleteInput
// when the user focuses but hasn't typed yet.
const defaultLocations = [
  {
    id: 'default-tokyo',
    predictionPlace: {
      address: 'Tokyo, Japan',
      bounds: new LatLngBounds(new LatLng(35.8984, 139.9595), new LatLng(35.5232, 139.5574)),
    },
  },
  {
    id: 'default-kyoto',
    predictionPlace: {
      address: 'Kyoto, Japan',
      bounds: new LatLngBounds(new LatLng(35.1795, 135.8680), new LatLng(34.8970, 135.6770)),
    },
  },
  {
    id: 'default-osaka',
    predictionPlace: {
      address: 'Osaka, Japan',
      bounds: new LatLngBounds(new LatLng(34.8440, 135.6580), new LatLng(34.5810, 135.3660)),
    },
  },
  {
    id: 'default-hakone',
    predictionPlace: {
      address: 'Hakone, Kanagawa, Japan',
      bounds: new LatLngBounds(new LatLng(35.2990, 139.1380), new LatLng(35.1430, 138.9420)),
    },
  },
  {
    id: 'default-nara',
    predictionPlace: {
      address: 'Nara, Japan',
      bounds: new LatLngBounds(new LatLng(34.7600, 135.9620), new LatLng(34.6060, 135.7440)),
    },
  },
  {
    id: 'default-hiroshima',
    predictionPlace: {
      address: 'Hiroshima, Japan',
      bounds: new LatLngBounds(new LatLng(34.5280, 132.6060), new LatLng(34.2900, 132.3460)),
    },
  },
  {
    id: 'default-nikko',
    predictionPlace: {
      address: 'Nikkō, Tochigi, Japan',
      bounds: new LatLngBounds(new LatLng(36.8420, 139.7280), new LatLng(36.6860, 139.5410)),
    },
  },
  {
    id: 'default-kanazawa',
    predictionPlace: {
      address: 'Kanazawa, Ishikawa, Japan',
      bounds: new LatLngBounds(new LatLng(36.6430, 136.7430), new LatLng(36.4850, 136.5270)),
    },
  },
];

export default defaultLocations;

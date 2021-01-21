import { borderRadius } from '../Index';

export const defaultProps = {
    maxZoom: 16,
    mapBorderRadius: parseInt(borderRadius.medium, 10),
    fullHeight: false,
    region: undefined,
    coordinates: [],
    mapPadding: {},
    mapHeight: 200,
    cacheEnabled: false,
    startingCoordinates: null,
    mapType: 'mutedStandard',
    showUserLocation: true,
    mapRef: {},
};

export default defaultProps;

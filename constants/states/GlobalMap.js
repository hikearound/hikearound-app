import { animationConfig } from '../Animation';

export const defaultProps = {
    cluster: null,
    firstLoad: false,
    animationEnabled: false,
    delta: 0.5,
    altitude: {
        city: 160000,
        hike: 20000,
    },
    selectedCity: null,
    mapPadding: {
        bottom: 40,
        top: 40,
    },
    latModifier: 0.018,
    animationConfig,
};

export default defaultProps;

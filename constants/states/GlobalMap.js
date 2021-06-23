import { animationConfig } from '@constants/Animation';
import { altitude } from '@constants/Altitude';

export const defaultProps = {
    cluster: null,
    firstLoad: false,
    animationEnabled: false,
    delta: 0.5,
    altitude: {
        city: altitude.city,
        hike: altitude.hike,
    },
    selectedCity: null,
    mapPadding: {
        bottom: 40,
        top: 40,
    },
    latModifier: 0.018,
    showHikeSheet: () => {},
    markers: [],
    animationConfig,
};

export default defaultProps;

import { animationConfig } from '../Animation';
import { altitude } from '../Altitude';

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
    animationConfig,
};

export default defaultProps;

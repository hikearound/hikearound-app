import { getInputRangeFromIndexes } from 'react-native-snap-carousel';

export function scrollInterpolator(index, carouselProps) {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
}
export function animatedStyles(index, animatedValue, carouselProps) {
    let animatedOpacity = {};

    if (carouselProps.inactiveSlideOpacity < 1) {
        animatedOpacity = { opacity: 1 };
    }

    return {
        ...animatedOpacity,
    };
}

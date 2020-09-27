import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

const propTypes = {
    path: PropTypes.object.isRequired,
    length: PropTypes.object.isRequired,
    point: PropTypes.object.isRequired,
};

const { width } = Dimensions.get('window');
const CURSOR = 100;

const styles = StyleSheet.create({
    cursorContainer: {
        width: CURSOR,
        height: CURSOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cursor: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: '#367be2',
        borderWidth: 4,
        backgroundColor: 'white',
    },
});

const Cursor = ({ path, length, point }) => {
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: (_event, ctx) => {
            ctx.offsetX = interpolate(
                length.value,
                [0, path.length],
                [0, width],
                Extrapolate.CLAMP,
            );
        },

        onActive: (event, ctx) => {
            length.value = interpolate(
                ctx.offsetX + event.translationX,
                [0, width],
                [0, path.length],
                Extrapolate.CLAMP,
            );
        },
    });

    const style = useAnimatedStyle(() => {
        const { coord } = point.value;
        const translateX = coord.x - CURSOR / 2;
        const translateY = coord.y - CURSOR / 2;

        return {
            transform: [{ translateX }, { translateY }],
        };
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            <PanGestureHandler {...{ onGestureEvent }}>
                <Animated.View style={[styles.cursorContainer, style]}>
                    <View style={styles.cursor} />
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

Cursor.propTypes = propTypes;

export default Cursor;

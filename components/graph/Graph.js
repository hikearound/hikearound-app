import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
import {
    useSharedValue,
    useDerivedValue,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import { parsePath, getPointAtLength } from '../animated_helpers/SVG';
import Cursor from './Cursor';
import Label from './Label';

const { width } = Dimensions.get('window');
const height = 200;

const data = [
    { x: new Date(2020, 5, 1), y: 4371 },
    { x: new Date(2020, 5, 2), y: 6198 },
    { x: new Date(2020, 5, 3), y: 5310 },
    { x: new Date(2020, 5, 4), y: 7188 },
    { x: new Date(2020, 5, 5), y: 8677 },
    { x: new Date(2020, 5, 6), y: 5012 },
].map((p) => [p.x.getTime(), p.y]);

const domain = {
    x: [Math.min(...data.map(([x]) => x)), Math.max(...data.map(([x]) => x))],
    y: [
        Math.min(...data.map(([, y]) => y)),
        Math.max(...data.map(([, y]) => y)),
    ],
};

const range = { x: [0, width], y: [height, 0] };

const scale = (v, d, r) => {
    'worklet';
    return interpolate(v, d, r, Extrapolate.CLAMP);
};

const scaleInvert = (y, d, r) => {
    'worklet';
    return interpolate(y, r, d, Extrapolate.CLAMP);
};

const d = shape
    .line()
    .x(([x]) => scale(x, domain.x, range.x))
    .y(([, y]) => scale(y, domain.y, range.y))
    .curve(shape.curveBasis)(data);

const path = parsePath(d);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

const Graph = ({ elevationArray }) => {
    console.log(elevationArray)
    // console.log(data)

    elevationArray = elevationArray.map((p) => [p.x, p.y]);

    const length = useSharedValue(0);
    const point = useDerivedValue(() => {
        const p = getPointAtLength(path, length.value);

        return {
            coord: {
                x: p.x,
                y: p.y,
            },
            elevationArray: {
                x: scaleInvert(p.x, domain.x, range.x),
                y: scaleInvert(p.y, domain.y, range.y),
            },
        };
    });

    return (
        <View style={styles.container}>
            <Label {...{ elevationArray, point }} />
            <View>
                <Svg {...{ width, height }}>
                    <Path
                        fill='transparent'
                        stroke='#367be2'
                        strokeWidth={3}
                        {...{ d }}
                    />
                    <Path
                        d={`${d} L ${width} ${height} L 0 ${height}`}
                        fill='url(#gradient)'
                    />
                </Svg>
                <Cursor {...{ path, length, point }} />
            </View>
        </View>
    );
};

export default Graph;

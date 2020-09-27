import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import { ReText, round } from 'react-native-redash';
import StyleGuide from './StyleGuide';

const propTypes = {
    point: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    date: {
        ...StyleGuide.typography.title3,
        textAlign: 'center',
    },
    price: {
        ...StyleGuide.typography.title2,
        textAlign: 'center',
    },
});

const Label = ({ point }) => {
    const date = useDerivedValue(() => {
        const d = new Date(point.value.data.x);
        return d.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    });

    const price = useDerivedValue(() => {
        const p = point.value.data.y;
        return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
    });

    return (
        <View>
            <ReText style={styles.date} text={date} />
            <ReText style={styles.price} text={price} />
        </View>
    );
};

Label.propTypes = propTypes;

export default Label;

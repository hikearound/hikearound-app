import React from 'react';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { transparentColors, borderRadius } from '../constants/Index';

const propTypes = {
    imageDidLoad: PropTypes.string,
    height: PropTypes.number,
};

const defaultProps = {
    imageDidLoad: true,
    height: 140,
};

const FeedCardGradient = ({ imageDidLoad, height }) => (
    <LinearGradient
        colors={[transparentColors.grayDarker, 'transparent']}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: imageDidLoad ? height : 0,
            borderRadius: borderRadius.medium,
        }}
    />
);

FeedCardGradient.propTypes = propTypes;
FeedCardGradient.defaultProps = defaultProps;

export default FeedCardGradient;

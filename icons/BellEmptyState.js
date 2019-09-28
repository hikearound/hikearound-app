import React from 'react';
import PropTypes from 'prop-types';
import Svg, { G, Path } from 'react-native-svg';
import { colors } from '../constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    width: 51,
    height: 60,
    fill: colors.mediumGray,
};

const BellEmptyState = ({ width, height, fill }) => (
    <Svg width={width} height={height} viewbox='0 0 51 60'>
        <G fill={fill} fillRule='nonzero'>
            <Path d='M31.832 52.715c.084 3.573-2.805 6.476-6.456 6.475-3.65.004-6.675-2.89-6.757-6.465a6.206 6.206 0 01.543-2.673l12.002-.007c.398.813.644 1.712.668 2.67zM7.202 24.445c.064-7.99 4.247-13.858 10.26-16.304-.066-.329-.14-.641-.147-.989-.1-3.473 2.72-6.277 6.3-6.263 3.58.012 6.558 2.844 6.658 6.316.01.329-.042.643-.088.959 6.366 2.558 11.036 8.885 11.635 16.532 0 0 .321 12.657 5.261 15.75.16.078 2.973 1.353 2.998 3.704.021 2.224-2.728 4.022-6.168 3.986l-37.258-.371c-3.437-.034-6.462-1.89-6.338-4.104.12-2.183 2.367-3.308 2.575-3.404 4.86-3.133 4.312-15.812 4.312-15.812z' />
        </G>
    </Svg>
);

BellEmptyState.propTypes = propTypes;
BellEmptyState.defaultProps = defaultProps;

export default BellEmptyState;

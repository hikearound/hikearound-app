import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    width: 21,
    height: 24,
    fill: colors.grayDark,
};

const PersonIcon = ({ width, height, fill }) => (
    <Svg width={width} height={height}>
        <Path
            d='M10.138 0a5.265 5.265 0 0 1 5.28 5.28 5.265 5.265 0 0 1-5.28 5.28 5.265 5.265 0 0 1-5.28-5.28A5.265 5.265 0 0 1 10.138 0zm7.728 23.664H2.698c-1.92 0-3.216-1.968-2.496-3.744 1.872-4.464 5.664-7.536 10.08-7.536s8.208 3.072 10.08 7.536c.72 1.824-.576 3.744-2.496 3.744z'
            fill={fill}
            fillRule='evenodd'
        />
    </Svg>
);

PersonIcon.propTypes = propTypes;
PersonIcon.defaultProps = defaultProps;

export default PersonIcon;

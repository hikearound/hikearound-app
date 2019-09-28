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
    width: 25,
    height: 25,
    fill: colors.darkGray,
};

const HomeIcon = ({ width, height, fill }) => (
    <Svg width={width} height={height}>
        <Path
            d='M13.74.496l10.674 9.735c1.239 1.134.381 3.213-1.334 3.213H22.03v8.885c0 1.04-.762 1.89-1.81 1.89h-4.86v-6.9H9.643v6.9h-4.86a1.904 1.904 0 0 1-1.906-1.89v-8.885H1.828c-1.62 0-2.477-2.079-1.239-3.213L11.263.496c.667-.661 1.81-.661 2.478 0z'
            fill={fill}
            fillRule='evenodd'
        />
    </Svg>
);

HomeIcon.propTypes = propTypes;
HomeIcon.defaultProps = defaultProps;

export default HomeIcon;

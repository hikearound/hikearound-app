import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { View } from 'react-native';
import { colors } from '../constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    width: 100,
    height: 100,
    fill: colors.white,
};

class FilterIcon extends React.PureComponent {
    render() {
        const { width, height, fill } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        return (
            <View style={{ aspectRatio: 1 }}>
                <Svg width='100%' height='100%' viewBox={viewBox}>
                    <Path
                        d='M72 47.928A7.51 7.51 0 0177 55a7.509 7.509 0 01-5 7.072V70a2.5 2.5 0 11-5 0v-7.928A7.51 7.51 0 0162 55a7.509 7.509 0 015-7.072V30a2.5 2.5 0 115 0v17.928zM57.5 38c0 3.21-2.04 6.025-5 7.072V70a2.5 2.5 0 11-5 0V45.072a7.51 7.51 0 01-5-7.072c0-3.21 2.04-6.025 5-7.072V30a2.5 2.5 0 115 0v.928a7.51 7.51 0 015 7.072zM33 30a2.5 2.5 0 10-5 0v24.928A7.509 7.509 0 0023 62a7.51 7.51 0 005 7.072V70a2.5 2.5 0 105 0v-.928c2.91-1.03 5-3.808 5-7.072a7.51 7.51 0 00-5-7.072V30z'
                        fillRule='nonzero'
                        fill={fill}
                    />
                </Svg>
            </View>
        );
    }
}

FilterIcon.propTypes = propTypes;
FilterIcon.defaultProps = defaultProps;

export default FilterIcon;

import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    width: 20,
    height: 22,
    fill: colors.grayDark,
};

class PersonIcon extends React.PureComponent {
    render() {
        const { width, height, fill, focused } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        if (!focused) {
            return (
                <Svg width={width} height={height} viewBox={viewBox}>
                    <Path
                        d='M9.559 12.513c-1.796 0-3.465.619-4.884 1.68-1.516 1.133-2.747 2.766-3.56 4.702-.204.502-.121 1.03.147 1.433.265.397.711.672 1.246.672h14.101c.537 0 .987-.267 1.252-.663.266-.4.341-.925.144-1.437-.814-1.938-2.046-3.573-3.563-4.707-1.419-1.061-3.087-1.68-4.883-1.68zM9.425 1a3.897 3.897 0 00-3.909 3.909 3.897 3.897 0 003.909 3.908 3.897 3.897 0 003.908-3.908A3.897 3.897 0 009.425 1z'
                        stroke={fill}
                        strokeWidth={2}
                        fill='none'
                        fillRule='evenodd'
                    />
                </Svg>
            );
        }

        return (
            <Svg width={width} height={height} viewBox={viewBox}>
                <Path
                    d='M9.559 11.513c4.105 0 7.63 2.856 9.37 7.006.67 1.696-.535 3.481-2.32 3.481H2.508c-1.785 0-2.99-1.83-2.32-3.48 1.74-4.15 5.265-7.007 9.37-7.007zM9.425 0a4.895 4.895 0 014.908 4.909 4.895 4.895 0 01-4.908 4.908A4.895 4.895 0 014.516 4.91 4.895 4.895 0 019.425 0z'
                    fill={fill}
                    fillRule='evenodd'
                />
            </Svg>
        );
    }
}

PersonIcon.propTypes = propTypes;
PersonIcon.defaultProps = defaultProps;

export default PersonIcon;

import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';
import { colors } from '../constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    width: 19,
    height: 22,
    fill: colors.grayDark,
};

class BellIcon extends React.PureComponent {
    render() {
        const { width, height, fill, focused } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        if (!focused) {
            return (
                <Svg width={width} height={height} viewBox={viewBox}>
                    <G fillRule='nonzero' fill='none'>
                        <Path
                            d='M3.373 9.11c.024-2.75 1.463-4.77 3.529-5.613-.023-.113-.048-.22-.05-.34C6.818 1.962 7.788.997 9.017 1c1.23.003 2.253.977 2.286 2.171.003.113-.015.222-.03.33 2.186.878 3.788 3.054 3.991 5.685 0 0 .107 4.355 1.803 5.418.055.027 1.021.464 1.03 1.273.006.766-.94 1.385-2.12 1.374l-12.8-.117c-1.18-.011-2.219-.649-2.176-1.41.043-.752.814-1.14.886-1.173 1.67-1.079 1.486-5.441 1.486-5.441z'
                            stroke={fill}
                            strokeWidth={2}
                            strokeLinejoin='round'
                        />
                        <Path
                            d='M12.027 19.788c.037 1.315-1.03 2.38-2.384 2.375-1.353-.004-2.478-1.073-2.513-2.39-.01-.35.065-.682.197-.982l4.45.013c.148.3.24.631.25.984z'
                            fill={fill}
                        />
                    </G>
                </Svg>
            );
        }

        return (
            <Svg width={width} height={height} viewBox={viewBox}>
                <Path
                    d='M7.12 18.628l4.45.013c.148.3.24.632.25.984.037 1.315-1.03 2.38-2.384 2.375-1.352-.004-2.478-1.072-2.513-2.389-.01-.351.065-.682.198-.983zM8.82 0c1.352.003 2.477 1.074 2.513 2.388.004.125-.016.244-.033.363 2.404.966 4.167 3.36 4.39 6.254 0 0 .118 4.79 1.984 5.96.06.029 1.123.51 1.132 1.4.007.842-1.032 1.523-2.332 1.51l-14.079-.128c-1.298-.012-2.441-.713-2.394-1.551.047-.827.896-1.253.975-1.29C2.813 13.72 2.61 8.92 2.61 8.92c.027-3.024 1.61-5.245 3.882-6.173-.025-.125-.053-.243-.055-.374C6.4 1.058 7.467-.004 8.819 0z'
                    fill={fill}
                    fillRule='nonzero'
                />
            </Svg>
        );
    }
}

BellIcon.propTypes = propTypes;
BellIcon.defaultProps = defaultProps;

export default BellIcon;

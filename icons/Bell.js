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
                    <Path
                        d='M7.925 19.63c.023.37.194.7.45.943A1.55 1.55 0 009.438 21c.396.002.752-.149 1.004-.4.243-.242.388-.577.377-.96l-2.895-.01zM8.817 1c-.387-.001-.738.145-.976.427-.26.305-.379.745-.35 1.265.014.274.067.52.157.733a5.093 5.093 0 00-.778.247 5.02 5.02 0 00-2.367 1.99c-.562.892-.882 2-.894 3.216 0 0 .015 5.508-2.387 7.554.305.198.733.31 1.182.315l14.079.129c.428.004.82-.091 1.25-.65-.18-.221-.444-.337-.59-.414-2.125-1.332-2.452-6.783-2.45-6.73-.197-2.552-1.762-4.652-3.849-5.821a8.04 8.04 0 00-.605-.307c.066-.167.1-.35.095-.538a1.422 1.422 0 00-.454-.989A1.55 1.55 0 008.817 1z'
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

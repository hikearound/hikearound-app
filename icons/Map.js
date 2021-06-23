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
    width: 22,
    height: 22,
    fill: colors.grayDark,
};

class MapIcon extends React.PureComponent {
    render() {
        const { width, height, fill, focused } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        if (!focused) {
            return (
                <Svg width={width} height={height} viewBox={viewBox}>
                    <Path
                        d='M21.389 0l-.196.037-6.526 2.53L7.333 0 .44 2.322A.616.616 0 000 2.91v18.48c0 .342.269.611.611.611l.196-.037 6.526-2.53L14.667 22l6.893-2.322a.616.616 0 00.44-.587V.611A.605.605 0 0021.389 0zM8 2.444l5.889 2.267v14.845L8 17.25V2.444zM2 3.835L6 2.5v15.467L2 19.5V3.835zm18 14.329L16 19.5V4.035L20 2.5v15.664z'
                        fill={fill}
                        fillRule='nonzero'
                    />
                </Svg>
            );
        }

        return (
            <Svg width={width} height={height} viewBox={viewBox}>
                <Path
                    d='M21.389 0l-.196.037-6.526 2.53L7.333 0 .44 2.322A.616.616 0 000 2.91v18.48c0 .342.269.611.611.611l.196-.037 6.526-2.53L14.667 22l6.893-2.322a.616.616 0 00.44-.587V.611A.605.605 0 0021.389 0zm-6.722 19.556l-7.334-2.58V2.445l7.334 2.58v14.532z'
                    fill={fill}
                    fillRule='nonzero'
                />
            </Svg>
        );
    }
}

MapIcon.propTypes = propTypes;
MapIcon.defaultProps = defaultProps;

export default MapIcon;

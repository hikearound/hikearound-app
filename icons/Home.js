import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
    focused: PropTypes.bool.isRequired,
};

const defaultProps = {
    width: 23,
    height: 22,
    fill: colors.grayDark,
};

class HomeIcon extends React.PureComponent {
    render() {
        const { width, height, fill, focused } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        if (!focused) {
            return (
                <Svg width={width} height={height} viewBox={viewBox}>
                    <Path
                        d='M11.356 1a.589.589 0 00-.432.172l-9.715 8.86a.626.626 0 00-.193.323.707.707 0 00.035.41.737.737 0 00.258.339c.098.068.217.109.352.109h1.952v9.07c0 .196.083.374.213.503a.735.735 0 00.518.214H7.76v-6.267h7.194V21h3.415a.608.608 0 00.446-.184.764.764 0 00.2-.533v-9.07h1.951a.74.74 0 00.415-.12.747.747 0 00.273-.335.678.678 0 00.043-.403.618.618 0 00-.194-.324L11.356 1z'
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
                    d='M12.482.45l9.695 8.844c1.126 1.03.347 2.919-1.212 2.919h-.952v8.07c0 .944-.692 1.717-1.645 1.717h-4.415v-6.267H8.76V22H4.344a1.73 1.73 0 01-1.73-1.717v-8.07H1.66c-1.472 0-2.25-1.89-1.126-2.92L10.231.452c.606-.601 1.645-.601 2.25 0z'
                    fill={fill}
                    fillRule='evenodd'
                />
            </Svg>
        );
    }
}

HomeIcon.propTypes = propTypes;
HomeIcon.defaultProps = defaultProps;

export default HomeIcon;

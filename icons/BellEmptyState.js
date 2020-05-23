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
    width: 43,
    height: 50,
    fill: colors.grayMedium,
};

class BellEmptyState extends React.PureComponent {
    render() {
        const { width, height, fill } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        return (
            <Svg width={width} height={height} viewBox={viewBox}>
                <Path
                    d='M16.183 42.337l10.111.03c.338.681.548 1.434.57 2.236.083 2.989-2.342 5.41-5.418 5.397-3.074-.008-5.632-2.437-5.712-5.43a5.139 5.139 0 01.45-2.233zM20.043 0c3.075.008 5.631 2.442 5.715 5.428.007.283-.038.554-.077.825 5.465 2.196 9.471 7.635 9.98 14.212 0 0 .267 10.888 4.507 13.545.137.066 2.553 1.16 2.572 3.184.017 1.912-2.345 3.46-5.3 3.433l-31.996-.293c-2.952-.027-5.549-1.62-5.44-3.525.105-1.879 2.034-2.848 2.213-2.93 4.176-2.699 3.714-13.605 3.714-13.605C5.992 13.4 9.59 8.35 14.755 6.242c-.056-.282-.12-.55-.126-.85C14.546 2.404 16.97-.009 20.044 0z'
                    fill={fill}
                    fillRule='nonzero'
                />
            </Svg>
        );
    }
}

BellEmptyState.propTypes = propTypes;
BellEmptyState.defaultProps = defaultProps;

export default BellEmptyState;

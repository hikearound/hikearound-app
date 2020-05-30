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
    width: 35,
    height: 40,
    fill: colors.grayMedium,
};

class BellEmptyState extends React.PureComponent {
    render() {
        const { width, height, fill } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        return (
            <Svg width={width} height={height} viewBox={viewBox}>
                <Path
                    d='M12.947 33.87l8.088.023c.27.545.439 1.148.457 1.79.066 2.39-1.874 4.327-4.335 4.317-2.46-.006-4.506-1.95-4.57-4.343a4.111 4.111 0 01.36-1.788zM16.035 0c2.46.006 4.504 1.953 4.571 4.343.006.226-.03.442-.061.66 4.372 1.756 7.577 6.108 7.984 11.369 0 0 .213 8.71 3.606 10.836.11.053 2.042.929 2.057 2.547.013 1.53-1.876 2.769-4.24 2.746l-25.597-.234c-2.361-.021-4.439-1.296-4.352-2.82.084-1.503 1.628-2.278 1.77-2.344 3.342-2.159 2.972-10.884 2.972-10.884.049-5.498 2.926-9.538 7.059-11.225-.045-.226-.096-.441-.101-.68-.066-2.39 1.873-4.321 4.332-4.314z'
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

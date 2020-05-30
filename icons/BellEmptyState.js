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
                    d='M16.883 43.339a4.004 4.004 0 00-.15 1.202c.033 1.228.577 2.335 1.422 3.138A4.797 4.797 0 0021.45 49c1.257.005 2.382-.482 3.184-1.28a4.172 4.172 0 001.232-3.09 4.232 4.232 0 00-.234-1.265l-8.748-.026zM20.041 1c-1.256-.004-2.381.483-3.183 1.28a4.162 4.162 0 00-1.23 3.084c.005.211.049.396.107.68l.165.811-.767.313a12.676 12.676 0 00-5.977 5.023c-1.39 2.21-2.196 4.947-2.225 8.088.013.81.107 11.676-4.294 14.507a3.594 3.594 0 00-1.212.992c-.219.29-.399.65-.423 1.087a1.21 1.21 0 00.207.716c.199.315.505.593.876.833.87.563 2.082.908 3.367.92l31.997.293c1.254.012 2.389-.295 3.205-.824.629-.407 1.092-.95 1.087-1.6-.005-.448-.205-.82-.45-1.123-.57-.71-1.408-1.099-1.654-1.223-4.334-2.716-4.935-13.53-4.974-14.322-.238-3.06-1.277-5.86-2.891-8.159A15.296 15.296 0 0025.297 7.1l-.708-.304.113-.762c.028-.19.061-.38.056-.579-.034-1.222-.58-2.33-1.426-3.134A4.795 4.795 0 0020.041 1z'
                    stroke={fill}
                    strokeWidth={2}
                    fill='none'
                    fillRule='evenodd'
                />
            </Svg>
        );
    }
}

BellEmptyState.propTypes = propTypes;
BellEmptyState.defaultProps = defaultProps;

export default BellEmptyState;

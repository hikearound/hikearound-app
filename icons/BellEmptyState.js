import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import styled from 'styled-components';
import { colors } from '@constants/Index';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fill: PropTypes.string,
};

const defaultProps = {
    width: 39,
    height: 45,
    fill: colors.purple,
};

class BellEmptyState extends React.PureComponent {
    render() {
        const { width, height, fill } = this.props;
        const viewBox = `0 0 ${width} ${height}`;

        return (
            <BellWrapper
                style={{
                    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
                }}
            >
                <Svg width={width} height={height} viewBox={viewBox}>
                    <Path
                        d='M14.565 38.103l9.1.027c.304.613.493 1.291.513 2.012.074 2.69-2.108 4.869-4.877 4.858-2.766-.007-5.069-2.194-5.14-4.886a4.625 4.625 0 01.404-2.011zM18.039 0c2.767.007 5.068 2.198 5.143 4.885.007.255-.034.498-.07.742 4.92 1.977 8.525 6.872 8.983 12.791 0 0 .24 9.8 4.056 12.19.124.06 2.298 1.046 2.315 2.866.015 1.722-2.11 3.115-4.77 3.09L4.9 36.3c-2.656-.023-4.993-1.458-4.896-3.172.095-1.69 1.832-2.563 1.993-2.638 3.758-2.428 3.342-12.244 3.342-12.244.055-6.185 3.292-10.73 7.941-12.628-.05-.254-.108-.496-.113-.765C13.09 2.163 15.273-.008 18.039 0z'
                        fill={fill}
                        fillRule='nonzero'
                    />
                </Svg>
            </BellWrapper>
        );
    }
}

BellEmptyState.propTypes = propTypes;
BellEmptyState.defaultProps = defaultProps;

export default BellEmptyState;

const BellWrapper = styled.View`
    margin-bottom: 2px;
`;

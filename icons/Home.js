import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({
    width, height, fill, viewBox
}) => (
    <Svg width={width} height={height} viewBox={viewBox}>
        <Path
            d='M13.74.496l10.674 9.735c1.239 1.134.381 3.213-1.334 3.213H22.03v8.885c0 1.04-.762 1.89-1.81 1.89h-4.86v-6.9H9.643v6.9h-4.86a1.904 1.904 0 0 1-1.906-1.89v-8.885H1.828c-1.62 0-2.477-2.079-1.239-3.213L11.263.496c.667-.661 1.81-.661 2.478 0z'
            fill={fill}
            fillRule='evenodd'
        />
    </Svg>
);

HomeIcon.defaultProps = {
    width: 25,
    height: 25,
    fill: '#8E8E93',
};

export default HomeIcon;

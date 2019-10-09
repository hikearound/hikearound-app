import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Circle, Rect } from 'react-native-svg';
import { colors } from '../../constants/Index';

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const propTypes = {
    width: PropTypes.number,
    circleDimension: PropTypes.number,
};

const defaultProps = {
    width: SCREEN_WIDTH,
    circleDimension: 30,
};

const ProfileLoadingState = ({ width, circleDimension }) => (
    <View
        style={{
            position: 'absolute',
            left: 16,
            top: 40,
        }}
    >
        <SvgAnimatedLinearGradient
            height={300}
            width={width}
            duration={1000}
            primaryColor={colors.cardGray}
            secondaryColor={colors.white}
        >
            <Circle
                cx={circleDimension}
                cy={circleDimension}
                r={circleDimension}
            />
            <Rect x='0' y='74' width='150' height='15' />
            <Rect x='0' y='97' width='120' height='11' />
        </SvgAnimatedLinearGradient>
    </View>
);

ProfileLoadingState.defaultProps = defaultProps;
ProfileLoadingState.propTypes = propTypes;

export default ProfileLoadingState;

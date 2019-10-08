import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Circle, Rect } from 'react-native-svg';
import { colors } from '../../constants/Index';

const propTypes = {
    width: PropTypes.number,
};

const defaultProps = {
    width: 275,
};

const ProfileLoadingState = ({ width }) => (
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
            primaryColor={colors.gray}
            secondaryColor={colors.white}
        >
            <Circle cx='30' cy='30' r='30' />
            <Rect x='0' y='74' width='150' height='15' />
            <Rect x='0' y='97' width='120' height='11' />
        </SvgAnimatedLinearGradient>
    </View>
);

ProfileLoadingState.defaultProps = defaultProps;
ProfileLoadingState.propTypes = propTypes;

export default ProfileLoadingState;

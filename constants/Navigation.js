import React from 'react';
import { HeaderStyleInterpolators } from '@react-navigation/stack';
import * as Device from 'expo-device';
import { colors } from '@constants/Colors';
import { fontSizes } from '@constants/Fonts';
import { getHeaderHeight } from '@utils/Navigation';
import spacing from '@constants/Spacing';
import Back from '@components/header/Back';

export const mode = 'card';
export const headerMode = 'float';
export const shadowColor = 'transparent';

export function forCustomHeaderAnimation(options) {
    const { progress } = options.current;
    const styles = HeaderStyleInterpolators.forUIKit(options);

    return {
        ...styles,
        leftButtonStyle: { opacity: progress },
        leftLabelStyle: {},
        rightButtonStyle: { opacity: progress },
        backgroundStyle: { opacity: progress },
    };
}

export function screenOptions(backgroundColor, headerTintColor = colors.white) {
    return {
        headerStyle: {
            backgroundColor,
            height: getHeaderHeight(),
            borderBottomWidth: 0,
            shadowColor,
        },
        headerLeftContainerStyle: {
            left: parseInt(spacing.micro, 10),
            marginBottom: parseInt(spacing.tiny, 10),
        },
        headerTitleContainerStyle: {
            marginBottom: parseInt(spacing.tiny, 10),
            width: '70%',
            alignItems: 'center',
        },
        headerRightContainerStyle: {
            right: parseInt(spacing.micro, 10),
            marginBottom: parseInt(spacing.tiny, 10),
        },
        headerTintColor,
        headerTitleStyle: {
            fontSize: parseInt(fontSizes.big, 10),
        },
        headerBackImage: () => <Back color={headerTintColor} />,
        headerBackTitleVisible: false,
    };
}

export function tabBarOptions(activeTintColor, inactiveTintColor, deviceType) {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        safeAreaInset: { bottom: 'never', top: 'never' },
    };

    const labelStyle = {
        marginBottom: 5,
    };

    const tabStyle = {
        paddingTop: 5,
    };

    if (deviceType === Device.DeviceType.TABLET) {
        style.paddingBottom = 10;
        labelStyle.marginBottom = 0;
    }

    return {
        activeTintColor,
        inactiveTintColor,
        labelStyle,
        tabStyle,
        style,
    };
}

export const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

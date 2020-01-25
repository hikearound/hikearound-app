import { HeaderStyleInterpolators } from 'react-navigation-stack';
import { colors } from './Colors';
import { fontSizes } from './Fonts';
import spacing from './Spacing';

export const mode = 'card';
export const headerMode = 'float';
export const shadowColor = 'transparent';
export const headerInterpolator = HeaderStyleInterpolators.forFade;

function forCustomHeaderAnimation(options) {
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

export const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        height: parseInt(spacing.header, 10),
        borderBottomWidth: 0,
        shadowColor,
    },
    headerLeftContainerStyle: {
        left: parseInt(spacing.micro, 10),
    },
    headerRightContainerStyle: {
        right: parseInt(spacing.micro, 10),
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
        fontSize: parseInt(fontSizes.big, 10),
    },
    headerBackTitleVisible: false,
    headerStyleInterpolator: forCustomHeaderAnimation,
};

export const tabBarOptions = {
    activeTintColor: {
        light: colors.purple,
        dark: colors.white,
    },
    inactiveTintColor: {
        light: colors.darkGray,
        dark: colors.gray,
    },
    labelStyle: {
        marginBottom: 0,
    },
    tabStyle: {
        marginTop: 6,
    },
};

export default {
    mode,
    headerMode,
    headerInterpolator,
    defaultNavigationOptions,
    tabBarOptions,
    forCustomHeaderAnimation,
};

import { HeaderStyleInterpolators } from 'react-navigation-stack';
import { colors } from './Colors';
import { fontSizes } from './Fonts';
import spacing from './Spacing';

export const mode = 'card';
export const headerMode = 'float';
export const headerInterpolator = HeaderStyleInterpolators.forFade;

export const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: colors.purple,
        height: parseInt(spacing.header, 10),
        borderBottomWidth: 0,
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
    headerStyleInterpolator: headerInterpolator,
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
};

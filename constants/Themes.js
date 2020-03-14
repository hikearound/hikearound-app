import { colors } from './Colors';

export const defaultTheme = {
    dark: false,
    colors: {
        // Required
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',

        // Navigation
        headerStyle: colors.purple,
        navActive: colors.purple,
        navInactive: colors.darkGray,

        // Scaffolding
        rootBackground: colors.white,
        blockView: colors.purple,
        refreshControlTint: colors.cardGray,

        // Cards
        cardBackground: colors.gray,
        cardContentBackground: colors.white,
        metaDataTypeText: colors.darkGray,
        metaDataText: colors.black,

        // Loading
        loadingPrimary: colors.cardGray,
        loadingSecondary: colors.white,
    },
};

export const darkTheme = {
    dark: true,
    colors: {
        // Required
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',

        // Navigation
        headerStyle: colors.black,
        navActive: colors.white,
        navInactive: colors.darkGray,

        // Scaffolding
        rootBackground: colors.trueBlack,
        blockView: colors.black,
        refreshControlTint: colors.white,

        // Cards
        cardBackground: colors.black,
        cardContentBackground: colors.black,
        metaDataTypeText: colors.white,
        metaDataText: colors.white,

        // Loading
        loadingPrimary: colors.black,
        loadingSecondary: colors.loadingBlack,
    },
};

export default { darkTheme, defaultTheme };

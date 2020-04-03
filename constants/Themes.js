import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { colors, transparentColors } from './Colors';

export const defaultTheme = {
    dark: false,
    colors: {
        // Required
        primary: DefaultTheme.colors.primary,
        background: DefaultTheme.colors.background,
        card: DefaultTheme.colors.card,
        text: DefaultTheme.colors.text,
        border: DefaultTheme.colors.border,

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
        cardShadow: transparentColors.gray,
        metaDataTypeText: colors.darkGray,
        metaDataText: colors.black,

        // Hikes
        mapBackground: colors.purple,
        infoBarBackground: colors.white,

        // Images
        thumbnailBackground: colors.lightGray,

        // Loading
        loadingPrimary: colors.cardGray,
        loadingSecondary: colors.white,
    },
};

export const darkTheme = {
    dark: true,
    colors: {
        // Required
        primary: DarkTheme.colors.primary,
        background: DarkTheme.colors.background,
        card: DarkTheme.colors.card,
        text: DarkTheme.colors.text,
        border: DarkTheme.colors.border,

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

        // Hikes
        mapBackground: colors.black,
        infoBarBackground: colors.nearBlack,

        // Images
        thumbnailBackground: colors.nearBlack,

        // Loading
        loadingPrimary: colors.black,
        loadingSecondary: colors.loadingBlack,
    },
};

export default { darkTheme, defaultTheme };

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
        navInactive: colors.grayDark,

        // Scaffolding
        rootBackground: colors.white,
        blockView: colors.purple,
        refreshControlTint: colors.grayLight,
        itemBorder: colors.grayUltraLight,
        sheetBackground: transparentColors.white,
        headerText: colors.grayDark,

        // Cards
        cardBackground: colors.gray,
        cardContentBackground: colors.white,
        cardShadow: transparentColors.grayLight,
        metaDataTypeText: colors.grayDark,
        metaDataText: colors.blackText,

        // Hikes
        mapBackground: colors.purple,
        infoBarBackground: colors.white,

        // Images
        thumbnailBackground: colors.grayUltraLight,

        // Buttons
        buttonBackgroundPrimary: colors.purple,
        buttonBackgroundSecondary: colors.white,
        buttonInputText: colors.purple,

        // Inputs
        inputPlaceholderText: colors.grayMedium,
        inputBackground: colors.white,

        // Loading
        loadingPrimary: colors.grayLight,
        loadingSecondary: colors.white,
        loadingSpinner: colors.grayDark,

        // Empty States
        emptyStateFill: colors.grayMedium,

        // Maps
        mapViewBackground: colors.grayUltraLight,
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
        headerStyle: DarkTheme.colors.card,
        navActive: colors.white,
        navInactive: colors.grayDark,

        // Scaffolding
        rootBackground: colors.black,
        blockView: DarkTheme.colors.card,
        refreshControlTint: colors.white,
        itemBorder: DarkTheme.colors.border,
        sheetBackground: transparentColors.blackLight,
        headerText: colors.grayLight,

        // Cards
        cardBackground: colors.blackText,
        cardContentBackground: colors.blackText,
        metaDataTypeText: colors.grayDark,
        metaDataText: colors.white,

        // Hikes
        mapBackground: DarkTheme.colors.card,
        infoBarBackground: colors.blackMedium,

        // Images
        thumbnailBackground: colors.blackMedium,

        // Buttons
        buttonBackgroundPrimary: colors.blackMedium,
        buttonBackgroundSecondary: colors.blackText,
        buttonInputText: colors.white,

        // Inputs
        inputPlaceholderText: colors.grayMedium,
        inputBackground: colors.black,

        // Loading
        loadingPrimary: colors.blackText,
        loadingSecondary: colors.blackLight,
        loadingSpinner: colors.white,

        // Empty States
        emptyStateFill: colors.white,

        // Maps
        mapViewBackground: colors.black,
    },
};

export default { darkTheme, defaultTheme };

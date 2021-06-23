import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { colors, transparentColors } from '@constants/Colors';

export const defaultTheme = {
    dark: false,
    colors: {
        // Required
        primary: DefaultTheme.colors.primary,
        background: DefaultTheme.colors.background,
        card: DefaultTheme.colors.card,
        text: DefaultTheme.colors.text,
        border: DefaultTheme.colors.border,

        // Avatar
        avatarBackground: colors.gray,

        // Navigation
        headerStyle: colors.purple,
        navActive: colors.purple,
        navInactive: colors.grayDark,

        // Scaffolding
        rootBackground: colors.white,
        blockView: colors.purple,
        refreshControlTint: colors.grayLight,
        itemBorder: colors.grayUltraLight,
        sheetBackground: DefaultTheme.colors.card,
        sheetHandle: colors.gray,
        feedText: colors.grayDark,

        // Modals
        modalButtonBorder: colors.grayLight,
        modalCtaText: colors.blackText,

        // Cards
        cardBackground: colors.gray,
        cardContentBackground: colors.white,
        cardShadow: transparentColors.grayLight,
        metaDataTypeText: colors.grayDark,
        metaDataText: colors.blackText,
        pillBorder: colors.white,

        // Hikes
        mapBackground: colors.purple,
        infoBarBackground: colors.white,

        // Images
        thumbnailBackground: colors.grayUltraLight,

        // Buttons
        buttonBackgroundPrimary: colors.purple,
        buttonBackgroundSecondary: colors.white,
        buttonInputText: colors.purple,
        likeButtonBorder: colors.grayLight,
        overflowFill: colors.gray,

        // Inputs
        inputPlaceholderText: colors.grayMedium,
        inputBackground: colors.white,

        // Loading
        loadingPrimary: colors.grayLight,
        loadingSecondary: colors.white,
        loadingSpinner: colors.grayDark,

        // Maps
        mapViewBackground: colors.grayUltraLight,
        mapButtonBackground: colors.whiteLight,

        // Onboarding
        onboardTitle: colors.blackLight,
        onboardDescription: colors.grayDark,

        // Search
        searchBackground: colors.white,

        // Sheets
        sheetDataLabel: colors.blackLight,

        // Reviews
        feedReviewBackground: colors.white,
        reviewSectionBackground: colors.whiteLight,
        emptyStarColor: colors.gray,

        // Notifications
        notifText: DefaultTheme.colors.text,
        timestampText: colors.grayDark,
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

        // Avatar
        avatarBackground: colors.blackText,

        // Navigation
        headerStyle: DarkTheme.colors.card,
        navActive: colors.white,
        navInactive: colors.grayDark,

        // Scaffolding
        rootBackground: colors.black,
        blockView: DarkTheme.colors.card,
        refreshControlTint: colors.white,
        itemBorder: DarkTheme.colors.border,
        sheetBackground: colors.blackMedium,
        sheetHandle: colors.grayDark,
        feedText: colors.grayLight,

        // Modals
        modalButtonBorder: DarkTheme.colors.border,
        modalCtaText: colors.white,

        // Cards
        cardBackground: colors.blackText,
        cardContentBackground: colors.blackText,
        metaDataTypeText: colors.grayDark,
        metaDataText: colors.white,
        pillBorder: colors.grayLight,

        // Hikes
        mapBackground: DarkTheme.colors.card,
        infoBarBackground: colors.blackMedium,

        // Images
        thumbnailBackground: colors.blackMedium,

        // Buttons
        buttonBackgroundPrimary: colors.blackMedium,
        buttonBackgroundSecondary: colors.blackText,
        buttonInputText: colors.white,
        likeButtonBorder: DarkTheme.colors.border,
        overflowFill: colors.grayMedium,

        // Inputs
        inputPlaceholderText: colors.grayMedium,
        inputBackground: colors.black,

        // Loading
        loadingPrimary: colors.blackText,
        loadingSecondary: colors.blackLight,
        loadingSpinner: colors.white,

        // Maps
        mapViewBackground: colors.black,
        mapButtonBackground: colors.blackMedium,

        // Onboarding
        onboardTitle: colors.white,
        onboardDescription: colors.grayDark,

        // Search
        searchBackground: colors.blackMedium,

        // Sheets
        sheetDataLabel: colors.white,

        // Reviews
        feedReviewBackground: colors.blackMedium,
        reviewSectionBackground: colors.blackDark,
        emptyStarColor: colors.grayDark,

        // Notifications
        notifText: colors.grayDark,
        timestampText: DarkTheme.colors.text,
    },
};

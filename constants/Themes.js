import { colors } from './Colors';

export const themes = {
    light: {
        headerStyle: colors.purple,
        refreshControlTint: colors.cardGray,
        rootBackground: colors.white,
        navActiveColor: colors.purple,
        navInactiveColor: colors.darkGray,
    },
    dark: {
        headerStyle: colors.black,
        refreshControlTint: colors.white,
        rootBackground: colors.trueBlack,
        navActiveColor: colors.white,
        navInactiveColor: colors.darkGray,
    },
};

export default { themes };

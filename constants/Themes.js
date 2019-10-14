import { colors } from './Colors';

export const themes = {
    light: {
        headerStyle: colors.purple,
        refreshControlTint: colors.cardGray,
        rootBackground: colors.white,
        navActiveColor: colors.purple,
        navInactiveColor: colors.darkGray,
        blockView: colors.purple,
    },
    dark: {
        headerStyle: colors.black,
        refreshControlTint: colors.white,
        rootBackground: colors.trueBlack,
        navActiveColor: colors.white,
        navInactiveColor: colors.darkGray,
        blockView: colors.black,
    },
};

export default { themes };

import { fontWeights, spacing, colors } from '../constants/Index';

const badgeSize = 20;

export function getTabBarBadgeStyle(theme) {
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: colors.purple,
        position: 'absolute',
        left: 0,
        top: -2,
        borderWidth: 2,
        paddingTop: 4,
        fontSize: parseInt(spacing.tiny, 10),
        width: badgeSize,
        height: badgeSize,
        borderColor: theme.colors.card,
        lineHeight: parseInt(spacing.tiny, 10),
        paddingLeft: 4.5,
        borderRadius: parseInt(spacing.tiny, 10),
        fontWeight: fontWeights.medium,
    };
}

export default getTabBarBadgeStyle;

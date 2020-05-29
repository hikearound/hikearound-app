import { colors, spacing, borderRadius } from '../constants/Index';

export function getMapSearchStyle(theme) {
    return {
        textInputContainer: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: parseInt(spacing.tiny, 10),
            right: parseInt(spacing.tiny, 10),
            top: 35,
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },
        textInput: {
            marginLeft: 0,
            marginRight: 0,
            color: colors.blackText,
            fontSize: 15,
            borderWidth: 1,
            borderColor: colors.grayUltraLight,
            height: 40,
        },
        container: {
            left: 0,
            right: 0,
            position: 'absolute',
            backgroundColor: colors.white,
            borderBottomLeftRadius: parseInt(borderRadius.medium, 10),
            borderBottomRightRadius: parseInt(borderRadius.medium, 10),
        },
        poweredContainer: {
            display: 'none',
        },
        listView: {
            marginTop: 85,
        },
        separator: {
            marginLeft: parseInt(spacing.tiny, 10),
            marginRight: parseInt(spacing.tiny, 10),
            backgroundColor: colors.grayLight,
        },
        row: {},
        powered: {},
        predefinedPlacesDescription: {},
    };
}

export default getMapSearchStyle;

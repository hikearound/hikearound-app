import Constants from 'expo-constants';
import styled from 'styled-components';
import { fontSizes, spacing, transparentColors } from '@constants/Index';

export function getMapSearchStyle(theme, hideShadow, hideBackground) {
    return {
        textInputContainer: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: parseInt(spacing.tiny, 10),
            right: parseInt(spacing.tiny, 10),
            top: Constants.statusBarHeight,
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },
        textInput: {
            marginLeft: 0,
            marginRight: 0,
            color: theme.colors.text,
            fontSize: parseInt(fontSizes.medium, 10),
            paddingLeft: parseInt(spacing.tiny, 10),
            borderWidth: 1,
            borderColor: theme.colors.border,
            height: 38,
            borderRadius: parseInt(spacing.tiny, 10),
            backgroundColor: theme.colors.searchBackground,
            shadowColor: hideShadow
                ? 'transparent'
                : transparentColors.grayLight,
            shadowOpacity: 1,
            shadowRadius: 3,
            shadowOffset: {
                width: 0,
                height: 2,
            },
        },
        container: {
            left: 0,
            right: 0,
            position: 'absolute',
            backgroundColor: hideBackground
                ? 'transparent'
                : theme.colors.searchBackground,
            borderBottomLeftRadius: parseInt(spacing.tiny, 10),
            borderBottomRightRadius: parseInt(spacing.tiny, 10),
        },
        poweredContainer: {
            display: 'none',
        },
        listView: {
            marginTop: Constants.statusBarHeight + 40,
            marginLeft: parseInt(spacing.tiny, 10),
            marginRight: parseInt(spacing.tiny, 10),
            minHeight: 10,
            backgroundColor: theme.colors.searchBackground,
            borderRadius: parseInt(spacing.tiny, 10),
            paddingTop: parseInt(spacing.micro, 10),
            paddingBottom: parseInt(spacing.tiny, 10),
            paddingHorizontal: parseInt(spacing.micro, 10),
        },
        separator: {
            backgroundColor: theme.colors.border,
            height: 1,
            marginVertical: parseInt(spacing.micro, 10),
        },
        row: {
            paddingVertical: parseInt(spacing.tiny, 10),
            paddingHorizontal: parseInt(spacing.micro, 10),
            backgroundColor: 'transparent',
        },
        powered: {
            display: 'none',
        },
        predefinedPlacesDescription: {},
        description: {
            color: theme.colors.text,
            fontSize: parseInt(fontSizes.small, 10),
            paddingLeft: 0,
        },
    };
}

export const EmptyStateText = styled.Text`
    color: ${(props) => props.theme.text};
    font-size: ${fontSizes.small}px;
    padding: 13px 0 16px 0;
`;

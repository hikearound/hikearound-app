import Constants from 'expo-constants';
import styled from 'styled-components';
import { fontSizes, spacing, fontWeights } from '../constants/Index';

export function getMapSearchStyle(theme) {
    return {
        textInputContainer: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: parseInt(spacing.tiny, 10),
            right: parseInt(spacing.tiny, 10),
            top: Constants.statusBarHeight - 5,
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },
        textInput: {
            marginLeft: 0,
            marginRight: 0,
            color: theme.colors.text,
            fontSize: parseInt(fontSizes.medium, 10),
            borderWidth: 1,
            borderColor: theme.colors.border,
            height: 38,
            backgroundColor: theme.colors.searchBackground,
        },
        container: {
            left: 0,
            right: 0,
            position: 'absolute',
            backgroundColor: theme.colors.searchBackground,
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
        },
        separator: {
            backgroundColor: theme.colors.border,
            height: 1,
        },
        row: {
            paddingLeft: 0,
        },
        powered: {},
        predefinedPlacesDescription: {},
        description: {
            color: theme.colors.text,
            fontSize: parseInt(fontSizes.small, 10),
        },
    };
}

export const SearchStat = styled.View`
    padding: ${spacing.tiny}px;
    border-bottom-width: 1px;
    border-bottom-width: ${(props) => (props.hideBorder ? 0 : '1px')};
    border-bottom-color: ${(props) => props.theme.itemBorder};
`;

export const StatText = styled.Text`
    color: ${(props) => props.theme.feedText};
    font-size: ${fontSizes.extraSmall}px;
    font-weight: ${fontWeights.medium};
    text-transform: uppercase;
`;

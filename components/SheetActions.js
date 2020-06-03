import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withTheme } from '../utils/Themes';
import {
    spacing,
    fontSizes,
    opacities,
    fontWeights,
    colors,
    borderRadius,
} from '../constants/Index';
import { openHikeScreen } from '../utils/Hike';
import { withNavigation } from '../utils/Navigation';
import { getDrivingDirections } from '../utils/Map';

const propTypes = {
    selectedHike: PropTypes.string.isRequired,
    coordinates: PropTypes.object.isRequired,
};

class SheetActions extends React.PureComponent {
    renderHikeButton = () => {
        const { selectedHike, navigation, t } = this.props;

        return (
            <TouchableOpacity
                onPress={() => {
                    openHikeScreen(selectedHike, navigation);
                }}
                activeOpacity={opacities.regular}
            >
                <Button primary>
                    <Text primary>{t('sheet.map.actions.hike')}</Text>
                </Button>
            </TouchableOpacity>
        );
    };

    renderDirectionsButton = () => {
        const { coordinates, t } = this.props;
        const { lat, lng } = coordinates;

        return (
            <TouchableOpacity
                onPress={() => {
                    getDrivingDirections(lat, lng);
                }}
                activeOpacity={opacities.regular}
            >
                <Button>
                    <Text>{t('sheet.hike.item.directions')}</Text>
                </Button>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <ActionWrapper>
                {this.renderDirectionsButton()}
                {this.renderHikeButton()}
            </ActionWrapper>
        );
    }
}

SheetActions.propTypes = propTypes;

export default withTranslation()(withNavigation(withTheme(SheetActions)));

const Text = styled.Text`
    color: ${(props) => (props.primary ? colors.white : props.theme.text)};
    font-size: ${fontSizes.large}px;
    font-weight: ${fontWeights.medium};
    text-align: center;
`;

const Button = styled.View`
    border: 1px;
    border-color: ${(props) => props.theme.itemBorder};
    border-radius: ${borderRadius.medium}px;
    padding: ${spacing.tiny}px;
    margin-top: ${spacing.tiny}px;
    background-color: ${(props) =>
        props.primary ? colors.purple : props.theme.sheetBackground};
`;

const ActionWrapper = styled.View`
    margin-top: ${spacing.tiny}px;
`;

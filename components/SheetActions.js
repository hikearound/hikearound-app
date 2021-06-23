import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@utils/Themes';
import { opacities } from '@constants/Index';
import { openHikeScreen } from '@utils/Hike';
import { withNavigation } from '@utils/Navigation';
import { getDrivingDirections } from '@utils/Map';
import { ActionWrapper, Button, Text } from '@styles/Actions';

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
                    openHikeScreen(selectedHike, navigation, {});
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

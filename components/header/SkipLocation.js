import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { spacing, opacities, colors, fontSizes } from '../../constants/Index';

const propTypes = {
    permissionAction: PropTypes.func.isRequired,
    openHomeScreen: PropTypes.func.isRequired,
};

class SkipLocation extends React.PureComponent {
    showAlert = () => {
        const { openHomeScreen, permissionAction, t } = this.props;

        Alert.alert(
            t('label.common.warning'),
            t('screen.onboard.permission.warning', {
                appName: t('common.appName', { count: 1 }),
            }),
            [
                {
                    text: t('label.common.continue'),
                    onPress: () => openHomeScreen(),
                },
                {
                    text: t('screen.onboard.permission.button'),
                    onPress: () => permissionAction(),
                },
            ],
            { cancelable: false },
        );
    };

    render() {
        return (
            <TouchableOpacity
                activeOpacity={opacities.regular}
                onPress={this.showAlert}
            >
                <Text>Skip</Text>
            </TouchableOpacity>
        );
    }
}

SkipLocation.propTypes = propTypes;

export default SkipLocation;

const Text = styled.Text`
    margin-right: ${spacing.micro}px;
    color: ${colors.white};
    font-size: ${fontSizes.extraLarge}px;
`;

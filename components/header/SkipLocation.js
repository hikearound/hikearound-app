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
    getTitle = (t) => {
        return t('label.common.warning');
    };

    getMessage = (t) => {
        return t('screen.onboard.permission.warning', {
            appName: t('common.appName', { count: 1 }),
        });
    };

    getOptions = (t) => {
        const { openHomeScreen, permissionAction } = this.props;

        return [
            {
                text: t('label.common.continue'),
                onPress: () => openHomeScreen(),
            },
            {
                text: t('screen.onboard.permission.button'),
                onPress: () => permissionAction(),
            },
        ];
    };

    showAlert = () => {
        const { t } = this.props;
        const title = this.getTitle(t);
        const message = this.getMessage(t);
        const options = this.getOptions(t);

        Alert.alert(title, message, options, { cancelable: false });
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

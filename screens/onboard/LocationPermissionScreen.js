import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';
import { fontSizes, spacing, colors, fontWeights } from '../../constants/Index';
import { withTheme } from '../../utils/Themes';
import InputButton from '../../components/InputButton';
import SkipLocation from '../../components/header/SkipLocation';
import { requestLocationPermission } from '../../utils/Location';

class LocationPermissionScreen extends React.Component {
    constructor(props) {
        super(props);
        const { navigation, t } = this.props;

        navigation.setOptions({
            headerRight: () => (
                <SkipLocation
                    t={t}
                    openHomeScreen={this.openHomeScreen}
                    permissionAction={this.getLocationPermissions}
                />
            ),
        });
    }

    getLocationPermissions = async () => {
        const status = await requestLocationPermission();

        if (status === 'granted') {
            this.openHomeScreen();
        }
    };

    openHomeScreen = () => {
        const { navigation } = this.props;
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        navigation.dispatch(resetAction);
    };

    render() {
        const { t } = this.props;

        return (
            <RootView>
                <MaterialIcons
                    name='location-on'
                    color={colors.purple}
                    size={64}
                />
                <Title>{t('screen.onboard.permission.title')}</Title>
                <Description>
                    {t('screen.onboard.permission.description')}
                </Description>
                <ButtonWrapper>
                    <InputButton
                        text={t('screen.onboard.permission.button')}
                        action={this.getLocationPermissions}
                    />
                </ButtonWrapper>
            </RootView>
        );
    }
}

export default withTranslation()(withTheme(LocationPermissionScreen));

const RootView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.rootBackground};
    margin-top: -${spacing.header}px;
    width: 100%;
`;

const ButtonWrapper = styled.View`
    width: 100%;
`;

const Title = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.onboardTitle};
    font-size: ${fontSizes.extraLarge}px;
    font-weight: ${fontWeights.medium};
`;

const Description = styled.Text`
    margin-top: ${spacing.micro}px;
    color: ${(props) => props.theme.onboardDescription};
    font-size: ${fontSizes.medium}px;
    text-align: center;
    padding: 0 ${spacing.small}px;
`;

import React from 'react';
import { CommonActions } from '@react-navigation/native';
import { withTranslation } from 'react-i18next';
import { withTheme } from '../../utils/Themes';
import LocationUpsell from '../../components/LocationUpsell';
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
        return (
            <LocationUpsell
                getLocationPermissions={this.getLocationPermissions}
            />
        );
    }
}

export default withTranslation()(withTheme(LocationPermissionScreen));

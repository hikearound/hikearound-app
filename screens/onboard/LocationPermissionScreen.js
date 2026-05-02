import React from 'react';
import { withTranslation } from 'react-i18next';
import { withTheme } from '@utils/Themes';
import LocationUpsell from '@components/LocationUpsell';
import SkipLocation from '@components/header/SkipLocation';
import { requestLocationPermission } from '@utils/Location';

const buildHeaderRight = (t, openHomeScreen, permissionAction) =>
  function HeaderRight() {
    return (
      <SkipLocation
        t={t}
        openHomeScreen={openHomeScreen}
        permissionAction={permissionAction}
      />
    );
  };

class LocationPermissionScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation, t } = this.props;

    navigation.setOptions({
      headerRight: buildHeaderRight(
        t,
        this.openHomeScreen,
        this.getLocationPermissions
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
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'HomeTab',
          state: {
            routes: [{ name: 'HomeScreen' }],
          },
        },
      ],
    });
  };

  render() {
    return (
      <LocationUpsell getLocationPermissions={this.getLocationPermissions} />
    );
  }
}

export default withTranslation()(withTheme(LocationPermissionScreen));

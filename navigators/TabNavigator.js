import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { withTranslation } from 'react-i18next';
import * as Device from 'expo-device';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStack from '@stacks/HomeStack';
import MapStack from '@stacks/MapStack';
import NotificationStack from '@stacks/NotificationStack';
import ProfileStack from '@stacks/ProfileStack';
import { HomeIcon, BellIcon, PersonIcon, MapIcon } from '@icons/Index';
import { withTheme } from '@utils/Themes';
import { getTabBarBadgeStyle } from '@styles/Badge';

const propTypes = {
  notifBadgeCount: PropTypes.number,
};

const defaultProps = {
  notifBadgeCount: 0,
};

const Tab = createBottomTabNavigator();

const setFill = (focused, theme) => {
  if (focused) {
    return theme.colors.navActive;
  }
  return theme.colors.navInactive;
};

const onTabPress = () => {
  Haptics.selectionAsync();
};

const buildHomeTabBarIcon = theme =>
  function HomeTabBarIcon({ focused }) {
    return <HomeIcon fill={setFill(focused, theme)} focused={focused} />;
  };

const buildMapTabBarIcon = theme =>
  function MapTabBarIcon({ focused }) {
    return (
      <MapIcon size={30} fill={setFill(focused, theme)} focused={focused} />
    );
  };

const buildNotificationTabBarIcon = theme =>
  function NotificationTabBarIcon({ focused }) {
    return <BellIcon fill={setFill(focused, theme)} focused={focused} />;
  };

const buildProfileTabBarIcon = theme =>
  function ProfileTabBarIcon({ focused }) {
    return <PersonIcon fill={setFill(focused, theme)} focused={focused} />;
  };

function mapStateToProps(state) {
  return {
    notifBadgeCount: state.userReducer.notifBadgeCount,
    tabBarHeight: state.navigationReducer.tabBarHeight,
  };
}

function mapDispatchToProps() {
  return {};
}

class TabNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceType: Device.DeviceType.PHONE,
    };
  }

  componentDidMount() {
    this.getDeviceType();
  }

  renderTabBarBadge = () => {
    const { notifBadgeCount } = this.props;

    if (notifBadgeCount > 0) {
      return notifBadgeCount;
    }

    return null;
  };

  renderHomeStack = t => {
    const { theme } = this.props;
    return (
      <Tab.Screen
        name='HomeTab'
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabel: t('label.nav.home'),
          tabBarIcon: buildHomeTabBarIcon(theme),
          tabBarStyle: this.getTabBarStyle(route),
        })}
        listeners={{
          tabPress: onTabPress,
        }}
      />
    );
  };

  renderMapStack = t => {
    const { theme } = this.props;
    return (
      <Tab.Screen
        name='MapTab'
        component={MapStack}
        options={({ route }) => ({
          tabBarLabel: t('label.nav.map'),
          tabBarIcon: buildMapTabBarIcon(theme),
          tabBarStyle: this.getTabBarStyle(route),
        })}
        listeners={{
          tabPress: onTabPress,
        }}
      />
    );
  };

  renderNotificationStack = t => {
    const { theme } = this.props;

    return (
      <Tab.Screen
        name='NotificationTab'
        component={NotificationStack}
        options={({ route }) => ({
          tabBarLabel: t('label.nav.notifications'),
          tabBarIcon: buildNotificationTabBarIcon(theme),
          tabBarBadge: this.renderTabBarBadge(),
          tabBarBadgeStyle: getTabBarBadgeStyle(theme),
          tabBarStyle: this.getTabBarStyle(route),
        })}
        listeners={{
          tabPress: onTabPress,
        }}
      />
    );
  };

  renderProfileStack = t => {
    const { theme } = this.props;
    return (
      <Tab.Screen
        name='ProfileTab'
        component={ProfileStack}
        options={({ route }) => ({
          tabBarLabel: t('label.nav.you'),
          tabBarIcon: buildProfileTabBarIcon(theme),
          tabBarStyle: this.getTabBarStyle(route),
        })}
        listeners={{
          tabPress: onTabPress,
        }}
      />
    );
  };

  getDeviceType = async () => {
    const deviceType = await Device.getDeviceTypeAsync();
    this.setState({ deviceType });
  };

  getTabBarStyle = route => {
    const { deviceType } = this.state;
    const routeName = getFocusedRouteNameFromRoute(route);
    const authScreens = ['Landing', 'SignIn', 'CreateAccount'];

    // Hide tab bar on auth screens
    if (authScreens.includes(routeName)) {
      return { display: 'none' };
    }

    // Show tab bar on all main app screens
    const appScreens = [
      // Home tab screens
      'HomeScreen',
      'Hike',
      'Search',
      'Review',
      // Map tab screens
      'Map',
      'MapScreen',
      // Notification tab screens
      'Notification',
      // Profile tab screens
      'Profile',
      'ProfileScreen',
      'Settings',
    ];

    // If we know it's an app screen OR if routeName is undefined (initial load), show tab bar
    if (
      appScreens.includes(routeName) ||
      routeName === undefined ||
      routeName === null
    ) {
      return {
        height: deviceType === Device.DeviceType.TABLET ? 100 : 90,
        paddingBottom: deviceType === Device.DeviceType.TABLET ? 35 : 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        elevation: 0,
        shadowOpacity: 0,
      };
    }

    // Default: hide tab bar for any other screen
    return { display: 'none' };
  };

  render() {
    const { theme, t } = this.props;
    const { deviceType } = this.state;

    return (
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.navActive,
          tabBarInactiveTintColor: theme.colors.navInactive,
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 6,
            marginBottom: deviceType === Device.DeviceType.TABLET ? 4 : 4,
          },
          tabBarItemStyle: {
            paddingTop: 12,
            paddingBottom: 0,
          },
          tabBarIconStyle: {
            marginTop: 0,
            marginBottom: 2,
          },
        })}
      >
        {this.renderHomeStack(t)}
        {this.renderMapStack(t)}
        {this.renderNotificationStack(t)}
        {this.renderProfileStack(t)}
      </Tab.Navigator>
    );
  }
}

TabNavigator.propTypes = propTypes;
TabNavigator.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withTheme(TabNavigator)));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ProfileScreen,
  SettingsScreen,
  HikeScreen,
  NotificationSettingsScreen,
  PasswordScreen,
} from '@screens/Index';
import { screenOptions } from '@constants/Navigation';
import { withTheme } from '@utils/Themes';
import { setFocusedStack } from '@actions/Navigation';
import ToastProvider from '@providers/ToastProvider';
import { colors } from '@constants/Colors';

const propTypes = {
  dispatchFocusedStack: PropTypes.func.isRequired,
  focusedStack: PropTypes.string.isRequired,
  stackName: PropTypes.string,
};

const defaultProps = {
  stackName: 'Profile',
};

function mapStateToProps(state) {
  return {
    focusedStack: state.navigationReducer.focusedStack,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFocusedStack: stackName => dispatch(setFocusedStack(stackName)),
  };
}

const Stack = createStackNavigator();

const renderProfileScreen = t => (
  <Stack.Screen
    name='Profile'
    component={ProfileScreen}
    options={{
      headerTitle: t('label.nav.you'),
    }}
  />
);

const renderHikeScreen = () => (
  <Stack.Screen name='Hike' component={HikeScreen} />
);

const renderSettingsScreen = t => (
  <Stack.Screen
    name='Settings'
    component={SettingsScreen}
    options={{
      headerTitle: t('label.nav.settings'),
    }}
  />
);

const renderNotificationSettingsScreen = t => (
  <Stack.Screen
    name='NotificationSettings'
    component={NotificationSettingsScreen}
    options={{
      headerTitle: t('label.nav.notifications'),
    }}
  />
);

const renderPasswordScreen = t => (
  <Stack.Screen
    name='Password'
    component={PasswordScreen}
    options={{
      headerTitle: t('label.nav.password'),
    }}
  />
);

class ProfileStack extends React.PureComponent {
  componentDidMount() {
    const { navigation, dispatchFocusedStack, stackName } = this.props;

    this.unsubscribe = navigation.addListener('focus', () => {
      dispatchFocusedStack(stackName);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { stackName, focusedStack, theme, t } = this.props;
    const enableToast = stackName === focusedStack;

    return (
      <>
        <Stack.Navigator
          initialRouteName={stackName}
          screenOptions={screenOptions(
            theme.colors.headerStyle,
            theme.colors.headerStyle === 'white' ? 'black' : colors.white
          )}
        >
          {renderProfileScreen(t)}
          {renderHikeScreen()}
          {renderSettingsScreen(t)}
          {renderNotificationSettingsScreen(t)}
          {renderPasswordScreen(t)}
        </Stack.Navigator>
        {enableToast && <ToastProvider />}
      </>
    );
  }
}

ProfileStack.propTypes = propTypes;
ProfileStack.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(withTheme(ProfileStack)));

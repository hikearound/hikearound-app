import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { NotificationScreen, HikeScreen, ReviewScreen } from '@screens/Index';
import { screenOptions } from '@constants/Navigation';
import { withTheme } from '@utils/Themes';

const Stack = createStackNavigator();

const renderNotificationScreen = t => (
  <Stack.Screen
    name='Notification'
    component={NotificationScreen}
    options={{
      headerTitle: t('label.nav.notifications'),
    }}
  />
);

const renderHikeScreen = () => (
  <Stack.Screen name='Hike' component={HikeScreen} />
);

const renderReviewScreen = t => (
  <Stack.Screen
    name='Review'
    component={ReviewScreen}
    options={{
      headerTitle: t('label.nav.review'),
    }}
  />
);

class NotificationStack extends React.PureComponent {
  render() {
    const { theme, t } = this.props;

    return (
      <Stack.Navigator
        initialRouteName='Notification'
        screenOptions={screenOptions(theme.colors.headerStyle)}
      >
        {renderNotificationScreen(t)}
        {renderReviewScreen(t)}
        {renderHikeScreen()}
      </Stack.Navigator>
    );
  }
}

export default withTranslation()(withTheme(NotificationStack));

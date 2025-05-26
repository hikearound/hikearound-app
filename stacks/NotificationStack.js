import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { NotificationScreen, HikeScreen, ReviewScreen } from '@screens/Index';
import { screenOptions } from '@constants/Navigation';
import { withTheme } from '@utils/Themes';

const Stack = createStackNavigator();

class NotificationStack extends React.PureComponent {
    renderNotificationScreen = (t) => (
        <Stack.Screen
            name='Notification'
            component={NotificationScreen}
            options={{
                headerTitle: t('label.nav.notifications'),
            }}
        />
    );

    renderHikeScreen = () => (
        <Stack.Screen name='Hike' component={HikeScreen} />
    );

    renderReviewScreen = (t) => (
        <Stack.Screen
            name='Review'
            component={ReviewScreen}
            options={{
                headerTitle: t('label.nav.review'),
            }}
        />
    );

    render() {
        const { theme, t } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Notification'
                screenOptions={screenOptions(theme.colors.headerStyle)}
            >
                {this.renderNotificationScreen(t)}
                {this.renderReviewScreen(t)}
                {this.renderHikeScreen()}
            </Stack.Navigator>
        );
    }
}

export default withTranslation()(withTheme(NotificationStack));

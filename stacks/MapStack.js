import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
import { MapScreen, HikeScreen } from '../screens/Index';
import { mode, headerMode, screenOptions } from '../constants/Navigation';
import { withTheme } from '../utils/Themes';

const Stack = createStackNavigator();

class HomeStack extends React.Component {
    renderMapScreen = (t) => {
        return (
            <Stack.Screen
                name='Map'
                component={MapScreen}
                options={{
                    headerTitle: t('label.nav.map'),
                }}
            />
        );
    };

    renderHikeScreen = () => {
        return <Stack.Screen name='Hike' component={HikeScreen} />;
    };

    render() {
        const { theme, t } = this.props;

        return (
            <Stack.Navigator
                initialRouteName='Map'
                screenOptions={screenOptions(theme.colors.headerStyle)}
                headerMode={headerMode}
                mode={mode}
            >
                {this.renderMapScreen(t)}
                {this.renderHikeScreen()}
            </Stack.Navigator>
        );
    }
}

export default withTranslation()(withTheme(HomeStack));

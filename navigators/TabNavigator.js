import * as Haptics from 'expo-haptics';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { tabBarOptions } from '../constants/Navigation';
import HomeStack from '../stacks/HomeStack';
import NotificationStack from '../stacks/NotificationStack';
import ProfileStack from '../stacks/ProfileStack';

const TabNavigator = createBottomTabNavigator(
    {
        HomeStack,
        NotificationStack,
        ProfileStack,
    },
    {
        defaultNavigationOptions: {
            tabBarOnPress: ({ defaultHandler }) => {
                Haptics.selectionAsync();
                defaultHandler();
            },
        },
        tabBarOptions,
    },
);

export default TabNavigator;

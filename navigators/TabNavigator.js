import * as Haptics from 'expo-haptics';
import { createCompatNavigatorFactory } from '@react-navigation/compat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabBarOptions } from '../constants/Navigation';
import HomeStack from '../stacks/HomeStack';
import NotificationStack from '../stacks/NotificationStack';
import ProfileStack from '../stacks/ProfileStack';

const TabNavigator = createCompatNavigatorFactory(createBottomTabNavigator)(
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

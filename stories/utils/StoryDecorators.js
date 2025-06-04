import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@constants/Themes';

const Stack = createStackNavigator();

const withNavigation = (story, options = {}) => {
    const content = story();
    const {
        headerTitle,
        additionalProviders = [],
        theme = defaultTheme.colors,
    } = options;

    // Only wrap with navigation components in standalone mode
    if (process.env.STORYBOOK_STANDALONE) {
        const navigationContent = (
            <NavigationContainer>
                <Stack.Navigator
                    independent
                    screenOptions={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: defaultTheme.colors.rootBackground,
                        },
                        headerTintColor: defaultTheme.colors.text,
                    }}
                >
                    <Stack.Screen
                        name={headerTitle}
                        options={{
                            headerTitle,
                        }}
                    >
                        {() => content}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );

        // Wrap with additional providers if provided
        const wrappedContent = additionalProviders.reduce(
            (acc, Provider) => <Provider>{acc}</Provider>,
            navigationContent,
        );

        return <ThemeProvider theme={theme}>{wrappedContent}</ThemeProvider>;
    }

    // In app mode, just wrap with theme provider and any additional providers
    const wrappedContent = additionalProviders.reduce(
        (acc, Provider) => <Provider>{acc}</Provider>,
        content,
    );

    return <ThemeProvider theme={theme}>{wrappedContent}</ThemeProvider>;
};

export default withNavigation;

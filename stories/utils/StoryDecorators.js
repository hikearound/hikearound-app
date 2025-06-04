import React, { useMemo, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@constants/Themes';
import { View, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
});

// Create a persistent navigation container that will be reused across stories
const PersistentNavigationContainer = ({ children }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start fade out
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            // Fade in the content
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }, 300);

        return () => clearTimeout(timer);
    }, [children, fadeAnim]);

    const navigationContent = useMemo(
        () => (
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
                    {children}
                </Stack.Navigator>
            </NavigationContainer>
        ),
        [children],
    );

    return (
        <View style={{ flex: 1 }}>
            <Animated.View
                style={[styles.contentContainer, { opacity: fadeAnim }]}
            >
                {navigationContent}
            </Animated.View>
        </View>
    );
};

PersistentNavigationContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const StoryChangeLogger = ({ children, storyTitle }) => {
    useEffect(() => {
        // console.log('Story changed:', storyTitle);
    }, [storyTitle]);

    return children;
};

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
            <PersistentNavigationContainer>
                <Stack.Screen
                    name={headerTitle}
                    options={{
                        headerTitle,
                    }}
                >
                    {() => (
                        <StoryChangeLogger storyTitle={headerTitle}>
                            {content}
                        </StoryChangeLogger>
                    )}
                </Stack.Screen>
            </PersistentNavigationContainer>
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
        <StoryChangeLogger storyTitle={headerTitle}>
            {content}
        </StoryChangeLogger>,
    );

    return <ThemeProvider theme={theme}>{wrappedContent}</ThemeProvider>;
};

export default withNavigation;

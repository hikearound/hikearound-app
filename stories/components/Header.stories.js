import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, boolean, select } from '@storybook/addon-knobs';
import { withTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from '@constants/Themes';
import Header from '@components/Header';
import CenteredContainer from '../styles/StoryStyles';

const Stack = createStackNavigator();
const TranslatedHeader = withTranslation()(Header);

const getTheme = (themeName) => {
    const theme = themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;
    return {
        ...theme,
        mode: themeName,
    };
};

// Create a screen component that will be used in the navigator
const HeaderScreen = () => (
    <CenteredContainer>
        <TranslatedHeader
            title={text('Title', 'Default Header')}
            includeTopBorder={boolean('Include Top Border', false)}
            isLoggedOut={boolean('Is Logged Out', false)}
        />
    </CenteredContainer>
);

const HeaderWithBorderScreen = () => (
    <CenteredContainer>
        <TranslatedHeader
            title={text('Title', 'Header with Border')}
            includeTopBorder
            isLoggedOut={false}
        />
    </CenteredContainer>
);

const HeaderLoggedOutScreen = () => (
    <CenteredContainer>
        <TranslatedHeader
            title={text('Title', 'Logged Out Header')}
            includeTopBorder={false}
            isLoggedOut
        />
    </CenteredContainer>
);

storiesOf('Header', module)
    .addDecorator((story) => (
        <ThemeProvider
            theme={getTheme(
                select('Theme', { light: 'light', dark: 'dark' }, 'light'),
            )}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Header'>{() => story()}</Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    ))
    .add('Default', () => <HeaderScreen />)
    .add('With Top Border', () => <HeaderWithBorderScreen />)
    .add('Logged Out State', () => <HeaderLoggedOutScreen />);

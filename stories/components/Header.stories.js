import React from 'react';
import styled from 'styled-components/native';
import { storiesOf } from '@storybook/react-native';
import { text, boolean, select } from '@storybook/addon-knobs';
import { withTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { defaultTheme, darkTheme } from '@constants/Themes';
import Header from '@components/Header';

const TranslatedHeader = withTranslation()(Header);

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: ${(props) => props.theme.rootBackground};
`;

const getTheme = (themeName) =>
    themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;

storiesOf('Header', module)
    .addDecorator((story) => {
        const selectedTheme = select(
            'Theme',
            {
                Light: 'light',
                Dark: 'dark',
            },
            'light',
        );

        return (
            <ThemeProvider theme={getTheme(selectedTheme)}>
                <CenteredView>{story()}</CenteredView>
            </ThemeProvider>
        );
    })
    .add('Default', () => (
        <TranslatedHeader
            title={text('Title', 'Default Header')}
            includeTopBorder={boolean('Include Top Border', false)}
            isLoggedOut={boolean('Is Logged Out', false)}
        />
    ))
    .add('With Top Border', () => (
        <TranslatedHeader
            title={text('Title', 'Header with Border')}
            includeTopBorder
            isLoggedOut={false}
        />
    ))
    .add('Logged Out State', () => (
        <TranslatedHeader
            title={text('Title', 'Logged Out Header')}
            includeTopBorder={false}
            isLoggedOut
        />
    ));

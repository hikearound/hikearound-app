import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { text, boolean } from '@storybook/addon-knobs';
import { withTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import Header from '@components/Header';
import { StoryContainer } from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';
import { withThemeSelection } from '../utils/ThemeUtils';
import { HEADER_NOTES } from '../constants/Notes';

const TranslatedHeader = withTranslation()(Header);

const HeaderScreen = ({ theme }) => (
    <StoryContainer backgroundColor={theme.background}>
        <ThemeProvider theme={theme}>
            <TranslatedHeader
                title={text('Title', 'Default Header')}
                includeTopBorder={boolean('Include Top Border', false)}
                isLoggedOut={boolean('Is Logged Out', false)}
            />
        </ThemeProvider>
    </StoryContainer>
);

const HeaderWithBorderScreen = ({ theme }) => (
    <StoryContainer backgroundColor={theme.background}>
        <ThemeProvider theme={theme}>
            <TranslatedHeader
                title={text('Title', 'Header with Border')}
                includeTopBorder
                isLoggedOut={false}
            />
        </ThemeProvider>
    </StoryContainer>
);

const HeaderLoggedOutScreen = ({ theme }) => (
    <StoryContainer backgroundColor={theme.background}>
        <ThemeProvider theme={theme}>
            <TranslatedHeader
                title={text('Title', 'Logged Out Header')}
                includeTopBorder={false}
                isLoggedOut
            />
        </ThemeProvider>
    </StoryContainer>
);

const stories = storiesOf('Header', module);

stories.addDecorator(withBackgrounds);
stories.addDecorator((Story) =>
    withNavigation(() => <Story />, {
        headerTitle: 'Header',
    }),
);

stories.add('Default', () => withThemeSelection(HeaderScreen)(), {
    notes: HEADER_NOTES.DEFAULT,
});

stories.add(
    'With Top Border',
    () => withThemeSelection(HeaderWithBorderScreen)(),
    {
        notes: HEADER_NOTES.WITH_TOP_BORDER,
    },
);

stories.add(
    'Logged Out State',
    () => withThemeSelection(HeaderLoggedOutScreen)(),
    {
        notes: HEADER_NOTES.LOGGED_OUT,
    },
);

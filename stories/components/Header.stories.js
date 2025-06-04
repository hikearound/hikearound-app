import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { text, boolean, select } from '@storybook/addon-knobs';
import { withTranslation } from 'react-i18next';
import { defaultTheme, darkTheme } from '@constants/Themes';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import Header from '@components/Header';
import { StoryContainer } from '../styles/Story';
import withNavigation from '../utils/StoryDecorators';

const TranslatedHeader = withTranslation()(Header);

const getTheme = (themeName) => {
    const theme = themeName === 'dark' ? darkTheme.colors : defaultTheme.colors;
    return {
        ...theme,
        mode: themeName,
    };
};

const withStoryProps = (Component) => {
    Component.propTypes = {
        backgroundColor: PropTypes.string,
    };
    Component.defaultProps = {
        backgroundColor: 'transparent',
    };
    return Component;
};

// Create a screen component that will be used in the navigator
const HeaderScreen = withStoryProps(({ backgroundColor }) => (
    <StoryContainer backgroundColor={backgroundColor}>
        <TranslatedHeader
            title={text('Title', 'Default Header')}
            includeTopBorder={boolean('Include Top Border', false)}
            isLoggedOut={boolean('Is Logged Out', false)}
        />
    </StoryContainer>
));

const HeaderWithBorderScreen = withStoryProps(({ backgroundColor }) => (
    <StoryContainer backgroundColor={backgroundColor}>
        <TranslatedHeader
            title={text('Title', 'Header with Border')}
            includeTopBorder
            isLoggedOut={false}
        />
    </StoryContainer>
));

const HeaderLoggedOutScreen = withStoryProps(({ backgroundColor }) => (
    <StoryContainer backgroundColor={backgroundColor}>
        <TranslatedHeader
            title={text('Title', 'Logged Out Header')}
            includeTopBorder={false}
            isLoggedOut
        />
    </StoryContainer>
));

const stories = storiesOf('Header', module);

stories.addDecorator(withBackgrounds);
stories.addDecorator((story) =>
    withNavigation(story, {
        headerTitle: 'Header',
        theme: getTheme(
            select('Theme', { light: 'light', dark: 'dark' }, 'light'),
        ),
    }),
);

stories.add('Default', (props) => <HeaderScreen {...props} />, {
    notes: 'The default header component with customizable title and no top border. Use the knobs to modify the title and toggle the top border.',
});

stories.add(
    'With Top Border',
    (props) => <HeaderWithBorderScreen {...props} />,
    {
        notes: 'This variant shows the header with a top border. The border helps visually separate the header from the content below it.',
    },
);

stories.add(
    'Logged Out State',
    (props) => <HeaderLoggedOutScreen {...props} />,
    {
        notes: 'This variant demonstrates the header in a logged-out state. The header adjusts its appearance and functionality when the user is not logged in.',
    },
);

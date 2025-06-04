import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { defaultTheme } from '@constants/Themes';
import { Container, WelcomeText } from './styles/Welcome';
import withNavigation from './utils/StoryDecorators';

const Welcome = () => (
    <Container>
        <WelcomeText>
            Welcome to the Hikearound component library. Please open the
            navigator and select a component to get started.
        </WelcomeText>
    </Container>
);

// Create the story without any addons
const welcomeStory = storiesOf('_Welcome', module);

// Add necessary decorators for Header
welcomeStory.addDecorator((story) =>
    withNavigation(story, {
        headerTitle: 'Component Library',
        theme: defaultTheme.colors,
    }),
);

welcomeStory.add('Welcome', () => <Welcome />);

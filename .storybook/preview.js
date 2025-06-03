import { storyChangeEmitter } from '../storybook';
import { theme } from './ondevice-theme';

export const decorators = [
    (Story, context) => {
        // Emit story change event
        const { kind, name } = context;
        storyChangeEmitter.emit('storyChange', { kind, story: name });
        return <Story />;
    },
];

export const parameters = {
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    theme,
    notes: {
        enabled: true,
        markdown: true,
        clearOnStoryChange: true,
    },
};

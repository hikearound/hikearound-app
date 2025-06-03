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
    backgrounds: {
        default: 'light',
        values: [
            { name: 'light', value: '#FFFFFF' },
            { name: 'dark', value: '#000000' },
            { name: 'gray', value: '#808080' },
        ],
    },
    notes: {
        // This enables the notes addon for all stories
        enabled: true,
        // This ensures notes are updated when stories change
        markdown: true,
        // This ensures notes are cleared when switching stories
        clearOnStoryChange: true,
    },
};

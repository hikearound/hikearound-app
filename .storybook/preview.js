import { storyChangeEmitter } from '../storybook';

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
};

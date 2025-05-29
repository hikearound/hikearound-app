import { AppRegistry } from 'react-native';
import { EventEmitter } from 'events';
import {
    getStorybookUI,
    configure,
    addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { loadStories } from './storybook.requires';

import './rn-addons';

// Create a global event emitter for story changes
export const storyChangeEmitter = new EventEmitter();

// enables knobs for all stories
addDecorator(withKnobs);

// Add a decorator to track story changes
addDecorator((storyFn, { kind, story }) => {
    // Emit the story change event
    setTimeout(() => {
        storyChangeEmitter.emit('storyChange', { kind, story });
    }, 0);
    return storyFn();
});

// import stories
configure(() => {
    loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
    asyncStorage: null,
    onDeviceUI: true,
    disableWebsockets: true,
    shouldPersistSelection: false,
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;

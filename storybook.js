import { AppRegistry } from 'react-native';
import { EventEmitter } from 'events';
import {
    getStorybookUI,
    configure,
    addDecorator,
    addParameters,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { loadStories } from './storybook.requires';
import { theme } from './.storybook/ondevice-theme';

import './rn-addons';

export const storyChangeEmitter = new EventEmitter();

addDecorator(withKnobs);
addParameters({ theme });

addDecorator((storyFn, { kind, story }) => {
    setTimeout(() => {
        storyChangeEmitter.emit('storyChange', { kind, story });
    }, 0);
    return storyFn();
});

configure(() => {
    loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
    asyncStorage: null,
    onDeviceUI: true,
    disableWebsockets: true,
    shouldPersistSelection: true,
    theme,
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;

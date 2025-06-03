import { AppRegistry } from 'react-native';
import {
    getStorybookUI,
    configure,
    addDecorator,
    addParameters,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { loadStories } from './storybook.requires';

import './rn-addons';

addParameters({
    backgrounds: [
        { name: 'light', value: '#F2F2F2', default: true },
        { name: 'dark', value: '#000000' },
    ],
});

// Then add decorators
addDecorator(withBackgrounds);
addDecorator(withKnobs);

// Configure stories
configure(() => {
    loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
    asyncStorage: false,
    onDeviceUI: true,
    disableWebsockets: true,
    shouldPersistSelection: true,
    theme: {
        backgroundColor: 'white',
        headerTextColor: 'black',
        labelColor: 'black',
        borderColor: '#e6e6e6',
        previewBorderColor: '#b3b3b3',
        buttonTextColor: '#999999',
        buttonActiveTextColor: '#444444',
    },
});

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;

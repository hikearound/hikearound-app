import { AppRegistry } from 'react-native';
import {
    getStorybookUI,
    configure,
    addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { loadStories } from './storybook.requires';

import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);

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

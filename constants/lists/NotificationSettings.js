import { settingsItems, settingsControls } from '../Settings';

const emailSection = {
    title: 'Emails',
    data: [
        {
            name: 'Enable emails',
            type: settingsItems.globalEmail,
            control: settingsControls.switch,
        },
    ],
};

const pushSection = {
    title: 'Push Notifications',
    data: [
        {
            name: 'Enable push notifications',
            type: settingsItems.globalNotification,
            control: settingsControls.switch,
        },
    ],
};

export const listData = [emailSection, pushSection];

export default { listData };

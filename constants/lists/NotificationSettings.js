import { settingsItems, settingsControls } from '../Settings';

export function getEmailSection(t) {
    return {
        title: t('label.input.email'),
        data: [
            {
                name: t('screen.settings.item.notification.email'),
                type: settingsItems.globalEmail,
                control: settingsControls.switch,
            },
        ],
    };
}

export function getPushSection(t) {
    return {
        title: t('screen.settings.header.push'),
        data: [
            {
                name: t('screen.settings.item.notification.push'),
                type: settingsItems.globalNotification,
                control: settingsControls.switch,
            },
        ],
    };
}

export function getSettingsData(t) {
    const emailSection = getEmailSection(t);
    const pushSection = getPushSection(t);
    return [emailSection, pushSection];
}

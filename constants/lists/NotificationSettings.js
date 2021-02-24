import { settingsControls } from '../Settings';

export function buildDataItem(t, property, type) {
    return {
        name: t(`screen.settings.item.notification.${type}.${property}`),
        type,
        property,
        control: settingsControls.switch,
    };
}

export function getEmailSection(t, notifs) {
    const data = [];

    for (const property in notifs) {
        if (notifs[property]) {
            const item = buildDataItem(t, property, 'email');

            if (property === 'global') {
                data.unshift(item);
            } else {
                data.push(item);
            }
        }
    }

    return { title: t('label.input.email'), data };
}

export function getPushSection(t, notifs) {
    const data = [];

    for (const property in notifs) {
        if (notifs[property]) {
            const item = buildDataItem(t, property, 'push');

            if (property === 'global') {
                data.unshift(item);
            } else {
                data.push(item);
            }
        }
    }

    return { title: t('screen.settings.header.push'), data };
}

export function getSettingsData(t, notifs) {
    const emailSection = getEmailSection(t, notifs.email);
    const pushSection = getPushSection(t, notifs.push);
    return [emailSection, pushSection];
}

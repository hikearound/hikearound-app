import Constants from 'expo-constants';
import { settingsItems, settingsControls } from '../Settings';

export function getMapSection(t) {
    return {
        title: t('screen.settings.header.map'),
        data: [
            {
                name: t('screen.settings.item.map.apple'),
                type: settingsItems.map,
                control: settingsControls.groupSelection,
            },
            {
                name: t('screen.settings.item.map.google'),
                type: settingsItems.map,
                control: settingsControls.groupSelection,
            },
        ],
    };
}

export function getDisplaySection(t) {
    return {
        title: t('screen.settings.header.display'),
        data: [
            {
                name: t('screen.settings.item.dark'),
                type: settingsItems.darkMode,
                control: settingsControls.switch,
            },
        ],
    };
}

export function getNotificationSection(t) {
    return {
        title: t('screen.settings.header.notifications'),
        data: [
            {
                name: t('screen.settings.item.notification.combined'),
                type: settingsItems.notificationScreen,
                control: settingsControls.push,
            },
        ],
    };
}

export function getTermsSection(t) {
    return {
        title: t('screen.settings.header.terms'),
        data: [
            {
                name: t('label.common.terms'),
                type: settingsItems.termsOfService,
                control: settingsControls.link,
            },
            {
                name: t('label.common.privacy'),
                type: settingsItems.privacyPolicy,
                control: settingsControls.link,
            },
        ],
    };
}

export function getAccountSection(t) {
    return {
        title: t('screen.settings.header.account'),
        data: [
            {
                name: t('label.common.logout'),
                type: settingsItems.logout,
                control: settingsControls.action,
            },
        ],
    };
}

export function getVersionSection(t) {
    return {
        title: t('screen.settings.header.version'),
        data: [
            {
                name: Constants.manifest.version,
                type: settingsItems.version,
                control: settingsControls.static,
            },
        ],
    };
}

export function getSettingsData(t) {
    const mapSection = getMapSection(t);
    const displaySection = getDisplaySection(t);
    const notificationSection = getNotificationSection(t);
    const termsSection = getTermsSection(t);
    const accountSection = getAccountSection(t);
    const versionSection = getVersionSection(t);

    return [
        mapSection,
        displaySection,
        notificationSection,
        termsSection,
        accountSection,
        versionSection,
    ];
}

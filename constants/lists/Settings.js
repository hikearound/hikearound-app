import Constants from 'expo-constants';
import { settingsItems, settingsControls } from '../Settings';

export const mapSection = {
    title: 'Default Map',
    data: [
        {
            name: 'Apple Maps',
            type: settingsItems.map,
            control: settingsControls.groupSelection,
        },
        {
            name: 'Google Maps',
            type: settingsItems.map,
            control: settingsControls.groupSelection,
        },
    ],
};

export const displaySection = {
    title: 'Display',
    data: [
        {
            name: 'Dark Mode',
            type: settingsItems.darkMode,
            control: settingsControls.switch,
        },
    ],
};

export const notificationSection = {
    title: 'Notifications',
    data: [
        {
            name: 'Email & Push Notifications',
            type: settingsItems.notificationScreen,
            control: settingsControls.push,
        },
    ],
};

export const termsSection = {
    title: 'Terms & Privacy',
    data: [
        {
            name: 'Terms of Service',
            type: settingsItems.termsOfService,
            control: settingsControls.link,
        },
        {
            name: 'Privacy Policy',
            type: settingsItems.privacyPolicy,
            control: settingsControls.link,
        },
    ],
};

export const accountSection = {
    title: 'Account',
    data: [
        {
            name: 'Logout',
            type: settingsItems.logout,
            control: settingsControls.action,
        },
    ],
};

export const versionSection = {
    title: 'Version',
    data: [
        {
            name: Constants.manifest.version,
            type: settingsItems.version,
            control: settingsControls.static,
        },
    ],
};

export const listData = [
    mapSection,
    displaySection,
    notificationSection,
    termsSection,
    accountSection,
    versionSection,
];

export default { listData };

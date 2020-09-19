import { Alert } from 'react-native';

export function getTitle(t) {
    return t('label.common.warning');
}

export function getMessage(t) {
    return t('screen.onboard.permission.warning', {
        appName: t('common.appName', { count: 1 }),
    });
}

export function getOptions(t, openHomeScreen, permissionAction) {
    return [
        {
            text: t('label.common.continue'),
            onPress: () => openHomeScreen(),
        },
        {
            text: t('screen.onboard.permission.button'),
            onPress: () => permissionAction(),
        },
    ];
}

export function showAlert(t, openHomeScreen, permissionAction) {
    const title = getTitle(t);
    const message = getMessage(t);
    const options = getOptions(t, openHomeScreen, permissionAction);

    return Alert.alert(title, message, options, { cancelable: false });
}

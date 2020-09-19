import { Alert } from 'react-native';

export function getTitle(t) {
    return t('alert.reset.success.title');
}

export function getMessage(t, email) {
    return t('alert.reset.success.body', {
        appName: t('common.appName', { count: 1 }),
        email,
    });
}

export function getOptions(t, toggleModalVisibility) {
    return [
        {
            text: t('label.common.ok'),
            onPress: () => toggleModalVisibility(),
        },
    ];
}

export function showAlert(t, email, toggleModalVisibility) {
    const title = getTitle(t);
    const message = getMessage(t, email);
    const options = getOptions(t, toggleModalVisibility);

    return Alert.alert(title, message, options);
}

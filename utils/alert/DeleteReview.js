import { Alert } from 'react-native';

export function getTitle(t) {
    return t('alert.deleteReview.title');
}

export function getMessage(t) {
    return t('alert.deleteReview.body');
}

export function getOptions(t, deleteReview) {
    return [
        {
            text: t('label.common.delete'),
            onPress: () => deleteReview(),
            style: 'destructive',
        },
        {
            text: t('label.common.cancel'),
            onPress: () => {},
            style: 'cancel',
        },
    ];
}

export function showAlert(t, deleteReview) {
    const title = getTitle(t);
    const message = getMessage(t);
    const options = getOptions(t, deleteReview);

    return Alert.alert(title, message, options, { cancelable: true });
}

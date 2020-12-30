import { ActionSheetIOS } from 'react-native';
import { auth } from '../../lib/Fire';

export function getSheetOptions(t) {
    return [t('sheet.review.item.flag'), t('label.common.cancel')];
}

export function getAuthorSheetOptions(t) {
    return [
        t('sheet.review.item.edit'),
        t('sheet.review.item.delete'),
        t('label.common.cancel'),
    ];
}

export function getActions(buttonIndex) {
    if (buttonIndex === 0) {
        //
    }
}

export function getAuthorActions(buttonIndex) {
    if (buttonIndex === 0) {
        //
    }
}

export function reviewActionSheet(t, user) {
    let cancelButtonIndex = 1;
    let destructiveButtonIndex = null;
    let options = getSheetOptions(t);

    if (auth.currentUser.uid === user.uid) {
        cancelButtonIndex = 2;
        destructiveButtonIndex = 1;
        options = getAuthorSheetOptions(t);
    }

    ActionSheetIOS.showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
        },

        (buttonIndex) => {
            if (auth.currentUser.uid === user.uid) {
                getAuthorActions(buttonIndex);
            } else {
                getActions(buttonIndex);
            }
        },
    );
}

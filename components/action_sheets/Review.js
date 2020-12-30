import { ActionSheetIOS } from 'react-native';
import { auth } from '../../lib/Fire';
import { showAlert } from '../../utils/alert/DeleteReview';

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
        // flag
    }
}

export function getAuthorActions(buttonIndex, t, deleteReview) {
    if (buttonIndex === 0) {
        // edit
    } else if (buttonIndex === 1) {
        showAlert(t, deleteReview);
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
                const { deleteReview } = this;
                getAuthorActions(buttonIndex, t, deleteReview);
            } else {
                getActions(buttonIndex);
            }
        },
    );
}

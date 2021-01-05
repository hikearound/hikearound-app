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

export function getActions(
    data,
    buttonIndex,
    dispatchModalFlag,
    dispatchFlaggedReview,
) {
    if (buttonIndex === 0) {
        // console.log(data)
        dispatchFlaggedReview(data.rid);
        dispatchModalFlag('flagReview');
    }
}

export function getAuthorActions(
    t,
    data,
    buttonIndex,
    deleteReview,
    dispatchModalFlag,
    dispatchReviewData,
) {
    if (buttonIndex === 0) {
        dispatchReviewData({
            isEditing: true,
            review: data.review,
            rating: data.rating,
            rid: data.rid,
        });
        dispatchModalFlag('review');
    } else if (buttonIndex === 1) {
        showAlert(t, deleteReview);
    }
}

export function reviewActionSheet(
    t,
    data,
    dispatchModalFlag,
    dispatchReviewData,
    dispatchFlaggedReview,
) {
    let cancelButtonIndex = 1;
    let destructiveButtonIndex = null;
    let options = getSheetOptions(t);

    if (auth.currentUser.uid === data.user.uid) {
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
            if (auth.currentUser.uid === data.user.uid) {
                const { deleteReview } = this;
                getAuthorActions(
                    t,
                    data,
                    buttonIndex,
                    deleteReview,
                    dispatchModalFlag,
                    dispatchReviewData,
                );
            } else {
                getActions(
                    data,
                    buttonIndex,
                    dispatchModalFlag,
                    dispatchFlaggedReview,
                );
            }
        },
    );
}

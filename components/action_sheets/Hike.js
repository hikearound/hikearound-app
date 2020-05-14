import { ActionSheetIOS } from 'react-native';

const cancelButtonIndex = 2;

export function getSheetOptions(t) {
    return [
        t('sheet.hike.item.share'),
        t('sheet.hike.item.directions'),
        t('label.common.cancel'),
    ];
}

export function hikeActionSheet(t) {
    const options = getSheetOptions(t);

    ActionSheetIOS.showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.shareHike();
            } else if (buttonIndex === 1) {
                this.getDirections();
            }
        },
    );
}

export default { hikeActionSheet };

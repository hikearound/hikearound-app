import { ActionSheetIOS } from 'react-native';

const cancelButtonIndex = 2;

export function getSheetOptions(t) {
    return [
        t('sheet.feed.item.new'),
        t('sheet.feed.item.old'),
        t('label.common.cancel'),
    ];
}

export function feedActionSheet(t) {
    const options = getSheetOptions(t);

    ActionSheetIOS.showActionSheetWithOptions(
        {
            title: t('sheet.feed.title'),
            options,
            cancelButtonIndex,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.sortFeed('desc');
            } else if (buttonIndex === 1) {
                this.sortFeed('asc');
            }
        },
    );
}

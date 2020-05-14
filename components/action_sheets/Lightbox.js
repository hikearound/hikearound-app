import { ActionSheetIOS } from 'react-native';

const cancelButtonIndex = 1;

export function getSheetOptions(t) {
    return [t('sheet.lightbox.item.attribution'), t('label.common.cancel')];
}

export function lightboxActionSheet(t) {
    const options = getSheetOptions(t);

    ActionSheetIOS.showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.showAttributionAlert();
            }
        },
    );
}

export default { lightboxActionSheet };

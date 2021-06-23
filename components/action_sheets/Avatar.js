import { ActionSheetIOS } from 'react-native';
import {
    checkImageLibraryPermissions,
    checkCameraPermissions,
} from '@utils/PhotoPicker';

const cancelButtonIndex = 2;

export function getSheetOptions(t) {
    return [
        t('sheet.avatar.item.camera'),
        t('sheet.avatar.item.library'),
        t('label.common.cancel'),
    ];
}

export function avatarActionSheet(t, dispatchAvatar) {
    const options = getSheetOptions(t);

    ActionSheetIOS.showActionSheetWithOptions(
        {
            options,
            cancelButtonIndex,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                checkCameraPermissions(dispatchAvatar);
            } else if (buttonIndex === 1) {
                checkImageLibraryPermissions(dispatchAvatar);
            }
        },
    );
}

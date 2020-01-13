import { ActionSheetIOS } from 'react-native';

const SHEET_ITEMS = ['Get Directions', 'Share', 'Cancel'];
const SHEET_CANCEL_INDEX = 2;

export function hikeActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: SHEET_ITEMS,
            cancelButtonIndex: SHEET_CANCEL_INDEX,
        },

        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.navigateToHike();
            } else if (buttonIndex === 1) {
                this.shareHike();
            }
        },
    );
}

export default { hikeActionSheet };

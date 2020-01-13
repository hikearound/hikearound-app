import { ActionSheetIOS } from 'react-native';

const SHEET_ITEMS = ['Share', 'Get Directions', 'Cancel'];
const SHEET_CANCEL_INDEX = 2;

export function hikeActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: SHEET_ITEMS,
            cancelButtonIndex: SHEET_CANCEL_INDEX,
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

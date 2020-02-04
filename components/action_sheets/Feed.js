import { ActionSheetIOS } from 'react-native';

const SHEET_ITEMS = ['Newest first', 'Oldest first', 'Cancel'];
const SHEET_CANCEL_INDEX = 2;

export function feedActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            title: 'Sort by',
            options: SHEET_ITEMS,
            cancelButtonIndex: SHEET_CANCEL_INDEX,
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

export default { feedActionSheet };

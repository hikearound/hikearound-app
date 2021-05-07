import Toast from 'react-native-toast-message';
import { Share } from 'react-native';
import * as Haptics from 'expo-haptics';
import { shareAction, baseUrl } from '../constants/Common';
import { getToastText } from './Toast';

export async function shareHike(hid, dispatchCopyLink, t, includeHaptics) {
    if (includeHaptics) {
        Haptics.selectionAsync();
    }

    const result = await Share.share({ url: `${baseUrl}/hike/${hid}` });

    if (result.action === Share.sharedAction) {
        if (result.activityType.includes(shareAction)) {
            Toast.show({
                text1: getToastText('copyLink', t, {}),
                position: 'bottom',
                type: 'success',
            });
            dispatchCopyLink();
        }
    }
}

export default shareHike;

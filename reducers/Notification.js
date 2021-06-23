import { notificationState } from '@constants/Reducers';

export default function notificationReducer(state = notificationState, action) {
    switch (action.type) {
        case 'INITIALIZE_NOTIFICATION_DATA':
            return {
                ...state,
                notifications: action.notificationData.notifications,
            };

        default:
            return state;
    }
}

import { notificationState } from '@constants/Reducers';

export default function notificationReducer(inputState, action) {
  const state = inputState ?? notificationState;
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

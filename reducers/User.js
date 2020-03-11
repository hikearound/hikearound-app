import { avatar } from '../constants/Images';

const initialState = {
    name: '',
    location: '',
    map: 'Apple Maps',
    darkMode: false,
};

initialState.avatar = avatar;
initialState.emailNotifs = { enabled: true };
initialState.pushNotifs = { enabled: true };

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'INITIALIZE_USER_DATA':
            return {
                ...state,
                name: action.userData.name,
                location: action.userData.location,
                map: action.userData.map,
                darkMode: action.userData.darkMode,
            };
        case 'INITIALIZE_NOTIFS':
            return {
                ...state,
                emailNotifs: action.userData.emailNotifs,
                pushNotifs: action.userData.pushNotifs,
            };
        case 'INITIALIZE_AVATAR':
            return {
                ...state,
                avatar: action.uri,
            };
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                name: action.userData.name,
                location: action.userData.location,
            };
        case 'UPDATE_AVATAR':
            return {
                ...state,
                avatar: action.photoData.uri,
            };
        case 'UPDATE_MAP':
            return {
                ...state,
                map: action.map,
            };
        case 'UPDATE_DARK_MODE':
            return {
                ...state,
                darkMode: action.darkMode,
            };
        case 'UPDATE_NOTIFS':
            return {
                ...state,
                emailNotifs: action.emailNotifs,
                pushNotifs: action.pushNotifs,
            };
        default:
            return state;
    }
}

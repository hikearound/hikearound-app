const initialState = {
    name: '',
    avatar:
        'https://firebasestorage.googleapis.com/v0/b/hikearound-14dad.appspot.com/o/images%2Fusers%2Favatar.png?alt=media&token=a8fed0d3-7233-4138-95ed-4109afc7c323',
    location: '',
    map: 'Apple Maps',
    darkMode: false,
};

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
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                name: action.userData.name,
                location: action.userData.location,
            };
        case 'INITIALIZE_AVATAR':
            return {
                ...state,
                avatar: action.uri,
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
        default:
            return state;
    }
}

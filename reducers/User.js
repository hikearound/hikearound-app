const initialState = {
    name: '',
    avatar:
        'https://firebasestorage.googleapis.com/v0/b/hikearound-14dad.appspot.com/o/images%2Fuser%2Favatar.png?alt=media&token=3e2c0849-d35b-419b-a277-11103b480539',
    location: '',
    map: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'INITIALIZE_USER_DATA':
            return {
                ...state,
                name: action.userData.name,
                location: action.userData.location,
            };
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                name: action.userData.name,
                location: action.userData.location,
                map: action.userData.defaultMap,
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
        default:
            return state;
    }
}

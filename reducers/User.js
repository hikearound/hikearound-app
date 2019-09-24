const initialState = {
    name: '',
    avatar: 'https://patdugan.me/images/me.jpg',
    location: '',
    defaultMap: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.name };
        case 'UPDATE_AVATAR':
            return { ...state, avatar: action.avatar };
        case 'UPDATE_LOCATION':
            return { ...state, avatar: action.location };
        case 'SET_DEFAULT_MAP':
            return {
                ...state,
                mapPreference: action.mapPreference,
            };
        default:
            return state;
    }
}

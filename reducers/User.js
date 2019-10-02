const initialState = {
    name: '',
    avatar: 'https://patdugan.me/images/me.jpg',
    location: '',
    map: '',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.name };
        case 'UPDATE_AVATAR':
            return { ...state, avatar: action.avatar };
        case 'UPDATE_LOCATION':
            return { ...state, location: action.location };
        case 'SET_DEFAULT_MAP':
            return { ...state, map: action.map };
        default:
            return state;
    }
}

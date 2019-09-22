const initialState = {
    name: 'Patrick Dugan',
    avatar: 'https://patdugan.me/images/me.jpg',
    location: 'Seattle, WA',
    mapPreference: 'Apple Maps',
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.name };
        case 'UPDATE_AVATAR':
            return { ...state, avatar: action.avatar };
        case 'UPDATE_LOCATION':
            return { ...state, avatar: action.location };
        case 'SET_MAP_PREFERENCE':
            return {
                ...state,
                mapPreference: action.mapPreference,
            };
        default:
            return state;
    }
}

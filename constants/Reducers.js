import { avatarDefault } from './Images';

export const mapState = {
    selectedHike: null,
    selectedCity: null,
};

export const hikeState = {
    action: '',
    updatedHikeData: {},
};

export const modalState = {
    action: '',
    currentModal: 'none',
    imageIndex: 0,
    selectedHike: null,
    closeAction: '',
    reviewData: {},
    flagedReview: null,
};

export const notifs = {};

export const user = {
    name: '',
    location: '',
    photoURL: '',
    notifs: {},
    currentPosition: {},
    map: 'Apple Maps',
    darkMode: false,
    favoriteHikes: [],
    reviewedHikes: [],
};

user.avatar = avatarDefault;
user.notifs.email = notifs;
user.notifs.push = notifs;

export const userState = user;

export const authState = {
    user: null,
};

export const feedState = {
    filterParams: {
        difficulty: [],
        distance: [],
        elevation: [],
        route: [],
        sort: 0,
    },
};

export const reviewState = {
    action: null,
    reviewData: null,
    selectedReview: null,
    selectedHike: null,
};

export const navigationState = {
    focusedStack: 'Home',
};

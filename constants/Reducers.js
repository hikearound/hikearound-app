import { avatarDefault } from './Images';

export const mapState = {
    selectedHike: null,
    selectedCity: null,
};

export const hikeState = {
    action: '',
    hikeData: [],
    updatedHikeData: {},
};

export const modalState = {
    action: '',
    currentModal: 'none',
    imageIndex: 0,
    selectedHike: null,
    closeAction: '',
    review: '',
};

export const notifs = {
    enabled: true,
    digest: {
        enabled: true,
    },
};

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
    reviewData: null,
};

export const navigationState = {
    focusedStack: 'Home',
};

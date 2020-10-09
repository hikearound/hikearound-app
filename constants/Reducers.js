import { avatar } from './Images';

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
    imageIndex: 0,
    selectedHike: null,
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
};

user.avatar = avatar;
user.notifs.email = notifs;
user.notifs.push = notifs;

export const userState = user;

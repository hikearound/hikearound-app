import { avatar } from './Images';

export const homeState = {
    screenType: 'feed',
};

export const mapState = {
    mapType: 'terrain',
    mapStyle: [],
};

export const hikeState = {
    action: '',
    hikeData: [],
    updatedHikeData: {},
};

export const modalState = {
    action: '',
    imageIndex: 0,
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
    notifs: {},
    map: 'Apple Maps',
    darkMode: false,
};

user.avatar = avatar;
user.notifs.email = notifs;
user.notifs.push = notifs;

export const userState = user;

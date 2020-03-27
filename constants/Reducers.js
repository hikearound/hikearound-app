import { avatar } from './Images';

export const hike = {
    action: '',
    hikeData: [],
    updatedHikeData: {},
};

export const modal = {
    action: '',
    imageIndex: 0,
};

const notifs = {
    enabled: true,
    digest: {
        enabled: true,
    },
};

export const user = {
    name: '',
    location: '',
    map: 'Apple Maps',
    darkMode: false,
};

user.avatar = avatar;
user.emailNotifs = notifs;
user.pushNotifs = notifs;

export default { hike, modal, user };

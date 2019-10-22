import { writeFavoriteHike, removeFavoriteHike } from '../utils/Hike';

export const initializeHikeData = (hikeData) => {
    return { type: 'INITIALIZE_HIKE_DATA', hikeData };
};

export const favoriteHike = (hikeData) => {
    writeFavoriteHike(hikeData);
    return { type: 'FAVORITE_HIKE' };
};

export const unfavoriteHike = (hikeData) => {
    removeFavoriteHike(hikeData);
    return { type: 'UNFAVORITE_HIKE' };
};

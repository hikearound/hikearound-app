import { writeFavoriteHike, removeFavoriteHike } from '../utils/Hike';

export const favoriteHike = (hikeData) => {
    writeFavoriteHike(hikeData);
    return { type: 'FAVORITE_HIKE', hikeData };
};

export const unfavoriteHike = (hikeData) => {
    removeFavoriteHike(hikeData);
    return { type: 'UNFAVORITE_HIKE', hikeData };
};

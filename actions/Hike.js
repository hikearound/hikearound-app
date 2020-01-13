import { writeFavoriteHike, removeFavoriteHike } from '../utils/Hike';

export const initializeHikeData = (hikeData) => {
    return { type: 'INITIALIZE_HIKE_DATA', hikeData };
};

export const favoriteHike = (updatedHikeData) => {
    writeFavoriteHike(updatedHikeData);
    return { type: 'FAVORITE_HIKE', updatedHikeData };
};

export const unfavoriteHike = (updatedHikeData) => {
    removeFavoriteHike(updatedHikeData);
    return { type: 'UNFAVORITE_HIKE', updatedHikeData };
};

export const copyLink = () => {
    return { type: 'COPY_LINK' };
};

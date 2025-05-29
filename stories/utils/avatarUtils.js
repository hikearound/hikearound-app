// Curated list of high-quality profile photos from Unsplash
const PROFILE_PHOTOS = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&h=200&fit=crop',
];

// Keep track of used photos to ensure no duplicates in lists
const usedPhotos = new Set();

export const getAvatarUrl = (name) => {
    // Use a hash of the name to get consistent photos for each user
    const hash = name
        .split('')
        .reduce((acc, char) => char.charCodeAt(0) + acc * 31, 0);
    return PROFILE_PHOTOS[Math.abs(hash) % PROFILE_PHOTOS.length];
};

export const getUniqueAvatarUrl = (name) => {
    // Get the base photo for this name
    const basePhoto = getAvatarUrl(name);

    // If this photo hasn't been used yet, use it
    if (!usedPhotos.has(basePhoto)) {
        usedPhotos.add(basePhoto);
        return basePhoto;
    }

    // If the base photo is already used, find the next available one
    const availablePhotos = PROFILE_PHOTOS.filter(
        (photo) => !usedPhotos.has(photo),
    );
    if (availablePhotos.length > 0) {
        const photo = availablePhotos[0];
        usedPhotos.add(photo);
        return photo;
    }

    // If all photos are used, reset the used photos set and start over
    usedPhotos.clear();
    usedPhotos.add(basePhoto);
    return basePhoto;
};

export const resetUsedPhotos = () => {
    usedPhotos.clear();
};

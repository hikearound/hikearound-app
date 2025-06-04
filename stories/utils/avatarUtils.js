// Set of used photos to ensure uniqueness
const usedPhotos = new Set();

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

// Reset the set of used photos
export const resetUsedPhotos = () => {
    usedPhotos.clear();
};

// Get a unique avatar URL for a given name
export const getUniqueAvatarUrl = () => {
    // Find the first unused photo
    const unusedPhoto = PROFILE_PHOTOS.find((photo) => !usedPhotos.has(photo));
    if (unusedPhoto) {
        usedPhotos.add(unusedPhoto);
        return unusedPhoto;
    }
    // If all photos are used, reset and start over
    resetUsedPhotos();
    usedPhotos.add(PROFILE_PHOTOS[0]);
    return PROFILE_PHOTOS[0];
};

// Get a simple avatar URL for a given name
export const getAvatarUrl = (name) => {
    // Use a deterministic index based on the name
    const index =
        name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        PROFILE_PHOTOS.length;
    return PROFILE_PHOTOS[index];
};

export const animationConfig = {
    pitch: 0,
    heading: 0,
    duration: 1000,
};

export const presets = {
    spring: {
        duration: 300,
        create: {
            type: 'linear',
            property: 'opacity',
        },
        update: {
            type: 'spring',
            springDamping: 0.4,
        },
        delete: {
            type: 'linear',
            property: 'opacity',
        },
    },
};

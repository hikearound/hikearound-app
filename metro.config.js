// Learn more https://docs.expo.io/guides/customizing-metro
// This config extends the default expo metro config as recommended in the documentation
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Extend the default config with custom resolver settings
module.exports = {
    ...config,
    resolver: {
        ...config.resolver,
        sourceExts: [...config.resolver.sourceExts, 'cjs'],
        platforms: ['ios', 'android', 'native', 'web'],
        resolverMainFields: ['react-native', 'browser', 'main'],
    },
    resetCache: true,
};

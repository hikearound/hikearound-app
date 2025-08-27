// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Fix for React Native 0.64 module resolution
defaultConfig.resolver = {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
    platforms: ['ios', 'android', 'native', 'web'],
    resolverMainFields: ['react-native', 'browser', 'main'],
};

// Reset the cache
defaultConfig.resetCache = true;

module.exports = defaultConfig;

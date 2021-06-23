module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'inline-dotenv',
            [
                'module-resolver',
                {
                    alias: {
                        '@actions': './actions',
                        '@assets': './assets',
                        '@components': './components',
                        '@constants': './constants',
                        '@icons': './icons',
                        '@lib': './lib',
                        '@navigators': './navigators',
                        '@providers': './providers',
                        '@reducers': './reducers',
                        '@screens': './screens',
                        '@stacks': './stacks',
                        '@store': './store',
                        '@styles': './styles',
                        '@utils': './utils',
                    },
                },
            ],
        ],
    };
};

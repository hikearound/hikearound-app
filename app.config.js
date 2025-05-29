import 'dotenv/config';

export default ({ config }) => ({
    hooks: {
        postPublish: [
            {
                file: 'sentry-expo/upload-sourcemaps',
                config: {
                    organization: 'hikearound',
                    project: 'hikearound-app',
                    authToken: process.env.SENTRY_AUTH_TOKEN,
                },
            },
        ],
    },
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookDisplayName: 'Hikearound',
    extra: {
        storybookEnabled: process.env.STORYBOOK_ENABLED === 'true',
        firebase: {
            appId: '1:175063732296:web:1f60ff2b03523972',
            apiKey: process.env.FIREBASE_KEY,
            authDomain: 'hikearound-14dad.firebaseapp.com',
            databaseURL: 'https://hikearound-14dad.firebaseio.com',
            projectId: 'hikearound-14dad',
            storageBucket: 'hikearound-14dad.appspot.com',
            messagingSenderId: '175063732296',
        },
        sentry: {
            dsn: process.env.SENTRY_DSN,
        },
        googlePlaces: {
            apiKey: process.env.GOOGLE_PLACES_KEY,
        },
        googleGeo: {
            apiKey: process.env.GOOGLE_GEO_KEY,
        },
        algolia: {
            appId: process.env.ALGOLIA_APP_ID,
            searchKey: process.env.ALGOLIA_SEARCH_KEY,
        },
    },
    web: {
        config: {
            firebase: {
                measurementId: process.env.FIREBASE_MEASUREMENT_ID,
            },
        },
    },
    ...config,
});

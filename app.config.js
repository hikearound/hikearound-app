import 'dotenv/config';

export default {
    extra: {
        firebase: {
            apiKey: process.env.FIREBASE_KEY,
            authDomain: 'hikearound-14dad.firebaseapp.com',
            databaseURL: 'https://hikearound-14dad.firebaseio.com',
            projectId: 'hikearound-14dad',
            storageBucket: 'hikearound-14dad.appspot.com',
            messagingSenderId: '175063732296',
            appId: '1:175063732296:web:1f60ff2b03523972',
        },
        sentry: {
            dsn: 'https://5c8352d2c1f6437c9f678277bfc5528d@sentry.io/1811790',
        },
        googlePlaces: {
            apiKey: process.env.GOOGLE_PLACES_KEY,
        },
        googleGeo: {
            apiKey: process.env.GOOGLE_GEO_KEY,
        },
        algolia: {
            appId: '18BA5IWUAQ',
            searchKey: process.env.ALGOLIA_SEARCH_KEY,
        },
    },
};

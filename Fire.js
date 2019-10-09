const collectionName = 'hikes';
const firebase = require('firebase');

require('firebase/firestore');

class Fire {
    constructor() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDzhRGewrBXqU6XPG5Bdl29JpPRPNtdilY',
            authDomain: 'hikearound-14dad.firebaseapp.com',
            databaseURL: 'https://hikearound-14dad.firebaseio.com',
            projectId: 'hikearound-14dad',
            storageBucket: 'hikearound-14dad.appspot.com',
            messagingSenderId: '175063732296',
            appId: '1:175063732296:web:1f60ff2b03523972',
        });
    }

    getPaged = async ({ size, start }) => {
        let ref = this.collection()
            .orderBy('timestamp', 'desc')
            .limit(size);
        if (start) {
            ref = ref.startAfter(start);
        }
        const querySnapshot = await ref.get();
        const data = [];

        querySnapshot.forEach((hike) => {
            if (hike.exists) {
                const hikeData = hike.data() || {};
                hikeData.id = hike.id;
                const reduced = {
                    key: hike.id,
                    ...hikeData,
                };
                data.push(reduced);
            }
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { data, cursor: lastVisible };
    };

    collection = () => firebase.firestore().collection(collectionName);

    uid = () => (firebase.auth().currentUser || {}).uid;

    timestamp = () => Date.now();
}

Fire.shared = new Fire();
export default Fire;

import * as keys from './keys/Keys';

const { firebaseKey, messagingSenderId, appId } = keys.default;
const collectionName = 'hikes';
const firebase = require('firebase');

require('firebase/firestore');

/* eslint-disable class-methods-use-this */

class Fire {
    constructor() {
        firebase.initializeApp({
            apiKey: firebaseKey,
            authDomain: 'hikearound-14dad.firebaseapp.com',
            databaseURL: 'https://hikearound-14dad.firebaseio.com',
            projectId: 'hikearound-14dad',
            storageBucket: 'hikearound-14dad.appspot.com',
            messagingSenderId,
            appId,
        });

        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
        });
    }

    getPaged = async ({ size, start }) => {
        let ref = this.collection.orderBy('timestamp', 'desc').limit(size);

        if (start) {
            ref = ref.startAfter(start);
        }

        const querySnapshot = await ref.get();
        const data = [];

        querySnapshot.forEach((doc) => {
            if (doc.exists) {
                const post = doc.data() || {};
                const reduced = {
                    key: doc.id,
                    ...post,
                };
                data.push(reduced);
            }
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        return { data, cursor: lastVisible };
    };

    get collection() {
        return firebase.firestore().collection(collectionName);
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;

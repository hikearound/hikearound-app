import * as keys from './keys/Keys';

const firebaseKey = keys["default"]["firebaseKey"];
const firebase = require('firebase');
const collectionName = 'snack-SJucFknGX';

require('firebase/firestore');

class Fire {
    constructor() {
        firebase.initializeApp({
            apiKey: firebaseKey,
            authDomain: 'designcode-app.firebaseapp.com',
            databaseURL: 'https://designcode-app.firebaseio.com',
            projectId: ' designcode-app-969d7',
            storageBucket: 'designcode-app.appspot.com'
        });
        firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
        });
    }

    getPaged = async ({ size, start }) => {
        let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
        try {
            if (start) {
                ref = ref.startAfter(start);
            }

            const querySnapshot = await ref.get();
            const data = [];
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    const post = doc.data() || {};
                    const user = post.user || {};
                    const name = user.deviceName;
                    const reduced = {
                        key: doc.id,
                        name: (name || 'Secret Duck').trim(),
                        ...post,
                    };
                    data.push(reduced);
                }
            });

            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            return { data, cursor: lastVisible };
        } catch ({ message }) {
            alert(message);
        }
    };

    uploadPhotoAsync = async uri => {
        const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
        return uploadPhoto(uri, path);
    };

    post = async ({ text, image: localUri }) => {
        try {
            const { uri: reducedImage, width, height } = await shrinkImageAsync(
                localUri,
            );

            const remoteUri = await this.uploadPhotoAsync(reducedImage);
            this.collection.add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                imageWidth: width,
                imageHeight: height,
                image: remoteUri,
                user: getUserInfo(),
            });
        } catch ({ message }) {
            alert(message);
        }
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

import Constants from 'expo-constants';
import firebase from 'firebase';
import '@firebase/firestore';

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(Constants.manifest.extra.firebaseConfig);
        }
    }
}

Fire.shared = new Fire();
export default Fire;

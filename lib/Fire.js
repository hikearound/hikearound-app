import Constants from 'expo-constants';
import { decode, encode } from 'base-64';
import firebase from 'firebase';
import '@firebase/firestore';

global.btoa = encode;
global.atob = decode;

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(Constants.manifest.extra.firebaseConfig);
        }
    }
}

Fire.shared = new Fire();
export default Fire;

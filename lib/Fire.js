import Constants from 'expo-constants';
import { decode, encode } from 'base-64';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/functions';

global.btoa = encode;
global.atob = decode;
global.crypto = {};

global.crypto.getRandomValues = (byteArray) => {
    for (let i = 0; i < byteArray.length; i += 1) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
};

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(Constants.manifest.extra.firebase);
        }
    }
}

Fire.shared = new Fire();

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const functions = firebase.functions();

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default Fire;

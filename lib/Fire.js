import Constants from 'expo-constants';
import { decode, encode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
// Modern v9 auth imports
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';

global.btoa = encode;
global.atob = decode;
global.crypto = {};

global.crypto.getRandomValues = (byteArray) => {
    for (let i = 0; i < byteArray.length; i += 1) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
};

let authInstance = null;

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            // Initialize Firebase with compat mode
            const app = firebase.initializeApp(Constants.manifest.extra.firebase);
            console.log('🔧 Firebase compat initialized');
            
            // Initialize modern v9 auth with React Native persistence
            try {
                authInstance = initializeAuth(app._delegate || app, {
                    persistence: getReactNativePersistence(AsyncStorage),
                });
                console.log('🔧 Modern Firebase v9 auth initialized with React Native persistence');
            } catch (error) {
                // Fallback to getting existing auth if already initialized
                console.log('🔧 Using existing auth instance:', error.message);
                authInstance = getAuth(app._delegate || app);
            }
        }
    }
}

Fire.shared = new Fire();

// Export compat mode for everything except auth
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();

// Export modern v9 auth instance with proper persistence
export const auth = authInstance;

export default Fire;

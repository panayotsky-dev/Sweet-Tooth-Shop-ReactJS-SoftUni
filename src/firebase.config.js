import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC3E4X9GbSeX8AHGsodJYEtSBhfBnFXx_Y",
  authDomain: "sweet-tooth-panayotsky.firebaseapp.com",
  projectId: "sweet-tooth-panayotsky",
  storageBucket: "sweet-tooth-panayotsky.appspot.com",
  messagingSenderId: "256836600907",
  appId: "1:256836600907:web:ae9a36c8d71186c90f39ce",
  measurementId: "G-00M5PQB14L"
};
export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

//storage to upload


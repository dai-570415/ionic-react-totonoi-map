import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";

const firebaseConfig = {
    // Firebase APIを入れる
};

firebase.initializeApp(firebaseConfig);

export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const db = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
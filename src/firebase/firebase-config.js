import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCaiRbY7y_fmKE0cePT0m4AgYOVQCK3dog",
    authDomain: "journal-app-ea7f5.firebaseapp.com",
    projectId: "journal-app-ea7f5",
    storageBucket: "journal-app-ea7f5.appspot.com",
    messagingSenderId: "500201338540",
    appId: "1:500201338540:web:43170d7dcf559e3d56d109"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {

    db,
    googleAuthProvider,
    firebase
}
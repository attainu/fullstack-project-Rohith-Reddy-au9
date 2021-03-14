import firebase from 'firebase/app'
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDduv0mG0Y3FI2F0SBy_HQDKgwcYhLJ97A",
    authDomain: "e-commerce-e1d02.firebaseapp.com",
    projectId: "e-commerce-e1d02",
    storageBucket: "e-commerce-e1d02.appspot.com",
    messagingSenderId: "215219272621",
    appId: "1:215219272621:web:402351889b597836553f24"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  // export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
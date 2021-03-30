import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAE0NWeC0yx2Tuhwo8XZdH0_EBHb5q5SgA",
    authDomain: "luvih-76d9c.firebaseapp.com",
    projectId: "luvih-76d9c",
    storageBucket: "luvih-76d9c.appspot.com",
    messagingSenderId: "542838529501",
    appId: "1:542838529501:web:c300a8fe3e588dcf612a34"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


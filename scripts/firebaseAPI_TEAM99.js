//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    //keys go here 
    apiKey: "AIzaSyDCsENxls9oyYo9t4Zkipd69MAZmcP1T0U",
    authDomain: "bby32-1800.firebaseapp.com",
    projectId: "bby32-1800",
    storageBucket: "bby32-1800.appspot.com",
    messagingSenderId: "421989553084",
    appId: "1:421989553084:web:634dc7a558b073a09591b9"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

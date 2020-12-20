import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDfeUzqYZrKSsS-S4yj01C2QMTjR_2ZjnI",
  authDomain: "quasar-chat-7fa31.firebaseapp.com",
  projectId: "quasar-chat-7fa31",
  storageBucket: "quasar-chat-7fa31.appspot.com",
  messagingSenderId: "765859706482",
  appId: "1:765859706482:web:50c705f3be7b13bb9bf4eb",
  measurementId: "G-ZGH19QHTHQ"
};
// // Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()


export{
  firebaseAuth,firebaseDb
}

import firebase from "firebase/app";

const config = {
  "apiKey": "AIzaSyBcJSnsrLhbrL8cnMERbuxb2qc8E46ddIA",
  "authDomain": "choman-next.firebaseapp.com",
  "projectId": "choman-next",
  "storageBucket": "choman-next.appspot.com",
  "messagingSenderId": "734221912405",
  "appId": "1:734221912405:web:c52df07c526c22030087dc"
};

require("@firebase/firestore");

try {
  firebase.initializeApp(config)
} catch (err) {
  // ignore 'already exists' errors on node for ssr
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export default firebase.firestore()

export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()

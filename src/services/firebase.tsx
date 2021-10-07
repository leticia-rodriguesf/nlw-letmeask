import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBQ159ibav3gYRBjazvciEgqfKVCU1_5yw",
    authDomain: "letmeask-cf5e9.firebaseapp.com",
    databaseURL: "https://letmeask-cf5e9-default-rtdb.firebaseio.com",
    projectId: "letmeask-cf5e9",
    storageBucket: "letmeask-cf5e9.appspot.com",
    messagingSenderId: "556088725310",
    appId: "1:556088725310:web:aa1f0cc7d8b2d91b13e66f"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {firebase, auth, database}
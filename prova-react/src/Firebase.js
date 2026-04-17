import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCATAt9DkQoVBkV1u6jEE5cNLZWMxII72I",
    authDomain: "prova-bd-pedropenitenti.firebaseapp.com",
    projectId: "prova-bd-pedropenitenti",
    storageBucket: "prova-bd-pedropenitenti.firebasestorage.app",
    messagingSenderId: "398228112467",
    appId: "1:398228112467:web:98654f54e48cd4f62832a6",
    measurementId: "G-5ZRB3D7Z0R"
  };

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
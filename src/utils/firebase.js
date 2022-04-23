import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABCE6Za4C50hF81N4ZvOJdJoFkDR0JRLw",
    authDomain: "plotco.firebaseapp.com",
    projectId: "plotco",
    storageBucket: "plotco.appspot.com",
    messagingSenderId: "645574736753",
    appId: "1:645574736753:web:4039ef9c2ce2f42859d4d0",
    measurementId: "G-NPJSYP2WBH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

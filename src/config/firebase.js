// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAE73bAkpb2sHwF0Vfco8MifwUV0h89Ndk",
    authDomain: "calculator-the-game-editor.firebaseapp.com",
    projectId: "calculator-the-game-editor",
    storageBucket: "calculator-the-game-editor.appspot.com",
    messagingSenderId: "998333880352",
    appId: "1:998333880352:web:5e1624668abf2db0f4c445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
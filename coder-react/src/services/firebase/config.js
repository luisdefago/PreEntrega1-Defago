import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAeJ1UxrYrI0MjUWQc2VI-I1r7tvO3dGCc",
    authDomain: "perifericos-app.firebaseapp.com",
    projectId: "perifericos-app",
    storageBucket: "perifericos-app.appspot.com",
    messagingSenderId: "81721274071",
    appId: "1:81721274071:web:bbe6d247e9443de5950a92"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
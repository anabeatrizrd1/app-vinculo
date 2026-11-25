import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCLfRC7FdgF1ZVHunmXA2tP3pgSBPl0qgk",
    authDomain: "app-vinculo-1b638.firebaseapp.com",
    projectId: "app-vinculo-1b638",
    storageBucket: "app-vinculo-1b638.firebasestorage.app",
    messagingSenderId: "1043267945333",
    appId: "1:1043267945333:web:6cc703b1475ce0f68d893c",
    measurementId: "G-88Y4FKMYB2"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
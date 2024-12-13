// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh36DY5tBSl7cn0MDjriqW_nmoYsOEHQA",
  authDomain: "my-dnd-1.firebaseapp.com",
  projectId: "my-dnd-1",
  storageBucket: "my-dnd-1.firebasestorage.app",
  messagingSenderId: "319655884785",
  appId: "1:319655884785:web:2b3c0afd2ee67aaa13f650"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


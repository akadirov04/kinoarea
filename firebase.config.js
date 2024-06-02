// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7v2hXjuV_9Py4PI2jZAScOD89eh204_c",
  authDomain: "kinoarea-959ef.firebaseapp.com",
  projectId: "kinoarea-959ef",
  storageBucket: "kinoarea-959ef.appspot.com",
  messagingSenderId: "149073263841",
  appId: "1:149073263841:web:acdadbfe50b33fc35a4ba0",
  measurementId: "G-1LYZ7LQZZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_RZqq-NqrAJLnd3QrosNq8tbahO3uLZ0",
  authDomain: "hrm-ntechzy.firebaseapp.com",
  projectId: "hrm-ntechzy",
  storageBucket: "hrm-ntechzy.appspot.com",
  messagingSenderId: "423848954210",
  appId: "1:423848954210:web:2fe7ed08223308761e843b",
  measurementId: "G-QSC2NN3P3Q",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;

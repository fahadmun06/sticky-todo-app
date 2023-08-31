// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEG4exThS24_ozmtQctCEYafOtUE5xxX4",
  authDomain: "react-list-todo.firebaseapp.com",
  projectId: "react-list-todo",
  storageBucket: "react-list-todo.appspot.com",
  messagingSenderId: "430128106725",
  appId: "1:430128106725:web:3ea5349574b8935df0180c",
  measurementId: "G-6FSQT8Z91C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBnOqT1l-sOdN266jokMylv1D_WrrySZ-8",
//   authDomain: "sticky-todo-3e631.firebaseapp.com",
//   projectId: "sticky-todo-3e631",
//   storageBucket: "sticky-todo-3e631.appspot.com",
//   messagingSenderId: "593914808329",
//   appId: "1:593914808329:web:5ad7116362e8dfc48e50d8",
//   measurementId: "G-CNCXWFRHW0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

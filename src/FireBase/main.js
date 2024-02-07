// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuGivS_3-Jm8S1GQdmBreXzhvEaXmcHhc",
  authDomain: "portfolio-668b7.firebaseapp.com",
  projectId: "portfolio-668b7",
  storageBucket: "portfolio-668b7.appspot.com",
  messagingSenderId: "195641206325",
  appId: "1:195641206325:web:1a61d8d39161b52f39337c",
  measurementId: "G-39YF55FG3F",
  databaseURL :  "http://PersonalDetails.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const storage = getStorage(app,process.env.fireShipBucket); 
const database = getDatabase(app);


export default getFirestore();
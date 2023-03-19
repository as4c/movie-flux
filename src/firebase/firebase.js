import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore' 
const firebaseConfig = {
  apiKey: "AIzaSyBstTAG-MAApeHMg5zF1PuDmiKlYeXWzmY",
  authDomain: "movieflux-52f9e.firebaseapp.com",
  projectId: "movieflux-52f9e",
  storageBucket: "movieflux-52f9e.appspot.com",
  messagingSenderId: "227495084074",
  appId: "1:227495084074:web:5e2103fefd9d81e7754353"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const movieRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const usersRef = collection(db,"users");

export default app;
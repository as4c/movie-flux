import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore' 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGESENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const movieRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const usersRef = collection(db,"users");

export default app;
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore' 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORE_BUCKET,
  messagingSenderId:process.env.REACT_APP_MESSAGESENDERID,
  appId: process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const movieRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const usersRef = collection(db,"users");

export default app;
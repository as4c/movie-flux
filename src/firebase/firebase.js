import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore' 
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain:process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORE_BUCKET,
  messagingSenderId:process.env.MESSAGESENDERID,
  appId: process.env.APPID
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const movieRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const usersRef = collection(db,"users");

export default app;
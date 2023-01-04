import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import dotenv from "dotenv";

dotenv.config();

const {
  API_KEY,
  AUTO_DOMAIN,
  PROJECT_ID,
  STORAGEBUCKET,
  MESSAGINGSENDER_ID,
  APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTO_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDER_ID,
  appId: APP_ID,
};

export default firebaseConfig;

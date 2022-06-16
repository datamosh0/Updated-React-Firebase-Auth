import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const auth = getAuth(app);
const db = getFirestore(app);

const addCity = async () => {
  await deleteDoc(doc(db, "BlogPost", "1se8qSdXwcYYxPYXSZeQ"));
};
addCity();

export { auth, app, db };

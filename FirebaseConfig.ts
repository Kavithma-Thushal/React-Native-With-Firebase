import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyARQpgiiWXEsh2dsNbhEzAEwwww4TcEPvc",
  authDomain: "ijse-gdse66-1.firebaseapp.com",
  projectId: "ijse-gdse66-1",
  storageBucket: "ijse-gdse66-1.appspot.com",
  messagingSenderId: "699410676532",
  appId: "1:699410676532:web:88ecc8907449d79591c361",
  measurementId: "G-H4LFJ6KTTN",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

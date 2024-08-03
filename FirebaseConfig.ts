import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPuIJct5PMF1r1JOVaxub7VcwoMkLDzgk",
  authDomain: "react-native-with-fireba-30ee9.firebaseapp.com",
  projectId: "react-native-with-fireba-30ee9",
  storageBucket: "react-native-with-fireba-30ee9.appspot.com",
  messagingSenderId: "893504553712",
  appId: "1:893504553712:web:e3ba3fe7bd11453ce2b835",
  measurementId: "G-JPME5B6TLN",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

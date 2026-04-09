// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBfuH_1Fuk0II13z_KeJLhoKUIVhEB7sp8",
  authDomain: "smarttraffic-52386.firebaseapp.com",
  databaseURL: "https://smarttraffic-52386-default-rtdb.firebaseio.com",
  projectId: "smarttraffic-52386",
  storageBucket: "smarttraffic-52386.firebasestorage.app",
  messagingSenderId: "762048186064",
  appId: "1:762048186064:web:8e569a3c04a0f9e95740d5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);

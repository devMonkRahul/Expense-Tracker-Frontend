import { initializeApp } from "firebase/app";
import config from "../conf/config"

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: config.firebaseAuthDomain,
  projectId: config.firebaseProjectId,
  storageBucket: config.firebaseStorageBucket,
  messagingSenderId: config.firebaseMessagingSenderId,
  appId: config.firebaseAppId,
  measurementId: config.firebaseMeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
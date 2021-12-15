import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_mY7a9VMEh2_yf9SLwjOHsq3w9lLfLpA",
    authDomain: "slack-clone-sga.firebaseapp.com",
    projectId: "slack-clone-sga",
    storageBucket: "slack-clone-sga.appspot.com",
    messagingSenderId: "553639995662",
    appId: "1:553639995662:web:cd33f5e70f187d3c1d0f5f",
    // eslint-disable-next-line no-template-curly-in-string
    measurementId: "${config.measurementId}"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  export {auth, provider, db };
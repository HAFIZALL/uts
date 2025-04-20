// firebase-check-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config (sama seperti yg kamu pakai sebelumnya)
const firebaseConfig = {
  apiKey: "AIzaSyD-kVTVG30VvH9kNQzkXFlme55J95VplRs",
  authDomain: "capqueen-c9c7d.firebaseapp.com",
  projectId: "capqueen-c9c7d",
  storageBucket: "capqueen-c9c7d.appspot.com",
  messagingSenderId: "902743049723",
  appId: "1:902743049723:web:36aa36e4cb2f671bd1f75e",
  measurementId: "G-883J09SXCE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.isLoggedIn = false;
window.loggedUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.isLoggedIn = true;
    window.loggedUser = user;
    console.log("Sudah login sebagai:", user.email);
  } else {
    window.isLoggedIn = false;
    window.loggedUser = null;
    console.log("Belum login.");
  }
});

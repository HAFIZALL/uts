import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD-kVTVG30VvH9kNQzkXFlme55J95VplRs",
  authDomain: "capqueen-c9c7d.firebaseapp.com",
  projectId: "capqueen-c9c7d",
  storageBucket: "capqueen-c9c7d.firebasestorage.app",
  messagingSenderId: "902743049723",
  appId: "1:902743049723:web:36aa36e4cb2f671bd1f75e",
  measurementId: "G-883J09SXCE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
});

// Login logic
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("usernameOrEmail").value.trim();
  const password = document.getElementById("password").value;
  const errorText = document.getElementById("loginError");
  errorText.textContent = "";

  let email = "";

  // Deteksi apakah input berupa email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input)) {
    email = input; // input memang email
  } else {
    // anggap input adalah username, cari email-nya di Firestore
    const q = query(collection(db, "users"), where("username", "==", input));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      errorText.textContent = "Username tidak ditemukan.";
      return;
    }

    const userData = querySnapshot.docs[0].data();
    email = userData.email;
  }

  // Login dengan email dan password
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    Swal.fire({
      icon: "success",
      title: "Berhasil Login!",
      html: `Selamat datang kembali, <strong>${user.email}</strong> 👒`,
      confirmButtonColor: "#f43f5e",
    }).then(() => {
      window.location.href = "dashboard.html";
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Gagal 😢",
      text: error.message,
      confirmButtonColor: "#f43f5e",
    });
  }
});

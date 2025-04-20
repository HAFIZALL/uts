import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Inisialisasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-kVTVG30VvH9kNQzkXFlme55J95VplRs",
  authDomain: "capqueen-c9c7d.firebaseapp.com",
  projectId: "capqueen-c9c7d",
  storageBucket: "capqueen-c9c7d.appspot.com", // <- typo sebelumnya: .firebase**storage**.app
  messagingSenderId: "902743049723",
  appId: "1:902743049723:web:36aa36e4cb2f671bd1f75e",
  measurementId: "G-883J09SXCE",
};

// 🔥 Ini penting!
const app = initializeApp(firebaseConfig);

// Baru setelah itu panggil auth & db
const auth = getAuth(app);
const db = getFirestore(app);

const fields = {
  nama: {
    validate: (val) => /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/.test(val),
    message: "Nama harus diawali huruf besar dan hanya huruf/spasi.",
  },
  username: {
    validate: (val) => /^[a-z0-9]{3,20}$/.test(val),
    message: "Username hanya huruf kecil/angka (3-20 karakter).",
  },
  email: {
    validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    message: "Email tidak valid.",
  },
  password: {
    validate: (val) =>
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}/.test(val),
    message:
      "Password harus kuat (huruf besar, kecil, angka, simbol, 6-20 karakter).",
  },
  whatsapp: {
    preformat: (val) => {
      val = val.replace(/\D/g, ""); // hanya angka
      if (val.startsWith("08")) return "62" + val.slice(1);
      return val;
    },
    validate: (val) => /^62\d{9,12}$/.test(val),
    message: "WA harus diawali 62 dan 11–14 digit angka.",
  },
  role: {
    validate: (val) => val !== "",
    message: "Peran harus dipilih.",
  },
};

function validateField(id) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById("error-" + id);
  let val = input.value.trim();

  if (fields[id].preformat) {
    val = fields[id].preformat(val);
    input.value = val;
  }

  if (!fields[id].validate(val)) {
    input.classList.add("border-red-500");
    errorEl.textContent = fields[id].message;
    return false;
  } else {
    input.classList.remove("border-red-500");
    errorEl.textContent = "";
    return true;
  }
}

// Real-time event listener
Object.keys(fields).forEach((id) => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => validateField(id));
  }
});

// Submit handler (opsional)
// Submit handler (opsional)
const form = document.getElementById("registerForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valid = true;
  let firstInvalid = null;

  Object.keys(fields).forEach((id) => {
    const isValid = validateField(id);
    if (!isValid && !firstInvalid) {
      firstInvalid = document.getElementById(id);
      valid = false;
    }
  });

  if (!valid && firstInvalid) {
    firstInvalid.focus();
    return;
  }

  // Ambil data dari form
  const nama = document.getElementById("nama").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const role = document.getElementById("role").value.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      nama,
      username,
      email,
      whatsapp,
      role,
      createdAt: new Date(),
    });

    Swal.fire({
      icon: "success",
      title: "Registrasi Berhasil 🎉",
      text: "Akun kamu berhasil dibuat! Silakan login untuk mulai berbelanja ",
      confirmButtonColor: "#f43f5e",
    }).then(() => {
      window.location.href = "login.html";
    });
  } catch (error) {
    console.error("Error saat registrasi:", error.message);
    Swal.fire({
      icon: "error",
      title: "Registrasi Gagal 😢",
      text: error.message,
      confirmButtonColor: "#f43f5e",
    });
  }
});

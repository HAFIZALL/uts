// Firebase & Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-kVTVG30VvH9kNQzkXFlme55J95VplRs",
  authDomain: "capqueen-c9c7d.firebaseapp.com",
  projectId: "capqueen-c9c7d",
  storageBucket: "capqueen-c9c7d.appspot.com",
  messagingSenderId: "902743049723",
  appId: "1:902743049723:web:36aa36e4cb2f671bd1f75e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;
let cart = [];

// ==============================
// AUTH: Cek Login
// ==============================
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  document.getElementById("userEmail").textContent = user.email;

  const q = query(collection(db, "users"), where("email", "==", user.email));
  const snap = await getDocs(q);
  if (!snap.empty) {
    const data = snap.docs[0].data();
    document.getElementById("userName").textContent = data.nama || "Pengguna";
  }

  tampilkanProduk();
});

// ==============================
// LOGOUT
// ==============================
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);

  Swal.fire({
    icon: "success",
    title: "Logout Berhasil 👋",
    text: "ditunggu co jaket selanjutnya",
    confirmButtonColor: "#f43f5e",
  }).then(() => {
    window.location.href = "index.html";
  });
});
// ==============================
// DATA PRODUK
// Produk Filtered (default sama dengan produkList)
let produkListFiltered = [];
// ==============================
const produkList = [
  {
    id: 1, // Tambahkan id untuk setiap produk
    nama: "Axelia Cap",
    harga: 259000,
    hargaDiskon: 139000,
    gambar: "img/axelia.jpg",
    rating: 5,
    stok: 12,
    bahan: "Polyester",
  },
  {
    id: 2, // Tambahkan id untuk setiap produk
    nama: "Cleta Cap",
    harga: 150000,
    hargaDiskon: 99000,
    gambar: "img/cleta.jpg",
    rating: 2,
    stok: 10,
    bahan: "katun",
  },
  {
    id: 3, // Tambahkan id untuk setiap produk
    nama: "Eudora Cap",
    harga: 198000,
    hargaDiskon: 109000,
    gambar: "img/eudora.jpg",
    rating: 3,
    stok: 5,
    bahan: "Polyester",
  },
  {
    id: 4, // Tambahkan id untuk setiap produk
    nama: "Gretha Cap",
    harga: 220000,
    hargaDiskon: 122000,
    gambar: "img/gretha.jpg",
    rating: 5,
    stok: 8,
    bahan: "kulit",
  },
  {
    id: 5, // Tambahkan id untuk setiap produk
    nama: "Izora Cap",
    harga: 239000,
    hargaDiskon: 79000,
    gambar: "img/izora.jpg",
    rating: 2,
    stok: 6,
    bahan: "katun",
  },
  {
    id: 6, // Tambahkan id untuk setiap produk
    nama: "Valeria Cap",
    harga: 165000,
    hargaDiskon: 99000,
    gambar: "img/valeria.jpg",
    rating: 5,
    stok: 9,
    bahan: "kulit",
  },
  {
    id: 7, // Tambahkan id untuk setiap produk
    nama: "Athena Cap",
    harga: 189000,
    hargaDiskon: 89000,
    gambar: "img/athen2.jpg",
    rating: 5,
    stok: 3,
    bahan: "Polyester",
  },
  {
    id: 8, // Tambahkan id untuk setiap produk
    nama: "Charlote Cap",
    harga: 159000,
    hargaDiskon: 99000,
    gambar: "img/Charlote.jpg",
    rating: 5,
    stok: 2,
    bahan: "Katun ",
  },
  {
    id: 9, // Tambahkan id untuk setiap produk
    nama: "Charol Cap",
    harga: 199000,
    hargaDiskon: 99000,
    gambar: "img/charol.jpg",
    rating: 5,
    stok: 9,
    bahan: "kulit",
  },
  {
    id: 10, // Tambahkan id untuk setiap produk
    nama: "Cleta Cap",
    harga: 249000,
    hargaDiskon: 160000,
    gambar: "img/cleta.jpg",
    rating: 5,
    stok: 1,
    bahan: "kulit",
  },
  {
    id: 11, // Tambahkan id untuk setiap produk
    nama: "Topi Oyen Style",
    harga: 500000,
    hargaDiskon: 350000,
    gambar: "img/kucing.jpg",
    rating: 5,
    stok: 1,
    bahan: "kulit",
  },
  {
    id: 12, // Tambahkan id untuk setiap produk
    nama: "Cap Police Style",
    harga: 500000,

    hargaDiskon: 250000,
    gambar: "img/polisi.jpeg",
    rating: 5,
    stok: 1,
    bahan: "kulit",
  },
];
produkListFiltered = [...produkList]; // Inisialisasi produkListFiltered dengan produkList

// ==============================
// FUNGSI TAMPILAN PRODUK
// ==============================
function tampilkanProduk(list = produkListFiltered) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  list.forEach((produk) => {
    const itemHTML = `
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
        <img src="${produk.gambar}" class="w-full h-60 object-cover" />
        <h4 class="text-lg font-semibold text-gray-800 mb-1">${produk.nama}</h4>
        <div class="flex items-center justify-between mb-2">
          <span class="text-rose-600 font-bold">Rp ${produk.hargaDiskon.toLocaleString()}</span>
          <span class="line-through text-sm text-gray-400">Rp ${produk.harga.toLocaleString()}</span>
        </div>
        <div class="flex items-center text-yellow-400 mb-3"">
          ${'<i data-feather="star"></i>'.repeat(produk.rating)}
        </div>
        <p class="text-sm text-gray-500 mb-2">Stok: ${produk.stok}</p>
        <button class="btnKeranjang w-full bg-rose-600 text-white py-2 rounded-xl hover:bg-rose-700 transition" data-id="${
          produk.id
        }">
          + Keranjang
        </button>
      </div>
    `;
    container.innerHTML += itemHTML;
  });

  feather.replace();
  tambahkanEventListenerKeranjang();
}

function applySort() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const sortHarga = document.getElementById("sortHarga").value;
  const sortRating = document.getElementById("sortRating").value;
  const hargaMin = parseInt(document.getElementById("hargaMin").value) || 0;
  const hargaMax =
    parseInt(document.getElementById("hargaMax").value) || Infinity;
  const filterBahan = document.getElementById("filterBahan").value;

  produkListFiltered = produkList.filter((p) => {
    return (
      p.nama.toLowerCase().includes(keyword) &&
      p.hargaDiskon >= hargaMin &&
      p.hargaDiskon <= hargaMax &&
      (filterBahan === "" || p.bahan === filterBahan)
    );
  });

  if (sortHarga === "terendah")
    produkListFiltered.sort((a, b) => a.hargaDiskon - b.hargaDiskon);
  else if (sortHarga === "tertinggi")
    produkListFiltered.sort((a, b) => b.hargaDiskon - a.hargaDiskon);

  if (sortRating === "terbagus")
    produkListFiltered.sort((a, b) => b.rating - a.rating);
  else if (sortRating === "terjelek")
    produkListFiltered.sort((a, b) => a.rating - b.rating);

  tampilkanProduk(produkListFiltered);
}

// Event pencarian dan filter
[
  "searchInput",
  "sortHarga",
  "sortRating",
  "hargaMin",
  "hargaMax",
  "filterBahan",
].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", applySort);
});

function tambahkanEventListenerKeranjang() {
  document.querySelectorAll(".btnKeranjang").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const produk = produkList.find((p) => p.id === id);
      const item = cart.find((i) => i.id === id);
      if (item) {
        if (item.jumlah < produk.stok) item.jumlah++;
        else alert("Stok tidak cukup.");
      } else {
        cart.push({ ...produk, jumlah: 1 });
      }
      updateKeranjangUI();
      tampilkanKeranjang(); // 🔥 inilah yang bikin auto-refresh keranjang!
    });
  });
}

function updateKeranjangUI() {
  const cartCount = cart.reduce((sum, i) => sum + i.jumlah, 0);
  document.getElementById("cartCount").textContent = cartCount;
}

// ==============================
// KERANJANG
// ==============================
document
  .getElementById("stickyCart")
  .addEventListener("click", tampilkanKeranjang);
document.getElementById("closeCartPanel").addEventListener("click", () => {
  document.getElementById("cartPanel").classList.add("translate-x-full");
});

function tampilkanKeranjang() {
  const container = document.getElementById("cartContainer");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class='text-gray-500 text-center'>Keranjang kosong.</p>`;
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "flex gap-3 border-b pb-4 mb-4";

    row.innerHTML = `
      <img src="${item.gambar}" alt="${
      item.nama
    }" class="w-16 h-16 object-cover rounded" />
      <div class="flex-1">
        <div class="flex justify-between">
          <h4 class="font-semibold">${item.nama}</h4>
          <button class="hapusItem text-red-500" data-id="${item.id}">✕</button>
        </div>
        <p class="text-sm text-gray-500">IDR ${item.hargaDiskon.toLocaleString()}</p>
        <div class="flex items-center mt-2 space-x-2">
          <button class="kurangBtn bg-gray-200 px-2 rounded" data-id="${
            item.id
          }">−</button>
          <span>${item.jumlah}</span>
          <button class="tambahBtn bg-gray-200 px-2 rounded" data-id="${
            item.id
          }">+</button>
        </div>
      </div>
    `;

    container.appendChild(row);
  });

  const total = cart.reduce((t, i) => t + i.hargaDiskon * i.jumlah, 0);
  container.innerHTML += `
    <div class="text-right font-bold pt-4 border-t">
      Total: IDR ${total.toLocaleString()}
    </div>
    <button id="checkoutBtn" class="mt-4 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700">
      🛍 Checkout
    </button>
  `;

  // Event: Hapus
  document.querySelectorAll(".hapusItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      cart = cart.filter((item) => item.id !== id);
      updateKeranjangUI();
      tampilkanKeranjang();
    });
  });

  // Event: Tambah
  document.querySelectorAll(".tambahBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find((i) => i.id === id);
      if (item && item.jumlah < item.stok) {
        item.jumlah++;
        updateKeranjangUI();
        tampilkanKeranjang();
      }
    });
  });

  // Event: Kurang
  document.querySelectorAll(".kurangBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find((i) => i.id === id);
      if (item && item.jumlah > 1) {
        item.jumlah--;
      } else {
        cart = cart.filter((i) => i.id !== id);
      }
      updateKeranjangUI();
      tampilkanKeranjang();
    });
  });

  document.getElementById("cartPanel").classList.remove("translate-x-full");
}

// ==============================
// CHECKOUT
// ==============================
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "checkoutBtn") {
    if (!currentUser) {
      alert("Harus login untuk checkout!");
      return;
    }

    // Simpan data cart ke localStorage
    localStorage.setItem("cartCheckout", JSON.stringify(cart));

    // Kosongkan keranjang dan arahkan ke struk
    cart = [];
    updateKeranjangUI();
    tampilkanKeranjang();
    document.getElementById("cartPanel").classList.add("translate-x-full");

    // Redirect ke struk
    window.location.href = "sukses.html";
  }
});

function tampilkanStruk() {
  const struk = document.getElementById("strukContent");
  const waktu = new Date().toLocaleString();
  let isi = `<p><strong>Waktu:</strong> ${waktu}</p><ul class="list-disc ml-4">`;
  cart.forEach((item) => {
    isi += `<li>${item.nama} × ${
      item.jumlah
    } — IDR ${item.hargaDiskon.toLocaleString()}</li>`;
  });
  const total = cart.reduce((t, i) => t + i.hargaDiskon * i.jumlah, 0);
  isi += `</ul><p class="mt-2 font-bold">Total: IDR ${total.toLocaleString()}</p>`;
  struk.innerHTML = isi;
  document.getElementById("strukModal").classList.remove("hidden");
}

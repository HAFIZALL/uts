import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Tambahkan setelah konfigurasi firebase di index
const db = getFirestore();

// Fungsi simpan checkout
async function simpanOrder() {
  const user = window.loggedUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "orders"), {
      uid: user.uid,
      email: user.email,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.hargaDiskon * item.jumlah,
        0
      ),
      timestamp: serverTimestamp(),
    });
    console.log("Pesanan tersimpan!");
  } catch (err) {
    console.error("Gagal simpan pesanan:", err);
  }
}

const produkList = [
  {
    id: 1, // Tambahkan id untuk setiap produk
    nama: "jaket kulit",
    harga: 350000,
    hargaDiskon: 120000,
    gambar: "jaketkulit1.jpg",
    rating: 5,
    stok: 12,
    bahan: "kulit",
  },
  {
    id: 2, // Tambahkan id untuk setiap produk
    nama: "jaket kulit",
    harga: 150000,
    hargaDiskon: 99000,
    gambar: "jaketkulit2.jpg",
    rating: 2,
    stok: 10,
    bahan: "kulit",
  },
  {
    id: 3, // Tambahkan id untuk setiap produk
    nama: "jaket kulit",
    harga: 198000,
    hargaDiskon: 109000,
    gambar: "jaketkulit3.jpg",
    rating: 3,
    stok: 5,
    bahan: "kulit",
  },
  {
    id: 4, // Tambahkan id untuk setiap produk
    nama: "jaket kulit",
    harga: 220000,
    hargaDiskon: 122000,
    gambar: "jaketkulit4.jpg",
    rating: 5,
    stok: 8,
    bahan: "kulit",
  },
  {
    id: 5, // Tambahkan id untuk setiap produk
    nama: "jaket rajut",
    harga: 239000,
    hargaDiskon: 79000,
    gambar: "jaketrajut1.jpg",
    rating: 2,
    stok: 6,
    bahan: "rajut",
  },
  {
    id: 6, // Tambahkan id untuk setiap produk
    nama: "jaket rajut",
    harga: 165000,
    hargaDiskon: 99000,
    gambar: "jaket raju2.jpg",
    rating: 5,
    stok: 9,
    bahan: "rajut",
  },
  {
    id: 7, // Tambahkan id untuk setiap produk
    nama: "jaket raju",
    harga: 189000,
    hargaDiskon: 89000,
    gambar: "jaket raju3.jpg",
    rating: 5,
    stok: 3,
    bahan: "rajut",
  },
  {
    id: 8, // Tambahkan id untuk setiap produk
    nama: "jaket raju",
    harga: 159000,
    hargaDiskon: 99000,
    gambar: "jaket raju4.jpg",
    rating: 5,
    stok: 2,
    bahan: "rajut ",
  },
  {
    id: 9, // Tambahkan id untuk setiap produk
    nama: "jaket wool",
    harga: 199000,
    hargaDiskon: 99000,
    gambar: "jaket wool1.jpg",
    rating: 5,
    stok: 9,
    bahan: "wool",
  },
  {
    id: 10, // Tambahkan id untuk setiap produk
    nama: "jaket wool",
    harga: 249000,
    hargaDiskon: 160000,
    gambar: "jaket wool2.jpg",
    rating: 5,
    stok: 1,
    bahan: "wool",
  },
  {
    id: 11, // Tambahkan id untuk setiap produk
    nama: "jaket wool",
    harga: 500000,
    hargaDiskon: 350000,
    gambar: "jaket wool3.jpg",
    rating: 5,
    stok: 1,
    bahan: "wool",
  },
  {
    id: 12, // Tambahkan id untuk setiap produk
    nama: "jaket wool",
    harga: 500000,

    hargaDiskon: 250000,
    gambar: "jaket wool4.jpeg",
    rating: 5,
    stok: 1,
    bahan: "wool",
  },
];

let produkListFiltered = [...produkList];

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  produkListFiltered = produkList.filter((p) =>
    p.nama.toLowerCase().includes(keyword)
  );
  applySort();
});

document.getElementById("sortHarga").addEventListener("change", function () {
  applySort();
});

function applySort() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const sortHarga = document.getElementById("sortHarga").value;
  const sortRating = document.getElementById("sortRating").value;
  const hargaMin = parseInt(document.getElementById("hargaMin").value) || 0;
  const hargaMax =
    parseInt(document.getElementById("hargaMax").value) || Infinity;
  const filterBahan = document.getElementById("filterBahan").value;

  let hasil = produkList.filter((p) => {
    return (
      p.nama.toLowerCase().includes(keyword) &&
      p.hargaDiskon >= hargaMin &&
      p.hargaDiskon <= hargaMax &&
      (filterBahan === "" || p.bahan === filterBahan)
    );
  });

  if (sortHarga === "terendah") {
    hasil.sort((a, b) => a.hargaDiskon - b.hargaDiskon);
  } else if (sortHarga === "tertinggi") {
    hasil.sort((a, b) => b.hargaDiskon - a.hargaDiskon);
  }

  if (sortRating === "terbagus") {
    hasil.sort((a, b) => b.rating - a.rating);
  } else if (sortRating === "terjelek") {
    hasil.sort((a, b) => a.rating - b.rating);
  }

  tampilkanProduk(hasil);
}
document.getElementById("searchInput").addEventListener("input", applySort);
document.getElementById("sortHarga").addEventListener("change", applySort);
document.getElementById("sortRating").addEventListener("change", applySort);
document.getElementById("hargaMin").addEventListener("input", applySort);
document.getElementById("hargaMax").addEventListener("input", applySort);
document.getElementById("filterBahan").addEventListener("change", applySort);

function resetFilter() {
  document.getElementById("searchInput").value = "";
  document.getElementById("sortHarga").value = "";
  document.getElementById("sortRating").value = "";
  document.getElementById("hargaMin").value = "";
  document.getElementById("hargaMax").value = "";
  document.getElementById("filterBahan").value = "";

  // Kembalikan semua produk seperti awal
  tampilkanProduk(produkList);
}
//  keranjang
let cart = [];
// Fungsi tambah ke keranjang
function tambahKeKeranjang(produkId) {
  const produk = produkList.find((p) => p.id === produkId);
  if (!produk) return;

  const itemDiKeranjang = cart.find((item) => item.id === produkId);
  if (itemDiKeranjang) {
    if (itemDiKeranjang.jumlah < produk.stok) {
      itemDiKeranjang.jumlah += 1;
    } else {
      alert("Stok produk tidak cukup untuk ditambah.");
    }
  } else {
    cart.push({ ...produk, jumlah: 1 });
  }

  updateKeranjangUI(); // ✔ update jumlah
  tampilkanKeranjang(); // ✔ isi panel keranjang
  document.getElementById("cartPanel").classList.remove("translate-x-full"); // ✔ tampilkan panel
}

// Update tampilan jumlah di sticky cart
function updateKeranjangUI() {
  const cartCountEl = document.getElementById("cartCount");
  const totalItem = cart.reduce((acc, item) => acc + item.jumlah, 0);
  cartCountEl.textContent = totalItem;

  // Update tombol keranjang jadi "Sudah di Keranjang"
  document.querySelectorAll(".btnKeranjang").forEach((btn) => {
    const idProduk = parseInt(btn.getAttribute("data-id"));
    const itemDiKeranjang = cart.find((item) => item.id === idProduk);

    if (itemDiKeranjang) {
      btn.textContent = "✔ Sudah di Keranjang";
      btn.disabled = false;

      // Disable jika stok habis
      if (itemDiKeranjang.jumlah >= itemDiKeranjang.stok) {
        btn.disabled = true;
        btn.classList.add("bg-gray-400", "cursor-not-allowed");
        btn.classList.remove("bg-rose-600", "hover:bg-rose-700");
      }
    } else {
      const produk = produkList.find((p) => p.id === idProduk);
      if (produk.stok <= 0) {
        btn.textContent = "Stok Habis";
        btn.disabled = true;
        btn.classList.add("bg-gray-400", "cursor-not-allowed");
        btn.classList.remove("bg-rose-600", "hover:bg-rose-700");
      } else {
        btn.textContent = "+ Keranjang";
        btn.disabled = false;
        btn.classList.remove("bg-gray-400", "cursor-not-allowed");
        btn.classList.add("bg-rose-600", "hover:bg-rose-700");
      }
    }
  });
}

// Event listener untuk tombol "+ Keranjang" ditambahkan sekali saja
function tambahkanEventListenerKeranjang() {
  const btnKeranjang = document.querySelectorAll(".btnKeranjang");
  btnKeranjang.forEach((btn) => {
    btn.addEventListener("click", function () {
      const idProduk = parseInt(this.getAttribute("data-id"));
      tambahKeKeranjang(idProduk);
    });
  });
}

// Pastikan event listener hanya dipasang setelah produk ditampilkan
function tampilkanProduk(list = produkList) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  list.forEach((produk) => {
    const produkHTML = `
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
        <img src="${produk.gambar}" alt="${
      produk.nama
    }" class="w-full h-60 object-cover" />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-1">${
            produk.nama
          }</h3>
          <div class="flex items-center justify-between mb-2">
            <span class="text-rose-600 font-bold">IDR ${produk.hargaDiskon.toLocaleString()}</span>
            <span class="line-through text-sm text-gray-400">IDR ${produk.harga.toLocaleString()}</span>
          </div>
          <div class="flex items-center text-yellow-400 mb-3">
            ${'<i data-feather="star"></i>'.repeat(produk.rating)}
          </div>
          <p class="text-sm text-gray-500 mb-2">Stok: ${produk.stok}</p>
          <button data-id="${
            produk.id
          }" class="btnKeranjang w-full bg-rose-600 text-white py-2 rounded-xl hover:bg-rose-700 transition">+ Keranjang</button>
        </div>
      </div>
    `;
    container.innerHTML += produkHTML;
  });

  // Pasang event listener untuk tombol "+ Keranjang" setelah produk ditampilkan
  tambahkanEventListenerKeranjang();

  feather.replace();
}

// Panggil tampilkanProduk saat DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
  tampilkanProduk(); // otomatis pakai produkList
});

// Fungsi tambah ke keranjang
// Fungsi untuk menampilkan keranjang belanja
function tampilkanKeranjang() {
  const containerKeranjang = document.getElementById("cartContainer");
  containerKeranjang.innerHTML = ""; // Bersihkan sebelumnya

  if (cart.length === 0) {
    containerKeranjang.innerHTML =
      "<p class='text-gray-500 text-center'>Keranjang Anda kosong.</p>";
    return;
  }

  cart.forEach((item) => {
    const itemHTML = `
      <div class="flex items-start justify-between border-b pb-4">
        <div class="flex gap-3">
          <img src="${item.gambar}" alt="${
      item.nama
    }" class="w-16 h-16 object-cover rounded-md" />
          <div>
            <h4 class="font-semibold">${item.nama}</h4>
            <p class="text-sm text-gray-600">IDR ${item.hargaDiskon.toLocaleString()}</p>
            <div class="flex items-center mt-2 space-x-2">
              <button class="kurangBtn bg-gray-300 px-2 rounded" data-id="${
                item.id
              }">−</button>
              <span>${item.jumlah}</span>
              <button class="tambahBtn bg-gray-300 px-2 rounded" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
        </div>
        <button class="btnHapusProduk text-red-600 hover:text-red-800" data-id="${
          item.id
        }">✕</button>
      </div>
    `;
    containerKeranjang.innerHTML += itemHTML;
  });

  // Total
  const totalHarga = cart.reduce(
    (total, item) => total + item.hargaDiskon * item.jumlah,
    0
  );
  containerKeranjang.innerHTML += `
    <div class="text-right font-bold border-t pt-4">
      Total: Rp. ${totalHarga.toLocaleString()}
    </div>
     <button id="checkoutBtn" class="mt-4 w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition">
    🛍 Checkout Sekarang
  </button>
  `;

  // Event listener tombol hapus
  document.querySelectorAll(".btnHapusProduk").forEach((btn) => {
    btn.addEventListener("click", function () {
      const produkId = parseInt(this.getAttribute("data-id"));
      hapusDariKeranjang(produkId);
    });
  });

  // Event listener tambah jumlah
  document.querySelectorAll(".tambahBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find((i) => i.id === id);
      if (item && item.jumlah < item.stok) {
        item.jumlah++;
        updateKeranjangUI();
        tampilkanKeranjang();
      }
    });
  });

  // Event listener kurang jumlah
  document.querySelectorAll(".kurangBtn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"));
      const item = cart.find((i) => i.id === id);
      if (item && item.jumlah > 1) {
        item.jumlah--;
      } else {
        // Kalau jumlah jadi 0, hapus aja
        cart = cart.filter((i) => i.id !== id);
      }
      updateKeranjangUI();
      tampilkanKeranjang();
    });
  });
}

// Fungsi untuk menghapus produk dari keranjang
function hapusDariKeranjang(produkId) {
  // Filter untuk menghapus produk yang dipilih
  cart = cart.filter((item) => item.id !== produkId);
  updateKeranjangUI(); // Update UI keranjang setelah penghapusan
  tampilkanKeranjang(); // Update tampilan keranjang
}

// Panggil tampilkanKeranjang ketika halaman keranjang dibuka
document.addEventListener("DOMContentLoaded", () => {
  tampilkanKeranjang(); // Pastikan menampilkan keranjang saat halaman terbuka
});
// Buka modal keranjang saat ikon keranjang diklik
// Buka panel keranjang saat tombol ikon diklik
document.getElementById("stickyCart").addEventListener("click", () => {
  tampilkanKeranjang(); // tampilkan isi
  document.getElementById("cartPanel").classList.remove("translate-x-full");
});

// Tutup panel saat tombol close diklik
document.getElementById("closeCartPanel").addEventListener("click", () => {
  document.getElementById("cartPanel").classList.add("translate-x-full");
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "checkoutBtn") {
    if (!window.isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Dulu Yuk!",
        text: "Kamu harus login dulu sebelum bisa checkout 🛒",
        confirmButtonColor: "#f43f5e", // rose-500
      }).then(() => {
        window.location.href = "login.html";
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Checkout Berhasil!",
        html: `Terima kasih, <strong>${window.loggedUser.email}</strong> telah berbelanja di <strong>jaket aa</strong>! `,
        confirmButtonColor: "#f43f5e", // rose-500
      });

      cart = [];
      updateKeranjangUI();
      tampilkanKeranjang();
      document.getElementById("cartPanel").classList.add("translate-x-full");
    }
  }
});

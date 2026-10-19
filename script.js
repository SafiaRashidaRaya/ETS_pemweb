let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

const formTransaksi = document.getElementById("formTransaksi");

function rupiah(nominal) {
  return nominal.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

function simpanData() {
  localStorage.setItem("transaksi", JSON.stringify(transaksi));
}

function renderDaftar() {
  const daftar = document.getElementById("daftarTransaksi");

  daftar.replaceChildren();

  const terbaru = [...transaksi].sort((a, b) => b.id - a.id);

  terbaru.forEach(function (item) {
    const kartu = document.createElement("div");
    kartu.className = "transaksi";

    const judul = document.createElement("h3");
    judul.textContent = item.jenis;

    const tanggal = document.createElement("p");
    tanggal.textContent = "Tanggal: " + item.tanggal;

    const kategori = document.createElement("p");
    kategori.textContent = "Kategori: " + item.kategori;

    const nominal = document.createElement("p");
    nominal.textContent = "Nominal: " + rupiah(item.nominal);

    kartu.append(judul, tanggal, kategori, nominal);

    if (item.catatan) {
      const catatan = document.createElement("p");
      catatan.textContent = "Catatan: " + item.catatan;
      kartu.appendChild(catatan);
    }

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus Transaksi";

    tombolHapus.addEventListener("click", function () {
      const yakin = confirm("Yakin ingin menghapus transaksi ini?");

      if (yakin) {
        transaksi = transaksi.filter(function (t) {
          return t.id !== item.id;
        });

        simpanData();
        renderSemua();
      }
    });

    kartu.appendChild(tombolHapus);

    daftar.appendChild(kartu);
  });
}

function renderSemua() {
  renderDaftar();
  hitungRingkasan();
}

formTransaksi.addEventListener("submit", function (event) {
  event.preventDefault();

  const tanggal = document.getElementById("tanggal").value;
  const jenis = document.getElementById("jenis").value;
  const kategori = document.getElementById("kategori").value;
  const nominal = Number(document.getElementById("nominal").value);
  const catatan = document.getElementById("catatan").value.trim();

  const dataBaru = {
    id: Date.now(),
    tanggal: tanggal,
    jenis: jenis,
    kategori: kategori,
    nominal: nominal,
    catatan: catatan,
  };

  const error = document.getElementById("errorTransaksi");
  error.textContent = "";

  if (
    !tanggal ||
    !jenis ||
    !kategori ||
    !Number.isFinite(nominal) ||
    nominal <= 0
  ) {
    error.textContent =
      "Lengkapi semua field wajib dan masukkan nominal lebih dari 0.";
    return;
  }

  transaksi.push(dataBaru);

  simpanData();
  renderSemua();

  formTransaksi.reset();
});

function hitungRingkasan() {
  const pemasukan = transaksi
    .filter((t) => t.jenis === "pemasukan")
    .reduce((total, t) => total + t.nominal, 0);

  const pengeluaran = transaksi
    .filter((t) => t.jenis === "pengeluaran")
    .reduce((total, t) => total + t.nominal, 0);

  document.getElementById("totalPemasukan").textContent = rupiah(pemasukan);

  document.getElementById("totalPengeluaran").textContent = rupiah(pengeluaran);

  document.getElementById("saldo").textContent = rupiah(
    pemasukan - pengeluaran,
  );
}

renderSemua();

let transaksi = JSON.parse(localStorage.getItem("transaksi")) || [];

let amplop = JSON.parse(localStorage.getItem("amplop"));

if (amplop === null) {
  const waktu = Date.now();

  amplop = [
    { id: waktu, nama: "Makan", anggaran: 1000000 },
    { id: waktu + 1, nama: "Transportasi", anggaran: 1000000 },
    { id: waktu + 2, nama: "Kebutuhan Rumah", anggaran: 1000000 },
  ];

  localStorage.setItem("amplop", JSON.stringify(amplop));
}

const formTransaksi = document.getElementById("formTransaksi");

let idEdit = null;

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

function simpanAmplop() {
  localStorage.setItem("amplop", JSON.stringify(amplop));
}

function hitungSisaAmplop(itemAmplop, abaikanId) {
  const totalTerpakai = transaksi
    .filter(function (t) {
      return (
        t.jenis === "pengeluaran" &&
        Number(t.amplopId) === itemAmplop.id &&
        t.id !== abaikanId
      );
    })
    .reduce(function (total, t) {
      return total + t.nominal;
    }, 0);

  return itemAmplop.anggaran - totalTerpakai;
}

function renderAmplop() {
  const daftar = document.getElementById("daftarAmplop");
  const pilihan = document.getElementById("amplopTransaksi");

  daftar.replaceChildren();

  const pilihanSebelumnya = pilihan.value;

  pilihan.replaceChildren();

  const opsiAwal = document.createElement("option");
  opsiAwal.value = "";
  opsiAwal.textContent = "-- Pilih Amplop --";
  pilihan.appendChild(opsiAwal);

  amplop.forEach(function (item) {
    const opsi = document.createElement("option");
    opsi.value = item.id;
    opsi.textContent = item.nama;
    pilihan.appendChild(opsi);

    const sisa = hitungSisaAmplop(item);
    const habis = sisa <= 0;

    const kartu = document.createElement("div");
    kartu.className = habis ? "amplop habis" : "amplop";

    const nama = document.createElement("h3");
    nama.textContent = item.nama;

    const anggaran = document.createElement("p");
    anggaran.textContent = "Anggaran awal: " + rupiah(item.anggaran);

    const saldo = document.createElement("p");
    saldo.textContent = "Sisa saldo: " + rupiah(Math.max(0, sisa));

    const status = document.createElement("p");
    status.className = "status";
    status.textContent = habis ? "STATUS: HABIS" : "STATUS: AKTIF";

    kartu.append(nama, anggaran, saldo, status);

    daftar.appendChild(kartu);
  });

  if (
    pilihanSebelumnya &&
    amplop.some(function (item) {
      return String(item.id) === pilihanSebelumnya;
    })
  ) {
    pilihan.value = pilihanSebelumnya;
  }
}

const formAmplop = document.getElementById("formAmplop");

formAmplop.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("namaAmplop").value.trim();
  const anggaran = Number(document.getElementById("nominalAmplop").value);
  const error = document.getElementById("errorAmplop");

  error.textContent = "";

  if (!nama || !Number.isFinite(anggaran) || anggaran <= 0) {
    error.textContent =
      "Nama amplop wajib diisi dan anggaran harus lebih dari 0.";
    return;
  }

  const amplopBaru = {
    id: Date.now(),
    nama: nama,
    anggaran: anggaran,
  };

  amplop.push(amplopBaru);

  simpanAmplop();
  renderSemua();

  formAmplop.reset();
});

function ambilTransaksiTerfilter() {
  const jenis = document.getElementById("filterJenis").value;
  const kategori = document.getElementById("filterKategori").value;
  const dari = document.getElementById("filterDari").value;
  const sampai = document.getElementById("filterSampai").value;
  const kataKunci = document
    .getElementById("filterCari")
    .value.trim()
    .toLowerCase();

  return transaksi.filter(function (t) {
    if (jenis && t.jenis !== jenis) return false;
    if (kategori && t.kategori !== kategori) return false;
    if (dari && t.tanggal < dari) return false;
    if (sampai && t.tanggal > sampai) return false;

    if (kataKunci && !(t.catatan || "").toLowerCase().includes(kataKunci)) {
      return false;
    }

    return true;
  });
}

function renderDaftar() {
  const daftar = document.getElementById("daftarTransaksi");
  const info = document.getElementById("infoFilter");

  daftar.replaceChildren();

  const hasil = ambilTransaksiTerfilter();

  info.textContent =
    "Menampilkan " + hasil.length + " dari " + transaksi.length + " transaksi.";

  if (hasil.length === 0) {
    const kosong = document.createElement("p");
    kosong.className = "kosong";
    kosong.textContent = "Belum ada transaksi yang cocok.";
    daftar.appendChild(kosong);
    return;
  }

  const terbaru = [...hasil].sort((a, b) => b.id - a.id);

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

    if (item.jenis === "pengeluaran" && item.amplopId != null) {
      const amplopTransaksi = amplop.find(function (a) {
        return a.id === Number(item.amplopId);
      });

      const infoAmplop = document.createElement("p");
      infoAmplop.textContent =
        "Amplop: " +
        (amplopTransaksi ? amplopTransaksi.nama : "Tidak ditemukan");

      kartu.appendChild(infoAmplop);
    }

    if (item.catatan) {
      const catatan = document.createElement("p");
      catatan.textContent = "Catatan: " + item.catatan;
      kartu.appendChild(catatan);
    }

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit Transaksi";
    tombolEdit.className = "tombol-edit";

    tombolEdit.addEventListener("click", function () {
      mulaiEdit(item);
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus Transaksi";

    tombolHapus.addEventListener("click", function () {
      const yakin = confirm("Yakin ingin menghapus transaksi ini?");

      if (yakin) {
        transaksi = transaksi.filter(function (t) {
          return t.id !== item.id;
        });

        if (idEdit === item.id) {
          resetFormTransaksi();
        }

        simpanData();
        renderSemua();
      }
    });

    const aksi = document.createElement("div");
    aksi.className = "aksi";
    aksi.append(tombolEdit, tombolHapus);

    kartu.appendChild(aksi);

    daftar.appendChild(kartu);
  });
}

function mulaiEdit(item) {
  idEdit = item.id;

  document.getElementById("tanggal").value = item.tanggal;
  document.getElementById("jenis").value = item.jenis;
  document.getElementById("kategori").value = item.kategori;
  document.getElementById("nominal").value = item.nominal;
  document.getElementById("catatan").value = item.catatan || "";
  document.getElementById("amplopTransaksi").value =
    item.amplopId != null ? item.amplopId : "";

  document.getElementById("judulForm").textContent = "Edit Transaksi";
  document.getElementById("tombolSimpan").textContent = "Simpan Perubahan";
  document.getElementById("tombolBatal").hidden = false;
  document.getElementById("errorTransaksi").textContent = "";

  formTransaksi.scrollIntoView({ behavior: "smooth" });
}

function resetFormTransaksi() {
  idEdit = null;

  formTransaksi.reset();

  document.getElementById("judulForm").textContent = "Tambah Transaksi";
  document.getElementById("tombolSimpan").textContent = "Simpan Transaksi";
  document.getElementById("tombolBatal").hidden = true;
}

document
  .getElementById("tombolBatal")
  .addEventListener("click", resetFormTransaksi);

function isiFilterKategori() {
  const filter = document.getElementById("filterKategori");

  document.querySelectorAll("#kategori option").forEach(function (opsi) {
    if (opsi.value === "") return;

    const baru = document.createElement("option");
    baru.value = opsi.value;
    baru.textContent = opsi.textContent;
    filter.appendChild(baru);
  });
}

[
  "filterJenis",
  "filterKategori",
  "filterDari",
  "filterSampai",
  "filterCari",
].forEach(function (id) {
  document.getElementById(id).addEventListener("input", renderDaftar);
});

document
  .getElementById("tombolResetFilter")
  .addEventListener("click", function () {
    document.getElementById("filterJenis").value = "";
    document.getElementById("filterKategori").value = "";
    document.getElementById("filterDari").value = "";
    document.getElementById("filterSampai").value = "";
    document.getElementById("filterCari").value = "";

    renderDaftar();
  });

function renderSemua() {
  renderAmplop();
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
  const amplopId = document.getElementById("amplopTransaksi").value;

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

  let amplopDipilih = null;

  if (jenis === "pengeluaran") {
    if (!amplopId) {
      error.textContent = "Pilih amplop untuk pengeluaran ini.";
      return;
    }

    amplopDipilih = amplop.find(function (item) {
      return item.id === Number(amplopId);
    });

    if (!amplopDipilih) {
      error.textContent =
        "Amplop tidak ditemukan. Silakan pilih amplop kembali.";
      return;
    }

    const sisa = hitungSisaAmplop(amplopDipilih, idEdit);

    if (nominal > sisa) {
      error.textContent =
        "Saldo amplop " +
        amplopDipilih.nama +
        " tidak mencukupi. Sisa: " +
        rupiah(Math.max(0, sisa)) +
        ".";
      return;
    }
  }

  const dataBaru = {
    id: idEdit !== null ? idEdit : Date.now(),
    tanggal: tanggal,
    jenis: jenis,
    kategori: kategori,
    nominal: nominal,
    catatan: catatan,
    amplopId: jenis === "pengeluaran" ? Number(amplopId) : null,
  };

  if (idEdit !== null) {
    transaksi = transaksi.map(function (t) {
      return t.id === idEdit ? dataBaru : t;
    });
  } else {
    transaksi.push(dataBaru);
  }

  simpanData();
  renderSemua();

  resetFormTransaksi();
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

isiFilterKategori();
renderSemua();

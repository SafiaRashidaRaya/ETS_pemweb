let transaksi = [];

const formTransaksi = document.getElementById("formTransaksi");

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

  transaksi.push(dataBaru);

  console.log(transaksi);

  formTransaksi.reset();
});

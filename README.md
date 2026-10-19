# ETS_pemweb: Money Manager - Anggaran Rumah Tangga

**Nama:** Safia Rashida Raya
**NRP:** 5053251026
**Persona:** Ibu rumah tangga
**GitHub Pages:** https://safiarashidaraya.github.io/ETS_pemweb/

## Persona dan masalahnya

Persona yang didapat adalah Ibu rumah tangga. Dia kesulitan untuk membagi uang belanja bulanan ke beberapa pos kebutuhan dan memantau sisa anggaran setelah melakukan pengeluaran.

## Fitur yang selesai

**Fitur wajib**
- [x] W1: Tambah transaksi (tanggal, jenis, kategori, nominal, catatan)
- [x] W2: Daftar transaksi dirender dinamis, terbaru di atas, format Rupiah
- [x] W3: Hapus transaksi dengan konfirmasi
- [x] W4: Data persisten dengan localStorage
- [x] W5: Ringkasan pemasukan, pengeluaran, dan saldo
- [x] W6: Validasi form dengan pesan error di halaman

**Fitur khas persona (amplop)**
- [x] Atur nominal tiap amplop (3 amplop default: Makan, Transportasi, Kebutuhan Rumah, dan amplop baru bisa ditambah lewat form)
- [x] Pengeluaran mengurangi amplop terkait dan ditolak jika melebihi sisa amplop
- [x] Menampilkan sisa tiap amplop dan menandai amplop yang habis

**Fitur bonus**
- [x] Edit transaksi
- [x] Filter jenis, kategori, rentang tanggal, dan pencarian kata kunci catatan
- [x] Tampilan responsif (diuji sampai lebar 360px)

## Fitur yang belum selesai

- Budget per kategori
- Ekspor dan impor data JSON

## Catatan

- Filter hanya memengaruhi daftar riwayat. Ringkasan dan saldo amplop tetap dihitung dari semua transaksi.
- Data tersimpan di localStorage, jadi hanya ada di browser yang sama.
- Dokumen proses: [AI-LOG.md](AI-LOG.md) dan [PROSES.md](PROSES.md)

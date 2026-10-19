Persona: Ibu rumah tangga

Masalah persona: Ibu rumah tangga kesulitan untuk membagi uang belanja bulanan ke beberapa pos kebutuhan dan memantau sisa anggaran setelah melakukan pengeluaran.

Rancangan struktur data:
-Transaksi: id, tanggal, jenis, kategori, nominal, catatan, dan amplopId.

-Amplop: id, nama, dan anggaran.

-Data disimpan menggunakan localStorage agar tetap tersedia setelah halaman di-refresh.

Keputusan desain dan alasan:
1. Menggunakan warna hijau untuk memberikan tampilan yang nyaman dan sesuai dengan tema keuangan rumah tangga.
2. Menyediakan 3 amplop default (Makan, Transportasi, Kebutuhan Rumah). Alasannya syarat minimal 3 pos langsung terpenuhi.
3. Edit transaksi memakai variabel idEdit (null berarti mode tambah) supaya form yang sama dipakai untuk tambah dan edit, dan id transaksi tidak berubah.

Bug/Kendala dan cara mengatasi:
1. Data tidak muncul setelah di refresh: Sebenarnya tersimpan, tetapi tidak muncul, jadi di bagian akhir script.js ditambah renderDaftar(). Ini ketika mengerjakan W4. Setelah W5 renderDaftar() dan hitungRingkasan() dimasukkan ke renderSemua() jadi renderSemua() yang ditambah di akhir script.js
2. 2. Menghapus tombol Ganti Nama dan Tambah Dana pada amplop, lalu menyediakan 3 amplop default (Makan, Transportasi, Kebutuhan Rumah). Alasannya fitur itu tidak diwajibkan, kode jadi lebih sederhana, dan syarat minimal 3 pos langsung terpenuhi.
3. 3. Status amplop HABIS tidak berwarna merah: pada versi yang masih punya tombol Ganti Nama dan Tambah Dana, selector CSS .amplop.habis p:last-child tidak lagi mengenai status karena elemen terakhir kartu adalah tombol. Diperbaiki dengan memberi class status pada paragraf status dan mengganti selector menjadi .amplop.habis .status.
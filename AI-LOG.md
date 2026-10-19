# AI-LOG

AI yang dipakai: **ChatGPT** (kerangka awal) dan **Claude** (review, perbaikan, dan fitur bonus).


## 1. Kerangka awal aplikasi (W1–W6 dan fitur amplop)
- AI: ChatGPT dan Claude
- Prompt: bantu step by step buat kode nya jika persona yang didapat adalah ibu rumah tangga (dengan melampirkan dokumen ketentuan)
- Dipakai: `index.html`, `style.css`, `script.js` awal, yaitu form transaksi, `renderDaftar()`, `hitungRingkasan()`, `renderAmplop()`, dan `hitungSisaAmplop()`
- Diubah: menambahkan novalidate pada form dengan ID formTransaksi, dan menambah renderSemua() pada akhir script.js

## 2. Review kesesuaian dengan ketentuan ETS
- AI: Claude
- Prompt: "apakah sudah sesuai ketentuan ETS jika persona adalah ibu rumah tangga" (dengan melampirkan dokumen ketentuan dan kode)
- Dipakai: temuan review, yaitu status amplop "HABIS" tidak berwarna merah dan amplop belum memenuhi minimal 3 pos
- Diubah: tidak ada kode yang dipakai langsung dari jawaban ini

## 3. Perbaikan bug status amplop, amplop default, dan indentasi
- AI: Claude
- Prompt: "buat perbaikan bug status amplop, amplop default, dan indentasi"
- Dipakai:
  - `status.className = "status"` di `renderAmplop()` dan selector CSS `.amplop.habis .status` (sebelumnya `.amplop.habis p:last-child`)
  - blok `if (amplop === null)` di bagian atas `script.js` untuk membuat 3 amplop default
  - indentasi `renderAmplop()` dirapikan
- Diubah: nominal default amplop transportasi dan kebutuhan rumah dirubah menjadi 1000000 

## 4. Menghapus tombol Ganti Nama dan Tambah Dana
- AI: Claude
- Prompt: "buatkan tanpa kedua tombol, dengan amplop default"
- Dipakai: `renderAmplop()` tanpa `tombolNama` dan `tombolDana`, kartu amplop menjadi `kartu.append(nama, anggaran, saldo, status)`
- Diubah: tidak ada perubahan dari hasil AI. Keputusannya dari saya (fitur tidak diwajibkan dan kode lebih sederhana).

## 5. Fitur bonus: edit transaksi dan filter
- AI: Claude
- Prompt: "tambahkan fitur bonus untuk mengedit transaksi dan filter"
- Dipakai:
  - `idEdit`, `mulaiEdit()`, dan `resetFormTransaksi()` untuk mode edit
  - parameter `abaikanId` pada `hitungSisaAmplop()` agar nominal lama tidak dihitung dua kali saat edit
  - `ambilTransaksiTerfilter()` dan `isiFilterKategori()` untuk filter jenis, kategori, rentang tanggal, dan kata kunci catatan
  - markup filter di `index.html` dan CSS `.aksi`, `.filter`, `.tombol-sekunder`
- Diubah: tidak ada
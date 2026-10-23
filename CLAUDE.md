# Project: Absensi Sevima

## Deskripsi singkat

Absensi Sevima adalah aplikasi berbasis web untuk membantu pengelolaan data kelas, mahasiswa, pendaftaran mahasiswa ke kelas, pertemuan perkuliahan, pencatatan kehadiran, dan rekapitulasi absensi.

Aplikasi ini dibuat agar proses pengelolaan absensi menjadi lebih terstruktur dan mudah dilakukan.

## Teknologi yang dipakai dan cara menjalankan

### Teknologi
- HTML untuk struktur halaman web.
- CSS untuk tampilan dan desain antarmuka.
- JavaScript untuk interaksi pada frontend.
- Node.js sebagai runtime backend.
- Express.js untuk membuat REST API.
- PostgreSQL sebagai database.
- pg untuk menghubungkan backend dengan PostgreSQL.
- dotenv untuk membaca konfigurasi dari file .env.
- cors untuk mendukung komunikasi frontend dan backend.

### Struktur folder
- backend/: server, koneksi database, dan endpoint API.
- backend/routes/: endpoint untuk kelas, mahasiswa, pendaftaran, pertemuan, dan absensi.
- frontend/: file index.html, style.css, dan script.js.

### Cara menjalankan
1. Pastikan PostgreSQL berjalan dan database sudah dibuat.
2. Periksa konfigurasi koneksi database di file backend/.env.
3. Buka terminal pada folder backend.
4. Jalankan npm install jika dependensi belum terpasang.
5. Jalankan npm start untuk menjalankan backend.
6. Buka frontend/index.html melalui browser atau server frontend lokal.
7. Pastikan backend dan koneksi database berjalan sebelum menguji fitur aplikasi.

Backend berjalan pada http://localhost:3000.

## Aturan bisnis penting

- Data kelas menyimpan mata pelajaran, nama kelas, dan pengajar.
- Setiap mahasiswa memiliki NIM yang unik.
- Pendaftaran menghubungkan mahasiswa dengan kelas.
- Pertemuan terhubung dengan kelas dan memiliki nomor pertemuan serta tanggal.
- Data absensi menghubungkan mahasiswa dengan pertemuan.
- Status kehadiran yang valid adalah Hadir, Izin, Sakit, dan Alpa.
- Pencatatan absensi untuk mahasiswa dan pertemuan yang sama memperbarui status yang sudah ada, bukan membuat data duplikat.
- Rekap absensi dihitung berdasarkan data kehadiran yang tersimpan.
- Penghapusan atau perubahan data harus mempertimbangkan hubungan antartabel.

## Aturan penulisan kode

- Gunakan JavaScript yang konsisten dan mudah dibaca.
- Gunakan async/await untuk operasi API dan database yang bersifat asynchronous.
- Pisahkan logika backend, route API, dan tampilan frontend.
- Gunakan endpoint API yang sudah tersedia sebelum membuat endpoint baru.
- Validasi input sebelum menyimpan data.
- Tangani error API dan database dengan baik.
- Pertahankan nama ID elemen HTML yang digunakan oleh script.js.
- Gunakan parameter query SQL untuk menghindari SQL injection.
- Jangan menaruh kredensial database langsung di dalam kode.
- Pastikan perubahan kode tidak merusak fitur yang sudah berjalan.

## Hal yang tidak boleh dilakukan AI

- Jangan menghapus fitur yang sudah ada tanpa persetujuan.
- Jangan mengubah struktur database atau menghapus data tanpa persetujuan.
- Jangan mengubah nama endpoint, kolom database, atau ID HTML secara sembarangan.
- Jangan mengganti teknologi utama project tanpa alasan dan persetujuan.
- Jangan menampilkan isi file .env atau membagikan kredensial database.
- Jangan membuat data contoh seolah-olah merupakan data asli.
- Jangan menulis ulang seluruh file jika perubahan kecil sudah cukup, kecuali diminta.
- Jelaskan perubahan penting dan cara mengujinya setelah memberikan kode.

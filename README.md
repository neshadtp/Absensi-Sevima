# Absensi-Sevima

Aplikasi manajemen absensi mahasiswa berbasis web untuk mengelola kelas, data mahasiswa, pendaftaran kelas, pertemuan, pencatatan kehadiran, dan rekap absensi.

## Fitur Utama

- Manajemen Kelas: Menambah, melihat, mengubah, dan menghapus data kelas.
- Manajemen Mahasiswa: Mengelola data mahasiswa berdasarkan NIM dan nama.
- Pendaftaran Kelas: Mendaftarkan mahasiswa ke kelas tertentu.
- Manajemen Pertemuan: Membuat dan mengelola pertemuan berdasarkan kelas dan tanggal.
- Input Absensi: Mencatat status kehadiran seluruh mahasiswa dalam satu pertemuan.
- Rekap Absensi:Menampilkan jumlah Hadir, Izin, Sakit, Alpa, dan persentase kehadiran mahasiswa.

## Teknologi

- HTML
- CSS
- JavaScript
- Node.js dan Express (backend)
- PostgreSQL (database)

## Status Pengembangan

Frontend telah dibuat menggunakan HTML, CSS, dan JavaScript. Pengembangan backend dan integrasi database direncanakan untuk menyimpan data secara permanen.

## Cara Menjalankan

Pada tahap frontend, buka file `frontend/index.html` melalui browser atau gunakan ekstensi Live Server di Visual Studio Code.

## Struktur Proyek

```text
Absensi-Sevima/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
├── README.md
├── CLAUDE.md
└── AI_NOTES.md
```

## Pengembangan Selanjutnya

1. Membuat REST API menggunakan Node.js dan Express.
2. Membuat database PostgreSQL.
3. Menghubungkan frontend dengan backend.
4. Menguji fitur CRUD dan pencatatan absensi.
5. Melengkapi dokumentasi dan pengujian aplikasi.
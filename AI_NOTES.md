# AI Notes — Absensi Sevima

## Bagian yang saya kerjakan bersama AI

Saya menggunakan AI sebagai pendamping dalam proses pengembangan aplikasi Absensi Sevima. AI membantu menjelaskan struktur project, menghubungkan frontend dengan backend melalui API, menyusun logika JavaScript, serta membantu memahami proses pengambilan dan penyimpanan data ke PostgreSQL.

AI juga membantu mengevaluasi kode dan menemukan kemungkinan kesalahan ketika fitur aplikasi belum berjalan sesuai harapan.

Saya tetap perlu memeriksa kode yang dihasilkan, menjalankan aplikasi, dan memastikan fitur bekerja sesuai kebutuhan project.

## Satu contoh saran AI yang saya tolak atau perbaiki, dan alasannya

Saya memperbaiki cara AI menampilkan data pada tabel frontend. Pada implementasi sebelumnya, elemen tabel berpotensi menampilkan header berulang karena bagian render JavaScript membuat ulang struktur tabel yang sebenarnya sudah tersedia di HTML.

Saya memilih untuk memperbaikinya dengan memisahkan tanggung jawab HTML dan JavaScript. HTML digunakan untuk menyediakan struktur tabel dan header, sedangkan JavaScript hanya mengisi baris data pada elemen tbody.

Alasannya adalah agar tampilan tabel tetap konsisten, tidak terjadi pengulangan header, dan kode lebih mudah dipelihara.

## Bagian yang saya kerjakan tanpa AI, dan alasannya

Saya melakukan pengujian aplikasi secara langsung melalui browser dan memeriksa apakah fitur yang dibuat berjalan sesuai kebutuhan. Saya juga mengamati hasil perubahan kode, mencoba melakukan refresh halaman, serta memeriksa apakah data yang telah disimpan tetap tersedia.

Bagian ini saya lakukan sendiri agar dapat memahami perilaku aplikasi, membuktikan hasil implementasi, dan tidak hanya bergantung pada jawaban AI.

## Kalau mengulang dari awal, apa yang akan saya ubah

Jika mengulang project dari awal, saya akan menyusun kebutuhan fitur dan struktur database terlebih dahulu sebelum mulai menulis kode.

Saya juga akan membuat dokumentasi endpoint API, menentukan aturan validasi data, dan menguji setiap fitur secara bertahap setelah selesai dibuat.

Selain itu, saya akan menggunakan Git untuk mencatat perubahan kode sehingga lebih mudah membandingkan versi, memperbaiki kesalahan, dan mengembalikan kode ke versi sebelumnya jika diperlukan.

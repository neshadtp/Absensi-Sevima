
CREATE TABLE kelas (
    id SERIAL PRIMARY KEY,
    mata_pelajaran VARCHAR(100) NOT NULL,
    nama_kelas VARCHAR(100) NOT NULL,
    pengajar VARCHAR(100) NOT NULL
);

CREATE TABLE mahasiswa (
    id SERIAL PRIMARY KEY,
    nim VARCHAR(30) UNIQUE NOT NULL,
    nama VARCHAR(100) NOT NULL
);

CREATE TABLE pendaftaran (
    id SERIAL PRIMARY KEY,
    mahasiswa_id INTEGER NOT NULL REFERENCES mahasiswa(id) ON DELETE CASCADE,
    kelas_id INTEGER NOT NULL REFERENCES kelas(id) ON DELETE CASCADE,
    UNIQUE (mahasiswa_id, kelas_id)
);

CREATE TABLE pertemuan (
    id SERIAL PRIMARY KEY,
    kelas_id INTEGER NOT NULL REFERENCES kelas(id) ON DELETE CASCADE,
    nomor_pertemuan INTEGER NOT NULL,
    tanggal DATE NOT NULL,
    UNIQUE (kelas_id, nomor_pertemuan)
);

CREATE TABLE absensi (
    id SERIAL PRIMARY KEY,
    pertemuan_id INTEGER NOT NULL REFERENCES pertemuan(id) ON DELETE CASCADE,
    mahasiswa_id INTEGER NOT NULL REFERENCES mahasiswa(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL
        CHECK (status IN ('Hadir', 'Izin', 'Sakit', 'Alpa')),
    UNIQUE (pertemuan_id, mahasiswa_id)
);


const btnTambahKelas = document.getElementById("btnTambahKelas");
const daftarKelas = document.getElementById("daftarKelas");

let kelasList = [];
let nextId = 1;

// Menampilkan daftar kelas
function renderKelas() {
  document.getElementById("totalKelas").textContent = kelasList.length;

  if (kelasList.length === 0) {
    daftarKelas.className = "empty-state";
    daftarKelas.innerHTML = `
      <p>Belum ada kelas.</p>
      <p>Tambahkan kelas untuk mulai mengelola absensi.</p>
    `;
    return;
  }

  daftarKelas.className = "class-list";
  daftarKelas.replaceChildren();

  kelasList.forEach((kelas) => {
    const card = document.createElement("article");
    card.className = "class-card";

    const title = document.createElement("h3");
    title.textContent = kelas.namaKelas;

    const mataPelajaran = document.createElement("p");
    mataPelajaran.textContent =
      `Mata Pelajaran: ${kelas.mataPelajaran}`;

    const dosen = document.createElement("p");
    dosen.textContent = `Pengajar: ${kelas.pengajar}`;

    const actions = document.createElement("div");
    actions.className = "class-actions";

    // Tombol Edit
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      editKelas(kelas.id);
    });

    // Tombol Hapus
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Hapus";

    deleteButton.addEventListener("click", () => {
      hapusKelas(kelas.id);
    });

    actions.append(editButton, deleteButton);
    card.append(title, mataPelajaran, dosen, actions);
    daftarKelas.appendChild(card);
  });
}

// Menambahkan kelas
function tambahKelas() {
  const mataPelajaran = prompt("Masukkan nama mata pelajaran:");
  if (mataPelajaran === null || !mataPelajaran.trim()) return;

  const namaKelas = prompt("Masukkan nama kelas:");
  if (namaKelas === null || !namaKelas.trim()) return;

  const pengajar = prompt("Masukkan nama dosen/pengajar:");
  if (pengajar === null || !pengajar.trim()) return;

  kelasList.push({
    id: nextId++,
    mataPelajaran: mataPelajaran.trim(),
    namaKelas: namaKelas.trim(),
    pengajar: pengajar.trim(),
  });

  renderKelas();
}

// Mengubah data kelas
function editKelas(id) {
  const kelas = kelasList.find((item) => item.id === id);

  if (!kelas) return;

  const mataPelajaran = prompt(
    "Ubah nama mata pelajaran:",
    kelas.mataPelajaran
  );

  if (mataPelajaran === null || !mataPelajaran.trim()) return;

  const namaKelas = prompt(
    "Ubah nama kelas:",
    kelas.namaKelas
  );

  if (namaKelas === null || !namaKelas.trim()) return;

  const pengajar = prompt(
    "Ubah nama dosen/pengajar:",
    kelas.pengajar
  );

  if (pengajar === null || !pengajar.trim()) return;

  kelas.mataPelajaran = mataPelajaran.trim();
  kelas.namaKelas = namaKelas.trim();
  kelas.pengajar = pengajar.trim();

  renderKelas();
}

// Menghapus kelas
function hapusKelas(id) {
  const kelas = kelasList.find((item) => item.id === id);

  if (!kelas) return;

  const yakin = confirm(`Hapus kelas "${kelas.namaKelas}"?`);

  if (!yakin) return;

  kelasList = kelasList.filter((item) => item.id !== id);

  renderKelas();
}

// Event tombol tambah
btnTambahKelas.addEventListener("click", tambahKelas);

// Tampilkan data awal
renderKelas();


const btnTambahMahasiswa = document.getElementById(
  "btnTambahMahasiswa"
);

const daftarMahasiswa = document.getElementById(
  "daftarMahasiswa"
);

let mahasiswaList = [];
let nextMahasiswaId = 1;

// Menampilkan data mahasiswa
function renderMahasiswa() {
  daftarMahasiswa.replaceChildren();

  if (mahasiswaList.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.textContent = "Belum ada data mahasiswa.";

    row.appendChild(cell);
    daftarMahasiswa.appendChild(row);
    return;
  }

  mahasiswaList.forEach((mahasiswa, index) => {
    const row = document.createElement("tr");

    const nomor = document.createElement("td");
    nomor.textContent = index + 1;

    const nim = document.createElement("td");
    nim.textContent = mahasiswa.nim;

    const nama = document.createElement("td");
    nama.textContent = mahasiswa.nama;

    const aksi = document.createElement("td");

    const tombolEdit = document.createElement("button");
    tombolEdit.textContent = "Edit";
    tombolEdit.addEventListener("click", () => {
      editMahasiswa(mahasiswa.id);
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.className = "delete-button";
    tombolHapus.addEventListener("click", () => {
      hapusMahasiswa(mahasiswa.id);
    });

    aksi.append(tombolEdit, tombolHapus);
    row.append(nomor, nim, nama, aksi);
    daftarMahasiswa.appendChild(row);
  });
}

// Menambahkan mahasiswa
function tambahMahasiswa() {
  const nim = prompt("Masukkan NIM mahasiswa:");
  if (nim === null || !nim.trim()) return;

  const nama = prompt("Masukkan nama mahasiswa:");
  if (nama === null || !nama.trim()) return;

  const nimBersih = nim.trim();

  const nimSudahAda = mahasiswaList.some(
    (mahasiswa) => mahasiswa.nim === nimBersih
  );

  if (nimSudahAda) {
    alert("NIM sudah terdaftar!");
    return;
  }

  mahasiswaList.push({
    id: nextMahasiswaId++,
    nim: nimBersih,
    nama: nama.trim(),
  });

  renderMahasiswa();
}

// Mengedit mahasiswa
function editMahasiswa(id) {
  const mahasiswa = mahasiswaList.find(
    (item) => item.id === id
  );

  if (!mahasiswa) return;

  const nim = prompt("Ubah NIM:", mahasiswa.nim);
  if (nim === null || !nim.trim()) return;

  const nama = prompt("Ubah nama:", mahasiswa.nama);
  if (nama === null || !nama.trim()) return;

  const nimBersih = nim.trim();

  const nimDuplikat = mahasiswaList.some(
    (item) => item.nim === nimBersih && item.id !== id
  );

  if (nimDuplikat) {
    alert("NIM sudah digunakan mahasiswa lain!");
    return;
  }

  mahasiswa.nim = nimBersih;
  mahasiswa.nama = nama.trim();

  renderMahasiswa();
}

// Menghapus mahasiswa
function hapusMahasiswa(id) {
  const mahasiswa = mahasiswaList.find(
    (item) => item.id === id
  );

  if (!mahasiswa) return;

  const yakin = confirm(
    `Hapus mahasiswa "${mahasiswa.nama}"?`
  );

  if (!yakin) return;

  mahasiswaList = mahasiswaList.filter(
    (item) => item.id !== id
  );

  renderMahasiswa();
}

btnTambahMahasiswa.addEventListener(
  "click",
  tambahMahasiswa
);

renderMahasiswa();


const pilihMahasiswa = document.getElementById("pilihMahasiswa");
const pilihKelas = document.getElementById("pilihKelas");
const btnDaftarkan = document.getElementById("btnDaftarkan");
const daftarPendaftaran = document.getElementById("daftarPendaftaran");

let pendaftaranList = [];
let nextPendaftaranId = 1;

function renderPilihanPendaftaran() {
  const mahasiswaSebelumnya = pilihMahasiswa.value;
  const kelasSebelumnya = pilihKelas.value;

  pilihMahasiswa.replaceChildren();
  pilihKelas.replaceChildren();

  pilihMahasiswa.add(new Option("Pilih mahasiswa", ""));
  pilihKelas.add(new Option("Pilih kelas", ""));

  mahasiswaList.forEach((mahasiswa) => {
    pilihMahasiswa.add(
      new Option(`${mahasiswa.nim} - ${mahasiswa.nama}`, mahasiswa.id)
    );
  });

  kelasList.forEach((kelas) => {
    pilihKelas.add(
      new Option(`${kelas.namaKelas} - ${kelas.mataPelajaran}`, kelas.id)
    );
  });

  pilihMahasiswa.value = mahasiswaSebelumnya;
  pilihKelas.value = kelasSebelumnya;
}

function renderPendaftaran() {
  daftarPendaftaran.replaceChildren();

  if (pendaftaranList.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "Belum ada pendaftaran.";
    row.appendChild(cell);
    daftarPendaftaran.appendChild(row);
    return;
  }

  pendaftaranList.forEach((pendaftaran, index) => {
    const mahasiswa = mahasiswaList.find(
      (item) => item.id === pendaftaran.mahasiswaId
    );

    const kelas = kelasList.find(
      (item) => item.id === pendaftaran.kelasId
    );

    // Abaikan pendaftaran jika data induknya sudah dihapus.
    if (!mahasiswa || !kelas) return;

    const row = document.createElement("tr");

    const nomor = document.createElement("td");
    nomor.textContent = index + 1;

    const namaMahasiswa = document.createElement("td");
    namaMahasiswa.textContent = `${mahasiswa.nim} - ${mahasiswa.nama}`;

    const namaKelas = document.createElement("td");
    namaKelas.textContent = `${kelas.namaKelas} - ${kelas.mataPelajaran}`;

    const aksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.className = "delete-button";

    tombolHapus.addEventListener("click", () => {
      pendaftaranList = pendaftaranList.filter(
        (item) => item.id !== pendaftaran.id
      );
      renderPendaftaran();
    });

    aksi.appendChild(tombolHapus);
    row.append(nomor, namaMahasiswa, namaKelas, aksi);
    daftarPendaftaran.appendChild(row);
  });
}

function daftarkanMahasiswa() {
  const mahasiswaId = Number(pilihMahasiswa.value);
  const kelasId = Number(pilihKelas.value);

  if (!mahasiswaId || !kelasId) {
    alert("Pilih mahasiswa dan kelas terlebih dahulu.");
    return;
  }

  const sudahTerdaftar = pendaftaranList.some(
    (item) =>
      item.mahasiswaId === mahasiswaId &&
      item.kelasId === kelasId
  );

  if (sudahTerdaftar) {
    alert("Mahasiswa sudah terdaftar di kelas ini.");
    return;
  }

  pendaftaranList.push({
    id: nextPendaftaranId++,
    mahasiswaId,
    kelasId,
  });

  renderPendaftaran();
}

btnDaftarkan.addEventListener("click", daftarkanMahasiswa);

const renderKelasAwal = renderKelas;
renderKelas = function () {
  renderKelasAwal();
  renderPilihanPendaftaran();
  renderPendaftaran();
};

const renderMahasiswaAwal = renderMahasiswa;
renderMahasiswa = function () {
  renderMahasiswaAwal();
  renderPilihanPendaftaran();
  renderPendaftaran();
};

renderPilihanPendaftaran();
renderPendaftaran();


const kelasPertemuan = document.getElementById("kelasPertemuan");
const tanggalPertemuan = document.getElementById("tanggalPertemuan");
const btnTambahPertemuan = document.getElementById("btnTambahPertemuan");
const daftarPertemuan = document.getElementById("daftarPertemuan");

let pertemuanList = [];
let nextPertemuanId = 1;

function renderPilihanKelasPertemuan() {
  const pilihanSebelumnya = kelasPertemuan.value;

  kelasPertemuan.replaceChildren();
  kelasPertemuan.add(new Option("Pilih kelas", ""));

  kelasList.forEach((kelas) => {
    kelasPertemuan.add(
      new Option(
        `${kelas.namaKelas} - ${kelas.mataPelajaran}`,
        kelas.id
      )
    );
  });

  kelasPertemuan.value = pilihanSebelumnya;
}

function renderPertemuan() {
  daftarPertemuan.replaceChildren();

  if (pertemuanList.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "Belum ada pertemuan.";
    row.appendChild(cell);
    daftarPertemuan.appendChild(row);
    return;
  }

  pertemuanList.forEach((pertemuan) => {
    const kelas = kelasList.find(
      (item) => item.id === pertemuan.kelasId
    );

    if (!kelas) return;

    const row = document.createElement("tr");

    const nomor = document.createElement("td");
    nomor.textContent = pertemuan.nomor;

    const namaKelas = document.createElement("td");
    namaKelas.textContent =
      `${kelas.namaKelas} - ${kelas.mataPelajaran}`;

    const tanggal = document.createElement("td");
    tanggal.textContent = pertemuan.tanggal;

    const aksi = document.createElement("td");
    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";
    tombolHapus.className = "delete-button";

    tombolHapus.addEventListener("click", () => {
      const yakin = confirm(
        `Hapus pertemuan ke-${pertemuan.nomor}?`
      );

      if (!yakin) return;

      pertemuanList = pertemuanList.filter(
        (item) => item.id !== pertemuan.id
      );

      // Susun ulang nomor pertemuan pada kelas yang sama.
      pertemuanList
        .filter((item) => item.kelasId === pertemuan.kelasId)
        .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
        .forEach((item, index) => {
          item.nomor = index + 1;
        });

      renderPertemuan();
    });

    aksi.appendChild(tombolHapus);
    row.append(nomor, namaKelas, tanggal, aksi);
    daftarPertemuan.appendChild(row);
  });
}

function tambahPertemuan() {
  const kelasId = Number(kelasPertemuan.value);
  const tanggal = tanggalPertemuan.value;

  if (!kelasId || !tanggal) {
    alert("Pilih kelas dan tanggal pertemuan terlebih dahulu.");
    return;
  }

  const tanggalSudahAda = pertemuanList.some(
    (item) => item.kelasId === kelasId && item.tanggal === tanggal
  );

  if (tanggalSudahAda) {
    alert("Pertemuan untuk kelas ini pada tanggal tersebut sudah ada.");
    return;
  }

  const pertemuanKelas = pertemuanList.filter(
    (item) => item.kelasId === kelasId
  );

  pertemuanList.push({
    id: nextPertemuanId++,
    kelasId,
    tanggal,
    nomor: pertemuanKelas.length + 1,
  });

  // Urutkan berdasarkan tanggal dan perbarui nomor pertemuan.
  pertemuanList
    .filter((item) => item.kelasId === kelasId)
    .sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    .forEach((item, index) => {
      item.nomor = index + 1;
    });

  renderPertemuan();
}

btnTambahPertemuan.addEventListener("click", tambahPertemuan);

const renderKelasSebelumnyaUntukPertemuan = renderKelas;

renderKelas = function () {
  renderKelasSebelumnyaUntukPertemuan();
  renderPilihanKelasPertemuan();
};

renderPilihanKelasPertemuan();
renderPertemuan();


const kelasAbsensi = document.getElementById("kelasAbsensi");
const pertemuanAbsensi = document.getElementById("pertemuanAbsensi");
const daftarAbsensi = document.getElementById("daftarAbsensi");
const btnSimpanAbsensi = document.getElementById("btnSimpanAbsensi");

let absensiList = [];

function renderPilihanKelasAbsensi() {
  const sebelumnya = kelasAbsensi.value;

  kelasAbsensi.replaceChildren();
  kelasAbsensi.add(new Option("Pilih kelas", ""));

  kelasList.forEach((kelas) => {
    kelasAbsensi.add(
      new Option(
        `${kelas.namaKelas} - ${kelas.mataPelajaran}`,
        kelas.id
      )
    );
  });

  kelasAbsensi.value = sebelumnya;
  renderPilihanPertemuanAbsensi();
}

function renderPilihanPertemuanAbsensi() {
  const kelasId = Number(kelasAbsensi.value);
  const sebelumnya = pertemuanAbsensi.value;

  pertemuanAbsensi.replaceChildren();
  pertemuanAbsensi.add(new Option("Pilih pertemuan", ""));

  pertemuanList
    .filter((item) => item.kelasId === kelasId)
    .sort((a, b) => a.nomor - b.nomor)
    .forEach((item) => {
      pertemuanAbsensi.add(
        new Option(
          `Pertemuan ${item.nomor} - ${item.tanggal}`,
          item.id
        )
      );
    });

  pertemuanAbsensi.value = sebelumnya;

  const pertemuanValid = [...pertemuanAbsensi.options].some(
    (option) => option.value === sebelumnya && sebelumnya !== ""
  );

  if (!pertemuanValid) {
    pertemuanAbsensi.value = "";
  }

  renderDaftarAbsensi();
}

function renderDaftarAbsensi() {
  daftarAbsensi.replaceChildren();

  const kelasId = Number(kelasAbsensi.value);
  const pertemuanId = Number(pertemuanAbsensi.value);

  if (!kelasId || !pertemuanId) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.textContent = "Pilih kelas dan pertemuan terlebih dahulu.";

    row.appendChild(cell);
    daftarAbsensi.appendChild(row);
    return;
  }

  const mahasiswaTerdaftar = pendaftaranList
    .filter((item) => item.kelasId === kelasId)
    .map((item) =>
      mahasiswaList.find(
        (mahasiswa) => mahasiswa.id === item.mahasiswaId
      )
    )
    .filter(Boolean);

  if (mahasiswaTerdaftar.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.textContent = "Belum ada mahasiswa terdaftar di kelas ini.";

    row.appendChild(cell);
    daftarAbsensi.appendChild(row);
    return;
  }

  mahasiswaTerdaftar.forEach((mahasiswa, index) => {
    const row = document.createElement("tr");

    const nomor = document.createElement("td");
    nomor.textContent = index + 1;

    const nim = document.createElement("td");
    nim.textContent = mahasiswa.nim;

    const nama = document.createElement("td");
    nama.textContent = mahasiswa.nama;

    const statusCell = document.createElement("td");
    const pilihan = document.createElement("select");

    ["Hadir", "Izin", "Sakit", "Alpa"].forEach((status) => {
      pilihan.add(new Option(status, status));
    });

    const dataTersimpan = absensiList.find(
      (item) =>
        item.pertemuanId === pertemuanId &&
        item.mahasiswaId === mahasiswa.id
    );

    pilihan.value = dataTersimpan?.status || "Hadir";
    pilihan.dataset.mahasiswaId = mahasiswa.id;

    statusCell.appendChild(pilihan);
    row.append(nomor, nim, nama, statusCell);
    daftarAbsensi.appendChild(row);
  });
}

function simpanAbsensi() {
  const kelasId = Number(kelasAbsensi.value);
  const pertemuanId = Number(pertemuanAbsensi.value);

  if (!kelasId || !pertemuanId) {
    alert("Pilih kelas dan pertemuan terlebih dahulu.");
    return;
  }

  const pilihanStatus = daftarAbsensi.querySelectorAll("select");

  if (pilihanStatus.length === 0) {
    alert("Tidak ada mahasiswa yang bisa diabsen.");
    return;
  }

  pilihanStatus.forEach((pilihan) => {
    const mahasiswaId = Number(pilihan.dataset.mahasiswaId);

    const dataLama = absensiList.find(
      (item) =>
        item.pertemuanId === pertemuanId &&
        item.mahasiswaId === mahasiswaId
    );

    if (dataLama) {
      dataLama.status = pilihan.value;
    } else {
      absensiList.push({
        pertemuanId,
        mahasiswaId,
        status: pilihan.value,
      });
    }
  });

  alert("Absensi berhasil disimpan!");

    pilihanStatus.forEach((pilihan) => {
    const mahasiswaId = Number(pilihan.dataset.mahasiswaId);

    const dataLama = absensiList.find(
      (item) =>
        item.pertemuanId === pertemuanId &&
        item.mahasiswaId === mahasiswaId
    );

    if (dataLama) {
      dataLama.status = pilihan.value;
    } else {
      absensiList.push({
        pertemuanId,
        mahasiswaId,
        status: pilihan.value,
      });
    }
  });

  alert("Absensi berhasil disimpan!");

  renderRekap();
}

kelasAbsensi.addEventListener(
  "change",
  renderPilihanPertemuanAbsensi
);

pertemuanAbsensi.addEventListener(
  "change",
  renderDaftarAbsensi
);

btnSimpanAbsensi.addEventListener("click", simpanAbsensi);

renderPilihanKelasAbsensi();

const kelasRekap = document.getElementById("kelasRekap");
const ringkasanAbsensi = document.getElementById("ringkasanAbsensi");
const daftarRekap = document.getElementById("daftarRekap");

function renderPilihanKelasRekap() {
  const sebelumnya = kelasRekap.value;

  kelasRekap.replaceChildren();
  kelasRekap.add(new Option("Pilih kelas", ""));

  kelasList.forEach((kelas) => {
    kelasRekap.add(
      new Option(
        `${kelas.namaKelas} - ${kelas.mataPelajaran}`,
        kelas.id
      )
    );
  });

  kelasRekap.value = sebelumnya;
  renderRekap();
}

function renderRekap() {
  ringkasanAbsensi.replaceChildren();
  daftarRekap.replaceChildren();

  const kelasId = Number(kelasRekap.value);

  if (!kelasId) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 8;
    cell.textContent = "Pilih kelas untuk melihat rekap.";

    row.appendChild(cell);
    daftarRekap.appendChild(row);
    return;
  }

  const mahasiswaTerdaftar = pendaftaranList
    .filter((item) => item.kelasId === kelasId)
    .map((item) =>
      mahasiswaList.find(
        (mahasiswa) => mahasiswa.id === item.mahasiswaId
      )
    )
    .filter(Boolean);

  const pertemuanKelas = pertemuanList.filter(
    (item) => item.kelasId === kelasId
  );

  const idPertemuan = pertemuanKelas.map((item) => item.id);

  const rekap = {
    Hadir: 0,
    Izin: 0,
    Sakit: 0,
    Alpa: 0,
  };

  mahasiswaTerdaftar.forEach((mahasiswa, index) => {
    const absensiMahasiswa = absensiList.filter(
      (item) =>
        item.mahasiswaId === mahasiswa.id &&
        idPertemuan.includes(item.pertemuanId)
    );

    const jumlah = {
      Hadir: 0,
      Izin: 0,
      Sakit: 0,
      Alpa: 0,
    };

    absensiMahasiswa.forEach((item) => {
      if (Object.hasOwn(jumlah, item.status)) {
        jumlah[item.status]++;
        rekap[item.status]++;
      }
    });

    const totalTercatat = Object.values(jumlah).reduce(
      (total, nilai) => total + nilai,
      0
    );

    const persentase = pertemuanKelas.length > 0
      ? (jumlah.Hadir / pertemuanKelas.length) * 100
      : 0;

    const row = document.createElement("tr");

    [
      index + 1,
      mahasiswa.nim,
      mahasiswa.nama,
      jumlah.Hadir,
      jumlah.Izin,
      jumlah.Sakit,
      jumlah.Alpa,
      `${persentase.toFixed(1)}%`,
    ].forEach((nilai) => {
      const cell = document.createElement("td");
      cell.textContent = nilai;
      row.appendChild(cell);
    });

    daftarRekap.appendChild(row);
  });

  [
    ["Total Hadir", rekap.Hadir],
    ["Total Izin", rekap.Izin],
    ["Total Sakit", rekap.Sakit],
    ["Total Alpa", rekap.Alpa],
  ].forEach(([judul, jumlah]) => {
    const kartu = document.createElement("div");
    kartu.className = "stat-card";

    const label = document.createElement("p");
    label.textContent = judul;

    const nilai = document.createElement("h3");
    nilai.textContent = jumlah;

    kartu.append(label, nilai);
    ringkasanAbsensi.appendChild(kartu);
  });

  if (mahasiswaTerdaftar.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 8;
    cell.textContent = "Belum ada mahasiswa terdaftar di kelas ini.";

    row.appendChild(cell);
    daftarRekap.appendChild(row);
  }
}

kelasRekap.addEventListener("change", renderRekap);

const renderKelasSebelumnyaUntukRekap = renderKelas;

renderKelas = function () {
  renderKelasSebelumnyaUntukRekap();
  renderPilihanKelasRekap();
};

const renderMahasiswaSebelumnyaUntukRekap = renderMahasiswa;

renderMahasiswa = function () {
  renderMahasiswaSebelumnyaUntukRekap();
  renderPilihanKelasRekap();
};

renderPilihanKelasRekap();

const renderKelasSebelumnyaUntukAbsensi = renderKelas;

renderKelas = function () {
  renderKelasSebelumnyaUntukAbsensi();
  renderPilihanKelasAbsensi();
};

const renderPertemuanSebelumnyaUntukAbsensi = renderPertemuan;

renderPertemuan = function () {
  renderPertemuanSebelumnyaUntukAbsensi();
  renderPilihanPertemuanAbsensi();
};



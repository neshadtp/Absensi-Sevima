
const API = "http://localhost:3000/api";

let kelasList = [];
let mahasiswaList = [];
let pendaftaranList = [];
let pertemuanList = [];
let absensiList = [];

const $ = (id) => document.getElementById(id);

// ==================== API ====================

async function api(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Backend tidak dapat dihubungi. Pastikan server berjalan di port 3000."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }

  return data;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function tanggalLokal(value) {
  if (!value) return "-";

  const tanggal = String(value).slice(0, 10);
  const bagian = tanggal.split("-");

  if (bagian.length !== 3) return tanggal;

  return `${bagian[2]}/${bagian[1]}/${bagian[0]}`;
}

function formatTanggalInput(value) {
  return value ? String(value).slice(0, 10) : "";
}

function pesanError(error) {
  alert(error.message || "Terjadi kesalahan.");
}

// ==================== MEMUAT DATA ====================

async function muatSemuaData() {
  try {
    const [kelas, mahasiswa, pendaftaran, pertemuan, absensi] =
      await Promise.all([
        api("/kelas"),
        api("/mahasiswa"),
        api("/pendaftaran"),
        api("/pertemuan"),
        api("/absensi"),
      ]);

    kelasList = kelas.map((k) => ({
      id: k.id,
      mataPelajaran: k.mata_pelajaran,
      namaKelas: k.nama_kelas,
      pengajar: k.pengajar,
    }));

    mahasiswaList = mahasiswa.map((m) => ({
      id: m.id,
      nim: m.nim,
      nama: m.nama,
    }));

    pendaftaranList = pendaftaran.map((p) => ({
      id: p.id,
      mahasiswaId: p.mahasiswa_id,
      kelasId: p.kelas_id,
      nim: p.nim,
      namaMahasiswa: p.nama_mahasiswa,
      mataPelajaran: p.mata_pelajaran,
      namaKelas: p.nama_kelas,
    }));

    pertemuanList = pertemuan.map((p) => ({
      id: p.id,
      kelasId: p.kelas_id,
      nomor: p.nomor_pertemuan,
      tanggal: formatTanggalInput(p.tanggal),
      mataPelajaran: p.mata_pelajaran,
      namaKelas: p.nama_kelas,
    }));

    absensiList = absensi.map((a) => ({
      id: a.id,
      pertemuanId: a.pertemuan_id,
      mahasiswaId: a.mahasiswa_id,
      nim: a.nim,
      nama: a.nama,
      namaKelas: a.nama_kelas,
      nomorPertemuan: a.nomor_pertemuan,
      tanggal: formatTanggalInput(a.tanggal),
      status: a.status,
    }));

    renderSemua();
  } catch (error) {
    pesanError(error);
  }
}

function renderSemua() {
  renderKelas();
  renderMahasiswa();
  renderPendaftaran();
  renderPertemuan();
  renderDropdown();
  renderAbsensi();
  renderRekap();
  renderStatistik();
}

// ==================== DROPDOWN ====================

function isiDropdown(id, items, labelFn, placeholder) {
  const select = $(id);
  if (!select) return;

  const nilaiLama = select.value;

  select.innerHTML =
    `<option value="">${escapeHTML(placeholder)}</option>` +
    items.map((item) =>
      `<option value="${item.id}">${escapeHTML(labelFn(item))}</option>`
    ).join("");

  if (items.some((item) => String(item.id) === nilaiLama)) {
    select.value = nilaiLama;
  }
}

function renderDropdown() {
  const labelKelas = (k) =>
    `${k.mataPelajaran} - ${k.namaKelas}`;

  isiDropdown(
    "pilihMahasiswa",
    mahasiswaList,
    (m) => `${m.nim} - ${m.nama}`,
    "Pilih mahasiswa"
  );

  isiDropdown("pilihKelas", kelasList, labelKelas, "Pilih kelas");
  isiDropdown("kelasPertemuan", kelasList, labelKelas, "Pilih kelas");
  isiDropdown("kelasAbsensi", kelasList, labelKelas, "Pilih kelas");
  isiDropdown("kelasRekap", kelasList, labelKelas, "Pilih kelas");

  renderPilihanPertemuan();
}

function renderPilihanPertemuan() {
  const selectKelas = $("kelasAbsensi");
  const selectPertemuan = $("pertemuanAbsensi");

  if (!selectPertemuan) return;

  const kelasId = selectKelas?.value;
  const pilihanLama = selectPertemuan.value;

  const daftar = pertemuanList.filter(
    (p) => String(p.kelasId) === String(kelasId)
  );

  selectPertemuan.innerHTML =
    '<option value="">Pilih pertemuan</option>' +
    daftar.map((p) => `
      <option value="${p.id}">
        Pertemuan ${p.nomor} - ${tanggalLokal(p.tanggal)}
      </option>
    `).join("");

  if (daftar.some((p) => String(p.id) === pilihanLama)) {
    selectPertemuan.value = pilihanLama;
  }
}

// ==================== STATISTIK ====================

function renderStatistik() {
  if ($("totalKelas")) {
    $("totalKelas").textContent = kelasList.length;
  }

  if ($("totalSiswa")) {
    $("totalSiswa").textContent = mahasiswaList.length;
  }

  if ($("totalPertemuan")) {
    $("totalPertemuan").textContent = pertemuanList.length;
  }
}

// ==================== KELAS ====================

function renderKelas() {
  const container = $("daftarKelas");
  if (!container) return;

  if (kelasList.length === 0) {
    container.innerHTML = `
      <p>Belum ada kelas.</p>
      <p>Tambahkan kelas untuk mulai mengelola absensi.</p>
    `;
    return;
  }

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Mata Pelajaran</th>
          <th>Nama Kelas</th>
          <th>Pengajar</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${kelasList.map((k, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${escapeHTML(k.mataPelajaran)}</td>
            <td>${escapeHTML(k.namaKelas)}</td>
            <td>${escapeHTML(k.pengajar)}</td>
            <td>
              <button onclick="editKelas(${k.id})">Edit</button>
              <button onclick="hapusKelas(${k.id})">Hapus</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function tambahKelas() {
  const mataPelajaran = prompt("Masukkan mata pelajaran:");
  if (mataPelajaran === null || !mataPelajaran.trim()) return;

  const namaKelas = prompt("Masukkan nama kelas:");
  if (namaKelas === null || !namaKelas.trim()) return;

  const pengajar = prompt("Masukkan nama pengajar:");
  if (pengajar === null || !pengajar.trim()) return;

  try {
    await api("/kelas", {
      method: "POST",
      body: JSON.stringify({
        mata_pelajaran: mataPelajaran.trim(),
        nama_kelas: namaKelas.trim(),
        pengajar: pengajar.trim(),
      }),
    });

    alert("Kelas berhasil ditambahkan.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function editKelas(id) {
  const k = kelasList.find((item) => item.id === id);
  if (!k) return;

  const mataPelajaran = prompt("Mata pelajaran:", k.mataPelajaran);
  if (mataPelajaran === null || !mataPelajaran.trim()) return;

  const namaKelas = prompt("Nama kelas:", k.namaKelas);
  if (namaKelas === null || !namaKelas.trim()) return;

  const pengajar = prompt("Nama pengajar:", k.pengajar);
  if (pengajar === null || !pengajar.trim()) return;

  try {
    await api(`/kelas/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        mata_pelajaran: mataPelajaran.trim(),
        nama_kelas: namaKelas.trim(),
        pengajar: pengajar.trim(),
      }),
    });

    alert("Kelas berhasil diperbarui.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function hapusKelas(id) {
  if (!confirm("Yakin ingin menghapus kelas ini?")) return;

  try {
    await api(`/kelas/${id}`, { method: "DELETE" });
    alert("Kelas berhasil dihapus.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

// ==================== MAHASISWA ====================

function renderMahasiswa() {
  const container = $("daftarMahasiswa");
  if (!container) return;

  if (mahasiswaList.length === 0) {
    container.innerHTML =
      '<tr><td colspan="4">Belum ada data mahasiswa.</td></tr>';
    return;
  }

  container.innerHTML = mahasiswaList.map((m, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${escapeHTML(m.nim)}</td>
      <td>${escapeHTML(m.nama)}</td>
      <td>
        <button onclick="editMahasiswa(${m.id})">Edit</button>
        <button onclick="hapusMahasiswa(${m.id})">Hapus</button>
      </td>
    </tr>
  `).join("");
}

async function tambahMahasiswa() {
  const nim = prompt("Masukkan NIM mahasiswa:");
  if (nim === null || !nim.trim()) return;

  const nama = prompt("Masukkan nama mahasiswa:");
  if (nama === null || !nama.trim()) return;

  try {
    await api("/mahasiswa", {
      method: "POST",
      body: JSON.stringify({
        nim: nim.trim(),
        nama: nama.trim(),
      }),
    });

    alert("Mahasiswa berhasil ditambahkan.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function editMahasiswa(id) {
  const m = mahasiswaList.find((item) => item.id === id);
  if (!m) return;

  const nim = prompt("NIM mahasiswa:", m.nim);
  if (nim === null || !nim.trim()) return;

  const nama = prompt("Nama mahasiswa:", m.nama);
  if (nama === null || !nama.trim()) return;

  try {
    await api(`/mahasiswa/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        nim: nim.trim(),
        nama: nama.trim(),
      }),
    });

    alert("Mahasiswa berhasil diperbarui.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function hapusMahasiswa(id) {
  if (!confirm("Yakin ingin menghapus mahasiswa ini?")) return;

  try {
    await api(`/mahasiswa/${id}`, { method: "DELETE" });
    alert("Mahasiswa berhasil dihapus.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

// ==================== PENDAFTARAN ====================

function renderPendaftaran() {
  const container = $("daftarPendaftaran");
  if (!container) return;

  if (pendaftaranList.length === 0) {
    container.innerHTML =
      '<tr><td colspan="4">Belum ada pendaftaran.</td></tr>';
    return;
  }

  container.innerHTML = pendaftaranList.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${escapeHTML(p.namaMahasiswa)}</td>
      <td>${escapeHTML(p.mataPelajaran)} - ${escapeHTML(p.namaKelas)}</td>
      <td>
        <button onclick="hapusPendaftaran(${p.id})">Hapus</button>
      </td>
    </tr>
  `).join("");
}

async function daftarkanMahasiswa() {
  const mahasiswaId = $("pilihMahasiswa")?.value;
  const kelasId = $("pilihKelas")?.value;

  if (!mahasiswaId || !kelasId) {
    alert("Pilih mahasiswa dan kelas terlebih dahulu.");
    return;
  }

  try {
    await api("/pendaftaran", {
      method: "POST",
      body: JSON.stringify({
        mahasiswa_id: Number(mahasiswaId),
        kelas_id: Number(kelasId),
      }),
    });

    alert("Mahasiswa berhasil didaftarkan ke kelas.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function hapusPendaftaran(id) {
  if (!confirm("Yakin ingin menghapus pendaftaran ini?")) return;

  try {
    await api(`/pendaftaran/${id}`, { method: "DELETE" });
    alert("Pendaftaran berhasil dihapus.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

// ==================== PERTEMUAN ====================

function renderPertemuan() {
  const container = $("daftarPertemuan");
  if (!container) return;

  if (pertemuanList.length === 0) {
    container.innerHTML =
      '<tr><td colspan="4">Belum ada pertemuan.</td></tr>';
    return;
  }

  container.innerHTML = pertemuanList.map((p) => `
    <tr>
      <td>${p.nomor}</td>
      <td>${escapeHTML(p.mataPelajaran)} - ${escapeHTML(p.namaKelas)}</td>
      <td>${tanggalLokal(p.tanggal)}</td>
      <td>
        <button onclick="editPertemuan(${p.id})">Edit</button>
        <button onclick="hapusPertemuan(${p.id})">Hapus</button>
      </td>
    </tr>
  `).join("");
}

function nomorPertemuanBerikutnya(kelasId) {
  const daftar = pertemuanList.filter(
    (p) => String(p.kelasId) === String(kelasId)
  );

  return daftar.length
    ? Math.max(...daftar.map((p) => Number(p.nomor))) + 1
    : 1;
}

async function tambahPertemuan() {
  const kelasId = $("kelasPertemuan")?.value;
  const tanggal = $("tanggalPertemuan")?.value;

  if (!kelasId || !tanggal) {
    alert("Pilih kelas dan tanggal pertemuan terlebih dahulu.");
    return;
  }

  const nomor = nomorPertemuanBerikutnya(kelasId);

  try {
    await api("/pertemuan", {
      method: "POST",
      body: JSON.stringify({
        kelas_id: Number(kelasId),
        nomor_pertemuan: nomor,
        tanggal,
      }),
    });

    alert(`Pertemuan ${nomor} berhasil ditambahkan.`);
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function editPertemuan(id) {
  const p = pertemuanList.find((item) => item.id === id);
  if (!p) return;

  const pilihanKelas = kelasList.map(
    (k) => `${k.id} - ${k.mataPelajaran} (${k.namaKelas})`
  ).join("\n");

  const kelasId = prompt(
    `Masukkan ID kelas:\n${pilihanKelas}`,
    String(p.kelasId)
  );

  if (kelasId === null) return;

  const kelas = kelasList.find(
    (k) => String(k.id) === kelasId.trim()
  );

  if (!kelas) {
    alert("ID kelas tidak ditemukan.");
    return;
  }

  const nomor = prompt("Nomor pertemuan:", p.nomor);

  if (nomor === null) return;

  if (!Number.isInteger(Number(nomor)) || Number(nomor) < 1) {
    alert("Nomor pertemuan harus berupa bilangan positif.");
    return;
  }

  const tanggal = prompt("Tanggal (YYYY-MM-DD):", p.tanggal);

  if (tanggal === null) return;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) {
    alert("Format tanggal harus YYYY-MM-DD.");
    return;
  }

  try {
    await api(`/pertemuan/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        kelas_id: Number(kelasId),
        nomor_pertemuan: Number(nomor),
        tanggal,
      }),
    });

    alert("Pertemuan berhasil diperbarui.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

async function hapusPertemuan(id) {
  if (!confirm("Yakin ingin menghapus pertemuan ini?")) return;

  try {
    await api(`/pertemuan/${id}`, { method: "DELETE" });
    alert("Pertemuan berhasil dihapus.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
  }
}

// ==================== ABSENSI ====================

function renderAbsensi() {
  const container = $("daftarAbsensi");
  if (!container) return;

  const kelasId = $("kelasAbsensi")?.value;
  const pertemuanId = $("pertemuanAbsensi")?.value;

  if (!kelasId || !pertemuanId) {
    container.innerHTML =
      '<tr><td colspan="4">Pilih kelas dan pertemuan terlebih dahulu.</td></tr>';
    return;
  }

  const mahasiswaKelas = pendaftaranList.filter(
    (p) => String(p.kelasId) === String(kelasId)
  );

  if (mahasiswaKelas.length === 0) {
    container.innerHTML =
      '<tr><td colspan="4">Belum ada mahasiswa yang terdaftar di kelas ini.</td></tr>';
    return;
  }

  const statusPilihan = ["Hadir", "Izin", "Sakit", "Alpa"];

  container.innerHTML = mahasiswaKelas.map((p, i) => {
    const absensi = absensiList.find(
      (a) =>
        String(a.pertemuanId) === String(pertemuanId) &&
        String(a.mahasiswaId) === String(p.mahasiswaId)
    );

    const statusSaatIni = absensi?.status || "Hadir";

    return `
      <tr>
        <td>${i + 1}</td>
        <td>${escapeHTML(p.nim)}</td>
        <td>${escapeHTML(p.namaMahasiswa)}</td>
        <td>
          <select class="status-absensi"
            data-mahasiswa-id="${p.mahasiswaId}">
            ${statusPilihan.map((status) => `
              <option value="${status}"
                ${status === statusSaatIni ? "selected" : ""}>
                ${status}
              </option>
            `).join("")}
          </select>
        </td>
      </tr>
    `;
  }).join("");
}

async function simpanAbsensi() {
  const kelasId = $("kelasAbsensi")?.value;
  const pertemuanId = $("pertemuanAbsensi")?.value;

  if (!kelasId || !pertemuanId) {
    alert("Pilih kelas dan pertemuan terlebih dahulu.");
    return;
  }

  const pilihanStatus = document.querySelectorAll(".status-absensi");

  if (pilihanStatus.length === 0) {
    alert("Tidak ada mahasiswa yang dapat diabsen.");
    return;
  }

  try {
    for (const pilihan of pilihanStatus) {
      await api("/absensi", {
        method: "POST",
        body: JSON.stringify({
          pertemuan_id: Number(pertemuanId),
          mahasiswa_id: Number(pilihan.dataset.mahasiswaId),
          status: pilihan.value,
        }),
      });
    }

    alert("Absensi berhasil disimpan.");
    await muatSemuaData();
  } catch (error) {
    pesanError(error);
    await muatSemuaData();
  }
}

// ==================== REKAP ABSENSI ====================

function renderRekap() {
  const container = $("daftarRekap");
  const ringkasan = $("ringkasanAbsensi");

  if (!container) return;

  const kelasId = $("kelasRekap")?.value;

  if (!kelasId) {
    container.innerHTML =
      '<tr><td colspan="8">Pilih kelas untuk melihat rekap.</td></tr>';

    if (ringkasan) ringkasan.innerHTML = "";
    return;
  }

  const pertemuanKelas = pertemuanList.filter(
    (p) => String(p.kelasId) === String(kelasId)
  );

  const mahasiswaKelas = pendaftaranList.filter(
    (p) => String(p.kelasId) === String(kelasId)
  );

  if (mahasiswaKelas.length === 0) {
    container.innerHTML =
      '<tr><td colspan="8">Belum ada mahasiswa di kelas ini.</td></tr>';

    if (ringkasan) ringkasan.innerHTML = "";
    return;
  }

  let totalHadir = 0;
  let totalIzin = 0;
  let totalSakit = 0;
  let totalAlpa = 0;

  container.innerHTML = mahasiswaKelas.map((p, i) => {
    const daftarAbsensi = absensiList.filter(
      (a) =>
        String(a.mahasiswaId) === String(p.mahasiswaId) &&
        pertemuanKelas.some(
          (pt) => String(pt.id) === String(a.pertemuanId)
        )
    );

    const jumlah = {
      Hadir: 0,
      Izin: 0,
      Sakit: 0,
      Alpa: 0,
    };

    daftarAbsensi.forEach((a) => {
      if (Object.hasOwn(jumlah, a.status)) {
        jumlah[a.status]++;
      }
    });

    totalHadir += jumlah.Hadir;
    totalIzin += jumlah.Izin;
    totalSakit += jumlah.Sakit;
    totalAlpa += jumlah.Alpa;

    const persentase = pertemuanKelas.length
      ? (jumlah.Hadir / pertemuanKelas.length) * 100
      : 0;

    return `
      <tr>
        <td>${i + 1}</td>
        <td>${escapeHTML(p.nim)}</td>
        <td>${escapeHTML(p.namaMahasiswa)}</td>
        <td>${jumlah.Hadir}</td>
        <td>${jumlah.Izin}</td>
        <td>${jumlah.Sakit}</td>
        <td>${jumlah.Alpa}</td>
        <td>${persentase.toFixed(1)}%</td>
      </tr>
    `;
  }).join("");

  if (ringkasan) {
    ringkasan.innerHTML = `
      <p>Total Pertemuan: ${pertemuanKelas.length}</p>
      <p>Total Mahasiswa Terdaftar: ${mahasiswaKelas.length}</p>
      <p>Total Hadir: ${totalHadir}</p>
      <p>Total Izin: ${totalIzin}</p>
      <p>Total Sakit: ${totalSakit}</p>
      <p>Total Alpa: ${totalAlpa}</p>
    `;
  }
}

// ==================== EVENT LISTENERS ====================

function pasangEventListener() {
  $("btnTambahKelas")?.addEventListener("click", tambahKelas);
  $("btnTambahMahasiswa")?.addEventListener("click", tambahMahasiswa);
  $("btnDaftarkan")?.addEventListener("click", daftarkanMahasiswa);
  $("btnTambahPertemuan")?.addEventListener("click", tambahPertemuan);
  $("btnSimpanAbsensi")?.addEventListener("click", simpanAbsensi);

  $("kelasAbsensi")?.addEventListener("change", () => {
    renderPilihanPertemuan();
    renderAbsensi();
  });

  $("pertemuanAbsensi")?.addEventListener("change", renderAbsensi);
  $("kelasRekap")?.addEventListener("change", renderRekap);
}

document.addEventListener("DOMContentLoaded", () => {
  pasangEventListener();
  muatSemuaData();
});

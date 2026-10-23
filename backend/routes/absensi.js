
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET: Mengambil data absensi
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.pertemuan_id,
        a.mahasiswa_id,
        m.nim,
        m.nama,
        k.nama_kelas,
        p.nomor_pertemuan,
        p.tanggal,
        a.status
      FROM absensi a
      JOIN mahasiswa m ON a.mahasiswa_id = m.id
      JOIN pertemuan p ON a.pertemuan_id = p.id
      JOIN kelas k ON p.kelas_id = k.id
      ORDER BY p.tanggal DESC, m.nama ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Gagal mengambil data absensi:", error.message);
    res.status(500).json({ message: "Gagal mengambil data absensi" });
  }
});

// POST: Menyimpan absensi mahasiswa
router.post("/", async (req, res) => {
  const { pertemuan_id, mahasiswa_id, status } = req.body;

  const statusValid = ["Hadir", "Izin", "Sakit", "Alpa"];

  if (!pertemuan_id || !mahasiswa_id || !statusValid.includes(status)) {
    return res.status(400).json({
      message: "Data pertemuan, mahasiswa, atau status tidak valid",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO absensi (pertemuan_id, mahasiswa_id, status)
       VALUES ($1, $2, $3)
       ON CONFLICT (pertemuan_id, mahasiswa_id)
       DO UPDATE SET status = EXCLUDED.status
       RETURNING *`,
      [pertemuan_id, mahasiswa_id, status]
    );

    res.status(200).json({
      message: "Absensi berhasil disimpan",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Gagal menyimpan absensi:", error.message);
    res.status(500).json({ message: "Gagal menyimpan absensi" });
  }
});

module.exports = router;

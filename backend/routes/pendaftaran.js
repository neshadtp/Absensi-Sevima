
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.mahasiswa_id,
        p.kelas_id,
        m.nim,
        m.nama AS nama_mahasiswa,
        k.mata_pelajaran,
        k.nama_kelas
      FROM pendaftaran p
      JOIN mahasiswa m ON p.mahasiswa_id = m.id
      JOIN kelas k ON p.kelas_id = k.id
      ORDER BY p.id ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil data pendaftaran" });
  }
});

// POST: Mendaftarkan mahasiswa ke kelas
router.post("/", async (req, res) => {
  try {
    const { mahasiswa_id, kelas_id } = req.body;

    if (!mahasiswa_id || !kelas_id) {
      return res.status(400).json({
        message: "Mahasiswa dan kelas wajib dipilih",
      });
    }

    const result = await pool.query(
      `INSERT INTO pendaftaran (mahasiswa_id, kelas_id)
       VALUES ($1, $2)
       RETURNING *`,
      [mahasiswa_id, kelas_id]
    );

    res.status(201).json({
      message: "Mahasiswa berhasil didaftarkan ke kelas",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Mahasiswa sudah terdaftar di kelas ini",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({
        message: "Mahasiswa atau kelas tidak ditemukan",
      });
    }

    console.error(error.message);
    res.status(500).json({ message: "Gagal mendaftarkan mahasiswa" });
  }
});

// DELETE: Menghapus pendaftaran
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM pendaftaran WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    }

    res.json({ message: "Pendaftaran berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menghapus pendaftaran" });
  }
});

module.exports = router;

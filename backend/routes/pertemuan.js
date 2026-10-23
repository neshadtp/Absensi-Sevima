
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET: Menampilkan daftar pertemuan
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.kelas_id,
        p.nomor_pertemuan,
        p.tanggal,
        k.mata_pelajaran,
        k.nama_kelas
      FROM pertemuan p
      JOIN kelas k ON p.kelas_id = k.id
      ORDER BY p.kelas_id, p.nomor_pertemuan
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil data pertemuan" });
  }
});

// POST: Menambahkan pertemuan
router.post("/", async (req, res) => {
  try {
    const { kelas_id, nomor_pertemuan, tanggal } = req.body;

    if (
      !kelas_id ||
      !Number.isInteger(Number(nomor_pertemuan)) ||
      Number(nomor_pertemuan) < 1 ||
      !tanggal
    ) {
      return res.status(400).json({
        message: "Kelas, nomor pertemuan, dan tanggal wajib diisi dengan benar",
      });
    }

    const result = await pool.query(
      `INSERT INTO pertemuan (kelas_id, nomor_pertemuan, tanggal)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [kelas_id, Number(nomor_pertemuan), tanggal]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Nomor pertemuan tersebut sudah digunakan di kelas ini",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({ message: "Kelas tidak ditemukan" });
    }

    if (error.code === "22007" || error.code === "22008") {
      return res.status(400).json({ message: "Format tanggal tidak valid" });
    }

    console.error(error.message);
    res.status(500).json({ message: "Gagal menambahkan pertemuan" });
  }
});

// PUT: Mengubah pertemuan
router.put("/:id", async (req, res) => {
  try {
    const { kelas_id, nomor_pertemuan, tanggal } = req.body;

    if (
      !kelas_id ||
      !Number.isInteger(Number(nomor_pertemuan)) ||
      Number(nomor_pertemuan) < 1 ||
      !tanggal
    ) {
      return res.status(400).json({
        message: "Kelas, nomor pertemuan, dan tanggal wajib diisi dengan benar",
      });
    }

    const result = await pool.query(
      `UPDATE pertemuan
       SET kelas_id = $1, nomor_pertemuan = $2, tanggal = $3
       WHERE id = $4
       RETURNING *`,
      [kelas_id, Number(nomor_pertemuan), tanggal, req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Pertemuan tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Nomor pertemuan tersebut sudah digunakan di kelas ini",
      });
    }

    if (error.code === "23503") {
      return res.status(400).json({ message: "Kelas tidak ditemukan" });
    }

    console.error(error.message);
    res.status(500).json({ message: "Gagal mengubah pertemuan" });
  }
});

// DELETE: Menghapus pertemuan
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM pertemuan WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Pertemuan tidak ditemukan" });
    }

    res.json({ message: "Pertemuan berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menghapus pertemuan" });
  }
});

module.exports = router;

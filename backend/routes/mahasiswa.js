
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET: Menampilkan semua mahasiswa
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM mahasiswa ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil data mahasiswa" });
  }
});

// POST: Menambahkan mahasiswa
router.post("/", async (req, res) => {
  try {
    const { nim, nama } = req.body;

    if (!nim || !nama) {
      return res.status(400).json({
        message: "NIM dan nama wajib diisi",
      });
    }

    const result = await pool.query(
      `INSERT INTO mahasiswa (nim, nama)
       VALUES ($1, $2)
       RETURNING *`,
      [nim.trim(), nama.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "NIM sudah terdaftar" });
    }

    console.error(error.message);
    res.status(500).json({ message: "Gagal menambahkan mahasiswa" });
  }
});

// PUT: Mengubah mahasiswa
router.put("/:id", async (req, res) => {
  try {
    const { nim, nama } = req.body;

    if (!nim || !nama) {
      return res.status(400).json({
        message: "NIM dan nama wajib diisi",
      });
    }

    const result = await pool.query(
      `UPDATE mahasiswa
       SET nim = $1, nama = $2
       WHERE id = $3
       RETURNING *`,
      [nim.trim(), nama.trim(), req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "NIM sudah digunakan mahasiswa lain" });
    }

    console.error(error.message);
    res.status(500).json({ message: "Gagal mengubah mahasiswa" });
  }
});

// DELETE: Menghapus mahasiswa
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM mahasiswa WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    res.json({ message: "Mahasiswa berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menghapus mahasiswa" });
  }
});

module.exports = router;

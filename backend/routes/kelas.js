
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET: Menampilkan semua kelas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM kelas ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengambil data kelas" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { mata_pelajaran, nama_kelas, pengajar } = req.body;

    if (!mata_pelajaran || !nama_kelas || !pengajar) {
      return res.status(400).json({
        message: "Mata pelajaran, nama kelas, dan pengajar wajib diisi",
      });
    }

    const result = await pool.query(
      `INSERT INTO kelas (mata_pelajaran, nama_kelas, pengajar)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [mata_pelajaran, nama_kelas, pengajar]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menambahkan kelas" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mata_pelajaran, nama_kelas, pengajar } = req.body;

    if (!mata_pelajaran || !nama_kelas || !pengajar) {
      return res.status(400).json({
        message: "Semua data kelas wajib diisi",
      });
    }

    const result = await pool.query(
      `UPDATE kelas
       SET mata_pelajaran = $1, nama_kelas = $2, pengajar = $3
       WHERE id = $4
       RETURNING *`,
      [mata_pelajaran, nama_kelas, pengajar, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal mengubah kelas" });
  }
});

// DELETE: Menghapus kelas
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM kelas WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Kelas tidak ditemukan" });
    }

    res.json({ message: "Kelas berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Gagal menghapus kelas" });
  }
});

module.exports = router;

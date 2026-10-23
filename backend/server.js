
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const pertemuanRoutes = require("./routes/pertemuan");
const pendaftaranRoutes = require("./routes/pendaftaran");
const mahasiswaRoutes = require("./routes/mahasiswa");
const kelasRoutes = require("./routes/kelas");
const absensiRoutes = require("./routes/absensi");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/absensi", absensiRoutes);
app.use("/api/kelas", kelasRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);
app.use("/api/pendaftaran", pendaftaranRoutes);
app.use("/api/pertemuan", pertemuanRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend Absensi Sevima berjalan!",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS waktu");

    res.json({
      status: "OK",
      database: "Terhubung",
      waktu: result.rows[0].waktu,
    });
  } catch (error) {
    console.error("Tes database gagal:", error.message);

    res.status(500).json({
      status: "ERROR",
      database: "Tidak terhubung",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

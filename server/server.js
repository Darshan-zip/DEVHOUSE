const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/certificates", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const certificateSchema = new mongoose.Schema({
  filename: String,
  hash: String,
  uploadedAt: { type: Date, default: Date.now },
});
const Certificate = mongoose.model("Certificate", certificateSchema);

// ✅ File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Upload API
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const hash = req.body.hash;

    if (!file) {
      return res.status(400).json({ error: "❌ No file received" });
    }
    if (!hash) {
      return res.status(400).json({ error: "❌ No hash received from frontend" });
    }

    const newCert = new Certificate({
      filename: file.filename,
      hash: hash.startsWith("0x") ? hash : "0x" + hash,
    });

    await newCert.save();
    console.log("✅ Certificate saved:", newCert);

    res.json({
      message: "✅ File and hash stored in MongoDB",
      hash: newCert.hash,
    });

  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ View All Uploaded Certificates
app.get("/certificates", async (req, res) => {
  try {
    const all = await Certificate.find().sort({ uploadedAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "❌ Could not fetch certificates" });
  }
});

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

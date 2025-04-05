const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001; // Using port 3001 for backend

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// MongoDB connection with error handling
// In server.js
  mongoose.connect("mongodb://certuser:password123@127.0.0.1:27017/certdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); // Exit if MongoDB connection fails
});

// Mongoose Schema and Model
const fileSchema = new mongoose.Schema({
    product_name: String,
    brand_name: String,
    score: Number,
    filename: String,
    hash: String,
    uploadedAt: { type: Date, default: Date.now }
  });  
const FileModel = mongoose.model("File", fileSchema);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST route to handle file upload and store hash
app.post("/upload", upload.single("file"), async (req, res) => {
    console.log("🔍 Upload request received");
    console.log("📦 Request body:", req.body);
    console.log("📄 File info:", req.file || "No file received");
  try {
    // Check that a file and hash are provided
    if (!req.file) {
      return res.status(400).json({ error: "❌ No file received" });
    }
    const frontendHash = req.body.hash;
    if (!frontendHash) {
      return res.status(400).json({ error: "❌ No hash received from frontend" });
    }
    
    // Create a new document and save it
    const newFile = new FileModel({
      filename: req.file.filename,
      hash: frontendHash.startsWith("0x") ? frontendHash : "0x" + frontendHash,
    });
    
    await newFile.save();
    console.log("✅ File saved in DB:", newFile);
    res.status(200).json({ message: "✅ Data added to database successfully!", hash: newFile.hash });
  } catch (err) {
    console.error("❌ Detailed upload error:", err);
    res.status(500).json({ error: "Upload failed", details: err.message, stack: err.stack });
  }
});

// GET route to check if a hash exists in the database
app.get("/verify/:hash", async (req, res) => {
  try {
    const { hash } = req.params;
    const document = await FileModel.findOne({ hash });
    
    if (document) {
      res.status(200).json({ verified: true, document });
    } else {
      res.status(200).json({ verified: false });
    }
  } catch (err) {
    console.error("❌ Verification error:", err);
    res.status(500).json({ error: "Verification failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
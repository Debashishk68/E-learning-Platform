const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/others";

    if (file.fieldname === "thumbnail") folder = "uploads/thumbnails";
    else if (file.fieldname === "profilePic") folder = "uploads/profile_pics";
    else if (file.fieldname.startsWith("videos")) folder = "uploads/videos";
    else if (file.fieldname === "notes") folder = "uploads/notes"; // ✅ added for notes PDF

    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/") ||
    file.mimetype === "application/pdf" // ✅ allow PDF
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image, video, and PDF files are allowed!"), false);
  }
};

// Multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;

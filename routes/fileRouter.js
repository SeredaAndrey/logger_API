const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  fileUploadController,
  fileDownloadController,
} = require("../controllers/fileController");

const TEMP_UPL_FILE_DIR = path.resolve(process.env.TEMP_UPL_FILE_DIR);
const TEMP_DWL_FILE_DIR = path.resolve(process.env.TEMP_DWL_FILE_DIR);

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_UPL_FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.use(authMiddleware);

router.patch(
  "/patchAvatar",
  uploadMiddleware.single("avatar"),
  fileUploadController
);

router.use(
  "/avatar",
  fileDownloadController,
  express.static(TEMP_DWL_FILE_DIR)
);

module.exports = { fileRouter: router };

const path = require("path");
const fs = require("fs").promises;
const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const { patchOwnerAvatarService } = require("../services/ownerService");

const TEMP_UPL_FILE_DIR = path.resolve(process.env.TEMP_UPL_FILE_DIR);
const TEMP_DWL_FILE_DIR = path.resolve(process.env.TEMP_DWL_FILE_DIR);

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const upploadToGCSController = async (filePathName, fileName) => {
  try {
    await storage
      .bucket(process.env.GOOGLE_BUCKET_NAME)
      .upload(filePathName, { destination: fileName });
  } catch (error) {
    return error;
  }
};

const downloadFromGCSController = async (fileName) => {
  try {
    const destFileName = path.join(TEMP_DWL_FILE_DIR, fileName);
    return await storage
      .bucket(process.env.GOOGLE_BUCKET_NAME)
      .file(fileName)
      .download({ destination: destFileName });
  } catch (error) {
    return error;
  }
};

const deleteTMPFileController = async () => {
  try {
    const dwlFiles = await fs.readdir(TEMP_DWL_FILE_DIR);
    const uplFiles = await fs.readdir(TEMP_UPL_FILE_DIR);
    dwlFiles.map((filename) => fs.unlink(`${TEMP_DWL_FILE_DIR}/${filename}`));
    uplFiles.map((filename) => fs.unlink(`${TEMP_UPL_FILE_DIR}/${filename}`));
  } catch (error) {
    return error;
  }
};

const fileUploadController = async (req, res, next) => {
  const fileName = `${uuidv4()}.jpg`;
  const { _id } = req.owner;
  try {
    await upploadToGCSController(req.file.path, fileName);
    const data = await patchOwnerAvatarService(_id, fileName);
    if (data) {
      return res.status(200).json({
        code: 200,
        message: "succes",
        avatarURL: fileName,
      });
    } else
      res.status(404).json({
        code: 404,
        message: "not found",
      });
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

const fileDownloadController = async (req, res, next) => {
  const fileName = req.path.split("/")[1];
  try {
    await downloadFromGCSController(fileName);
    next();
  } catch (e) {
    res.json({ message: e });
    next(e);
  }
};

module.exports = {
  deleteTMPFileController,
  fileUploadController,
  fileDownloadController,
};

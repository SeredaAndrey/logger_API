const { v4: uuidv4 } = require("uuid");
const { patchOwnerAvatarService } = require("../services/ownerService");

const fileUploadController = async (req, res, next) => {
  const fileName = req.file && req.file.path;
  const { _id } = req.owner;
  try {
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

module.exports = {
  fileUploadController,
};

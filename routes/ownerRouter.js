const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");
const {
  patchOwnerVerificationController,
  getOwnerDataController,
  patchOwnerSubscriptionController,
  patchOwnerNameController,
} = require("../controllers/ownerController");
const { authMiddleware } = require("../middleware/authMiddleware");
const uploadAvatarCloud = require("../middleware/uploadAvatarMiddleware");
const { fileUploadController } = require("../controllers/fileController");

const router = express.Router();

router.get("/verify/:vToken", asyncWrapper(patchOwnerVerificationController));

router.use(authMiddleware);

router.get("/", asyncWrapper(getOwnerDataController));
router.patch("/subscription", asyncWrapper(patchOwnerSubscriptionController));
router.patch("/patchName", asyncWrapper(patchOwnerNameController));
router.patch(
  "/patchAvatar",
  uploadAvatarCloud.single("avatar"),
  asyncWrapper(fileUploadController)
);

module.exports = { ownerRouter: router };

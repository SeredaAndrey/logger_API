const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");
const {
  getGeneralSettingsController,
  postGeneralSettingsController,
  patchGeneralSettingsController,
  deleteGeneralSettingsController,
} = require("../controllers/generalSettingsController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getGeneralSettingsController));
router.post("/", asyncWrapper(postGeneralSettingsController));
router.patch("/:settingsId", asyncWrapper(patchGeneralSettingsController));
router.delete("/:settingsId", asyncWrapper(deleteGeneralSettingsController));

module.exports = { generalsettingsRouter: router };

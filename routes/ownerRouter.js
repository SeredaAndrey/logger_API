const express = require("express");

const { asyncWrapper } = require("../middleware/errorHandler");
const {
  patchOwnerVerificationController,
  getOwnerDataController,
  patchOwnerSubscriptionController,
  patchOwnerNameController,
} = require("../controllers/ownerController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/verify/:vToken", asyncWrapper(patchOwnerVerificationController));

router.use(authMiddleware);

router.get("/", asyncWrapper(getOwnerDataController));
router.patch("/subscription", asyncWrapper(patchOwnerSubscriptionController));
router.patch("/patchName", asyncWrapper(patchOwnerNameController));

module.exports = { ownerRouter: router };

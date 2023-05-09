const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");
const {
  getCalcDataController,
  postNewCalcDataController,
  patchCalcDataController,
  deleteCalcDataController,
} = require("../controllers/calcDataController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getCalcDataController));
router.post("/", asyncWrapper(postNewCalcDataController));
router.patch("/:calcDataId", asyncWrapper(patchCalcDataController));
router.delete("/:calcDataId", asyncWrapper(deleteCalcDataController));

module.exports = { calcDataRouter: router };

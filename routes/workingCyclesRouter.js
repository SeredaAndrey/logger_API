const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");
const {
  getAllWorkingCyclesController,
  getWorkingCycleController,
  postNewWorkingCycleController,
  patchWorkingCycleController,
  deleteWorkingCycleController,
} = require("../controllers/workingCyclesController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getAllWorkingCyclesController));
router.get("/:cycleId", asyncWrapper(getWorkingCycleController));
router.post("/", asyncWrapper(postNewWorkingCycleController));
router.patch("/:cycleId", asyncWrapper(patchWorkingCycleController));
router.delete("/:cycleId", asyncWrapper(deleteWorkingCycleController));

module.exports = { workingCyclesRouter: router };

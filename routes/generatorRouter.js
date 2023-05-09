const express = require("express");

const { authMiddleware } = require("../middleware/authMiddleware");
const { asyncWrapper } = require("../middleware/errorHandler");
const {
  getGeneratorController,
  postNewGeneratorController,
  patchGeneratorController,
  deleteGeneratorController,
} = require("../controllers/generatorController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getGeneratorController));
router.post("/", asyncWrapper(postNewGeneratorController));
router.patch("/:generatorId", asyncWrapper(patchGeneratorController));
router.delete("/:generatorId", asyncWrapper(deleteGeneratorController));

module.exports = { generatorRouter: router };

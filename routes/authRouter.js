const express = require("express");

const {
  registrationController,
  loginController,
  logoutController,
  verifycationController,
} = require("../controllers/authController");
const { asyncWrapper } = require("../middleware/errorHandler");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/reg", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));
router.post("/verify", asyncWrapper(verifycationController));

router.use(authMiddleware);

router.get("/logout", asyncWrapper(logoutController));

module.exports = { authRouter: router };

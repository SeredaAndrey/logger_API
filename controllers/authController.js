const gravatar = require("gravatar");
const { ownerSchema } = require("../validate/authValidate");
const {
  registrationService,
  logoutService,
  loginService,
  verificationService,
} = require("../services/authService");
const {
  ConflictError,
  ValidateError,
  AutorizationError,
  FoundingError,
} = require("../middleware/errorHandler");

const jwt = require("jsonwebtoken");

const registrationController = async (req, res, next) => {
  const requestValidate = ownerSchema.validate(req.body);
  const { email, password } = req.body;
  const avatarUrl = gravatar.url(email, { s: "250", r: "x", d: "retro" }, true);
  if (!requestValidate.error) {
    const owner = await registrationService(email, password, avatarUrl);
    if (owner) {
      return res.status(201).json({
        message: "created",
        code: 201,
        owner: {
          email: email,
          subscription: "starter",
        },
      });
    }
    throw new ConflictError("Email is already in use");
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const loginController = async (req, res, next) => {
  const requestValidate = ownerSchema.validate(req.body);
  const { email, password } = req.body;
  if (!requestValidate.error) {
    const data = await loginService(email, password);
    if (!data.token) {
      throw new AutorizationError("email or password is wrong");
    }
    return res.status(200).json({
      token: data.token,
      code: 200,
      owner: data,
    });
  } else throw new ValidateError(requestValidate.error);
};

const logoutController = async (req, res, next) => {
  const _id = req.owner._id;
  await logoutService(_id);
  return res.status(204).json({
    code: 204,
    message: "user logout",
  });
};

const verifycationController = async (req, res, next) => {
  const { vToken } = req.body;
  const decode = jwt.decode(vToken, process.env.JWT_VERIFY_SECRET);
  if (!decode) {
    throw new AutorizationError("Invalid token");
  }
  const data = await verificationService(decode.email);
  if (data) {
    return res.status(200).json({
      code: 200,
      message: "Verification successful",
      owner: data,
    });
  } else {
    throw new FoundingError("User not found");
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  verifycationController,
};

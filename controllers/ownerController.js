const jwt = require("jsonwebtoken");

const {
  ValidateError,
  AutorizationError,
  FoundingError,
} = require("../middleware/errorHandler");
const {
  patchOwnerSubscriptionService,
  patchOwnerVerificationService,
  patchOwnerNameService,
  getOwnerDataService,
} = require("../services/ownerService");
const {
  ownerPathSubscriptionSchema,
  ownerPatchSchema,
} = require("../validate/authValidate");

const getOwnerDataController = async (req, res, next) => {
  const _id = req.owner._id;
  const data = await getOwnerDataService(_id);
  if (data) {
    res.status(200).json({
      code: 200,
      message: "Owner found success",
      userData: data,
    });
  } else {
    throw new FoundingError("Owner not found");
  }
};

const patchOwnerSubscriptionController = async (req, res, next) => {
  const _id = req.owner._id;
  const requestValidate = ownerPathSubscriptionSchema.validate(req.body);
  const { subscription } = req.body;

  if (!requestValidate.error) {
    const data = await patchOwnerSubscriptionService(_id, subscription);
    if (data) {
      return res.status(204).json({
        code: 204,
        message: `subscription changed to ${subscription}`,
      });
    } else {
      throw new FoundingError("Owner not found");
    }
  } else {
    throw new ValidateError(requestValidate.error);
  }
};

const patchOwnerNameController = async (req, res, next) => {
  const reqValidate = ownerPatchSchema.validate(req.body);
  const body = req.body;
  const _id = req.owner._id;
  if (!reqValidate.error) {
    const data = await patchOwnerNameService(_id, body);
    if (data) {
      res.status(200).json({
        message: "succes",
        code: 200,
        data: {
          firstName: data.firstName,
          seccondName: data.seccondName,
          email: data.email,
          subscription: data.subscription,
          loggedIn: data.loggedIn,
          avatarUrl: data.avatarUrl,
          verify: data.verify,
          inerfaceLanguage: data.inerfaceLanguage,
        },
      });
    } else {
      throw new FoundingError("Owner not found");
    }
  } else {
    throw new ValidateError(reqValidate.error);
  }
};

const patchOwnerVerificationController = async (req, res, next) => {
  const { vToken } = req.params;
  const decode = jwt.decode(vToken, process.env.JWT_VERIFY_SECRET);
  if (!decode) {
    throw new AutorizationError("Invalid token");
  }
  const data = await patchOwnerVerificationService(decode.email);
  if (data) {
    return res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } else {
    throw new FoundingError("User not found");
  }
};

module.exports = {
  getOwnerDataController,
  patchOwnerSubscriptionController,
  patchOwnerNameController,
  patchOwnerVerificationController,
};

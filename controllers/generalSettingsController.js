const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const {
  getGeneralSettingsService,
  postGeneralSettingsService,
  patchGeneralSettingsService,
  deleteGeneralSettingsSevice,
} = require("../services/generalSettingsService");
const {
  generalSettingsSchema,
} = require("../validate/generalSettingsValidate");
const { calculateTotalData } = require("./calcDataController");

const getGeneralSettingsController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const data = await getGeneralSettingsService(ownerId);
  if (data) {
    res.status(200).json({
      message: "succes",
      code: 200,
      generalSettings: { data },
    });
  } else throw new FoundingError("General settings not found");
};

const postGeneralSettingsController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const reqValidate = generalSettingsSchema.validate(req.body);
  if (!reqValidate.error) {
    const data = await postGeneralSettingsService(ownerId, body);
    if (data) {
      res.status(201).json({
        message: "succes",
        code: 201,
        generalSettings: {
          data,
        },
      });
      await calculateTotalData(ownerId);
    } else throw new FoundingError("General Settings alredy exists");
  } else throw new ValidateError(reqValidate.error);
};

const patchGeneralSettingsController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const reqValidate = generalSettingsSchema.validate(req.body);
  const { settingsId } = req.params;
  if (!reqValidate.error) {
    const data = await patchGeneralSettingsService(settingsId, ownerId, body);
    if (data) {
      res.status(200).json({
        message: "succes",
        code: 200,
        generalSetting: {
          data,
        },
      });
      await calculateTotalData(ownerId);
    } else throw new FoundingError("General setting not found");
  } else throw new ValidateError(reqValidate.error);
};

const deleteGeneralSettingsController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const { settingsId } = req.params;
  const data = await deleteGeneralSettingsSevice(settingsId, ownerId);
  if (data) {
    res.status(200).json({
      message: "general setting deleted",
      code: 200,
    });
  } else {
    throw new FoundingError("general setting not found");
  }
};

module.exports = {
  getGeneralSettingsController,
  postGeneralSettingsController,
  patchGeneralSettingsController,
  deleteGeneralSettingsController,
};

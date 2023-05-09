const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const {
  getGeneratorService,
  postNewGeneratorService,
  patchGeneratorService,
  deleteGeneratorService,
} = require("../services/generatorService");
const { generatorSchema } = require("../validate/generatorValidate");

const getGeneratorController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const data = await getGeneratorService(ownerId);
  if (data) {
    res.status(200).json({
      message: "succes",
      code: 200,
      settingGenerator: { data },
    });
  } else throw new FoundingError("Generator setting not found");
};

const postNewGeneratorController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const reqValidate = generatorSchema.validate(req.body);
  if (!reqValidate.error) {
    const data = await postNewGeneratorService(ownerId, body);
    if (data) {
      res.status(201).json({
        message: "succes",
        code: 201,
        settingGenerator: {
          data,
        },
      });
    } else throw new FoundingError("Generator setting alredy exists");
  } else throw new ValidateError(reqValidate.error);
};

const patchGeneratorController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const reqValidate = generatorSchema.validate(req.body);
  const { generatorId } = req.params;
  if (!reqValidate.error) {
    const data = await patchGeneratorService(generatorId, ownerId, body);
    if (data) {
      res.status(200).json({
        message: "succes",
        code: 200,
        settingGenerator: {
          data,
        },
      });
    } else throw new FoundingError("Generator setting not found");
  } else throw new ValidateError(reqValidate.error);
};

const deleteGeneratorController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const { generatorId } = req.params;
  const data = await deleteGeneratorService(generatorId, ownerId);
  if (data) {
    res.status(200).json({
      message: "generator setting deleted",
      code: 200,
    });
  } else {
    throw new FoundingError("generator setting not found");
  }
};

module.exports = {
  getGeneratorController,
  postNewGeneratorController,
  patchGeneratorController,
  deleteGeneratorController,
};

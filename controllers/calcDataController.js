const { calcDataSchema } = require("../validate/calcDataValidate");

const {
  getCalcDataService,
  postNewCalcDataService,
  patchCalcDataService,
  deleteCalcDataService,
} = require("../services/calcDataService");
const { FoundingError, ValidateError } = require("../middleware/errorHandler");

const getCalcDataController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const data = await getCalcDataService(ownerId);
  if (data) {
    res.status(200).json({
      message: "succes",
      code: 200,
      calculationData: { data },
    });
  } else throw new FoundingError("Calculation data not found");
};

const postNewCalcDataController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const reqValidate = calcDataSchema.validate(req.body);
  if (!reqValidate.error) {
    const data = await postNewCalcDataService(ownerId, body);
    if (data) {
      res.status(201).json({
        message: "succes",
        code: 201,
        calculationData: {
          data,
        },
      });
    } else throw new FoundingError("Calculation data alredy exists");
  } else throw new ValidateError(reqValidate.error);
};

const patchCalcDataController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const { calcDataId } = req.params;
  const reqValidate = calcDataSchema.validate(req.body);
  if (!reqValidate.error) {
    const data = await patchCalcDataService(calcDataId, ownerId, body);
    if (data) {
      res.status(200).json({
        message: "succes",
        code: 200,
        calculationData: {
          data,
        },
      });
    } else throw new FoundingError("Calculation data not found");
  } else throw new ValidateError(reqValidate.error);
};

const deleteCalcDataController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const { calcDataId } = req.params;
  const data = await deleteCalcDataService(calcDataId, ownerId);
  if (data) {
    res.status(200).json({
      message: "Calculation data deleted",
      code: 200,
    });
  } else {
    throw new FoundingError("Calculation data not found");
  }
};

module.exports = {
  getCalcDataController,
  postNewCalcDataController,
  patchCalcDataController,
  deleteCalcDataController,
};

const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const {
  getAllWorkingCyclesService,
  getWorkingCycleService,
  postNewWorkingCycleService,
  patchWorkingCycleService,
  deleteWorkingCycleService,
} = require("../services/workingCyclesService");
const {
  getRequestSchema,
  workingCyclesSchema,
} = require("../validate/workingCyclesValidate");

const getAllWorkingCyclesController = async (req, res, next) => {
  const ownerId = req.owner._id;
  let {
    page = 1,
    limit = 10,
    filter,
    sort,
    dateStart = null,
    dateStop = null,
  } = req.query;
  const reqValidate = getRequestSchema.validate(req.query);
  if (!reqValidate.error) {
    limit = parseInt(limit);
    const skip = (parseInt(page) - 1) * limit;

    let correctSort;
    if (sort === "ascending") {
      correctSort = 1;
    } else if (sort === "descending") {
      correctSort = -1;
    }

    const data = await getAllWorkingCyclesService(ownerId, {
      skip,
      limit,
      filter,
      correctSort,
      dateStart,
      dateStop,
    });
    if (data) {
      res.status(200).json({
        message: "succes",
        code: 200,
        data: {
          WorkingCycles: data,
        },
        page: page,
        limit: limit,
      });
    } else throw new FoundingError("Working cycles not found");
  } else throw new ValidateError(reqValidate.error);
};

const getWorkingCycleController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const { cycleId } = req.params;
  const data = await getWorkingCycleService(cycleId, ownerId);
  if (data) {
    res.status(200).json({
      message: "succes",
      code: 200,
      WorkingCycle: {
        data,
      },
    });
  } else throw new FoundingError("Working cycle not found");
};

const postNewWorkingCycleController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const reqValidate = workingCyclesSchema.validate(req.body);
  if (!reqValidate.error) {
    const data = await postNewWorkingCycleService(ownerId, body);
    res.status(201).json({
      message: "succes",
      code: 201,
      WorkingCycle: {
        data,
      },
    });
  } else throw new ValidateError(reqValidate.error);
};

const patchWorkingCycleController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const body = req.body;
  const { cycleId } = req.params;
  const reqValidate = workingCyclesSchema.validate(req.body);
  if (!reqValidate.error) {
    const data = await patchWorkingCycleService(cycleId, ownerId, body);
    if (data) {
      res.status(200).json({
        message: "succes",
        code: 200,
        WorkingCycle: {
          data,
        },
      });
    } else throw new FoundingError("Working cycle not found");
  } else throw new ValidateError(reqValidate.error);
};

const deleteWorkingCycleController = async (req, res, next) => {
  const ownerId = req.owner._id;
  const { cycleId } = req.params;
  const data = await deleteWorkingCycleService(cycleId, ownerId);
  if (data) {
    res.status(200).json({
      message: "Working cycle deleted",
      code: 200,
    });
  } else {
    throw new FoundingError("Working cycle not found");
  }
};

module.exports = {
  getAllWorkingCyclesController,
  getWorkingCycleController,
  postNewWorkingCycleController,
  patchWorkingCycleController,
  deleteWorkingCycleController,
};

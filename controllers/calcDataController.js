const { calcDataSchema } = require("../validate/calcDataValidate");

const {
  getCalcDataService,
  postNewCalcDataService,
  patchCalcDataService,
  deleteCalcDataService,
  CalcDataService,
} = require("../services/calcDataService");
const { FoundingError, ValidateError } = require("../middleware/errorHandler");
const {
  getWorkingCyclesWithoutFilter,
  getWorkingCyclesByLastMonth,
  getWorkigCyclesLatestChangeOil,
} = require("../services/workingCyclesService");

const { getGeneratorService } = require("../services/generatorService");
const {
  getGeneralSettingsService,
} = require("../services/generalSettingsService");

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

const calculateTotalData = async (ownerId) => {
  const body = {
    totalGeneration: 0,
    totalCostGeneration: 0,
    totalWorkingTime: 0,
    totalGenerationMonth: 0,
    totalCostGenerationMonth: 0,
    totalAverageCostGeneration: 0,
    totalWorkingTimeMonth: 0,
    timeToChangeOil: 0,
    totalAverageFuelConsumption: 0,
  };
  const allCycles = await getWorkingCyclesWithoutFilter(ownerId);
  const monthCycles = await getWorkingCyclesByLastMonth(ownerId);
  const latestChangeOilCycles = await getWorkigCyclesLatestChangeOil(ownerId);
  const globalSettings = await getGeneralSettingsService(ownerId);
  const generatorSettings = await getGeneratorService(ownerId);
  let workingTimeBeforeOilChange = 0;
  if (allCycles) {
    allCycles.forEach((item) => {
      if (item.volumeElecricalGeneration) {
        body.totalGeneration += parseInt(item.volumeElecricalGeneration);
      }
      if (item.workingTimeOfCycle) {
        body.totalWorkingTime += parseInt(item.workingTimeOfCycle);
      }
    });
    if (globalSettings) {
      // totalAverageFuelConsumption - загальна витрата палива дорівнює кількість спожитого палива поділена на напрацьований час
      // totalCostGeneration - загальна вартість сгенерованої електроенергії
      // totalCostGenerationMonth - загальна вартість сгенерованої електроенергії за місяць
      // totalAverageCostGeneration - середня вартість сгенерованої електроенергії
      console.log("globalSettings: ", globalSettings);
    }
  }
  if (monthCycles) {
    monthCycles.forEach((item) => {
      if (item.volumeElecricalGeneration) {
        body.totalGenerationMonth += parseInt(item.volumeElecricalGeneration);
      }
      if (item.workingTimeOfCycle) {
        body.totalWorkingTimeMonth += parseInt(item.workingTimeOfCycle);
      }
    });
  }
  if (latestChangeOilCycles && generatorSettings) {
    latestChangeOilCycles.forEach((item) => {
      if (item.workingTimeOfCycle) {
        workingTimeBeforeOilChange += parseInt(item.workingTimeOfCycle);
      }
    });
    body.timeToChangeOil =
      parseInt(generatorSettings.nextChangeOilReglament) * 60 * 60 * 1000 -
      workingTimeBeforeOilChange;
  }
  await CalcDataService(ownerId, body);
};

module.exports = {
  getCalcDataController,
  postNewCalcDataController,
  patchCalcDataController,
  deleteCalcDataController,
  calculateTotalData,
};

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
  // console.log("ownerId: ", ownerId);
  const data = await getCalcDataService(ownerId);
  if (data) {
    res.status(200).json({
      message: "succes",
      code: 200,
      calculationData: { data },
    });
  } else {
    await postNewCalcDataService(ownerId, (body = {}));
    throw new FoundingError("Calculation data not found");
  }
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
    totalGeneration: 0, //кількість сгенерованої електоенергії за весь період роботи (kW) VV
    totalGenerationMonth: 0, //кількість сгенерованої електоенергії за поточний місяць (kW) VV

    totalWorkingTime: 0, //загальний час роботи генератора за весь час (h:m) VV
    totalWorkingTimeMonth: 0, //час роботи генератора за поточний місяць (h:m) VV

    totalCostGeneration: 0, //загальна вартість сгенерованої електроенергії (uah kW*h)
    totalCostGenerationMonth: 0, //загальна вартість сгенерованої електроенергії за поточний місяць (uah kW*h)

    totalAverageCostGeneration: 0, //середня вартість сгенерованої електроенергії (uah kW*h)

    timeToChangeOil: 0, //час до наступної заміни мастила (h:m) VV

    totalAverageFuelConsumption: 0, //середне споживання палива (l/h)
  };
  const allCycles = await getWorkingCyclesWithoutFilter(ownerId);
  const monthCycles = await getWorkingCyclesByLastMonth(ownerId);
  const latestChangeOilCycles = await getWorkigCyclesLatestChangeOil(ownerId);
  const globalSettings = await getGeneralSettingsService(ownerId);
  const generatorSettings = await getGeneratorService(ownerId);
  let workingTimeBeforeOilChange = 0;
  let fuelLevel = 0;
  if (allCycles) {
    allCycles.forEach((item) => {
      if (item.volumeElecricalGeneration) {
        body.totalGeneration += parseInt(item.volumeElecricalGeneration);
      }
      if (item.workingTimeOfCycle) {
        body.totalWorkingTime += parseInt(item.workingTimeOfCycle);
      }
      if (item.refueling) {
        fuelLevel += parseInt(item.refueling);
      }
    });

    if (globalSettings) {
      body.totalCostGeneration =
        (fuelLevel * parseInt(globalSettings.priceOfGasoline)) /
        body.totalGeneration;
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

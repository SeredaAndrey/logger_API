const WorkingCycles = require("../schemas/workingCyclesSchemas");

const getWorkingCyclesWithoutFilter = async (ownerId) => {
  return await WorkingCycles.find({ owner: ownerId });
};
const getWorkingCyclesByLastMonth = async (ownerId) => {
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  return await WorkingCycles.find({
    owner: ownerId,
    timestampStart: {
      $gte: startOfMonth,
    },
    timestampStop: {
      $lte: endOfMonth,
    },
  });
};
const getWorkigCyclesLatestChangeOil = async (ownerId) => {
  const latestOilChange = await WorkingCycles.findOne({
    owner: ownerId,
    changeOil: true,
  })
    .sort({ timestampStart: -1 })
    .limit(1);
  if (latestOilChange) {
    const oilChangeDate = latestOilChange.timestampStart;
    return await WorkingCycles.find({
      owner: ownerId,
      timestampStart: { $gt: oilChangeDate },
    });
  }
};

const getAllWorkingCyclesService = async (
  ownerId,
  { skip, limit, correctSort, correctFilter, dateStart, dateStop }
) => {
  return await WorkingCycles.find({
    owner: ownerId,
    timestampStart: { $gte: dateStart },
    timestampStop: { $lte: dateStop },
  })
    .select({ __v: 0, owner: 0 })
    .sort({ [correctFilter]: correctSort })
    .skip(skip)
    .limit(limit);
};

const getWorkingCycleService = async (cycleId, ownerId) => {
  return await WorkingCycles.findOne({ _id: cycleId, owner: ownerId });
};

const postNewWorkingCycleService = async (ownerId, body) => {
  return await WorkingCycles.create({ ...body, owner: ownerId });
};

const patchWorkingCycleService = async (cycleId, ownerId, body) => {
  return await WorkingCycles.findOneAndUpdate(
    { _id: cycleId, owner: ownerId },
    body,
    { new: true }
  );
};

const deleteWorkingCycleService = async (cycleId, ownerId) => {
  return await WorkingCycles.findOneAndRemove({ _id: cycleId, owner: ownerId });
};

module.exports = {
  getWorkingCyclesWithoutFilter,
  getWorkingCyclesByLastMonth,
  getWorkigCyclesLatestChangeOil,
  getAllWorkingCyclesService,
  getWorkingCycleService,
  postNewWorkingCycleService,
  patchWorkingCycleService,
  deleteWorkingCycleService,
};

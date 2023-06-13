const WorkingCycles = require("../schemas/workingCyclesSchemas");

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
  getAllWorkingCyclesService,
  getWorkingCycleService,
  postNewWorkingCycleService,
  patchWorkingCycleService,
  deleteWorkingCycleService,
};

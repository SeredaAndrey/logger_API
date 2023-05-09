const CalculatingData = require("../schemas/calculatingDataSchema");

const getCalcDataService = async (ownerId) => {
  return await CalculatingData.findOne(
    { owner: ownerId },
    { owner: 0, _id: 0, __v: 0 }
  );
};

const postNewCalcDataService = async (ownerId, body) => {
  const data = await CalculatingData.findOne({ owner: ownerId });
  if (!data) {
    return await CalculatingData.create({ ...body, owner: ownerId });
  } else return;
};

const patchCalcDataService = async (calcDataId, ownerId, body) => {
  return await CalculatingData.findOneAndUpdate(
    { _id: calcDataId, owner: ownerId },
    body,
    { new: true }
  );
};

const deleteCalcDataService = async (calcDataId, ownerId) => {
  return await CalculatingData.findOneAndRemove({
    _id: calcDataId,
    owner: ownerId,
  });
};

module.exports = {
  getCalcDataService,
  postNewCalcDataService,
  patchCalcDataService,
  deleteCalcDataService,
};

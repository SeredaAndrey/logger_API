const Generator = require("../schemas/generatorSchemas");

const getGeneratorService = async (ownerId) => {
  return await Generator.findOne(
    { owner: ownerId },
    { owner: 0, __v: 0 }
  );
};

const postNewGeneratorService = async (ownerId, body) => {
  const data = await Generator.findOne({ owner: ownerId });
  if (!data) {
    return await Generator.create({ ...body, owner: ownerId });
  } else return;
};

const patchGeneratorService = async (generatorId, ownerId, body) => {
  return await Generator.findOneAndUpdate(
    { _id: generatorId, owner: ownerId },
    body,
    {
      new: true,
    }
  );
};

const deleteGeneratorService = async (generatorId, ownerId) => {
  return await Generator.findOneAndRemove({ _id: generatorId, owner: ownerId });
};

module.exports = {
  getGeneratorService,
  postNewGeneratorService,
  patchGeneratorService,
  deleteGeneratorService,
};

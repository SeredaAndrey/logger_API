const GeneralSetting = require("../schemas/generalSettingSchemas");

const getGeneralSettingsService = async (ownerId) => {
  return await GeneralSetting.findOne(
    { owner: ownerId },
    { owner: 0, _id: 0, __V: 0 }
  );
};

const postGeneralSettingsService = async (ownerId, body) => {
  const data = await GeneralSetting.findOne({ owner: ownerId });
  if (!data) {
    return GeneralSetting.create({ ...body, owner: ownerId });
  } else return;
};

const patchGeneralSettingsService = async (settingsId, ownerId, body) => {
  return GeneralSetting.findOneAndUpdate(
    {
      _id: settingsId,
      owner: ownerId,
    },
    body,
    { new: true }
  );
};

const deleteGeneralSettingsSevice = async (settingsId, ownerId) => {
  return GeneralSetting.findOneAndRemove({ _id: settingsId, owner: ownerId });
};

module.exports = {
  getGeneralSettingsService,
  postGeneralSettingsService,
  patchGeneralSettingsService,
  deleteGeneralSettingsSevice,
};

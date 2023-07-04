const Owner = require("../schemas/ownerSchemas");

const getOwnerDataService = async (_id) => {
  return await Owner.findOne(
    { _id, loggedIn: true },
    {
      email: 1,
      subscription: 1,
      loggedIn: 1,
      avatarUrl: 1,
      verify: 1,
      firstName: 1,
      seccondName: 1,
      inerfaceLanguage: 1,
    }
  );
};

const patchOwnerSubscriptionService = async (_id, subscription) => {
  await Owner.findOneAndUpdate(
    { _id },
    { subscription: subscription },
    { new: true }
  );
};

const patchOwnerNameService = async (_id, body) => {
  const data = await Owner.findOneAndUpdate({ _id, loggedIn: true }, body, {
    new: true,
  });
  return data;
};

const patchOwnerAvatarService = async (_id, filePathName) => {
  return await Owner.findOneAndUpdate(
    { _id, loggedIn: true },
    { avatarUrl: filePathName },
    { new: true }
  );
};

const patchOwnerVerificationService = async (email) => {
  const data = await Owner.findOne({
    email,
    verify: false,
  });
  if (!data) {
    return;
  }
  return await Owner.findByIdAndUpdate(
    { _id: data._id },
    { vToken: null, verify: true },
    { new: true }
  );
};

module.exports = {
  getOwnerDataService,
  patchOwnerSubscriptionService,
  patchOwnerNameService,
  patchOwnerAvatarService,
  patchOwnerVerificationService,
};

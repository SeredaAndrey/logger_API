const Joi = require("joi");

const ownerSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().min(5).max(16).required(),
});

const patchOwnerSubscriptionShema = Joi.object({
  subscription: Joi.string().valid("passerby", "buyer").required(),
});

module.exports = { ownerSchema, patchOwnerSubscriptionShema };

const Joi = require("joi");

const ownerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().min(5).max(16).required(),
});

const ownerPatchSchema = Joi.object({
  firstName: Joi.string().min(1).max(15),
  seccondName: Joi.string().min(1).max(15),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  inerfaceLanguage: Joi.string().valid("en", "ru", "ua"),
});

const ownerPathSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { ownerSchema, ownerPatchSchema, ownerPathSubscriptionSchema };

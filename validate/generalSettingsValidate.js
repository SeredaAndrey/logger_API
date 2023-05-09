const Joi = require("joi");

const generalSettingsSchema = Joi.object({
  priceOfOil: Joi.number().positive(),
  priceOfGasoline: Joi.number().positive(),
  priceOfElectrical: Joi.number().positive(),
});

module.exports = { generalSettingsSchema };

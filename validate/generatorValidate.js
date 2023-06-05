const Joi = require("joi");

const generatorSchema = Joi.object({
  brand: Joi.string().max(15).min(1),
  type: Joi.string().max(15).min(1),
  firstChangeOilReglament: Joi.number().positive(),
  nextChangeOilReglament: Joi.number().positive(),
  electricalPower: Joi.number().positive(),
  dataFirstStart: Joi.date(),
  workingFirsStart: Joi.number().positive(),
  oilVolume: Joi.number().positive(),
  fuelVolume: Joi.number().positive(),
});

module.exports = { generatorSchema };

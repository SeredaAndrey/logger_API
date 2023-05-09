const Joi = require("joi");

const generatorSchema = Joi.object({
  brand: Joi.string().max(15).min(1),
  type: Joi.string().max(15).min(1),
  priceOfOfirstChangeOilReglamentil: Joi.number().positive(),
  nextChangeOilReglament: Joi.number().positive(),
  electricalPower: Joi.number().positive(),
  dataFirstStart: Joi.number().positive(),
  workingFirsStart: Joi.number().positive(),
  oilVolume: Joi.number().positive(),
  fuelVolume: Joi.number().positive(),
});

module.exports = { generatorSchema };

const Joi = require("joi");

const calcDataSchema = Joi.object({
  totalGeneration: Joi.number().positive(),
  totalCostGeneration: Joi.number().positive(),
  totalGenerationMonth: Joi.number().positive(),
  totalCostGenerationMonth: Joi.number().positive(),
  totalAverageCostGeneration: Joi.number().positive(),
  totalWorkingTime: Joi.number().positive(),
  totalWorkingTimeMonth: Joi.number().positive(),
  timeToChangeOil: Joi.number().positive(),
  totalAverageFuelConsumption: Joi.number().positive(),
});

module.exports = { calcDataSchema };

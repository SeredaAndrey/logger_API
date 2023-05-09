const Joi = require("joi");

const calcDataSchema = Joi.object({
  totalGeneration: Joi.number().positive(),
  totalGenerationMonth: Joi.number().positive(),
  totalWorkingTime: Joi.number().positive(),
  totalWorkingTimeMonth: Joi.number().positive(),
  timeToChangeOil: Joi.number().positive(),
});

module.exports = { calcDataSchema };

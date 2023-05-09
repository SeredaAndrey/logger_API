const Joi = require("joi");

const workingCyclesSchema = Joi.object({
  timestampStart: Joi.date(),
  timestampStop: Joi.date(),
  volumeElecricalGeneration: Joi.number().positive(),
  changeOil: Joi.boolean(),
  refueling: Joi.number().positive(),
});

const getRequestSchema = Joi.object({
  page: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
  limit: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
});

module.exports = { workingCyclesSchema, getRequestSchema };

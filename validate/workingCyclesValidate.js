const Joi = require("joi");

const workingCyclesSchema = Joi.object({
  timestampStart: Joi.date(),
  timestampStop: Joi.date(),
  workingTimeOfCycle: Joi.number(),
  volumeElecricalGeneration: Joi.number().positive(),
  changeOil: Joi.boolean(),
  refueling: Joi.number(),
});

const getRequestSchema = Joi.object({
  page: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
  limit: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
  filter: Joi.string().allow("start", "stop", "cycle", "gen"),
  sort: Joi.string().allow("ascending", "descending"),
  dateStart: Joi.number(),
  dateStop: Joi.number(),
});

module.exports = { workingCyclesSchema, getRequestSchema };

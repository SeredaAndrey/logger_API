const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calculatingData = new Schema(
  {
    totalGeneration: {
      type: Number,
      default: null,
    },
    totalCostGeneration: {
      type: Number,
      default: null,
    },
    totalGenerationMonth: {
      type: Number,
      default: null,
    },
    totalCostGenerationMonth: {
      type: Number,
      default: null,
    },
    totalAverageCostGeneration: {
      type: Number,
      default: null,
    },
    totalWorkingTime: {
      type: Number,
      default: null,
    },
    totalWorkingTimeMonth: {
      type: Number,
      default: null,
    },
    timeToChangeOil: {
      type: Number,
      default: null,
    },
    totalAverageFuelConsumption: {
      type: Number,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owner",
      required: true,
    },
  },
  { timestamps: true }
);

const CalculatingData = mongoose.model("calculatingData", calculatingData);

module.exports = CalculatingData;

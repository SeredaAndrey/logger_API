const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generator = new Schema({
  brand: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  firstChangeOilReglament: {
    type: Number,
    default: null,
  },
  nextChangeOilReglament: {
    type: Number,
    default: null,
  },
  electricalPower: {
    type: Number,
    default: null,
  },
  dataFirstStart: {
    type: Date,
    default: null,
  },
  workingFirsStart: {
    type: Number,
    default: null,
  },
  oilVolume: {
    type: Number,
    default: null,
  },
  fuelVolume: {
    type: Number,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
    required: true,
  },
});

const Generator = mongoose.model("generator", generator);

module.exports = Generator;

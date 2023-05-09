const { number } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const generalSetting = new Schema({
  priceOfOil: {
    type: Number,
    default: null,
  },
  priceOfGasoline: {
    type: Number,
    default: null,
  },
  priceOfElectrical: {
    type: Number,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
    required: true,
  },
});

const GeneralSetting = mongoose.model("generalSetting", generalSetting);

module.exports = GeneralSetting;

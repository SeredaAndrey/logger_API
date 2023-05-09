const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workingCycles = new Schema(
  {
    timestampStart: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    timestampStop: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    volumeElecricalGeneration: {
      type: Number,
      default: null,
    },
    changeOil: {
      type: Boolean,
      default: null,
    },
    refueling: {
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

const WorkingCycles = mongoose.model("workingCycles", workingCycles);

module.exports = WorkingCycles;

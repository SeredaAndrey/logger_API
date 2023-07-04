const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const owner = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["passerby", "buyer"],
    default: "passerby",
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  vToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  firstName: {
    type: String,
    default: null,
  },
  seccondName: {
    type: String,
    default: null,
  },
  inerfaceLanguage: {
    type: String,
    enum: ["en", "ua"],
    default: "en",
  },
});

owner.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const Owner = mongoose.model("owner", owner);

module.exports = Owner;

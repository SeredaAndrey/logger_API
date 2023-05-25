const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_LOGIN,
    pass: process.env.MAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(config);

const Owner = require("../schemas/ownerSchemas");
const { InternalError, FoundingError } = require("../middleware/errorHandler");

const registrationService = async (email, password, avatarUrl) => {
  const owner = await Owner.findOne({ email });
  const vToken = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_VERIFY_SECRET,
    { expiresIn: 60 * 60 }
  );

  if (owner) {
    return;
  }

  const newOwner = new Owner({ email, password, avatarUrl, vToken });
  await newOwner.save();

  const msgVerify = {
    to: email,
    from: process.env.MAIL_LOGIN,
    subject: "Thank you for registration!",
    text: `Please, confirm your email address using this token: ${vToken}`,
    html: `Please, confirm your email address using this token: <strong>${vToken}</strong>`,
  };
  transporter
    .sendMail(msgVerify)
    .then((info) => {
      return info;
    })
    .catch((err) => new InternalError(err));
  return newOwner;
};

const loginService = async (email, password) => {
  const owner = await Owner.findOne({ email, verify: true });
  if (owner && (await bcrypt.compare(password, owner.password))) {
    const token = jwt.sign(
      {
        _id: owner._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );
    await Owner.findOneAndUpdate({ email }, { loggedIn: true }, { new: true });
    return {
      token: token,
      owner: owner,
    };
  } else {
    throw new FoundingError("User not found");
  }
};

const logoutService = async (_id) => {
  return await Owner.findOneAndUpdate(
    { _id, loggedIn: true },
    { loggedIn: false },
    { new: true }
  );
};

const verificationService = async (email) => {
  const data = await Owner.findOne({
    email,
    verify: false,
  });
  if (!data) {
    return;
  }
  return await Owner.findByIdAndUpdate(
    { _id: data._id },
    { vToken: null, verify: true },
    { new: true }
  );
};

const deleteNotAutorizedOwnerService = async () => {
  await Owner.deleteMany({ verify: false });
};

module.exports = {
  registrationService,
  loginService,
  logoutService,
  verificationService,
  deleteNotAutorizedOwnerService,
};

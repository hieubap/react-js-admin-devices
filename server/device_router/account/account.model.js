const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const account_service = {
  10: "common",
  20: "social",

  30: "devices",
  40: "employee",
  50: "movie",

  60: "galadinner",
};

const _schema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
    },
    roles: {
      type: Array,
      default: [],
    },
    service: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  {
    // _id: false,
    autoIndex: true,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const _model = mongoose.model("account", _schema);
module.exports = _model;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    code: { type: String },
    fullname: { type: String },
    gender: { type: Number },
    birth: { type: Date },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    startTime: { type: Date },
    isMember: { type: Boolean, default: true },
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

const SchemaModel = mongoose.model("devices___user", modelSchema);
module.exports = SchemaModel;

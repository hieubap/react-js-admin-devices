const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    // userId: { type: String },
    deviceId: { type: String },
    deviceReplaceIds: { type: Array },
    wage: { type: Number },
    fullname: { type: String },
    phone: { type: String },
    content: { type: String },
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

const SchemaModel = mongoose.model("devices___repair", modelSchema);
module.exports = SchemaModel;

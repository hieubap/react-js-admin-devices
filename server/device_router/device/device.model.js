const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    deviceName: { type: String },
    deviceCode: { type: String },
    manufacturer: { type: String },
    color: { type: String },
    mass: { type: String },
    size: { type: Number },
    tech: { type: String },
    price: { type: Number },
    priceBuy: { type: Number },
    priceSell: { type: Number },
    typeId: { type: String },
    // ownerId: { type: String },
    deviceRepairId: { type: String },
    accessoryDate: { type: Date },
    dateBroken: { type: Date },
    status: { type: Number, default: 1 }, // 2: export, 3: repair, 4: repaired, 5: accessory
    deleted: { type: Boolean, default: false },

    // guess info
    assignDate: { type: Date },
    fullname: { type: String },
    phone: { type: String },
    address: { type: String },
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

const SchemaModel = mongoose.model("devices___device", modelSchema);
module.exports = SchemaModel;

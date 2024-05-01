const { Router } = require("express");
const TypeDeviceModel = require("./typeDevice.model");
const moment = require("moment");

const router = Router();

const typeDeviceService = async (app) => {
  app.use("/devices/type-device", router);

  router.get("", async (req, res, next) => {
    try {
      const { isExport } = req.query;
      const page = Number(req.query.page) || 0;
      const size = Number(req.query.size) || 20;
      const query = {
        ownerId: { $exists: isExport },
        $or: [
          { deleted: { $exists: false } }, // Field does not exist
          { deleted: { $eq: false } }, // Field exists and is false
        ],
      };
      console.log(req.query, "req.query");

      const data = await TypeDeviceModel.aggregate([
        { $match: query },
        { $sort: { updatedAt: -1 } },
        { $skip: page * size },
        { $limit: size },
        {
          $addFields: {
            _id: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "devices___devices",
            localField: "_id",
            foreignField: "typeId",
            as: "devices",
          },
        },
        {
          $addFields: {
            numberDevice: { $size: "$devices" },
          },
        },
      ]);
      // .sort({ createdAt: -1 })
      // .skip(page * size)
      // .limit(size)
      const totalElements = await TypeDeviceModel.find(query).count();

      res.json({
        code: 0,
        data,
        page,
        size,
        totalElements,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.get("/all", async (req, res, next) => {
    try {
      const data = await TypeDeviceModel.find({});
      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.post("", async (req, res, next) => {
    try {
      const body = req.body;
      if (["typeName"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "typeName is required",
        });
        return;
      }
      const existed = await TypeDeviceModel.findOne({
        typeName: { $regex: "^" + body.typeName?.trim() + "$", $options: "i" },
        deleted: { $ne: true },
      });
      if (existed) {
        console.log(existed, "existed");
        res.json({
          code: 500,
          message: "Đã tồn tại loại thiết bị",
        });
        return;
      }

      // body.deviceCode =
      //   "DV" + ((await DeviceModel.countDocuments({})) + "").padStart(4, "0");
      const data = new TypeDeviceModel(body);
      await data.save();
      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.put("/assign", async (req, res, next) => {
    try {
      const body = req.body;
      if (["deviceId"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "Vui lòng nhập thiết bị và nhân viên",
        });
        return;
      }

      const data = await TypeDeviceModel.updateOne(
        { _id: body.deviceId },
        {
          fullname: body.fullname,
          phone: body.phone,
          address: body.address,
          status: 2,
          assignDate: new Date(),
        }
      );

      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.put("", async (req, res, next) => {
    try {
      const body = req.body;
      if (["typeName"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "typeName is required",
        });
        return;
      }

      const existed = await TypeDeviceModel.findOne({
        _id: { $ne: body._id },
        typeName: { $regex: "^" + body.typeName?.trim() + "$", $options: "i" },
        deleted: { $ne: true },
      });
      if (existed) {
        console.log(existed, "existed");
        res.json({
          code: 500,
          message: "Đã tồn tại loại thiết bị",
        });
        return;
      }

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");

      const data = await TypeDeviceModel.updateOne({ _id: id }, body);

      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await TypeDeviceModel.updateOne(
        { _id: id },
        { deleted: true }
      );

      res.json({
        code: 0,
        data,
      });
    } catch (error) {
      res.json({
        code: 500,
        message: error?.message,
      });
    }
  });
};

module.exports = { typeDeviceService };

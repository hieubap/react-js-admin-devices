const { Router } = require("express");
const RepairModel = require("./repair.model");
const DeviceModel = require("../device/device.model");
const moment = require("moment");

const router = Router();

const repairService = async (app) => {
  app.use("/devices/repair", router);

  router.get("", async (req, res, next) => {
    try {
      const { deviceName = "", status } = req.query;
      const page = Number(req.query.page) || 0;
      const size = Number(req.query.size) || 20;

      const data = await RepairModel.aggregate([
        // { $match: query },
        { $sort: { updatedAt: -1 } },
        { $skip: page * size },
        { $limit: size },
        {
          $addFields: {
            deviceId: { $toObjectId: "$deviceId" },
          },
        },
        {
          $lookup: {
            from: "devices___devices",
            localField: "deviceId",
            foreignField: "_id",
            as: "deviceInfo",
          },
        },
        {
          $set: {
            deviceInfo: { $arrayElemAt: ["$deviceInfo", 0] },
          },
        },
        // {
        //   $lookup: {
        //     from: "employee___checkings",
        //     localField: "memberId",
        //     foreignField: "userId",
        //     as: "checkings",
        //   },
        // },
      ]);
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

  router.get("/detail/:id", async (req, res, next) => {
    try {
      const data = await RepairModel.findOne({ _id: req.params.id });
      const replaceList = await DeviceModel.find({
        _id: { $in: data.deviceReplaceIds },
      });
      const deviceInfo = await DeviceModel.findOne({
        _id: data.deviceId,
      });

      const result = { ...data._doc, deviceInfo, replaceList }; // data.replaceList = replaceList;
      
      res.json({
        code: 0,
        data: result,
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
      if (!body.deviceId) {
        res.json({
          code: 400,
          message: "deviceId is required",
        });
        return;
      }

      await DeviceModel.updateMany(
        { _id: { $in: body.deviceReplaceIds } },
        { deviceRepairId: body.deviceId }
      );

      await DeviceModel.updateOne({ _id: body.deviceId }, { status: 2 });

      const data = new RepairModel(body);
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

  router.put("", async (req, res, next) => {
    try {
      const body = req.body;
      if (!body.userId) {
        res.json({
          code: 400,
          message: "",
        });
        return;
      }

      const data = await RepairModel.updateOne({ _id: req.body._id }, body);

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

module.exports = { repairService };

const { Router } = require("express");
const DeviceModel = require("./device.model");
const moment = require("moment");

const router = Router();

const deviceService = async (app) => {
  app.use("/devices/device", router);

  router.get("", async (req, res, next) => {
    try {
      const { deviceName = "", status, showReplace } = req.query;
      const page = Number(req.query.page) || 0;
      const size = Number(req.query.size) || 20;
      const query = {
        // ownerId: { $exists: isExport },
        $or: [
          { deleted: { $exists: false } }, // Field does not exist
          { deleted: { $eq: false } }, // Field exists and is false
        ],
        status: Number(status) || undefined,
        deviceName: { $regex: deviceName, $options: "i" },

        // dateBroken: { $exists: repair ? true : false },
      };
      if (showReplace) {
        query.deviceRepairId = { $exists: false };
      }
      console.log(req.query, "req.query");

      const data = await DeviceModel.aggregate([
        { $match: query },
        { $sort: { updatedAt: -1 } },
        { $skip: page * size },
        { $limit: size },
        {
          $addFields: {
            typeId: { $toObjectId: "$typeId" },
          },
        },
        {
          $lookup: {
            from: "devices___type_devices",
            localField: "typeId",
            foreignField: "_id",
            as: "type",
          },
        },
        {
          $set: {
            type: { $arrayElemAt: ["$type", 0] },
          },
        },
      ]);
      // .sort({ createdAt: -1 })
      // .skip(page * size)
      // .limit(size)
      const totalElements = await DeviceModel.find(query).count();

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
      const data = await DeviceModel.find({});
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
      if (["deviceName"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "deviceName is required",
        });
        return;
      }

      const quantity = body.quantity || 1;
      for (let i = 0; i < quantity; i++) {
        body.deviceCode =
          "DV" + ((await DeviceModel.countDocuments({})) + "").padStart(4, "0");
        const data = new DeviceModel(body);
        await data.save();
      }

      res.json({
        code: 0,
        message: "Success",
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

      const data = await DeviceModel.updateOne(
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

  router.put("/broken/:id", async (req, res, next) => {
    try {
      // const body = req.body;
      const data = await DeviceModel.updateOne(
        { _id: req.params.id },
        { dateBroken: new Date(), status: 3 }
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
      // if (["deviceName"].some((k) => !body[k])) {
      //   res.json({
      //     code: 400,
      //     message: "deviceName is required",
      //   });
      //   return;
      // }

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");
      if (body.status === 5 && !!body._id) {
        body.accessoryDate = new Date();
      }

      const data = await DeviceModel.updateOne({ _id: id }, body);

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
      const data = await DeviceModel.updateOne({ _id: id }, { deleted: true });

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

module.exports = { deviceService };

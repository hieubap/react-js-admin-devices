const { Router } = require("express");
const UserModel = require("./user.model");
const moment = require("moment");

const router = Router();

const userService = async (app) => {
  app.use("/devices/user", router);

  router.get("", async (req, res, next) => {
    try {
      const { isExport, textSearch } = req.query;
      const page = Number(req.query.page) || 0;
      const size = Number(req.query.size) || 20;
      console.log(textSearch, "textSearch");
      const query = {
        owner: { $exists: isExport },
        $and: [
          {
            $or: [{ deleted: { $exists: false } }, { deleted: { $eq: false } }],
          },
          textSearch
            ? {
                $or: [
                  { fullname: { $regex: textSearch, $options: "i" } },
                  { code: { $regex: textSearch, $options: "i" } },
                ],
              }
            : {},
        ],
      };
      console.log(req.query, "req.query");
      const data = await UserModel.find(query)
        .sort({ createdAt: -1 })
        .skip(page * size)
        .limit(size);
      const totalElements = await UserModel.find(query).count();

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
      const data = await UserModel.find({});
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
      if (["fullname", "phone"].some((k) => !body[k])) {
        res.json({
          code: 400,
          message: "Vui lòng nhập họ tên và số điện thoại",
        });
        return;
      }

      body.code =
        "NV" + ((await UserModel.countDocuments({})) + "").padStart(4, "0");
      const data = new UserModel(body);
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

      const id = body._id;
      delete body._id;
      delete body.createdAt;
      delete body.updatedAt;
      console.log(body, "body");

      const data = await UserModel.updateOne({ _id: id }, body);

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

module.exports = { userService };

const { Router } = require("express");
const AccountModel = require("./account.model");
const { JwtUtil } = require("../../config/auth.middleware");
const { digestSHA256 } = require("../../utils");

const router = Router();

const accountService = (app) => {
  app.use("/account", router);

  router.get("", (req, res, next) => {
    res.json({ ok: 1 });
  });

  router.post("/sign-up", async (req, res, next) => {
    try {
      console.log(req.body, "req.body?");
      const newModel = new AccountModel(req.body);
      newModel.password = digestSHA256(req.body.password);
      await newModel.save();
      res.json(newModel);
    } catch (e) {
      res.json({
        code: 500,
        message: e?.toString(),
      });
    }
  });

  router.post("/sign-in", async (req, res, next) => {
    try {
      const user = await AccountModel.findOne({ username: req.body.username });
      console.log(user, "user");
      if (!user) {
        res.json({
          code: 400,
          message: "username ko đúng",
        });
        return;
      }
      const hashedPass = digestSHA256(req.body.password);
      if (user.password !== hashedPass) {
        res.json({
          code: 400,
          message: "password ko đúng",
        });
        return;
      }

      const token = JwtUtil.generateToken(user._doc);
      const result = { ...user._doc, token };

      res.json({ code: 200, data: result });
    } catch (e) {
      res.json({
        code: 500,
        message: e?.toString(),
      });
    }
  });
};

module.exports = { accountService };

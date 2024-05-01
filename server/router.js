const { static, json } = require("express");
const { mongodbLoader } = require("./config/mongodbLoader");

const { device_router } = require("./device_router");

const router = async ({ app }) => {
  app.get("/", (req, res) => {
    res.status(200).send("Server sẵn sàng").end();
  });
  await mongodbLoader();
  app.use(json());

  device_router(app);
};

module.exports = { router };

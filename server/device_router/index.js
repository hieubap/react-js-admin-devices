const { repairService } = require("./repair/repair.service");
const { deviceService } = require("./device/device.service");
const { typeDeviceService } = require("./typeDevice/typeDevice.service");
const { userService } = require("./user/user.service");
const { accountService } = require("./account/account.service");

const device_router = (app) => {
  deviceService(app);
  userService(app);
  repairService(app);
  typeDeviceService(app);
  accountService(app);
};
module.exports = { device_router };

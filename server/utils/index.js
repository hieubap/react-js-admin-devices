const { createHash } = require("crypto");

const digestSHA256 = (string = "") =>
  createHash("sha256").update(string).digest("hex");

module.exports = {
  digestSHA256,
};

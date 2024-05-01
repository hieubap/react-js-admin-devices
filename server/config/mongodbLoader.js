const mongoose = require("mongoose");

const mongodbLoader = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    //   timezone: "Z",
    });
    return connection.connection.db;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { mongodbLoader };

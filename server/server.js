// main_running_server
process.title = "NodeJS My_Service";

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { router } = require("./router");

async function start() {
  const app = express();
  app.use(cors());
  app.disable("x-powered-by");


  router({ app });

  const port = 8800;

  app.listen(port, (err) => {
    if (err) {
      process.exit(1);
    }
    console.info(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️ 
        ################################################
      `);
  });
}

start();

const express = require("express");
const app = express();
const applicationMiddleware = require("./app_config/applicationMiddleware");
const database = require("./app_config/database");
const routers = require("./app_config/routers");

applicationMiddleware(express, app);
database();
routers(app);

app.get("/", (req, res) => {
  res.send("This is index text");
});

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});

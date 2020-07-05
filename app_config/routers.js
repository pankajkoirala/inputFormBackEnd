const observation = require("../router/observation");
const routers = app => {
  app.use("/api/observation", observation);
};
module.exports = routers;

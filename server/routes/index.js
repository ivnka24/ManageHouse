const express = require("express");
const routes = express.Router();
const residentRoutes = require("./resident");
const houseRoutes = require("./house");
const residentHouseRoutes = require("./residenthouse");
const paymentRoutes = require("./payment");
const expenseRoute = require("./expense");
const SaldoController = require("../controllers/SaldoController");
routes.get("/", (req, res) => {
  res.send("Test Running");
});
routes.get("/saldo/now", SaldoController.getLatestSaldo);
routes.get("/saldo", SaldoController.filterSaldo);

routes.use("/expense", expenseRoute);
routes.use("/resident", residentRoutes);
routes.use("/house", houseRoutes);
routes.use("/residenthouse", residentHouseRoutes);
routes.use("/payment", paymentRoutes);

module.exports = routes;

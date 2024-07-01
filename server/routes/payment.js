const PaymentController = require("../controllers/PaymentController");

const routes = require("express").Router();
routes.post("/", PaymentController.createPayment);
routes.get("/", PaymentController.findAllPayments);
module.exports = routes;

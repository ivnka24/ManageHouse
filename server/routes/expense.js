const express = require("express");
const ExpenseController = require("../controllers/ExpenseController");
const routes = express.Router();
routes.post("/", ExpenseController.createExpense);
routes.get("/", ExpenseController.findAll);
module.exports = routes;

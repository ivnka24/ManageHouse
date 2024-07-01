const { Expense, Saldo } = require("../models");
class ExpenseController {
  static async createExpense(req, res, next) {
    try {
      const { description, amount } = req.body;
      const create = await Expense.create({
        description,
        amount,
        dateExpense: new Date(),
      });

      //update amount
      let totalAmount = amount;
      const latestSaldo = await Saldo.findOne({
        order: [["createdAt", "DESC"]],
      });
      let currentSaldoAmount = latestSaldo ? latestSaldo.amount : 0;
      if (latestSaldo.amount <= totalAmount) {
        return res.status(400).json({ message: "Balance is not enough" });
      }
      const newSaldoAmount = currentSaldoAmount - totalAmount;
      const updateSaldo = await Saldo.create({
        amount: newSaldoAmount,
        status: "Expense",
      });
      res
        .status(201)
        .json({ data: create, message: "Create data expense successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async findAll(req, res, next) {
    try {
      const expenses = await Expense.findAll();
      res.status(200).json({ data: expenses });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = ExpenseController;

const { Payment, Saldo, Residents, ResidentHouse } = require("../models");

class PaymentController {
  static async createPayment(req, res, next) {
    try {
      const { ResidentId, typePayment, periodPayment } = req.body;
      if (typePayment !== "Satpam" && typePayment !== "Kebersihan") {
        return res.status(400).json({
          message: "Correct input, you must input Satpam or Kebersihan",
        });
      }
      let amount;
      if (typePayment === "Satpam") {
        amount = 100000;
        if (periodPayment && periodPayment != 1) {
          return res.status(400).json({
            message: "Satpam payments must be monthly.",
          });
        }
      } else {
        amount = 15000;
      }

      const totalAmount = amount * (periodPayment || 1);

      const checkResident = await Residents.findByPk(ResidentId);
      if (!checkResident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      const checkResidentHouse = await ResidentHouse.findOne({
        where: { ResidentId, exitDate: null },
        order: [["startDate", "DESC"]],
      });

      if (!checkResidentHouse) {
        return res
          .status(404)
          .json({ message: "The user has not yet chosen a house" });
      }
      if (
        checkResidentHouse.exitDate !== null ||
        checkResidentHouse.exit === true
      ) {
        return res
          .status(400)
          .json({ message: "The occupants have left the house" });
      }
      const payment = await Payment.create({
        ResidentId,
        typePayment,
        periodPayment: periodPayment || 1,
        amount: totalAmount,
        datePayment: new Date(),
      });

      const latestSaldo = await Saldo.findOne({
        order: [["createdAt", "DESC"]],
      });
      let currentSaldoAmount = latestSaldo ? latestSaldo.amount : 0;
      const newSaldoAmount = currentSaldoAmount + totalAmount;
      await Saldo.create({
        amount: newSaldoAmount,
        date: new Date(),
        status: "Income",
      });
      res.status(201).json({
        message: "Payment created successfully",
        payment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //findAll get Payment history with resident
  static async findAllPayments(req, res, next) {
    try {
      const payments = await Payment.findAll({
        include: [
          {
            model: Residents,
            attributes: ["fullName"],
          },
        ],
        order: [["datePayment", "DESC"]],
      });
      res.status(200).json({
        message: "Payment history retrieved successfully",
        payments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = PaymentController;

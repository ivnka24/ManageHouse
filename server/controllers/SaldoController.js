const { Saldo, sequelize } = require("../models");
const { Op, fn, col } = require("sequelize");

class SaldoController {
  static async getLatestSaldo(req, res, next) {
    try {
      const latestSaldo = await Saldo.findOne({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ latestSaldo });
    } catch (error) {
      console.error("Error fetching latest saldo:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async filterSaldo(req, res, next) {
    try {
      const { status, month, year } = req.query;

      const whereCondition = {};

      if (status) {
        whereCondition.status = status;
      }

      if (month || year) {
        whereCondition[Op.and] = [];
        if (month) {
          whereCondition[Op.and].push(
            sequelize.where(fn('EXTRACT', fn('MONTH', col('createdAt'))), month)
          );
        }
        if (year) {
          whereCondition[Op.and].push(
            sequelize.where(fn('EXTRACT', fn('YEAR', col('createdAt'))), year)
          );
        }
      }

      const filteredSaldo = await Saldo.findAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ filteredSaldo });
    } catch (error) {
      console.error("Error filtering saldo:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = SaldoController;

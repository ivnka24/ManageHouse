const { House } = require("../models");
class HouseController {
  static async createHouse(req, res, next) {
    try {
      const { address } = req.body;
      const create = await House.create({ address });
      console.log(create, "<<<");
      res
        .status(201)
        .json({ data: create, message: "House successfully created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getHouse(req, res, next) {
    try {
      res.status(200).json({ data: await House.findAll() });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async updateHouse(req, res, next) {
    try {
      const { id } = req.params;
      const { address } = req.body;
      const findData = await House.findByPk(id);
      if (!findData) {
        return res.status(404).json({ message: "House not found" });
      }
      await House.update({ address }, { where: { id } });
      res.status(200).json({ message: "Update data successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findById(req, res, next) {
    try {
      const findData = await House.findByPk(req.params.id);
      if (!findData) {
        return res.status(404).json({ message: "House not found" });
      }
      return res.status(200).json({ data: findData });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async filterHome(req, res, next) {
    try {
      let data = await House.findAll();
      const vacantHouses = data.filter((house) => house.statusHouse === "Tidak dihuni");

      res.status(200).json(vacantHouses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = HouseController;

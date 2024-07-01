const { ResidentHouse, House, Residents } = require("../models");
class HouseResidentController {
  static async AddHouseResident(req, res, next) {
    try {
      const { HouseId, ResidentId } = req.body;
      const findHouse = await House.findByPk(HouseId);
      if (!findHouse) {
        return res.status(404).json({ message: "House not found" });
      }
      const findResident = await Residents.findByPk(ResidentId);
      if (!findResident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      if (findHouse.statusHouse === "Dihuni") {
        return res
          .status(400)
          .json({ message: "This house is still occupied" });
      }
      const create = await ResidentHouse.create({
        HouseId,
        ResidentId,
        startDate: new Date(),
        exit: false,
      });
      const updateHome = await House.update(
        { statusHouse: "Dihuni" },
        { where: { id: HouseId } }
      );
      return res.status(201).json({
        data: create,
        message: "Create data House Resident Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getAllHouseResidents(req, res, next) {
    try {
      const houseResidents = await ResidentHouse.findAll({
        attributes: ["id", "startDate", "exitDate", "exit"],
        include: [
          {
            model: House,
            attributes: ["address", "statusHouse"],
          },
          {
            model: Residents,
            attributes: ["fullName", "residentStatus"],
          },
        ],
      });
      // console.log(houseResidents, "<<<");
      const data = houseResidents.map((hr) => ({
        id: hr.id,
        address: hr.House.address,
        fullName: hr.Resident.fullName,
        residentStatus: hr.Resident.residentStatus,
        startDate: hr.startDate,
        exitDate: hr.exitDate,
      }));

      return res.status(200).json({ data });
    } catch (error) {
      console.error("Error fetching house residents:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async exitHouse(req, res, next) {
    try {
      const { id } = req.params;
      const findData = await ResidentHouse.findOne({ where: { id } });
      console.log(findData, "<< find data");

      if (!findData) {
        return res.status(404).json({ message: "Data not found" });
      }

      const updateData = await ResidentHouse.update(
        { exitDate: new Date(), exit: true },
        { where: { id } }
      );

      if (updateData[0] === 0) {
        return res.status(400).json({ message: "Failed to update data" });
      }

      const updateHouse = await House.update(
        { statusHouse: "Tidak dihuni" },
        { where: { id: findData.HouseId } }
      );

      return res.status(200).json({ message: "Success exit house" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = HouseResidentController;

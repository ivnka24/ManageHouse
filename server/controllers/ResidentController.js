const { Residents } = require("../models/index.js");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
class ResidentController {
  static async createResident(req, res, next) {
    try {
      const {
        fullName,
        photoIdentityCard,
        residentStatus,
        phoneNumber,
        statusMarriage,
      } = req.body;
      if (residentStatus !== "Kontrak" && residentStatus !== "Tetap") {
        return res.status(400).json({ message: "Incorret Input" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const base64Convert = req.file.buffer.toString("base64");
      const base64Url = `data:${req.file.mimetype};base64,${base64Convert}`;
      const cloudinaryRespone = await cloudinary.uploader.upload(base64Url);
      const create = await Residents.create({
        fullName,
        photoIdentityCard: cloudinaryRespone.secure_url,
        residentStatus,
        phoneNumber,
        statusMarriage,
      });
      res
        .status(201)
        .json({ data: create, message: "Data resident successfully created" });
    } catch (error) {
      console.log(error, "<<");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //findAll
  static async findAll(req, res, next) {
    try {
      const residents = await Residents.findAll();
      return res
        .status(200)
        .json({ data: residents, message: "Success get data" });
    } catch (error) {
      console.error("Error fetching residents:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  //update by id
  static async updateResident(req, res, next) {
    try {
      const { id } = req.params;
      const { fullName, residentStatus, phoneNumber, statusMarriage } =
        req.body;
      if (residentStatus !== "Kontrak" && residentStatus !== "Tetap") {
        return res.status(400).json({ message: "Incorret Input" });
      }
      const resident = await Residents.findByPk(id);
      if (!resident) {
        return res.status(404).json({ message: "Resident not found" });
      }

      let updatedData = {
        fullName,
        residentStatus,
        phoneNumber,
        statusMarriage,
      };

      if (req.file) {
        const base64Convert = req.file.buffer.toString("base64");
        const base64Url = `data:${req.file.mimetype};base64,${base64Convert}`;
        const cloudinaryResponse = await cloudinary.uploader.upload(base64Url);
        updatedData.photoIdentityCard = cloudinaryResponse.secure_url;
      }

      await resident.update(updatedData, { where: { id } });

      return res.status(200).json({
        data: resident,
        message: "Data resident successfully updated",
      });
    } catch (error) {
      console.error("Error updating resident:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async findById(req, res, next) {
    try {
      const findResident = await Residents.findByPk(req.params.id);
      if (!findResident) {
        return res.status(404).json({ message: "Resident not found" });
      }
      res.status(200).json(findResident);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ResidentController;

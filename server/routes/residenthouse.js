const HouseResidentController = require("../controllers/HouseResidentController");

const routes = require("express").Router();

routes.post("/", HouseResidentController.AddHouseResident);
routes.get("/", HouseResidentController.getAllHouseResidents);
routes.patch("/exit/:id", HouseResidentController.exitHouse)
module.exports = routes;

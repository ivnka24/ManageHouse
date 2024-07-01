const HouseController = require("../controllers/HouseController");

const routes = require("express").Router();

routes.post("/", HouseController.createHouse);
routes.get("/", HouseController.getHouse);
routes.get("/available", HouseController.filterHome);
routes.put("/:id", HouseController.updateHouse);
routes.get("/:id", HouseController.findById);
module.exports = routes;

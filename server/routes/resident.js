const ResidentController = require("../controllers/ResidentController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routes = require("express").Router();
routes.get("/", ResidentController.findAll);
routes.post(
  "/",
  upload.single("photoIdentityCard"),
  ResidentController.createResident
);
routes.put(
  "/:id",
  upload.single("photoIdentityCard"),
  ResidentController.updateResident
);
routes.get("/:id", ResidentController.findById);
module.exports = routes;

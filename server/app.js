require('dotenv').config()
let cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/index");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(routes);
app.listen(port, () => {
  console.log(`App running on port 3000`);
});

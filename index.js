require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./src/models/User");
require("dotenv").config();
const db = require("./src/config/db");
const fileUpload = require("express-fileupload");
const { ROLES } = require("./src/config");
global.appRoot = path.resolve(__dirname);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// global error handler
app.use("/src/uploads", express.static(path.join(__dirname, "../src/uploads")));
db();

app.use(fileUpload());
app.use("/api", require("./src/routes"));

app.get("/", async function (req, res) {
  let user = await User.findOne({
    email: "admin@gmail.com",
  });
  if (!user) {
    user = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: "Admin@123",
      phone: "1234567890",
      role: ROLES.ADMIN,
    });
    await user.save();
  }
  res.send({ message: "welcome Messages" });
});

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(
  port,
  () => console.log("we are in </br>  Server listening on port " + port),
  console.log(`url:https://localhost:${port}`)
);

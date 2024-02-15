require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./src/models/User");
// const faker = require("faker");
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

require("dotenv").config();
const db = require("./src/config/db");
const fileUpload = require("express-fileupload");
const { ROLES } = require("./src/config");
const { response } = require("./src/utils/response");
const Country = require("./src/models/Country");
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

app.get("/add-fake-data", async function (req, res) {
  try {
    const query = req.query;
    let record = query.record;
    record = record ? record : 100;
    const countries = await Country.find();

    let fakeUsers = [];
    for (let i = 0; i < 2; i++) {
      const randomCountryIndex = Math.floor(Math.random() * countries.length);
      const randomCountry = countries[randomCountryIndex];
      fakeUsers.push({
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        phone: faker.string.numeric(10),
        linkedin: faker.internet.url(),
        facebook: faker.internet.url("https://www.facebook.com/"),
        twitter: faker.internet.url(),
        instagram: faker.internet.url(),
        plateform: new mongoose.Types.ObjectId(),
        lead_score: new mongoose.Types.ObjectId(),
        conversion: new mongoose.Types.ObjectId(),
        country: randomCountry?._id ? randomCountry?._id : "",
      });
    }
    console.log(fakeUsers, "fakeUsersfakeUsers");
    return res.json(
      response({
        data: fakeUsers,
        status: true,
        message: "Fetch record success",
      })
    );
  } catch (error) {
    console.log(error);
    return res.json(response({ errors: error, message: error?.message }));
  }
});

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(
  port,
  () => console.log("we are in </br>  Server listening on port " + port),
  console.log(`url:https://localhost:${port}`)
);

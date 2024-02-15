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
const Plateform = require("./src/models/Platform");
const LeadScore = require("./src/models/LeadScore");
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

function generateTwitterUrl(username) {
  return `https://twitter.com/in/${username}`;
}

app.get("/add-fake-data", async function (req, res) {
  try {
    const query = req.query;
    let record = query.record;
    record = record ? record : 100;
    const countries = await Country.find();
    const plateforms = await Plateform.find();
    const leadScores = await LeadScore.find();

    let fakeUsers = [];
    for (let i = 0; i < record; i++) {
      const randomCountryIndex = Math.floor(Math.random() * countries.length);
      const randomCountry = countries[randomCountryIndex];
      const randomPlateformsIndex = Math.floor(
        Math.random() * plateforms.length
      );
      const randomPlateform = plateforms[randomPlateformsIndex];
      const randomLeadScoreIndex = Math.floor(
        Math.random() * leadScores.length
      );
      const randomLeadScore = leadScores[randomLeadScoreIndex];
      let obj = {
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        phone: faker.string.numeric(10),
        linkedin: generateTwitterUrl(faker.internet.userName()),
      };
      if (randomCountry && randomCountry._id) {
        obj.country = randomCountry._id;
      }
      if (randomPlateform && randomPlateform._id) {
        obj.plateform = randomPlateform._id;
      }
      if (randomLeadScore && randomLeadScore._id) {
        obj.lead_score = randomLeadScore._id;
      }
      fakeUsers.push(obj);
    }
    await User.insertMany(fakeUsers);
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

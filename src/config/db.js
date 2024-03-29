const mongoose = require("mongoose");
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;

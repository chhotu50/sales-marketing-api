const mongoose = require("mongoose");
const createModel = (collectionName, schema) => {
  return mongoose.model(collectionName, schema);
};

module.exports = createModel;

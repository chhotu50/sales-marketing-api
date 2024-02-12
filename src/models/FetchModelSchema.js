const mongoose = require("mongoose");
const ModalSchema = require("./ModelSchema");
const createModel = require("./CreateModel");

async function fetchModelSchema(id) {
  const data = await ModalSchema.findOne({ title: id });
  if (data) {
    const dynamicSchema2 = new mongoose.Schema(data.fields);
    const dynamicSchema = createModel(data.title, dynamicSchema2);
    return dynamicSchema;
  }
  return false;
}

module.exports = {
  fetchModelSchema,
};

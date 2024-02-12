const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    fields: Object,
    created_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const ModalSchema = mongoose.model("ModalSchema", schema);
module.exports = ModalSchema;

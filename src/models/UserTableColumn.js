const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    label: String,
    isVisible: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    created_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const UserTableColumn = mongoose.model("UserTableColumn", schema);
module.exports = UserTableColumn;

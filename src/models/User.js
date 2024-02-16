const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { ROLES } = require("../config");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      sparse: true,
    },
    password: String,
    phone: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    instagram: String,
    date: String,
    time: String,
    job_url: String,
    plateform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plateform",
      required: false,
    },
    lead_score: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeadScore",
      required: false,
    },
    conversion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversion",
      required: false,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: false,
    },
    created_by_user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    role: {
      type: Number,
      enum: [ROLES.ADMIN, ROLES.CLIENT],
      default: ROLES.CLIENT,
    },
    status: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  const now = new Date();
  // user.updated_at = now;

  // if (!user.created_at) {
  //   user.created_at = now;
  // }

  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) {
        return next(err1);
      }
      user.password = hash;
      next();
    });
  });
});

function isEmailExists(email, res) {
  User.count({ email: email }).then((count) => {
    if (count > 0) {
      console.log("Username exists.");
      // res.json({
      //   'success' : false,
      //   'message' : 'Email Already Exists'
      // })
    } else {
      console.log("Username does not exist.");
    }
  });
}

const User = mongoose.model("User", UserSchema);
module.exports = User;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const { response } = require("../utils/response");
const { ROLES } = require("../config");

exports.auth = {
  register: async function (req, res, next) {
    const { name, email, password, phone, address } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.json(response({ message: "User Already Exists" }));
      }
      user = new User(req.body);
      await user.save();
      return res.json(
        response({ status: true, data: user, message: "Record added success" })
      );
      /*
      const payload = {
        user,
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          // const userResponse = user.toObject();
          // delete userResponse.password;
          return res.json(
            response({
              token,
              data: user,
              status: true,
              message: "User added successfully",
            })
          );
        }
      );
      */
    } catch (err) {
      return res.json(response({ errors: error, message: error }));
    }
  },
  login: async function (req, res, next) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user) return res.json(response({ message: "User Not Exist" }));
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json(response({ message: "Incorrect Password !" }));
      const payload = {
        user,
      };

      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) return res.json(response({ errors: err }));
          const userResponse = user.toObject();
          delete userResponse.password;
          return res.json(
            response({
              token,
              data: userResponse,
              status: true,
              message: "User login successfully",
            })
          );
        }
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error }));
    }
  },
};

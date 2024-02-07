const User = require("./../models/User");
const { response } = require("../utils/response");
exports.user = {
  list: async function (req, res) {
    try {
      const query = req.query;
      const data = await User.find(query).populate("created_by_user_id");
      return res.json(
        response({ data: data, status: true, message: "Fetch record success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  showOne: async function (req, res) {
    try {
      const data = await User.findById(req.params.id).populate(
        "created_by_user_id"
      );
      return res.json(
        response({ data: data, status: true, message: "Fetch record success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  update: async function (req, res) {
    try {
      const { name, phone, linkedin, facebook, twitter, instagram, country } =
        req.body;
      const data = await User.findByIdAndUpdate(
        req.params.id,
        { name, phone, linkedin, facebook, twitter, instagram, country },
        {
          new: true,
        }
      );
      return res.json(
        response({
          message: "Record update successfully",
          status: true,
          data: data,
        })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  delete: async function (req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.json(
        response({ message: "Record delete successfully", status: true })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
};

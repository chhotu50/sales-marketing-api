const UserTableColumn = require("./../models/UserTableColumn");
const { response } = require("../utils/response");
exports.user = {
  list: async function (req, res) {
    try {
      const data = await UserTableColumn.find().sort({ created_at: -1 });
      return res.json(
        response({ data: data, status: true, message: "Fetch record success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  showOne: async function (req, res) {
    try {
      const data = await UserTableColumn.findById(req.params.id);
      return res.json(
        response({ data: data, status: true, message: "Fetch record success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  update: async function (req, res) {
    try {
      const { title, label, isVisible } = req.body;
      const data = await UserTableColumn.findByIdAndUpdate(
        req.params.id,
        {
          title,
          label,
          isVisible,
        },
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
      await UserTableColumn.findByIdAndDelete(req.params.id);
      return res.json(
        response({ message: "Record delete successfully", status: true })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
};

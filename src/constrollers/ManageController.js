const Country = require("./../models/Country");
const { response } = require("../utils/response");
const Plateform = require("../models/Platform");
const LeadScore = require("../models/LeadScore");
exports.manage = {
  list: async function (req, res) {
    try {
      const query = req.query;
      const modal = getModal(query.type);
      const data = await modal.find().sort({ createdAt: -1 });
      return res.json(
        response({ data: data, status: true, message: "Fetch record success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  store: async function (req, res, next) {
    const { title } = req.body;
    const query = req.query;
    let modal = getModal(query.type);
    try {
      let data = await modal.findOne({
        title,
      });
      if (data) {
        return res.json(response({ message: "Record Already Exists" }));
      }
      data = new modal(req.body);
      await data.save();
      return res.json(
        response({ status: true, data: data, message: "Record added success" })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  showOne: async function (req, res) {
    try {
      const query = req.query;
      const modal = getModal(query.type);
      const data = await modal.findById(req.params.id);
      return res.json(
        response({ data: data, status: true, message: "Fetch record success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  update: async function (req, res) {
    try {
      const { title } = req.body;
      const query = req.query;
      const modal = getModal(query.type);
      const data = await modal.findByIdAndUpdate(
        req.params.id,
        {
          title,
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
      const query = req.query;
      const modal = getModal(query.type);
      await modal.findByIdAndDelete(req.params.id);
      return res.json(
        response({ message: "Record delete successfully", status: true })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
};

const getModal = (type) => {
  switch (type) {
    case "country":
      return Country;
    case "platform":
      return Plateform;
    case "leadscore":
      return LeadScore;
    default:
      return Country;
  }
};

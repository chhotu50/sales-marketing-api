const { default: mongoose } = require("mongoose");
const { connect } = require("../config/clientDB");
const { response } = require("../utils/response");
const dynamicTable = require("./../utils/dynamicTable");
const { ObjectId } = require("mongodb");
const CreateModel = require("../models/CreateModel");
const ModalSchema = require("../models/ModelSchema");
const { fetchModelSchema } = require("../models/FetchModelSchema");

exports.DBC = {
  createCollection: async function (req, res, next) {
    try {
      await dynamicTable.createCollection(req.body.collection_name);
      return res.json(
        response({ status: true, message: "Record added success" })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  getCollection: async function (req, res, next) {
    try {
      const db = await connect();
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map((collection) => collection.name);
      return res.json(
        response({
          status: true,
          data: collectionNames,
          message: "Record featch success",
        })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },

  getData: async function (req, res, next) {
    try {
      const { collectionName } = req.body;
      const query = req.query;
      const data = await dynamicTable.findDocuments(collectionName, query);
      return res.json(
        response({
          status: true,
          data: data,
          message: "Record featch success",
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  addData: async function (req, res, next) {
    try {
      const { collectionName } = req.query;
      const data = await dynamicTable.insertDocument(collectionName, req.body);
      return res.json(
        response({
          status: true,
          data: data,
          message: "Record added success",
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  updateData: async function (req, res, next) {
    try {
      const { collectionName } = req.query;
      const data = await dynamicTable.updateDocument(collectionName, req.body);
      dynamicTable.updateDocument(
        collectionName,
        {
          _id: ObjectId.createFromHexString(req.params.id),
        },
        req.body
      );
      return res.json(
        response({
          status: true,
          data: data,
          message: "Record update success",
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
  deleteData: async function (req, res, next) {
    try {
      const { collectionName } = req.query;
      await dynamicTable.deleteDocument(collectionName, {
        _id: ObjectId.createFromHexString(req.params.id),
      });
      return res.json(
        response({
          status: true,
          message: "Record delete success",
        })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },

  getDataById: async function (req, res, next) {
    try {
      const { collectionName } = req.query;
      const data = await dynamicTable.findByIdDocuments(collectionName, {
        _id: ObjectId.createFromHexString(req.params.id),
      });
      return res.json(
        response({
          status: true,
          data: data,
          message: "Record featch success",
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },

  createModal: async function (req, res, next) {
    try {
      const { fields, title, created_by_user_id } = req.body;
      const modal = new ModalSchema({
        fields,
        title,
        created_by_user_id,
      });
      await modal.save();
      const schema = new mongoose.Schema(fields);
      CreateModel(title, schema);
      return res.json(
        response({
          status: true,
          data: modal,
          message: "Record added successfully",
        })
      );
    } catch (error) {
      console.log(error);
      return res.json(response({ errors: error, message: error?.message }));
    }
  },

  createModalData: async function (req, res, next) {
    try {
      const modal = await fetchModelSchema("testing");
      return res.json(
        response({
          status: true,
          data: modal,
          message: "Record added successfully",
        })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
};

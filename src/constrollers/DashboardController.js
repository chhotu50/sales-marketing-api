const User = require("./../models/User");
const { response } = require("../utils/response");
exports.dashboard = {
  rolebasedCount: async function (req, res) {
    try {
      const aggregatorOpts = [
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            roles: { $push: { role: "$_id", count: "$count" } },
            totalUsers: { $sum: "$count" },
          },
        },
      ];
      const data = await User.aggregate(aggregatorOpts).exec();
      return res.json(
        response({
          data: data[0],
          status: true,
          message: "Fetch record success",
        })
      );
    } catch (error) {
      return res.json(response({ errors: error, message: error?.message }));
    }
  },
};

const { Airport } = require("../../models/airport");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const list_airports = async (req, res) => {
  try {
    // Fetch all airports
    const airports = await Airport.find({ status: 1 }).sort({ title: 1 });

    res.status(200).json({
      code: 200,
      message: "List of airports retrieved successfully",
      airports: airports,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = list_airports;

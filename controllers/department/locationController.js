const Location = require("../../models/Location");

exports.view = async (req, res) => {
  let perPage = 10;
  let page = req.query.page || 1;
  try {
    const locations = await Location.find({})
      .sort({ updatedAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate({ path: "location", select: ["address", "ward", "district", "method", "number_of_ads","accepted"] })
      .exec();
    const count = await Location.count();
    res.render("department/location/index", {
      locations,
      perPage,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

exports.getDetail = async (req, res) => {
  try {
    const location = await Location.findOne({ _id: req.params.id });
    res.render("department/location/detail", {
      location,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateInfo = (req, res) => {
  res.render("department/location/update_info");
};

exports.createNew = (req, res) => {
  res.render("department/location/create");
}
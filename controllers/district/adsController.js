const Ads = require("../../models/Ads");

exports.view = async (req, res) => {
  let perPage = 10;
  let page = req.query.page || 1;
  try {
    const ads = await Ads.find({})
      .sort({ updatedAt: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate({ path: "location", select: ["address", "ward", "district", "method"] })
      .exec();

    const count = await Ads.count();
    res.render("district/ads/index", {
      ads,
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
    const ads = await Ads.findOne({ _id: req.params.id })
    .populate({ path: "location", select: ["address", "ward", "district", "method"] })
    .exec();

    res.render("district/ads/detail", {
      ads
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateInfo = (req, res) => {
  res.render("district/ads/update_info");
};

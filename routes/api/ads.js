const express = require('express');
const {Location} = require('../../models/Location');
const {Ads} = require('../../models/Ads');
const Proposal = require('../../models/Proposal');
const District = require('../../models/District');
const Enum = require('../../models/Enum');
const upload = require('../../middleware/multer');
const uploadFile = require('../../utils/fileUpload');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const ads = await Ads.find({}).exec();
    return res.json(ads);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/get-detail', async (req, res) => {
  try {
    const ads = await Ads.find({}).populate('location').exec();
    return res.json(ads);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get('/get-detail/:location_id', async (req, res) => {
  const locationID = req.params.location_id;
  try {
    const ads = await Ads.find({ location: locationID })
      .populate('location')
      .exec();
    return res.json(ads);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

function generateRandomDate(from, to) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
}

// router.get('/test' ,async (req, res) => {
//   try {
//     // console.log(req.files);
//     // const urls = []
//     // for(let file of req.files) {
//     //   const url = await uploadFile(`adhubpro/ads`, file);
//     //   urls.push(url);
//     // }
//     // console.log(urls);
//     const ads = await Ads.find({}).exec();
//     // const types = [
//     //   'Trụ bảng hiflex',
//     //   'Trụ màn hình điện tử LED',
//     //   'Trụ hộp đèn',
//     //   'Bảng hiflex ốp tường',
//     //   'Màn hình điện tử ốp tường',
//     //   'Trụ treo băng rôn dọc',
//     //   'Trụ treo băng rôn ngang',
//     //   'Trụ/Cụm pano',
//     //   'Cổng chào',
//     //   'Trung tâm thương mại'
//     // ];
    
//     for(let ad of ads) {
//       // const type = types[Math.floor(Math.random() * types.length)];
//       // const size = '2.5m x 10m';
//       await Ads.findByIdAndUpdate(ad.id, {effective: generateRandomDate(new Date(2023, 1, 1), new Date(2023, 11, 1))}).exec();
//     }
//     return res.send("SUCCESS")
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });

// router.get("/test2", async (req, res) => {
//   try {
//     const availableType = [
//       'Tố giác sai phạm',
//       'Đăng ký nội dung',
//       'Đóng góp ý kiến',
//       'Giải đáp thắc mắc'
//     ];

//     const new_enum = new Enum({
//       name: 'ReportMethod',
//       values: availableType
//     });
//     await new_enum.save();
//     // for(let i = 1; i <= 14; ++i) {
//     //   district.wards.push(i.toString());
//     // }
//     // const locations = await Location.find({}).exec();
//     // for (let loc of locations) {
//     //   const adscount = await Ads.count({ location: loc._id })
//     //   await Location.findByIdAndUpdate(loc._id, { ads_count: adscount });
//     // }
//     // const proposals = await Proposal.find({}).exec();
//     // for (let pro of proposals) {
//     //   await Proposal.findByIdAndUpdate(pro._id, {
//     //     location: pro.updated_ads.location
//     //   });
//     // }
//     // await Proposal.updateMany({}, {status: 'pending'})
//     // for(let location of locations) {
//     //   // const type = types[Math.floor(Math.random() * types.length)];
//     //   // const size = '2.5m x 10m';
//     //   await Ads.findOneAndDelete(
//     //     { location: location.id }
//     //   ).exec();
//     // }
//     return res.status(200).send("DONE");
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// })
module.exports = router;
const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    images: [
      {
        type: String
      }
    ],
    expiration: {
      type: Date
    }
  },
  {
    collection: 'ads',
    virtuals: {
      id: {
        get() {
          return this._id;
        }
      }
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

//Export the model
module.exports = mongoose.model('Ads', adsSchema);

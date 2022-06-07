const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String },

  password: { type: String },

  api_key: { type: String },
  api_url: { type: String },
  sender_id: { type: Object },
  providerName: { type: String },
  providerIcon: { type: String },
  template: { type: Object },
});

schema.set("toJSON", {
  virtuals: true,

  versionKey: false,

  transform: function (doc, ret) {
    // remove these props when object is serialized

    delete ret._id;
  },
});

module.exports = mongoose.model("Sms", schema);

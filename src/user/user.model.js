const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String },

  password: { type: String },

  appName: { type: String },

  sender_id: { type: Object },

  template: { type: Object },
  provider: { type: mongoose.Schema.Types.ObjectId },
});

schema.set("toJSON", {
  virtuals: true,

  versionKey: false,

  transform: function (doc, ret) {
    // remove these props when object is serialized

    delete ret._id;
  },
});

module.exports = mongoose.model("UserModel", schema);

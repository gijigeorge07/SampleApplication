const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String },

  password: { type: String },
});

schema.set("toJSON", {
  virtuals: true,

  versionKey: false,

  transform: function (doc, ret) {
    // remove these props when object is serialized

    delete ret._id;
  },
});

module.exports = mongoose.model("User", schema);

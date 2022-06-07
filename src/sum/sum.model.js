const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  a: { type: Number },
  b: { type: Number },
  sum: { type: Number },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // remove these props when object is serialized
    delete ret._id;
  },
});

module.exports = mongoose.model("Sum", schema);

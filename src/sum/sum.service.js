const errorHandler = require("../../_helper/error.handler");
const db = require("../../_helper/db");
module.exports = {
  sum,
  listsum,
  updatesum,
  deletesum,
};
async function sum(req, res, next) {
  try {
    var { num1, num2 } = req.body;
    console.log(num1 + num2);
    var err = {};
    if (!num1) {
      err.message = "num1 parameter is missing";
      err.status = 400;
    }
    if (!num2) {
      err.message = "num2 parameter is missing";
      err.status = 400;
    }

    if (err.message) return errorHandler(err, req, res, next);
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    const sum = num1 + num2;
    console.log(sum);
    const addSum = await new db.Sum({
      num1,
      num2,
      sum,
    }).save();

    res.json({ status: true, message: "Value Added Successfull", data: sum });
  } catch (e) {
    next(e);
  }
}
async function listsum(req, res, next) {
  const sum = await db.Sum.find();

  if (sum.length > 0) {
    res.json({
      status: true,
      message: "Values Fetched Successfull",
      data: sum,
    });
  } else {
    res.json({ status: false, message: "No data found" });
  }
}
async function updatesum(req, res, next) {
  const { num1, num2, sum, id } = req.body;

  const updatesum = await db.Sum.findByIdAndUpdate(
    id,

    {
      num1,
      num2,
      sum,
    },

    { new: true }
  );

  if (updatesum != null) {
    res.json({
      status: true,
      message: "Value Updated Successfull",
      data: updatesum,
    });
  } else {
    res.json({ status: false, message: "Value Not Updated" });
  }
}
async function deletesum(req, res, next) {
  var { id } = req.body;

  let sum = await db.Sum.findOne({ _id: id });

  if (sum != null) {
    await db.Sum.deleteOne({ _id: id });

    res.json({ status: true, message: "Sum Deleted Successfully" });
  } else {
    res.json({ status: false, message: "Sum ID Not exist" });
  }
}

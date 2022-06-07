const errorHandler = require("../../_helper/error.handler");
const db = require("../../_helper/db");

module.exports = {
  create,
  listUser,
  updateUser,
  deleteUser,
};

async function create(req, res, next) {
  try {
    var { username, password, appName, sender_id, template, provider } =
      req.body;

    // console.log(username);
    var err = {};

    if (!username) {
      err.message = "username parameter is missing";
      err.status = 400;
    }
    if (!password) {
      err.message = "password parameter is missing";
      err.status = 400;
    }
    if (!appName) {
      err.message = "apiName parameter is missing";
      err.status = 400;
    }

    if (!sender_id) {
      err.message = "sender_id parameter is missing";
      err.status = 400;
    }

    if (!template) {
      err.message = "  template parameter is missing";
      err.status = 400;
    }
    if (!provider) {
      err.message = "provider parameter is missing";
      err.status = 400;
    }
    if (err.message) return errorHandler(err, req, res, next);

    const addUser = await new db.UserModel({
      username,
      password,
      appName,
      sender_id,
      template,
      provider,
    }).save();

    res.json({ status: true, message: "Value Added Successfully", addUser });
  } catch (e) {
    next(e);
  }
}

async function listUser(req, res, next) {
  const user = await db.UserModel.find();

  if (user.length > 0) {
    res.json({
      status: true,
      message: "Values Fetched Successfully",
      data: user,
    });
  } else {
    res.json({ status: false, message: "No data found" });
  }
}

async function updateUser(req, res, next) {
  const { username, password, appName, sender_id, template, provider, id } =
    req.body;

  const updateUser = await db.UserModel.findByIdAndUpdate(
    id,

    {
      username,
      password,
      appName,
      sender_id,
      template,
      provider,
    },

    { new: true }
  );

  if (updateUser != null) {
    res.json({
      status: true,
      message: "Value Updated Successfully",
      data: updateUser,
    });
  } else {
    res.json({ status: false, message: "Value Not Updated" });
  }
}

async function deleteUser(req, res, next) {
  var { id } = req.body;

  let user = await db.UserModel.findOne({ _id: id });

  if (user != null) {
    await db.UserModel.deleteOne({ _id: id });

    res.json({ status: true, message: "User Deleted Successfully" });
  } else {
    res.json({ status: false, message: "User ID Not exist" });
  }
}

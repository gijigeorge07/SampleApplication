const errorHandler = require("../../_helper/error.handler");
const db = require("../../_helper/db");

module.exports = {
  create,
  listSms,
  updateSms,
  deleteSms,
};

async function create(req, res, next) {
  try {
    var {
      username,
      password,
      api_key,
      api_url,
      sender_id,
      providerName,
      providerIcon,
      template,
    } = req.body;

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
    if (!api_key) {
      err.message = "api_key parameter is missing";
      err.status = 400;
    }
    if (!api_url) {
      err.message = "api_url parameter is missing";
      err.status = 400;
    }
    if (!sender_id) {
      err.message = "sender_id parameter is missing";
      err.status = 400;
    }
    if (!providerName) {
      err.message = "providerName parameter is missing";
      err.status = 400;
    }
    if (!providerIcon) {
      err.message = " providerIcon parameter is missing";
      err.status = 400;
    }
    if (!template) {
      err.message = "  template parameter is missing";
      err.status = 400;
    }

    if (err.message) return errorHandler(err, req, res, next);

    const addSms = await new db.Sms({
      username,
      password,
      api_key,
      api_url,
      sender_id,
      providerName,
      providerIcon,
      template,
    }).save();

    res.json({ status: true, message: "Value Added Successfully", addSms });
  } catch (e) {
    next(e);
  }
}

async function listSms(req, res, next) {
  const sms = await db.Sms.find();

  if (sms.length > 0) {
    res.json({
      status: true,
      message: "Values Fetched Successfully",
      data: sms,
    });
  } else {
    res.json({ status: false, message: "No data found" });
  }
}

async function updateSms(req, res, next) {
  const {
    username,
    password,
    api_key,
    api_url,
    sender_id,
    providerName,
    providerIcon,
    template,
    id,
  } = req.body;

  const updateSum = await db.Sms.findByIdAndUpdate(
    id,

    {
      username,
      password,
      api_key,
      api_url,
      sender_id,
      providerName,
      providerIcon,
      template,
    },

    { new: true }
  );

  if (updateSum != null) {
    res.json({
      status: true,
      message: "Value Updated Successfully",
      data: updateSum,
    });
  } else {
    res.json({ status: false, message: "Value Not Updated" });
  }
}

async function deleteSms(req, res, next) {
  var { id } = req.body;

  let sms = await db.Sms.findOne({ _id: id });

  if (sms != null) {
    await db.Sms.deleteOne({ _id: id });

    res.json({ status: true, message: "Sms Deleted Successfully" });
  } else {
    res.json({ status: false, message: "Sms ID Not exist" });
  }
}

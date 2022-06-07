const errorHandler = require("../../_helper/error.handler");
const db = require("../../_helper/db");

const fib = async (req, res, next) => {
  try {
    const { n } = req.body;

    let n1 = 0,
      n2 = 1,
      nextTerm;
    var err = {};
    if (!n) {
      err.message = "n parameter is missing";
      err.status = 400;
    }

    if (err.message) return errorHandler(err, req, res, next);

    var fib = [];
    for (let i = 1; i <= n; i++) {
      fib.push({ value: `${n1}` });
      nextTerm = n1 + n2;
      n1 = n2;
      n2 = nextTerm;
    }
    const addFib = await new db.Fib({
      n,
      fib,
    }).save();
    res.json({ status: true, message: "Value Added Successfully", data: fib });
  } catch (e) {
    // res.json(error);
    next(e);
  }
};

async function listfib(req, res, next) {
  const fib = await db.Fib.find();

  if (fib.length > 0) {
    res.json({
      status: true,
      message: "Values Fetched Successfull",
      data: fib,
    });
  } else {
    res.json({ status: false, message: "No data found" });
  }
}

async function updatefib(req, res, next) {
  const { n, fib, id } = req.body;

  const updatefib = await db.Fib.findByIdAndUpdate(
    id,

    {
      n,
      fib,
    },

    { new: true }
  );

  if (updatefib != null) {
    res.json({
      status: true,
      message: "Value Updated Successfull",
      data: updatefib,
    });
  } else {
    res.json({ status: false, message: "Value Not Updated" });
  }
}

async function deletefib(req, res, next) {
  var { id } = req.body;

  let fib = await db.Fib.findOne({ _id: id });

  if (fib != null) {
    await db.Fib.deleteOne({ _id: id });

    res.json({ status: true, message: "Fibonacci Deleted Successfully" });
  } else {
    res.json({ status: false, message: "Fibonacci ID Not exist" });
  }
}

module.exports = {
  fib,
  listfib,
  updatefib,
  deletefib,
};

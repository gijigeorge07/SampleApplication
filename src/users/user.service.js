const { generateJwtToken } = require("../../_helper/helper");
const errorHandler = require("../../_helper/error.handler");

const db = require("../../_helper/db");

module.exports = {
  login,
};

async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    var err = {};

    if (!username) {
      err.message = "username  is missing";

      err.status = 400;
    }

    if (!password) {
      err.message = "password  is missing";

      err.status = 400;
    }

    if (err.message) return errorHandler(err, req, res, next);

    const user = await db.User.findOne({
      $or: [{ username, password }],
    });

    if (user != null) {
      if (user.username) {
        const jwtToken = generateJwtToken(user);

        res.json({
          status: true,
          message: "Login Successfully",
          access_token: jwtToken,
          user: user,
        });
      } else {
        res.json({ status: false, message: "invalid username/password" });
      }
    } else {
      res.json({ status: false, message: "invalid username/password" });
    }
  } catch (e) {
    next(e);
  }
}

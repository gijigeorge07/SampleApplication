const jwt = require("jsonwebtoken");
const { secret } = require("../config.json");
const errorHandler = require("../_helper/error.handler");
module.exports = authorize;

function authorize() {
  return [
    async (req, res, next) => {
      const authHeader = req.headers["authorization"];
      // console.log("auth header "+authHeader.split(" "));
      const token = authHeader && authHeader.split(" ")[1];
      //console.log(token);
      if (!token) {
        var err = {};
        err.status = 401;
        err.message = "Access Token is Missing";
        errorHandler(err, req, res, next);
        return;
        // return res.status(401).json({ message: "Unauthorized" });
      }

      jwt.verify(token, secret, (err, user) => {
        if (err) {
          var err = {};
          err.status = 401;
          err.message = "Invalid Access Token";
          errorHandler(err, req, res, next);
          return;
        } else {
          req.user = user;
          next();
        }
      });
    },
  ];
}

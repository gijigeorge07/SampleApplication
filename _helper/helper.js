const jwt = require("jsonwebtoken");
const config = require("../config.json");

module.exports = {
  generateJwtToken,
};

function generateJwtToken(user) {
  // create a jwt token containing the user id that expires in 1 day
  return jwt.sign({ user: user }, config.secret, {
    expiresIn: "7d",
  });
}

const config = require("../config.json");

const mongoose = require("mongoose");

mongoose.connect(config.connectionString).then(() => {
  console.log("Database Connected");
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../src/users/users.model"),

  Sum: require("../src/sum/sum.model"),
  Fib: require("../src/fibonacci/fibonacci.model"),

  Sms: require("../src/sms/sms.model"),

  UserModel: require("../src/user/user.model"),

  isValidId,
};

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const sumController = require("./src/sum/sum.controller");
const fibonacciController = require("./src/fibonacci/fibonacci.controller");
const smsController = require("./src/sms/sms.controller");
const userController = require("./src/user/user.controller");

app.use(express.json());
app.use(bodyParser.json());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use("/v1/users", require("./src/users/users.controller"));
app.use("/v1/sum", sumController);
app.use("/v1/fibonacci", fibonacciController);
app.use("/v1/sms", smsController);
app.use("/v1/user", userController);

var port = 8000;
app.set("port", port);
var server = http.createServer(app);
server.listen(port);

console.log("application is running on port " + port);

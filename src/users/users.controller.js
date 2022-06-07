const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const authorize = require("../../_middleware/authorize");

router.post("/loginUser", userService.login);

module.exports = router;

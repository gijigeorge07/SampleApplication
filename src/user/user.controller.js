const express = require("express");
const router = express.Router();
const authorize = require("../../_middleware/authorize");
const userService = require("../user/user.services");

router.post("/create", authorize(), userService.create);

router.get("/listUser", authorize(), userService.listUser);
router.post("/updateUser", authorize(), userService.updateUser);
router.post("/deleteUser", authorize(), userService.deleteUser);

module.exports = router;

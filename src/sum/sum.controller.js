const express = require("express");
const router = express.Router();
const authorize = require("../../_middleware/authorize");
const sumService = require("./sum.service");

router.post("/sum", authorize(), sumService.sum);
router.get("/listsum", authorize(), sumService.listsum);
router.post("/updatesum", authorize(), sumService.updatesum);
router.post("/deletesum", authorize(), sumService.deletesum);
module.exports = router;

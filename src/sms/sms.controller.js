const express = require("express");
const router = express.Router();
const authorize = require("../../_middleware/authorize");
const smsService = require("../sms/sms.service");

router.post("/create", authorize(), smsService.create);

router.get("/listsms", authorize(), smsService.listSms);
router.post("/updateSms", authorize(), smsService.updateSms);
router.post("/deleteSms", authorize(), smsService.deleteSms);

module.exports = router;

const express = require("express");
const router = express.Router();
const fibonacciService = require("./fibonacci.Service");

const authorize = require("../../_middleware/authorize");

router.post("/fib", authorize(), fibonacciService.fib);
router.get("/listfib", authorize(), fibonacciService.listfib);
router.post("/updatefib", authorize(), fibonacciService.updatefib);
router.post("/deletefib", authorize(), fibonacciService.deletefib);

module.exports = router;

const express = require("express");
const cors = require('cors')

const router = express.Router();

router.use(cors());

const {
  getAllCurrencies,
} = require("../helpers/currencyScrapper/currency_finder");
const {
  updateChart
} = require('../helpers/currencyScrapper/chartData')





router.get("/", getAllCurrencies);
router.get('/chart-data', updateChart)
module.exports = router;

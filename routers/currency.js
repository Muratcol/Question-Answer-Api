const express = require("express");
const cors = require('cors')

const router = express.Router();

router.use(cors());

const {
  getAllCurrencies,
} = require("../helpers/currencyScrapper/currency_finder");

router.get("/", getAllCurrencies);

module.exports = router;

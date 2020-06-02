const express = require("express");
const router = express.Router();


const {
  getAllCurrencies,
} = require("../helpers/currencyScrapper/currency_finder");

router.get("/", getAllCurrencies);

module.exports = router;

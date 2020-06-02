const express = require("express");
const router = express.Router();
const { allowAccess } = require('../middlewares/allow_access/corsAllow')

const {
  getAllCurrencies,
} = require("../helpers/currencyScrapper/currency_finder");

router.get("/", allowAccess, getAllCurrencies);

module.exports = router;

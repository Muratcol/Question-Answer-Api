const express = require('express');
const path = require('path');
const {Scrapping} = require('../helpers/currencyScrapper/currency_finder');


const router = express.Router();


router.get("/", Scrapping);






module.exports = router;
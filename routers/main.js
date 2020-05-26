const express = require('express');
const path = require('path');
const {Scrapping} = require('../helpers/currencyScrapper/currency_finder');
const {homePage} = require('../controllers/home')

const router = express.Router();


router.get("/", homePage);






module.exports = router;
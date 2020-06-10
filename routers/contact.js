const express = require("express");
const cors = require('cors')
const {
    saveContactForm,
  } = require("../controllers/contact");
const router = express.Router();

router.use(cors());



router.post("/", saveContactForm);

module.exports = router;

const express = require('express');
const {register, errorTest} = require('../controllers/auth')
// api/auth will come here 


const router = express.Router();

router.post("/register", register);
router.get('/error', errorTest);

module.exports = router;
const express = require('express');
const question = require('./question');
const auth = require('./auth');
const user = require('./user');
const admin = require('./admin');
const answer = require('./answer');


const router = express.Router();

router.use("/questions", question);
router.use("/auth", auth);
router.use("/users", user);
router.use("/admin", admin);
router.use('/answer', answer);


module.exports = router;
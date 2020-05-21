const express = require('express');
const {register, getUser, login, logout, imageUpload, forgotPassword, resetpassword} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/auth')
const profileImageUpload = require('../middlewares/libraries/profileImageUpload')
// api/auth will come here 


const router = express.Router();
// router.post("URL", MIDDLEWARE, CONTROLLER)
router.post("/register", register);
router.get('/profile', getAccessToRoute, getUser);
router.post('/login', login);
router.get('/logout', getAccessToRoute, logout);
router.post('/upload', [getAccessToRoute, profileImageUpload.single("profile_image")], imageUpload);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword', resetpassword)
module.exports = router;
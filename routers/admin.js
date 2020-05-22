const express = require('express');
const {getAccessToRoute, getAdminAccess} = require('../middlewares/authorization/auth');
const {blockUser, deleteUser} = require('../controllers/admin')
const {checkUserExist} = require('../middlewares/database/databaseErrorHelpers')
const router = express.Router();
// Block User




router.use([getAccessToRoute, getAdminAccess]); //Using this 2 middlewares all admin process

router.get("/block/:id", checkUserExist, blockUser);
router.delete('/delete/:id', checkUserExist, deleteUser)
router.use(checkUserExist);











module.exports = router;
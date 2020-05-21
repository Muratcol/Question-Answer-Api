const User = require("../models/users");
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');


const getSingleUser = asyncErrorWrapper(async (req, res, next) => {
    user = req.data;
    return res.status(200)
    .json({
        success:true,
        data: user
    });
});

const getAllUsers = asyncErrorWrapper(async (req, res, next) => {
    const users = await User.find()
    
    return res.status(200)
    .json({
        success:true,
        data: users
    });
});


module.exports = {
    getSingleUser,
    getAllUsers
}
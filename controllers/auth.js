const User = require('../models/users')
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers')
// A better error handler then try-catch (express-async-handler)
const register = asyncErrorWrapper(async (req, res, next) => {
    //Post Data
    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });       
    sendJwtToClient(user, res); // User and res sended to cookie
});

const getUser = (req, res , next) => {
    res.send({
        success: true,
        data: {
            id : req.user.id,
            name: req.user.name
        }
    });
};

module.exports = {
    register,
    getUser
};
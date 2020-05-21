const User = require('../models/users')
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers')
const {validateUserInput, comparePassword} = require('../helpers/inputs/inputHelpers')
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

// Login Function
const login = asyncErrorWrapper(async(req, res, next) => {
    const {email, password} = req.body;
    if (!validateUserInput(email, password)) return next(new CustomError("Please check your inputs", 400))
    const user = await User.findOne({email}).select("+password");
    if (!comparePassword(password, user.password)) return next(new CustomError("Authorization Failed. Check your inputs", 400))

    sendJwtToClient(user, res);

});

const logout = asyncErrorWrapper(async(req, res, next) => {
    const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env;

    return res.status(200)
    .cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false: true
    }).json({
        success: true,
        message: "Logout Succesfull"
    });
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

const imageUpload = asyncErrorWrapper(async(req, res, next) => {
    res.status(200)
    .json({
        success: true,
        message: "Image upload succesfull"
    })
});


module.exports = {
    register,
    getUser,
    login,
    imageUpload,
    logout
};
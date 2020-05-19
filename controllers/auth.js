const User = require('../models/users')
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')

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
        const token = user.generateJwtFromUser();
        console.log(token);

 

        res
        .status(200)
        .json({
            success: true,
            data : user
        })
});


const errorTest = (req, res, next) => {
    //Question doesn't exist
    return next(new TypeError())
    // return next(new Error("Program explode"));
}







module.exports = {
    register,
    errorTest
};
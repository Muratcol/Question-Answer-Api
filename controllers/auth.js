const User = require('../models/users')
const CustomError = require('../helpers/error/CustomError')
const register = async (req, res, next) => {
    //Post Data
    const name = "Murat Coly";
    const email = "lock.ddd@gmail.com";
    const password = "1233456"

    //async await

    try {
        const user = await User.create({
            name,
            email,
            password
        });
        res
        .status(200)
        .json({
            success: true,
            data : user
        })
    }
    catch (err) {
        return next(err);
    }


};

const errorTest = (req, res, next) => {
    //Question doesn't exist
    return next(new SyntaxError())
    // return next(new Error("Program explode"));
}







module.exports = {
    register,
    errorTest
};
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const {sendJwtToClient} = require('../helpers/authorization/tokenHelpers');
const {validateUserInput, comparePassword} = require('../helpers/inputs/inputHelpers');
const sendEmail = require('../helpers/libraries/sendEmail');
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
    if (!comparePassword(password, user.password)) return next(new CustomError("Please check your inputs", 400))

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

    //Updating DB user profile image field
    const user = await User.findByIdAndUpdate(req.user.id, {
        "profile_image" : req.savedProfileImage
    }, {
        // This 2 fields creating a new user and deleting old one. Also running validators
        new : true,
        runValidators: true
    });
    res.status(200)
    .json({
        success: true,
        message: "Image upload succesfull",
        data: user
    })
});

const forgotPassword = asyncErrorWrapper(async(req, res, next) => {
    const resetEmail = req.body.email;

    const user = await User.findOne({email: resetEmail});
    if (!user) return next(new CustomError("There is no such a user with this email.", 400));
    const resetPasswordToken = user.getResetPasswordTokenFromUser();
    await user.save();

    const resetPasswordUrl = `http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`

    const emailTemplate = `
        <h3>Reset Your Password </h3>
        <p> This <a href = ${resetPasswordUrl} target= '_blank'</a> will expire in 1 hour </p>
    `;

    try {
        await sendEmail({
            from: process.env.DB_USER,
            to: resetEmail,
            subject: "Reset your password",
            html: emailTemplate
        });
        res.status(200)
        .json({
            success: true,
            message: "Token sent to your email"
        });
    }
    catch (err) {
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return next(new CustomError("Email could not be sent", 500))
    }
})


const resetpassword = asyncErrorWrapper(async(req, res, next) => {

    const {resetPasswordToken} = req.query;
    const {password} = req.body;

    if(!resetPasswordToken) return next(new CustomError("Please provide a valid token", 400));
    let user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()} //MongoDb $gt (greater than) special function. 
    });

    if(!user) return next(new CustomError("Invalid token or session expired", 404))

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();

    return res.status(200)
    .json({
        success :  true,
        message : "Reset success"
    })

})
// User details update
const editDetails = asyncErrorWrapper(async(req, res, next) => {
    const editInformation = req.body;
    console.log(editInformation)
    // const {authorization} = req.body;
    const user = await User.findByIdAndUpdate ( req.user.id, editInformation, {
        new: true,
        runValidators: true
    });
    await user.save()

    return res.status(200)
    .json({
        success :  true,
        message : "Data update succesfull"
    });
});


module.exports = {
    register,
    getUser,
    login,
    imageUpload,
    logout,
    forgotPassword,
    resetpassword,
    editDetails
};
const User = require('../../models/users');
const Question = require('../../models/Question')
const CustomError = require('../../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');


const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    
    const user = await User.findById(id);

    if(!user) return next(new CustomError("There is no such an user with that id", 400))

    req.data = user;
    next();
});

const checkQuestionExist = asyncErrorWrapper(async (req, res, next) => {
    
    const {id} = req.params;
    
    const question = await Question.findById(id);

    if(!question) return next(new CustomError("There is no such a question with that id", 400))

    req.data = question;
    next();
})









module.exports = {
    checkUserExist,
    checkQuestionExist
}
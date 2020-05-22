const Question = require('../models/Question');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');


const askNewQuestion = asyncErrorWrapper( async (req, res, next) => {
    const information = req.body;

    const question = await Question.create({
        ...information, //... is spread operator. Exact as "title: information.title"
        user: req.user.id
    });

    res.status(200)
    .json({
        success:true,
        data:question
    })
});
const getAllQuestions = asyncErrorWrapper( async (req, res, next) => {
    const allQuestions = await Question.find();

    if (allQuestions.length === 0) return next(new CustomError("There is no question in database yet", 404)) 

    res.status(200)
    .json({
        success:true,
        data:allQuestions
    })






})

module.exports = {
    askNewQuestion,
    getAllQuestions
}
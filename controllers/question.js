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
    return res.status(200)
    .json(res.queryResults)
});

const getOneQuestion = asyncErrorWrapper( async (req, res, next) => {

    return res.status(200)
    .json(res.queryResults)
});

const editQuestion = asyncErrorWrapper( async (req, res, next) => {

    let information = req.body;
    const {id} = req.params;

    const question = await Question.findByIdAndUpdate(id, information, {
        new:true,
        runValidators:true
    });

    await question.save();

    return res.status(200)
    .json({
        success: true,
        message: "Update Succesfull"
    })
});

const deleteQuestion = asyncErrorWrapper( async (req, res, next) => {
    const {id} = req.params;
    const question = await Question.findById(id);
    await question.remove();

    return res.status(200)
    .json({
        success:true,
        message: "Question deleted from database"
    });
});

const likeQuestion = asyncErrorWrapper( async (req, res, next) => {
    const {id} = req.params;
    const question = await Question.findById(id);
    if (question.likes.includes(req.user.id)) {

        let index = question.likes.indexOf(req.user.id);
        question.likes.splice(index, 1);
        questions.likesCounter = question.likes.length;
        await question.save();

        return res.status(200)
        .json({
            success: true,
            message: "Question Unliked"
    });
    }
    else {
        
        question.likes.push(req.user.id);
        questions.likesCounter = question.likes.length;
        await question.save();

        return res.status(200)
        .json({
            success: true,
            message: "Question Liked"
        });

    };

});





module.exports = {
    askNewQuestion,
    getAllQuestions,
    getOneQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion
}
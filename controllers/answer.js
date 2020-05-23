const Answer = require('../models/Answer');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../helpers/error/CustomError');


const answerToQuestion = asyncErrorWrapper(async (req, res, next) =>{
    
    const {content} = req.body;
    const {id} = req.params;

    const answer = await Answer.create({
        content,
        user: req.user.id,
        question: id
    });
    return res.status(200)
    .json({
        success:true,
        data:answer
    });
});


const editAnswer = asyncErrorWrapper( async (req, res, next) => {

    let information = req.body;
    const {answerid} = req.params;

    const answer = await Answer.findByIdAndUpdate(answerid, information, {
        new:true,
        runValidators:true
    });

    await answer.save();

    return res.status(200)
    .json({
        success: true,
        message: "Update Succesfull"
    });
});

const deleteAnswer = asyncErrorWrapper(async (req, res, next) => {
    const {answerid} = req.params;
    const answer = await Answer.findById(answerid);
    await answer.remove();
    return res.status(200)
    .json({
        success: true,
        message: "Delete Succesfull"
    });
});

const likeAnswer = asyncErrorWrapper(async (req, res, next) => {
    const {answerid} = req.params;
    const answer = await Answer.findById(answerid);
    if (answer.likes.includes(req.user.id)) {
        let index = answer.likes.indexOf(req.user.id);
        answer.likes.splice(index, 1);
        await answer.save();

        return res.status(200)
        .json({
            success: true,
            data: answer.likes
        });
    }
    else {
        answer.likes.push(req.user.id);
        await answer.save();
        return res.status(200)
        .json({
            success: true,
            data: answer.likes
        });
    }
});

const getAllAnswers = asyncErrorWrapper(async (req, res, next) => {
    const {id} = req.params;
    const answers = await Answer.find({
        question: id
    });
    if (answers.length === 0) return next(new CustomError("There's no answer for this question yet", 404))

    return res.status(200)
        .json({
            success: true,
            data: answers
        });

});





module.exports = {
    answerToQuestion,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    getAllAnswers
};
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
    const populate = true;
    const populateObject = {
        path: "user",
        select: "name profile_image"
        
    };
    let query = Question.find();
    if (req.query.search) {
        const searchObject = {};
        const regex = new RegExp(req.query.search, "i");
        searchObject["title"] = regex;
        query = query.where(searchObject);         
    }

    //Populate function. This is complicated
    if (populate) {
        query.populate(populateObject)
    }
        //Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page-1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = await Question.countDocuments();
    if (startIndex > 0) {
        pagination.previous = {
            page: page-1,
            limit: limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page+1,
            limit: limit
        }
    }

    query = query.skip(startIndex).limit(limit);

    const questions = await query;
    if (questions.length === 0) return next(new CustomError("There is no question in database yet", 404))
    return res.status(200)
    .json({
        success:true,
        count: questions.length,
        pagination: pagination,
        data: questions
    })
});

const getOneQuestion = asyncErrorWrapper( async (req, res, next) => {

    const question = req.data;

    return res.status(200)
    .json({
        success: true,
        data: question
    })
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
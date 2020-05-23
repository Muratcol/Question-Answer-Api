const express = require('express');
// const Answer = require('../models/Answer');
const {answerToQuestion, editAnswer, deleteAnswer} = require('../controllers/answer');
const {getAccessToRoute, getAnswerOwnerAccess} = require('../middlewares/authorization/auth');


const router = express.Router();

router.post('/:id', getAccessToRoute, answerToQuestion);
router.put('/:id/:answerid/edit', [getAccessToRoute, getAnswerOwnerAccess], editAnswer);
router.delete('/:id/:answerid/delete', [getAccessToRoute, getAnswerOwnerAccess], deleteAnswer)







module.exports = router;
const express = require('express');
// const Answer = require('../models/Answer');
const {answerToQuestion, editAnswer, deleteAnswer, likeAnswer, getAllAnswers} = require('../controllers/answer');
const {getAccessToRoute, getAnswerOwnerAccess} = require('../middlewares/authorization/auth');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');

const router = express.Router();

router.post('/:id', getAccessToRoute, answerToQuestion);
router.put('/:id/:answerid/edit', [getAccessToRoute, getAnswerOwnerAccess], editAnswer);
router.delete('/:id/:answerid/delete', [getAccessToRoute, getAnswerOwnerAccess], deleteAnswer);
router.get('/:id/:answerid/like', getAccessToRoute, likeAnswer);
router.get('/:id', getAllAnswers);
router.use(checkQuestionExist);






module.exports = router;
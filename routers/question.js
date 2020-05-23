const express = require('express');
const {askNewQuestion, getAllQuestions, getOneQuestion, editQuestion, deleteQuestion, likeQuestion} = require("../controllers/question");
const {getAccessToRoute, getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers');
// const answer = require('./answer')



const router = express.Router();

// router.use("/:id/answer", answer) I could use answer router here with {mergeParams:true}


router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getOneQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);



module.exports = router;
const express = require('express');
const {askNewQuestion, getAllQuestions, getOneQuestion, editQuestion, deleteQuestion, likeQuestion} = require("../controllers/question");
const {getAccessToRoute, getQuestionOwnerAccess} = require('../middlewares/authorization/auth');
const {checkQuestionExist} = require('../middlewares/database/databaseErrorHelpers')
// api/questions route will come here.


const router = express.Router();

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", getAllQuestions);
router.get("/:id", checkQuestionExist, getOneQuestion);
router.put("/:id/edit", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], editQuestion);
router.delete("/:id/delete", [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess], deleteQuestion);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
// export {router as questionRouter}

module.exports = router;
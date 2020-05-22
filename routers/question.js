const express = require('express');
const {askNewQuestion, getAllQuestions} = require("../controllers/question");
const {getAccessToRoute} = require('../middlewares/authorization/auth');
// api/questions route will come here.


const router = express.Router();

router.post("/ask", getAccessToRoute, askNewQuestion);
router.get("/", getAllQuestions)
// export {router as questionRouter}

module.exports = router;
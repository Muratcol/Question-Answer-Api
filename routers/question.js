const express = require('express');
const {getAllQuestions} = require("../controllers/question")
// api/questions route will come here.


const router = express.Router();

router.get("/", getAllQuestions)

// export {router as questionRouter}

module.exports = router;
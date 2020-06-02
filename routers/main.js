const express = require('express');

const router = express.Router();
// Block User



router.get("", (req,res) => {
    res.send(
        `<h3>Welcome to the Currency API</h3>`
    )
});












module.exports = router;

const express = require('express');
const { Scrapping } = require('../helpers/currencyScrapper/currency_finder')
const router = express.Router();
// Block User



router.get("/", (req,res) => {
    const data = Scrapping()
    return res
    .status(200)
    .json({
        success: true,
        data: data[0].name
    }
    )
});


module.exports = router;



// const sendJwtToClient = (user, res) =>{
//     //Generate JWT
//     const token = user.generateJwtFromUser();

//     const {JWT_COOKIE, NODE_ENV} = process.env;
//     return res
//     .status(200)
//     .cookie('access_token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
//         secure : NODE_ENV === "development" ? false: true //if we are on development phase, "work only https" = false, else true
//     })
//     .json({
//         success: true,
//         access_token: token,
//         data: {
//             name: user.name,
//             email: user.email
//         }
//     });
// };
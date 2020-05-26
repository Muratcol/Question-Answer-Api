
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');

const homePage = asyncErrorWrapper(async (req, res, next) => {
   
    res.status(200)
    .render('home/home')

});



// res.status(200)
// .render('home/home', {bigdata: bigdata})




module.exports = {
    homePage,
};
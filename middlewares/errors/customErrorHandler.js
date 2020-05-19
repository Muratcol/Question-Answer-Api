// Error Handling
const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if (err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400);
    }
    if (err.name === "MongoError") {
        customError = new CustomError(err.message, 400);
    }
    console.log(customError.message, customError.status)
    res
    .status(400)
    .json({
        success: false
    })
}

module.exports = customErrorHandler;
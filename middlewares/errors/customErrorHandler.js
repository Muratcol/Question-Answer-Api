// Error Handling
const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if (err.name === "SyntaxError") {
        customError = new CustomError("Unexpected Syntax", 400);
    }
    if (err.code === 11000) {
        customError = new CustomError("Duplicate Key Found: Check Your Input", 400);
    }
    console.log(customError.message, customError.status)
    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message || "Internal server error"
    })
}

module.exports = customErrorHandler;
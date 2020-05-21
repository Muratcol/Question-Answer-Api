const bcrypt = require('bcryptjs')
const validateUserInput = (email, password) => {
    return email && password
};

const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
    validateUserInput,
    comparePassword
};
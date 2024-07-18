const bcrypt = require('bcryptjs');

function validPassword(typedPassword, userPassword) {
    return bcrypt.compareSync(typedPassword, userPassword);
}

module.exports = {
    validPassword 
};

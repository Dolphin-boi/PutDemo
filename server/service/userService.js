const bcrypt = require('bcrypt')
async function compareUserPassword(user,password){
    const compare = await bcrypt.compare(password, user.password);
    return compare
}
module.exports = {
    compareUserPassword
}
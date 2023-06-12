const bcrypt = require('bcrypt')
async function compareUserPassword(user,password){
    const compare = await bcrypt.compare(password, user.password);
    return compare
}
async function hashUserPassword(password){
    const hashPassword = await bcrypt.hash(password,10)
    return hashPassword
}
module.exports = {
    compareUserPassword,hashUserPassword
}
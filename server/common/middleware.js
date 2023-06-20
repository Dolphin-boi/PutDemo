const { errorRes } = require('./response')


function notFound (req, res, _) {
  return errorRes(res, 'no routes ', 'you are lost.', 404)
}
function unHandleError(err,req,res,next){
    console.log(err)
  return errorRes(res,err,'unHandle error',400)
}
function onlyAdmin (req, res, next) {
  if (req.user.type === 'admin')
    return next()
  return invalidToken(req, res)
}

function notOnlyMember (req, res, next) {
  if (req.user.type === 'member')
    return invalidToken(req, res)
  return next()
}

async function userAuthorize(req, res, next) {
  const token = req.cookies.jwt;
  const payload = await jwtDecode(token);
  if (payload.role == "user") {
    next();
  } else {
    return errorRes(res,null,"only user can use",403)
  }
}
 function Authorize(role) {// may change to array of role  if its admin check tel and address if null error
   return async(req,res,next)=>{
  // const token = req.cookies.jwt;
  // const payload = await jwtDecode(token);
  //const roleArray = role.split(',')
  const roleArray = role
  let hasMatchRole = false 
  roleArray.forEach(element => {
    if(req.user.dataValues.user_type == element){
      hasMatchRole = true
    }
  })
  if (hasMatchRole) {
    next();
  } else {
    return errorRes(res,"only "+role+" can use","only "+role+" can use",403)
  }
 }
}
async function checkUserPasswordExpire(req,res,next){
  const expireDate = new Date(req.user.dataValues.password_expire_date)
  const currDate = new Date()
  if (currDate<expireDate){
    next()
  }else{
    return errorRes(res,"password expire","please update password",403)
  }
}
function invalidToken (req, res) {
  const errMsg = 'INVALID TOKEN'
  const userText = JSON.stringify(req.user)
  const err = `${errMsg} ERROR - user: ${userText}, IP: ${req.ip}`
  return errorRes(res, err, errMsg, 401)
}

module.exports = { notFound, onlyAdmin, notOnlyMember, userAuthorize ,Authorize , unHandleError,checkUserPasswordExpire}
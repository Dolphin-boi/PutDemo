const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require("config");
const SECRET = config.get("SECRET_KEY");
const passport = require("passport")
const joi = require("joi")

const { errorRes, successRes } = require("../common/response");
const db = require("../db");
const {user} = db;
const {hashUserPassword,compareUserPassword} = require("../service/userService")
//add change password api
//need username and old password to change
//must has admin path to change password without old password
const addUserSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
})
const changePasswordSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  oldPassword: joi.string().required()

})
router
    .post('/login', (req, res, next) => { // add return user name and role
        passport.authenticate(
          'local',
          {session: false},
          async (err, user, info) => {
            if (err) return errorRes(res,err)
            if (user) {
              //console.log(user)
              const payload = {user_id: user.user_id}
              const token = jwt.sign(payload, SECRET, {
                expiresIn: '3d',
              })
            //   const userData = await UserModel.find({email: user.email}).populate({
            //     path: 'donationHistory',
            //     populate: {
            //       path: 'book',
            //       model: 'books',
            //       populate: {
            //         path: 'bookShelf',
            //         model: 'bookshelves',
            //       },
            //     },
            //   })
              return res
                .status(200)
                .json({message: 'login success', token:token,userInfo:user})
            } else {
              return res.status(422).json(info)
            }
          }
        )(req, res, next)
      })
      .put('/changePassword',async (req,res)=>{
        try {
          const value = await changePasswordSchema.validateAsync(req.body)
          const bodyInfo = value
          const user_name = bodyInfo.username
          const oldPassword = bodyInfo.oldPassword
          const hashPassword = await hashUserPassword(bodyInfo.password)
          const userObj = await user.findOne({where:{user_name}})
          if(!userObj){
            return errorRes(res,"user not found")
          }else{
            const isOldEqual = await compareUserPassword(userObj,oldPassword)
            const isNewEqual = await compareUserPassword(userObj,bodyInfo.password)
            if (!isOldEqual){
              return errorRes(res,"old password not match")
            }
            if(isNewEqual){
              return errorRes(res,'using old password')
            }
            const currDate = new Date()
            const newDate = new Date(currDate.setMonth(currDate.getMonth()+3));
            userObj.password_expire_date = newDate
            userObj.password = hashPassword
            userObj.save()
            return successRes(res,"password has change")
          }

        } catch (error) {
          errorRes(res,error)
        }
      })
      .post('/addUser',async(req,res)=>{
        try {
          const value = await addUserSchema.validateAsync(req.body)
          const bodyInfo = value
          const user_name = bodyInfo.username
          const password = await hashUserPassword(bodyInfo.password)
          const currDate = new Date()
          const expDate = new Date(currDate.setMonth(currDate.getMonth()+3));
          userData = {}
          userData.user_name = user_name
          userData.password = password
          userData.password_expire_date = expDate
          const userObj = await user.create({...userData})
          userObj.password = null
          return successRes(res, userObj);
        } catch (error) {
          return errorRes(res,error)
        }
      })

module.exports = router;
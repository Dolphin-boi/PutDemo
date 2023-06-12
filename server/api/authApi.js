const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require("config");
const SECRET = config.get("SECRET_KEY");
const passport = require("passport")

const { errorRes, successRes } = require("../common/response");
const db = require("../db");
const {user} = db;
const {hashUserPassword} = require("../service/userService")
//add change password api
//need username and old password to change
//must has admin path to change password without old password
router
    .post('/login', (req, res, next) => {
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
                .json({message: 'login success', token:token})
            } else {
              return res.status(422).json(info)
            }
          }
        )(req, res, next)
      })
      .put('/changePassword',async (req,res)=>{
        try {
          const bodyInfo = req.body
          const user_name = bodyInfo.username
          const hashPassword = await hashUserPassword(bodyInfo.password)
          const userObj = await user.findOne({where:{user_name}})
          if(!userObj){
            errorRes(res,"user not found")
          }else{
            const currDate = new Date()
            const newDate = new Date(currDate.setMonth(currDate.getMonth()+3));
            userObj.password_expire_date = newDate
            userObj.password = hashPassword
            userObj.save()
            successRes(res,"password has change")
          }

        } catch (error) {
          errorRes(res,error)
        }

        
      })

module.exports = router;
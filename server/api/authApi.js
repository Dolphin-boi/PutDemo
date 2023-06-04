const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require("config");
const SECRET = config.get("SECRET_KEY");
const passport = require("passport")

const { errorRes, successRes } = require("../common/response");
const db = require("../db");
const {user} = db;

router
    .post('/login', (req, res, next) => {
        passport.authenticate(
          'local',
          {session: false},
          async (err, user, info) => {
            if (err) return errorRes(res,err)
            if (user) {
              console.log(user)
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

module.exports = router;
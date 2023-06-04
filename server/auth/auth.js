const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const passportJwt  = require('passport-jwt')
const JWTStrategy = passportJwt.Strategy


const config = require("config");
const SECRET = config.get("SECRET_KEY");

const db = require('../db')
const {user} = db
const {compareUserPassword} = require('../service/userService')

passport.use(
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, cb) => {
        try {
          const userObj = await user.findOne( { where:{ user_name:username } } )
  
          if (!userObj) {
            return cb(null, false, {message: 'User not found'})
          }
          
          const comparePass = (str1,str2) => {
            return str1==str2
          }
          const validate = comparePass(userObj.password,password)
          //const validate = await compareUserPassword(userObj,password)
  
          if (!validate) {
            return cb(null, false, {message: 'Wrong Password'})
          }
  
          return cb(null, userObj, {message: 'Logged in Successfully'})
        } catch (error) {
          return cb(error)
        }
      }
    )
  )
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET
    },
    async (jwtPayload, cb) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.

      const userId = jwtPayload.user_id
      try {
        const userObj = await user.findByPk(2)
        if (userObj){
          return cb(null, userObj)
        }else{
          const errorMessage = 'This user is not available';
          const errorResponse = { error: errorMessage };
          return cb(null, false, errorResponse);
        }
      } catch (err) {
        return cb(err)
      }
    }
  )
)
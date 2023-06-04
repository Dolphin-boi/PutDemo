const express = require("express");
const cors = require("cors")
const config = require('config')
const dbConfig = config.get('dbConfig')
const passport = require('passport')

const authApi = require("./api/authApi")
const coilApi = require("./api/coilApi")
const statusApi = require("./api/statusApi")
const coatingApi = require("./api/coatingApi")
const locationApi = require("./api/locationApi")
const metalTypeApi = require("./api/metalTypeApi")
const sfApi = require("./api/sfApi")
const temperApi = require("./api/temperApi")
const vendorApi = require("./api/vendorApi")


process.env.TZ = 'Asia/Bangkok'
const app = express();
const Sequelize = require("sequelize");
const db = require('./db');
const { vendor, coating } = require("./db");
const {coil,metalType} = db

const {notFound,unHandleError} = require('./common/middleware')
// const sequelize = new Sequelize(
//   dbConfig.db_Name,
//   dbConfig.db_UserName,
//   dbConfig.db_Password,
//   {
//     host: dbConfig.db_Host,
//     dialect: 'mysql'
//   }
// );
// sequelize.authenticate().then(() => {
//   console.log('Connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database: ', error);
// });
db.sequelize.authenticate()
.then(() => {
  console.log('Database connection established');
})
.catch((error) => {
  console.error('Unable to connect to the database:', error);
});

db.sequelize.sync()
  .then(() => {
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Error synchronizing models:', error);
  });
require('./auth/auth');

app
  .use(cors("*"))
  .use(express.json())
  .use('/api/coil',coilApi)
  .use('/api/status',passport.authenticate('jwt',{session:false}),statusApi)
  .use('/api/coating',coatingApi)
  .use('/api/location',locationApi)
  .use('/api/metalType',metalTypeApi)
  .use('/api/sf',sfApi)
  .use('/api/temper',temperApi)
  .use('/api/vendor',vendorApi)
  .use('/api/auth',authApi)
  //.use(unHandleError)
  .use(notFound)
app.get("/test", async (req,res) => {
    info = await coil.findAll({include:[
      { model:metalType , 
       // attributes: ['name','vendorID'] , 
        include:[ {model:vendor} ] 
      }
    ]})
    res.json(info)
})

const port = 8080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


const express = require("express");
const config = require('config')
const dbConfig = config.get('dbConfig')
const coilApi = require("./api/coilApi")
const statusApi = require("./api/statusApi")
process.env.TZ = 'Asia/Bangkok'
const app = express();
const Sequelize = require("sequelize");
const db = require('./db');
const { vendor } = require("./db");
const {coil,metalType} = db
db.sequelize.sync();
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
app
  .use(express.json())
  .use('/api/coil',coilApi)
  .use('/api/status',statusApi)
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


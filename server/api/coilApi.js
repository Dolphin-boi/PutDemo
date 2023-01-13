const express = require("express")
const router = express.Router()
const {errorRes,successRes} = require('../common/response')
const config = require('config')
const dbConfig = config.get('dbConfig.db_Name')
const db = require('../db');
const {coil,metalType,vendor} = db

router
    .get("/",async (req,res) => {
        const data = await coil.findAll({include:[
            { model:metalType , 
             // attributes: ['name','vendorID'] , 
              include:[ {model:vendor} ] 
            }
          ]})
        successRes(res,data)
    })

module.exports = router; 
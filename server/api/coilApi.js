const express = require("express")
const router = express.Router()
const {errorRes,successRes} = require('../common/response')
const config = require('config')
const dbConfig = config.get('dbConfig.db_Name')
router
    .get("/",(req,res) => {successRes(res,dbConfig)})

module.exports = router; 
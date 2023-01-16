const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { metalType,vendor } = db;

router
  .get("/", async (req, res) => {
    try {
      const data = await metalType.findAll({
        include:[
            {
                model:vendor,
                required:true
            }
        ]
      });
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newmetalType = await metalType.create({...bodyInfo})
        const newmetalTypeFullData = await metalType.findByPk(newmetalType.metalTypeID,{
            include:[
                {
                    model:vendor,
                    required:true
                }
            ]
          })
        successRes(res, newmetalTypeFullData);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const metalTypeID = req.params.id
        req.body.metalTypeID = null
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await metalType.update({...bodyInfo},{ where:{metalTypeID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newmetalType = await metalType.findByPk(metalTypeID,{
            include:[
                {
                    model:vendor,
                    required:true
                }
            ]
          })
        successRes(res, {newmetalType,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const metalTypeID = req.params.id
        const newmetalType = await metalType.destroy({where:{metalTypeID}})
        let deleteStatus = "delete metalType success"
        if(newmetalType == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

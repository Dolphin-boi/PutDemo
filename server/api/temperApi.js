const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { temper } = db;

router
  .get("/", async (req, res) => {
    try {
      const data = await temper.findAll();
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newtemper = await temper.create({...bodyInfo})
        successRes(res, newtemper);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const temperID = req.params.id
        req.body.temperID = null
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await temper.update({...bodyInfo},{ where:{temperID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newtemper = await temper.findByPk(temperID)
        successRes(res, {newtemper,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const temperID = req.params.id
        const newtemper = await temper.destroy({where:{temperID}})
        let deleteStatus = "delete temper success"
        if(newtemper == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

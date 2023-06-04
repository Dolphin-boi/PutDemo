const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { status } = db;

router
  .get("/", async (req, res) => {
    console.log(req.user)
    try {
      const data = await status.findAll();
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newStatus = await status.create({...bodyInfo})
        successRes(res, newStatus);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const statusID = req.params.id
        req.body.statusID = statusID
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await status.update({...bodyInfo},{ where:{statusID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newStatus = await status.findByPk(statusID)
        successRes(res, {newStatus,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const statusID = req.params.id
        const newStatus = await status.destroy({where:{statusID}})
        let deleteStatus = "delete status success"
        if(newStatus == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

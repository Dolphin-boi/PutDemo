const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { status } = db;

router
  .get("/", async (req, res) => {
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
        const bodyInfo = req.body
        await status.update({...bodyInfo},{ where:{statusID}})
        const newStatus = await status.findByPk(statusID)
        successRes(res, newStatus);
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
            deleteStatus = "this status already delete"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

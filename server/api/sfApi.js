const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { sf } = db;

router
  .get("/", async (req, res) => {
    try {
      const data = await sf.findAll();
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newsf = await sf.create({...bodyInfo})
        successRes(res, newsf);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const sfID = req.params.id
        req.body.sfID = sfID
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await sf.update({...bodyInfo},{ where:{sfID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newsf = await sf.findByPk(sfID)
        successRes(res, {newsf,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const sfID = req.params.id
        const newsf = await sf.destroy({where:{sfID}})
        let deleteStatus = "delete sf success"
        if(newsf == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { vendor } = db;

router
  .get("/", async (req, res) => {
    try {
      const data = await vendor.findAll();
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newvendor = await vendor.create({...bodyInfo})
        successRes(res, newvendor);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const vendorID = req.params.id
        req.body.vendorID = vendorID
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await vendor.update({...bodyInfo},{ where:{vendorID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newvendor = await vendor.findByPk(vendorID)
        successRes(res, {newvendor,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const vendorID = req.params.id
        const newvendor = await vendor.destroy({where:{vendorID}})
        let deleteStatus = "delete vendor success"
        if(newvendor == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

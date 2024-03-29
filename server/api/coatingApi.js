const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const db = require("../db");
const { coating } = db;

router
  .get("/", async (req, res) => {
    try {
      const data = await coating.findAll();
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newCoating = await coating.create({...bodyInfo})
        successRes(res, newCoating);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const coatID = req.params.id
        req.body.coatID = coatID
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await coating.update({...bodyInfo},{ where:{coatID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newCoating = await coating.findByPk(coatID)
        successRes(res, {newCoating,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const coatID = req.params.id
        const newCoating = await coating.destroy({where:{coatID}})
        let deleteStatus = "delete status success"
        if(newCoating == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

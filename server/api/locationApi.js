const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const db = require("../db");
const { location } = db;

router
  .get("/", async (req, res) => {
    try {
      const data = await location.findAll();
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }
  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newLocation = await location.create({...bodyInfo})
        successRes(res, newLocation);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const locationID = req.params.id
        req.body.locationID = locationID
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await location.update({...bodyInfo},{ where:{locationID}})
        if(isUpdate == 0){
          updateStatus = "data not change"
        }
        const newLocation = await location.findByPk(locationID)
        successRes(res, {newLocation,updateStatus});
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const locationID = req.params.id
        const newLocation = await location.destroy({where:{locationID}})
        let deleteStatus = "delete location success"
        if(newLocation == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

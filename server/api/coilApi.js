const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { coil, metalType, vendor ,status } = db;

router
  .get("/", async (req, res) => {
    try {
      const filterData = req.query;
      const filterObj = {};
      const vendorFilterObj = {};
      if (filterData.status) {
        filterObj.statusID = filterData.status;
      }
      if (filterData.vendor) {
        vendorFilterObj.vendorID = filterData.vendor;
      }
  
      if (filterData.metalType) {
        filterObj.typeID = filterData.metalType;
        //console.log(filterObj.typeID);
      }
      const data = await coil.findAll({
        include: [
          {
            model: metalType,
            required: true,
            // attributes: ['name','vendorID'] ,
            include: [
              {
                model: vendor,
                required: true,
                where: {
                  ...vendorFilterObj,
                },
              },
            ],
          },
          {
            model: status,
            required: true
          }
        ],
        where: { ...filterObj },
      });
      successRes(res, data);
    } catch (error) {
      errorRes(res,error)
    }

  })
  .post("/",async (req,res) => {
    try {
        const bodyInfo = req.body
        const newCoil = await coil.create({...bodyInfo})
        successRes(res, newCoil);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        const coilID = req.params.id
        const bodyInfo = req.body
        await coil.update({...bodyInfo},{ where:{coilID}})
        //add status success or not 
        const newStatus = await coil.findByPk(coilID)
        successRes(res, newStatus);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .delete("/:id",async (req,res) => {
    try {
        const coilID = req.params.id
        const newStatus = await coil.destroy({where:{coilID}})
        let deleteStatus = "delete coil success"
        if(newStatus == 0 ){
            deleteStatus = "do not has this id"
        }
        successRes(res,deleteStatus)
    } catch (error) {
        errorRes(res,error)
    }
  })
module.exports = router;

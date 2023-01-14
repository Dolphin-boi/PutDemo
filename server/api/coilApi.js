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
  .post("/");
module.exports = router;

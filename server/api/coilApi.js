const express = require("express");
const router = express.Router();
const { errorRes, successRes } = require("../common/response");
const config = require("config");
const dbConfig = config.get("dbConfig.db_Name");
const db = require("../db");
const { coil, metalType, vendor } = db;

router.get("/", async (req, res) => {
  const filterData = req.query;
  const filterObj = {};
  if (filterData.status) {
    filterObj.statusID = filterData.status;
  }
  // if(filterData.vendor){
  //     filterObj.vendorID = filterData.vendor
  // }

  if (filterData.metalType) {
    console.log(filterData.metalType)
    filterObj.typeID = filterData.metalType;
    console.log(filterObj.typeID)
  }
  const data = await coil.findAll({
    include: [
      {
        model: metalType,
        // attributes: ['name','vendorID'] ,
        include: [{ model: vendor }],
      },
    ],where: {...filterObj}
  });
  successRes(res, data);
});

module.exports = router;

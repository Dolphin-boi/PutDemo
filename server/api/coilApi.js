const express = require("express");
const router = express.Router();
const joi = require("joi")

const { errorRes, successRes } = require("../common/response");
const db = require("../db");
const { coil, metalType, vendor ,status } = db;
//sarup raiduen

// add extract coil api
const postSchema = joi.object({
  name: joi.string().required()
})
const splitWeightSchema = joi.object({
  coilID: joi.number().required(),
  weights: joi.array().items(joi.number().greater(0).required()).min(2).required()
})
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
      if (filterData.month && filterData.year){
        filterObj.updateTime = {
          [db.Sequelize.Op.and]: [
            db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('updateTime')),filterData.month),
            db.sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('updateTime')),filterData.year)
          ]
        }
      }else if (filterData.month) {
        //filterObj.updateTime = db.sequelize.literal(`MONTH(updateTime) = ${filterData.month}`);
        filterObj.updateTime = db.sequelize.where(db.sequelize.fn('MONTH', db.sequelize.col('updateTime')),filterData.month);
      }else if (filterData.year) {
        filterObj.updateTime = db.sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('updateTime')),filterData.year);
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
        const value = await postSchema.validateAsync(req.body)
        const bodyInfo = value
        // find coil where name and weight if repeat return id 
        const newCoil = await coil.create({...bodyInfo})
        const newCoilFullData = await coil.findByPk(newCoil.coilID,{
          include: [
            {
              model: metalType,
              required: true,
              // attributes: ['name','vendorID'] ,
              include: [
                {
                  model: vendor,
                  required: true,
                }
              ]
            },
            {
              model: status,
              required: true
            }
          ]
        })
        successRes(res, newCoilFullData);
    } catch (error) {
        errorRes(res,error)
    }
  })
  .put("/:id",async (req,res) => {
    try {
        if (Object.keys(req.body).length === 0){
          return errorRes(res,"no data")
        } 
        const coilID = req.params.id
        req.body.coilID = coilID
        const bodyInfo = req.body
        let updateStatus = "update success"
        const isUpdate = await coil.update({...bodyInfo},{ where:{coilID}})
        if(isUpdate == 0){
          updateStatus = "coil data not change"
        }
        //add status success or not 
        const newCoil = await coil.findByPk(coilID,{
          include: [
            {
              model: metalType,
              required: true,
              // attributes: ['name','vendorID'] ,
              include: [
                {
                  model: vendor,
                  required: true,
                }
              ]
            },
            {
              model: status,
              required: true
            }
          ]
        })
        successRes(res, {newCoil,updateStatus});
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
  .post("/splitWeight",async(req,res)=>{
    const t = await db.sequelize.transaction();
    try { //may be error if has id 
      const value = await splitWeightSchema.validateAsync(req.body)
      const bodyInfo = value
      const coilObj = await coil.findByPk(bodyInfo.coilID)
      if (!coilObj){
        return errorRes(res,"coil not found")
      }
      let allWeight = 0
      bodyInfo.weights.forEach(element => {
        allWeight += element
      });
      if (allWeight != coilObj.weight){
        return errorRes(res,"weights is not balance")
      }
      await coil.destroy({where:{coilID:coilObj.coilID},transaction:t})
      const coilPlain = coilObj.get({plain:true})
      for (const element of bodyInfo.weights) {
        coilPlain.coilID = undefined
        coilPlain.weight = element
        await coil.create({...coilPlain},{transaction:t})
      }
      await t.commit();
      return successRes(res,"split success")
    } catch (error) {
      await t.rollback()
      errorRes(res,error)
    }
  })
module.exports = router;

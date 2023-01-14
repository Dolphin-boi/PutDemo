const config = require("config");
const dbConfig = config.get("dbConfig");
const { Sequelize } = require("sequelize");

//อันนี้เป็นส่วนที่ใช้ในการบอก Sequelize ว่าเราจะ connect ไปที่ไหน
const sequelize = new Sequelize(
  dbConfig.db_Name,
  dbConfig.db_UserName,
  dbConfig.db_Password,
  {
    host: dbConfig.db_Host,
    dialect: "mysql",
    define: {
      timestamps: false, //ส่วนตรงนี้ก็เป็นการตั้งค่าเพิ่มเติม
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation นะครับ
db.coil = require("./models/coilModel")(sequelize, Sequelize);
db.metalType = require("./models/metalTypeModel")(sequelize, Sequelize);
db.vendor = require("./models/vendorModel")(sequelize, Sequelize);
db.status = require("./models/statusModel")(sequelize, Sequelize);

//ส่วนนี้เป็นการตั้งต่า relation นะครับ โดยเป็นการบอกว่าใน 1 team มีได้หลาย player ง่ายๆ ก็คือ relation แบบ 1:M
db.metalType.hasMany(db.coil, {
  foreignKey: { name: "typeID", field: "typeID" },
});

//ส่วนนี้เป็นการตั้ง relation แบบกลับกันกับด้านบน จริงแล้วเราไม่ตั้งก็ได้นะครับแต่ผมแนะนำให้ตั้งเอาไว้ เพราะเวลาที่เราไม่ได้ใส่
//line นี้จะทำให้เราสามารถใช้  team ในการหา player ได้อย่างเดียวและไม่สามารถใช้ player หา team ได้
db.coil.belongsTo(db.metalType, { foreignKey: "typeID" });

db.vendor.hasMany(db.metalType, {
    foreignKey: { name: "vendorID", field: "vendorID" },
  });
db.metalType.belongsTo(db.vendor, { foreignKey: "vendorID" });

db.status.hasMany(db.coil,{
  foreignKey:{name:'statusID',field:'statusID'}
});
db.coil.belongsTo(db.status,{ foreignKey: 'statusID'});


module.exports = db;
module.exports = ( sequelize , Sequelize ) => {
    const coil = sequelize.define(
      'coil',
      {
  // ด้านล่างเป็นการตั้งค่า attribute ของ table นะครับ
  // ชื่อตัวแปรที่เราใช้เรียกแทน: { type: Sequelize.STRING(50), allowNull: false, field: 'ชื่อของ attribute' } 
  // สามารถใส่ option เพิ่มเติมได้นะครับเช่น primaryKey: true อะไรแบบนี้ 
  // แล้วก็อันนี้สำคัญ ** ไม่จำเป็นต้องสร้าง attribute ที่เป็น FK จาก table อื่นนะครับ เพราะเราจะไปกำหนด relation กันใน file index
          coilID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'coilID' },
          name: { type: Sequelize.STRING, allowNull: true, field: 'name' },
          thickness: { type: Sequelize.FLOAT, allowNull: true, field: 'thickness' },
          width : { type: Sequelize.FLOAT, allowNull: true, field: 'width' },
          length : { type: Sequelize.FLOAT, allowNull: true, field: 'length' },
          weight : { type: Sequelize.FLOAT, allowNull: true, field: 'weight' },
          createTime: { type: Sequelize.DATE , allowNull: true, field: 'createTime' },
          updateTime: { type: Sequelize.DATE , allowNull: true, field: 'updateTime' },
      },
      {
        timestamps:true,
        createdAt:'createTime',
        updatedAt:'updateTime',
        tableName: 'coil' 
      }
    );
    
    return coil;
  }
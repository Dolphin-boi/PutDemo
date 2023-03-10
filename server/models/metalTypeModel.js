module.exports = ( sequelize , Sequelize ) => {
    const metalType = sequelize.define(
      'metaltype',
      {
          typeID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'typeID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
      },
      {
          tableName: 'metaltype' 
      }
    );
    
    return metalType;
  }
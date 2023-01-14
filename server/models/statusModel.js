module.exports = ( sequelize , Sequelize ) => {
    const status = sequelize.define(
      'status',
      {
          statusID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'statusID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
          //vendorID: {type: Sequelize.INTEGER ,references:'vendor',referencesKey:'vendorID'}
      },
      {
          tableName: 'status' 
      }
    );
    
    return status;
  }
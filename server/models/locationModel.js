module.exports = ( sequelize , Sequelize ) => {
    const location = sequelize.define(
      'location',
      {
          locationID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'locationID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
          //vendorID: {type: Sequelize.INTEGER ,references:'vendor',referencesKey:'vendorID'}
      },
      {
          tableName: 'location' 
      }
    );
    
    return location;
  }
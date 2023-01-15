module.exports = ( sequelize , Sequelize ) => {
    const sf = sequelize.define(
      'sf',
      {
          sfID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'sfID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
          //vendorID: {type: Sequelize.INTEGER ,references:'vendor',referencesKey:'vendorID'}
      },
      {
          tableName: 'sf' 
      }
    );
    
    return sf;
  }
module.exports = ( sequelize , Sequelize ) => {
    const coating = sequelize.define(
      'coating',
      {
          coatID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'coatID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
          //vendorID: {type: Sequelize.INTEGER ,references:'vendor',referencesKey:'vendorID'}
      },
      {
          tableName: 'coating' 
      }
    );
    
    return coating;
  }
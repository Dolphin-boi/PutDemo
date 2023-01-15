module.exports = ( sequelize , Sequelize ) => {
    const temper = sequelize.define(
      'temper',
      {
          temperID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'temperID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
          //vendorID: {type: Sequelize.INTEGER ,references:'vendor',referencesKey:'vendorID'}
      },
      {
          tableName: 'temper' 
      }
    );
    
    return temper;
  }
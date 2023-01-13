module.exports = ( sequelize , Sequelize ) => {
    const vendor = sequelize.define(
      'vendor',
      {
          vendorID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'vendorID' },
          name: { type: Sequelize.STRING, allowNull: false, field: 'name' },
          contact: { type: Sequelize.STRING, allowNull: true, field: 'contact' },
          email: { type: Sequelize.STRING, allowNull: true, field: 'email' },
          address: { type: Sequelize.STRING, allowNull: true, field: 'address' },
      },
      {
          tableName: 'vendor' 
      }
    );
    
    return vendor;
  }
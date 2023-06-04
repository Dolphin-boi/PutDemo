module.exports = ( sequelize , Sequelize ) => {
    const user = sequelize.define(
      'user',
      {
          user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id' },
          user_name: { type: Sequelize.STRING, allowNull: false, field: 'user_name' },
          password: { type: Sequelize.STRING, allowNull: false, field: 'password' },
          user_type: { type: Sequelize.TINYINT, allowNull: true, field: 'user_type' },
      },
      {
          tableName: 'user' 
      }
    );
    
    return user;
  }
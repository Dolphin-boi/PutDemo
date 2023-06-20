module.exports = ( sequelize , Sequelize ) => {
    const user = sequelize.define(
      'user',
      {
          user_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id' },
          user_name: { type: Sequelize.STRING, allowNull: false,unique: true, field: 'user_name' },
          password: { type: Sequelize.STRING, allowNull: false, field: 'password' },
          user_type: { type: Sequelize.TINYINT, allowNull: false, field: 'user_type' },// 1 = admin 2 = user
          password_expire_date: {type: Sequelize.DATEONLY,allowNull: false, field: 'password_expire_date' }
      },
      {
          tableName: 'user' 
      }
    );
    
    return user;
  }
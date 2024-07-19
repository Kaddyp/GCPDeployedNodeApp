const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');

class UserModel extends Model {}
UserModel.init(
  {
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    repeatPassword: {
      type: DataTypes.STRING,
    }  
  },
  { sequelize, modelName: 'user' }
);

module.exports = UserModel;
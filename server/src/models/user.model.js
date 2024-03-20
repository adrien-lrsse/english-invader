const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mail: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    pseudo: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'USERS',
    timestamps: false
  });

  return User;
};

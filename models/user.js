'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // primaryKey: true
    },
    email: { //이메일 컬럼을 고유키로 두고, email 양식이 맞는지 확인하는 validate 추가
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
      type: DataTypes.STRING
    }
  });
  user.removeAttribute('id');
  return user;
};



const mysql = require("mysql");



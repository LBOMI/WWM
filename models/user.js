'use strict';
module.exports = (sequelize, DataTypes) => {

  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { 
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



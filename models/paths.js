'use strict';

module.exports = (sequelize, DataTypes) => {
    var paths = sequelize.define('paths', {
      start: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      end: { 
        type: DataTypes.STRING
      },
      // searchRoute: {
      //   type: DataTypes.STRING
      // }
      // findTrails:{
      //   type: DataTypes.STRING,
      //   defaultValue: '1'
      // }
      
    }, { timestamps: false});
  
    return paths;
  };

  const mysql = require("mysql");
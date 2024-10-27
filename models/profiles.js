'use strict';

module.exports = (sequelize, DataTypes) => {
    var profiles = sequelize.define('profiles', {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
      
      },
      introduce: { 
        type: DataTypes.STRING,
        
      },
      // searchRoute: {
      //   type: DataTypes.STRING
      // }
      // findTrails:{
      //   type: DataTypes.STRING,
      //   defaultValue: '1'
      // }
      
    }, { timestamps: false});
  
    return profiles;
  };

  const mysql = require("mysql");
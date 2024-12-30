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
      sppb: { 
        type: DataTypes.STRING
      },
      s_altitude: { 
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
  
      
    }, { timestamps: false});
  
    return paths;
  };

  const mysql = require("mysql");

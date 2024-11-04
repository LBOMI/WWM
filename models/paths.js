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
        // primaryKey: true
      }
      // findTrails:{
      //   type: DataTypes.STRING,
      //   defaultValue: '1'
      // }
      
    }, { timestamps: false});
  
    // paths.associate = models => {
    //   paths.hasMany(models.user, {foreignKey: null, targetKey: "name"});
    // };

    return paths;
  };

  const mysql = require("mysql");
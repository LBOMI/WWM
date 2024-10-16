'use strict';

module.exports = (sequelize, DataTypes) => {
    var preferences = sequelize.define('preferences', {
      name: {
        type: DataTypes.STRING,
     
        primaryKey: true
      },
      age: { 
        type: DataTypes.STRING
    
        
      },
      city: {
        type: DataTypes.STRING
      },
      healthcondition:{
        type: DataTypes.STRING
      },
      exerciseTime:{
        type: DataTypes.STRING
      }
    //   score:{
    //     type: DataTypes.STRING,
    //     defaultValue: 'score',
    //     allowNull: false
    //   }
    });
  
    return preferences;
  };

  const mysql = require("mysql");
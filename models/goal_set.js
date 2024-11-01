'use strict';

module.exports = (sequelize, DataTypes) => {
    var goal_set = sequelize.define('goal_set', {
      goal: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
      
    });
    
    return goal_set;
  };

  const mysql = require("mysql");
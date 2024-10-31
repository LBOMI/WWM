'use strict';

module.exports = (sequelize, DataTypes) => {
    var goal_set = sequelize.define('goal_set', {
      goal: {
        type: DataTypes.STRING,
        primaryKey: true,
      
      },
      
    }, { timestamps: false});
    
    return goal_set;
  };

  const mysql = require("mysql");
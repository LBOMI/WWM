'use strict';

module.exports = (sequelize, DataTypes) => {
    var profile = sequelize.define('profile', {
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
    profile.associate = models => {
      profile.belongsTo(models.user, {foreignKey: "name", targetKey: "name"});
    };
    return profile;
  };

  const mysql = require("mysql");
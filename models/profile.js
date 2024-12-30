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
    }, { timestamps: false});
    profile.associate = models => {
      profile.belongsTo(models.user, {foreignKey: "name", targetKey: "name"});
    };
    return profile;
  };

  const mysql = require("mysql");

'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // getFullName() {
    //   return [this.firstName, this.lastName].join(' ');
    // }
  }

  User.init({
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    longitude: { 
      type: DataTypes.FLOAT,
      allowNull: false
    },
    latitude: { 
      type: DataTypes.FLOAT,
      allowNull: false 
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: { type: DataTypes.STRING },
    password: { 
      type: DataTypes.VIRTUAL,
      validate: {
        isLongEnough: (val) => {
          if (val.length < 7) {
            throw new Error("Please choose a longer password");
          }
        },
      },
    },
    message: { 
      type: DataTypes.STRING,
      allowNull: false 
    },
    recommendation: { type: DataTypes.STRING },
    traveledTo: { 
      type: DataTypes.STRING
    },
    wishListCities: { type: DataTypes.STRING },

  },

   {
    sequelize,
    modelName: 'user'
  });

  User.associate = (models) => {
    // associations can be defined here
  };

  User.beforeSave((user, options) => {
    if(user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
    }
  });

  return User;
};
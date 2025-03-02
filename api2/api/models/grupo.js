'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grupo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
     
    }
  }
  grupo.init({
    nm_grupo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'grupo',
  });
  return grupo;
};
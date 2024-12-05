'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     //as associações não funcionam como deveriam, preciso encontrar
     //forma de associa-las da maneira correta.
    static associate(models) {
      tipo.hasMany(models.permissao);
      
    }
  }
  tipo.init({
    nm_tipo: DataTypes.STRING,
    cd_permissao: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tipo',
  });
  return tipo;
};
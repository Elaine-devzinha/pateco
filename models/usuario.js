'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usuario.init({
    nm_usuario: DataTypes.STRING,
    dt_usuario: DataTypes.DATE,
    ct_email: DataTypes.STRING,
    pw_usuario: DataTypes.STRING,
    ds_tipo: DataTypes.STRING,
    ic_verificado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usuario',
  });
  return usuario;
};
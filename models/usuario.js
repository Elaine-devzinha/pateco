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
    ct_email: {
      type:DataTypes.STRING,
      allowNull:false,
      isEmail:true,
      unique:true
    },
    pw_usuario: {
      type:DataTypes.STRING,
      allowNull:false
    },
    ds_tipo: {
      type:DataTypes.STRING,
      defaultValue:'cliente'  
    },
    ic_verificado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usuario',
  });

  return usuario;
};
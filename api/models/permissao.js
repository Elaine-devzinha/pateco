'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     //as associações não funcionam como deveriam, preciso encontrar
     //forma de associa-las da maneira correta.
    static associate(models) {
      permissao.belongsTo(models.tipo, { foreignKey: 'cd_permissao' });
    }
    }
  
  permissao.init({
    vl_permissao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissao',
  });
  return permissao;
};
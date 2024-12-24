'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class funcao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //funcao.pertenceAVarios ( permissao, {
      //    UsandoATabelaDeJunção: funcao_permissao
      //    comAChaveEstrangeira: cd_funcao
      //}
      funcao.belongsToMany(models.permissao, {
        through: 'funcao_permissao', 
        foreignKey: 'cd_funcao'
      });
    }
  }
  funcao.init({
    vl_funcao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'funcao',
  });
  return funcao;
};
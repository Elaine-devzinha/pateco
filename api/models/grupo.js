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
      //grupo.pertenceAVarios ( usuarios , {
      //    UsandoATabelaDeJunção: usuario_grupo
      //    comAChaveEstrangeira: cd_grupo
      //}
      grupo.belongsToMany(models.usuario, {
        through: 'usuario_grupo', 
        foreignKey: 'cd_grupo'
      });
      grupo.belongsTo(models.funcao, {
        foreignKey: 'cd_funcao'
      });
    }
  }
  grupo.init({
    nm_grupo: DataTypes.STRING,
    cd_funcao: {
      type: DataTypes.INTEGER,
      references: {
        model: 'funcoes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'grupo',
  });
  return grupo;
};
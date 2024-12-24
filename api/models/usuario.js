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
      //usuario.pertenceAVarios ( grupos , {
      //    UsandoATabelaDeJunção: usuario_grupo
      //    comAChaveEstrangeira: cd_usuario
      //}
      usuario.belongsToMany(models.grupo, {
        through: 'usuario_grupo', 
        foreignKey: 'cd_usuario'
      });
    }
  }
    usuario.init({
      nm_usuario: DataTypes.STRING,
      ct_email: DataTypes.STRING,
      pw_usuario: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'usuario',
      scopes:{
        defaultScope:{
          attributes: { exclude: ['pw_usuario'] }
        },
        incluirSenha:{
          attributes: {}
        },
        incluirGrupos:{
          include:  { 
            model: sequelize.models.grupo, 
            through: { 
              attributes: ['nm_grupo'] 
            } 
          }
        }
      }
    }
  );
  return usuario;
};
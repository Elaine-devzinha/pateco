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
      usuario.belongsTo(models.grupo, {
        foreignKey: 'cd_grupo'
      });
    }
  }
    usuario.init({
      nm_usuario: DataTypes.STRING,
      ct_email: DataTypes.STRING,
      pw_usuario: DataTypes.STRING,
      cd_grupo: {
        type: DataTypes.INTEGER,
        references: {
          model: 'grupos',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'usuario',
      scopes:{
        defaultScope:{
          attributes: { exclude: ['pw_usuario', 'cd_grupo'] }
        },
        excluirSenha: {
          attributes: { exclude: ['pw_usuario'] }
        },
        incluirSenha:{
          attributes: { exclude: ['cd_grupo']}
        },
        incluirGrupos:{
          attributes: { exclude: ['cd_grupo']},
          include: [
            { 
              model: sequelize.models.grupo, 
              attributes:['id','nm_grupo']
            }
          ]
        }
      }
    }
  );
  return usuario;
};
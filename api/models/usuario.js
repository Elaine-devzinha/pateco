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
     //as associações não funcionam como deveriam, preciso encontrar
     //forma de associa-las da maneira correta.
    static associate(models) {
      usuario.hasMany(models.tipo)
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
      allowNull:false,
     
    },
    cd_tipo: {
      type:DataTypes.INTEGER,
      defaultValue:1  
    },
    ic_verificado: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'usuario',
    defaultScope: {
        attributes: {
          exclude: ['pw_usuario']
        },
      },
    scopes:{
      withPassword:{
        attributes:{
          include:['pw_usuario']
        }
      },
      withScopes:{
          include: [
          {
            model: sequelize.tipo,
            as: 'tipos', // Alias para a tabela Tipo
            attributes: ['nm_tipo'], // Seleciona apenas o nome do tipo
            include: [
              {
                model: sequelize.permissao,
                as: 'permissoes', // Alias para a tabela Permissao
                attributes: ['vl_permissao'] // Seleciona apenas o nome da permissão
              }
            ]
          }
        ]
      }
    }
  });

  return usuario;
};
'use strict';

const { query } = require('express');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../models');
const { SELECT } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  
   async up (queryInterface, Sequelize) {
     await queryInterface.removeColumn('usuarios','ds_tipo')
     await queryInterface.addColumn('usuarios','cd_tipo', Sequelize.INTEGER)

    await queryInterface.addConstraint('usuarios',{
        name:'fk_usuario_tipo',
        fields:['cd_tipo'],
        type:'FOREIGN KEY',
        references:{
          table:'tipos',
          fields:['id']
      }
    })
    await queryInterface.addConstraint('tipos',{
      name:'fk_tipo_permissoes',
      fields: ['cd_permissao'],
      type:'FOREIGN KEY',
      references:{
        table:'permissoes',
        fields:['id']
    }
  })
    
   },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios','cd_tipo');
    await queryInterface.addColumn('usuarios','ds_tipo', Sequelize.STRING)
    await queryInterface.removeConstraint('tipos','fk_tipo_permissoes')
    
   /** Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('funcao_permissao', {
      cd_funcao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'funcoes',
          key: 'id'
        }
      },
      cd_permissao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'permissoes',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('funcao_permissao')
  }
};

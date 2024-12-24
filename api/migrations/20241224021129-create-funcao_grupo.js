'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('funcao_grupo', {
      cd_funcao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'funcoes',
          key: 'id'
        }
      },
      cd_grupo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'grupos',
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
     await queryInterface.dropTable('funcao_grupo');
  }
};

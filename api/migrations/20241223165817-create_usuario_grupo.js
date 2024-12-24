'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuario_grupo', {
      cd_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'usuarios',
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
     await queryInterface.dropTable('usuario_grupo')  
  }
};

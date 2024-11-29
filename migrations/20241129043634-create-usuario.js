'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nm_usuario: {
        type: Sequelize.STRING
      },
      dt_usuario: {
        type: Sequelize.DATE
      },
      ct_email: {
        type: Sequelize.STRING
      },
      pw_usuario: {
        type: Sequelize.STRING
      },
      ds_tipo: {
        type: Sequelize.STRING
      },
      ic_verificado: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
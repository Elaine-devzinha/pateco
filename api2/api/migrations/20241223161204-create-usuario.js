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
        type: Sequelize.STRING,
        allowNull: false
      },
      ct_email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      pw_usuario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cd_grupo:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:2,
        references:{
          model:'grupos',
          key:'id'
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('usuarios', [{
      nm_usuario: 'John Doe',
      dt_usuario: new Date(),
      ct_email: 'marioluizsan@gmail.com',
      pw_usuario: '1234',
      ds_tipo:'cliente',
      ic_verificado:false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
      },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('usuarios', {nm_usuario:'John Doe'}, {});
     
  }
};

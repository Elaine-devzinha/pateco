'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('grupos', [
      {
        nm_grupo: 'Administradores',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nm_grupo: 'Usuarios',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('grupos', null, {
      where: {
        nm_grupo: [
          'Administradores', 
          'Usuarios'
          ]
        }
      }
    )
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissoes', [{
      vl_permissao:'read_usuarios',
    },{
      vl_permissao:'write_usuarios',
    },{
      vl_permissao:'update_usuarios',
    },{
      vl_permissao:'delete_usuarios',
    }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissoes',null, [{
      vl_permissao:'read_usuarios',
    },{
      vl_permissao:'write_usuarios',
    },{
      vl_permissao:'update_usuarios',
    },{
      vl_permissao:'delete_usuarios',
    }])
  }
};

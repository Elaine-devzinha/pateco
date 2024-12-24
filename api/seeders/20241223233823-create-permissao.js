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
    await queryInterface.bulkInsert('permissoes', [
      {vl_permissao: 'create'},
      {vl_permissao: 'read'},
      {vl_permissao: 'update'},
      {vl_permissao: 'delete'}])
    
    await queryInterface.bulkInsert('funcao_permissao', [
      {cd_funcao: 1, cd_permissao: 1},
      {cd_funcao: 2, cd_permissao: 2},
      {cd_funcao: 1, cd_permissao: 3},
      {cd_funcao: 1, cd_permissao: 4}])
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('permissoes', null, [
      {vl_permissao: 'create'},
      {vl_permissao: 'read'},
      {vl_permissao: 'update'},
      {vl_permissao: 'delete'}
     ])
      await queryInterface.bulkDelete('funcao_permissao', null, [
      {cd_funcao: 1, cd_permissao: 1},
      {cd_funcao: 2, cd_permissao: 2},
      {cd_funcao: 1, cd_permissao: 3},
      {cd_funcao: 1, cd_permissao: 4}])
  }
};

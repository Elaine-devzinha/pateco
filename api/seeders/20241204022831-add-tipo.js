'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos', [{
      nm_tipo:'cliente',
      cd_permissao:1
    },{
      nm_tipo:'cliente',
      cd_permissao:2
    },
    {
      nm_tipo:'cliente',
      cd_permissao:3
    },
    {
      nm_tipo:'cliente',
      cd_permissao:4
    }]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios',null [{
      nm_tipo:'cliente',
      cd_permissao:1
    },{
      nm_tipo:'cliente',
      cd_permissao:2
    },{
      nm_tipo:'cliente',
      cd_permissao:3
    },{
      nm_tipo:'cliente',
      cd_permissao:4
    }])
  }
};

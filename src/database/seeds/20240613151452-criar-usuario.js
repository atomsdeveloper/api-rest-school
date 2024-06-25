'use strict';
const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [{
        nome: 'Teste',
        email: 'teste@gmail.com',
        password_hash: await bcryptjs.hash('12345678', 8),
        created_at: new Date(),
        updated_at: new Date()
      }]
    )
  },

  async down() {},
};

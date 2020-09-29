'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('listas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_coluna: {
        type: Sequelize.STRING(80),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE(6),
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE(6),
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listas')
  }
};

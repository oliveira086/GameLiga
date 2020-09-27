'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('atividades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.INTEGER(6),
        allowNull: false
      },
      valor_inicio: {
        type: Sequelize.INTEGER(6),
        allowNull: false
      },
      valor_final: {
        type: Sequelize.INTEGER(6),
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
    return queryInterface.dropTable('atividades')
  }
};

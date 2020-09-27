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
      entrega: {
        type: Sequelize.TIMESTAMP,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE(6),
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE(6),
        allowNull: true
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      estados_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'estados', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('atividades')
  }
};

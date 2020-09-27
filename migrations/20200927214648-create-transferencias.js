'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('transferencias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      valor: {
        type: Sequelize.INTEGER(6),
        allowNull: false
      },
      users_deb: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      users_cred: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE(6),
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE(6),
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};

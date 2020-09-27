const Transferencias = (sequelize, DataTypes) => {
    let transferencias = sequelize.define(
      'Transferencias',
      {
        valor: {
          type: DataTypes.INTEGER(6),
          allowNull: false
        },
        users_deb: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        users_cred: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      {
        tableName: "transferencias",
        timestamps: true
      }
    )
    return transferencias;
  }
  module.exports = Transferencias;
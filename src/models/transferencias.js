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
        },
        users_cred: {
          type: DataTypes.INTEGER,
        }
      },
      {
        tableName: "transferencias",
        timestamps: true,
        sync: {force: true},
      }
    )
    Transferencias.associate = (models) => {
      Transferencias.belongsTo(models.Users, {foreingKey: 'users_id', as: 'usuario'})
    }
    return transferencias;
  }
  module.exports = Transferencias;
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
        timestamps: true
      }
    )
    Transferencias.associate = (models) => {
      Users.hasMany(models.Users, { foreignKey: 'users_deb'})
      Users.hasMany(models.Users, { foreignKey: 'users_cred'})
    }
    return transferencias;
  }
  module.exports = Transferencias;
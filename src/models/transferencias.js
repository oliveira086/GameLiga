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
    transferencias.associate = function(models){
      transferencias.belongsTo(models.Users, {foreignKey: 'users_deb', as: 'usuario_deb'})
      transferencias.belongsTo(models.Users, {foreignKey: 'users_cred', as: 'usuario_cred'})
    }
    return transferencias;
  }
  module.exports = Transferencias;
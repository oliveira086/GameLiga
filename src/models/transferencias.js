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

    Transferencias.associate = function(models) {
      models.Users.belongsToMany(models.Users, { 
        as: 'users',  //this is very important
        through: { model: Transferencias }, 
        // foreignKey: 'user_id' 
      });
    };
    return transferencias;
  }
  module.exports = Transferencias;
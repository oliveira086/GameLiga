const Users = (sequelize, DataTypes) => {
    let users = sequelize.define(
      'Users',
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        id_trello: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        senha: {
          type: DataTypes.STRING(250),
          allowNull: false
        },
        senha_confirmacao: {
            type: DataTypes.INTEGER(4),
            allowNull: true
        },
        saldo: {
            type: DataTypes.INTEGER(6),
            allowNull: false
        },
        super_user: {
          type: DataTypes.INTEGER(4),
          allowNull: false
        }
      },
      {
        tableName: "users",
        timestamps: true
      }
    )
    Users.associate = (models) => {
      Users.hasOne(models.Transferencias, { foreignKey: 'users_deb'})
    }
    return users;
  }
  module.exports = Users;
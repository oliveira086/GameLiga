const Users = (sequelize, DataTypes) => {
    let users = sequelize.define(
      'Users',
      {
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
    // user.associate = (models) => {
    // };
    return users;
  }
  module.exports = Users;
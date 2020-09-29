const Listas = (sequelize, DataTypes) => {
    let listas = sequelize.define(
      'Listas',
      {
        nome: {
          type: DataTypes.STRING(80),
          allowNull: false
        },
        id_coluna: {
            type: DataTypes.STRING(80),
            allowNull: false
        }
      },
      {
        tableName: "listas",
        timestamps: true
      }
    )
    // user.associate = (models) => {
    // };
    return listas;
  }
  module.exports = Listas;
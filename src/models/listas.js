const Listas = (sequelize, DataTypes) => {
    let listas = sequelize.define(
      'Listas',
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
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
const Estados = (sequelize, DataTypes) => {
    let estados = sequelize.define(
      'Estados',
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        tableName: "estados",
        timestamps: true
      }
    )
    // user.associate = (models) => {
    // };
    return estados;
  }
  module.exports = Estados;
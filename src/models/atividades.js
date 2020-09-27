const Atividades = (sequelize, DataTypes) => {
    let atividades = sequelize.define(
      'Atividades',
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false
        },
        valor: {
          type: DataTypes.INTEGER(6),
          allowNull: false
        },
        valor_inicio: {
          type: DataTypes.INTEGER(6),
          allowNull: false
        },
        valor_final: {
            type: DataTypes.INTEGER(6),
            allowNull: false
        }
      },
      {
        tableName: "atividades",
        timestamps: true
      }
    )
    atividades.associate = (models) => {
        atividades.belongsTo(models.Users, { foreignKey: 'user_id', as: 'usuario' })
        atividades.belongsTo(models.Estados, {foreignKey: 'estados_id', as: 'estados'})
    };
    return atividades;
  }
  module.exports = Atividades;
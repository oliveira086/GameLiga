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
        },
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        estados_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: { model: 'estados', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
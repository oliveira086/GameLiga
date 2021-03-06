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
        entrega: {
          type: DataTypes.TIME(5),
          allowNull: false
        },
        trello_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        users_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        listas_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: 'listas', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      {
        tableName: "atividades",
        timestamps: true
      }
    )
    atividades.associate = function(models){
      atividades.belongsTo(models.Listas, {foreignKey: 'listas_id', as:'lista_id' })
      atividades.belongsTo(models.Users, {foreignKey: 'users_id', as: 'user_id'})
    }
    return atividades;
  }
  module.exports = Atividades;
const Contatos = (sequelize, DataTypes) => {
    let contatos = sequelize.define(
      'Contatos',
      {
        users_id: {
          type: DataTypes.INTEGER,
        },
        users_agenda: {
            type: DataTypes.INTEGER,
        }
      },
      {
        tableName: "contatos",
        timestamps: true
      }
    )
    contatos.associate = function(models){
        contatos.belongsTo(models.Users, {foreignKey: 'users_id', as: 'usuario_agenda_id'})
    }
    
    return contatos;
  }
  module.exports = Contatos;
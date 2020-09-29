const { sequelize, Atividades, Users} = require('../models');
const jwt = require('jsonwebtoken')

const Trello = require('../../node_modules/trello-node-api')(process.env.TRELLO_API_KEY, process.env.TRELLO_TOKEN)

module.exports = {
    async createListas (req, res, next) {
        let chave = process.env.CHAVE_LISTAS

        if(chave == req.body.chave){

            Trello.board.searchField('TV6Z1uj7', 'lists').then(function (response) {

                response.map(x => {
                    console.log(x.id)
                    console.log(x.nome)
                    console.log('----')
                })
            }).catch(function (error) {
                console.log('error', error);
            });



            res.status(200).json({sucess: 'key valid'})
        } else {
            res.status(401).json({error: 'key invalid'})
        }
    }
}
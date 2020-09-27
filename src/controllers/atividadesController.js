const { sequelize, Atividades, Users} = require('../models');
const jwt = require('jsonwebtoken')
const Trello = require('../../node_modules/trello-node-api')(process.env.TRELLO_API_KEY, process.env.TRELLO_TOKEN)


module.exports = {
    async getAtividades(req, res, next) {
        console.log('testadndo' + process.env.TRELLO_API_KEY)
        try {
            const token = req.body.token;
            if(!token) {
                res.status(401).json({error: 'token not declared'})
            }
            jwt.verify(token, process.env.SECRET_KEY, (error,decoded)=> {
                if(error){
                    res.status(401).json({error: 'token invalid'})
                }
                req.email = decoded.email
            })

            const user = await Users.findOne({
                where:{
                    email: req.email
                },
                attributes: ['nome']
            })
            if(user != null){ 
                const atividades = await Atividades.findAll()
                console.log(atividades)
                res.status(200).json(atividades);
            } else {
                res.status(400).json({ error: 'user not found' });
            }
        }
        catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    async createAtividade(req, res, next) {
        try {
            const token = req.body.token;
            if(!token) {
                res.status(401).json({error: 'token not declared'})
            }
            jwt.verify(token, process.env.SECRET_KEY, (error,decoded)=> {
                if(error){
                    res.status(401).json({error: 'token invalid'})
                }
                req.email = decoded.email
            })

            const user = await Users.findOne({
                where:{
                    email: req.email
                },
                attributes: ['nome']
            })

            if(user != null){

                const estadoExist = await Atividades.findAll({
                    where: {
                        nome: req.body.nome
                    }
                })
                if (estadoExist.length != 0) {
                    res.status(400).json({error: 'estado already exists'})
                } else {
                    let data = {
                        nome: req.body.nome,
                        valor: req.body.valor,
                        valor_inicio: req.body.valor_inicio,
                        valor_final: req.body.valor_final,
                        estados_id: req.body.estados_id
                    }
                    const atividadeCriada = await Atividades.create(data);

                    var trelloCard = {
                        name: req.body.nome,
                        desc: 'Atualizar',
                        pos: 'top',
                        idList: process.env.TRELLO_INIT_LIST, //REQUIRED
                    };

                    Trello.card.create(trelloCard).then(function (response) {
                        console.log('response ', response);
                    }).catch(function (error) {
                        console.log('error', error);
                    });

                    res.status(200);
                    res.json({
                        atividadeCriada
                    });
                }
            } 
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    // async deleteEstado(req, res, next) {
    //     try {
    //         const token = req.body.token;
    //         if(!token) {
    //             res.status(401).json({error: 'token not declared'})
    //         }
    //         jwt.verify(token, process.env.SECRET_KEY, (error,decoded)=> {
    //             if(error){
    //                 res.status(401).json({error: 'token invalid'})
    //             }
    //             req.email = decoded.email
    //         })

    //         const user = await Users.findOne({
    //             where:{
    //                 email: req.email
    //             },
    //             attributes: ['nome']
    //         })

    //         if(user != null){

    //             const {id} = req.body

    //             const estados = await Estados.destroy({
    //                 where: {
    //                     id
    //                 }
    //             });

    //             if (estados[0]) {
    //                 res.status(200).json(`estado deleted: ${propsForUpate}`)
    //             } else {
    //                 res.status(500).json({error: 'estado not found'})
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({error: 'internal error'})
    //     }
    // },

}
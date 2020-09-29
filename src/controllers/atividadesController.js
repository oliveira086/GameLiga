const { sequelize, Atividades, Users, Listas} = require('../models');
const jwt = require('jsonwebtoken')

const Trello = require('../../node_modules/trello-node-api')(process.env.TRELLO_API_KEY, process.env.TRELLO_TOKEN)


module.exports = {
    async getAtividades(req, res, next) {
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


            const todoListId = await Listas.findOne({
                where: {
                     nome: 'Todo'
                }, attributes: ['id']
            })

            if(user != null){ 
                const atividades = await Atividades.findAll({
                    where: {
                        listas_id: todoListId.id,
                        users_id: null
                    }
                })
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

                const atividadeExist = await Atividades.findAll({
                    where: {
                        nome: req.body.nome
                    }
                })

                const todoListId = await Listas.findOne({
                    where: {
                        nome: 'Todo'
                    }, attributes: ['id']
                })

                if (atividadeExist.length != 0) {
                    res.status(400).json({error: 'estado already exists'})
                } else {

                    var trelloCard = {
                        name: req.body.nome,
                        desc: 'Atualizar',
                        pos: 'top',
                        idList: process.env.TRELLO_INIT_LIST,
                        due: req.body.entrega,
                        dueComplete: false,
                    };

                    Trello.card.create(trelloCard).then(function (response) {
                        console.log('response ', response);
                        let data = {
                            nome: req.body.nome,
                            valor: req.body.valor,
                            valor_inicio: req.body.valor_inicio,
                            valor_final: req.body.valor_final,
                            listas_id: todoListId.id,
                            entrega: req.body.entrega,
                            trello_id: response.id
                        }
                        const atividadeCriada = Atividades.create(data);
                        res.status(200);
                        res.json({
                            atividadeCriada
                        });
                    }).catch(function (error) {
                        console.log('error', error);
                    });
                }
            } 
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    async deleteAtividade(req, res, next) {
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

                const {id} = req.body

                const estados = await Atividades.destroy({
                    where: {
                        id
                    }
                });

                if (estados[0]) {
                    res.status(200).json(`Atividade deleted: ${propsForUpate}`)
                } else {
                    res.status(500).json({error: 'Atividade not found'})
                }
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'internal error'})
        }
    },

    async getAtividadesUser(req, res, next) {
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
                attributes: ['nome', 'id']
            })
            if(user != null){ 
                const atividades = await Atividades.findAll({
                    where: {
                        users_id: user.id
                    }
                })
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

    async buyAtividade(req, res, next) {
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
                attributes: ['nome', 'id', 'saldo']
            })
            if(user != null){

                const debito = parseInt(user.saldo) - parseInt(req.body.valor_inicio)

                const debitoUser = Users.update({
                    saldo: debito
                },{
                    where: {
                    id: user.id
                    }
                })

                const saldoUsuarioCredito = await Users.findOne({
                    where: {
                        email: 'andreluisoliveira013@gmail.com',
                    }, attributes: ['saldo', 'id']
                })

                let saldoCredito = parseInt(saldoUsuarioCredito.saldo) + parseInt(data.valor)
                const UsuarioComSaldo = Users.update({
                    saldo: saldoCredito
                }, {
                    where: {
                        id: saldoUsuarioCredito.id
                    }
                })

                var id = req.body.id_trello_atividade; // REQUIRED
                let id_trello_users = req.body.id_trello_users

                var dataTrello = {
                    idMembers: `${id_trello_users}`,
                };

                Trello.card.update(id, dataTrello).then(function (response) {
                    let data = {
                        users_id: req.body.users_id
                    }
                    const atividades = Atividades.update(data ,{
                        where: {
                            id: req.body.id_atividade
                        }
                    })
                    res.status(200).json(atividades);
                }).catch(function (error) {
                     console.log('error', error);
                });
                
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

}
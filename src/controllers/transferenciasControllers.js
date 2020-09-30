const {Users, Transferencias, Contatos } = require('../models');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const Op = sequelize.Op;

module.exports = {

    async sendTransferencia(req, res, next) {
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
                attributes: ['nome', 'id', 'senha_confirmacao', 'saldo']
            })

            if(user != null){
                let data = {
                    users_cred: req.body.users_cred,
                    users_deb: user.id,
                    valor: req.body.valor
                }

                let contatos = await Contatos.findAll({
                    where: {
                        users_agenda: data.users_deb,
                        users_id: data.users_cred
                    }
                })

                const saldoUsuarioCredito = await Users.findOne({
                    where: {
                        id: req.body.users_cred
                    }, attributes: ['saldo']
                })

                

                if(contatos.length == 0){
                    bcrypt.compare(req.body.senha_confirmacao, user.senha_confirmacao, function(err, result) {
                        if(result){
                            const transferenciaRealizada = Transferencias.create(data)
                            const debito = parseInt(user.saldo) - parseInt(data.valor)

                            const debitoUser = Users.update({
                                saldo: debito
                            },{
                                where: {
                                    id: user.id
                                }
                            })

                            
                            let saldoCredito = parseInt(saldoUsuarioCredito.saldo) + parseInt(data.valor)
                            const UsuarioComSaldo = Users.update({
                                saldo: saldoCredito
                            }, {
                                where: {
                                    id: data.users_cred
                                }
                            })

                            let dataContato = {
                                users_agenda: user.id,
                                users_id: req.body.users_cred
                            }
                            const contatoSalvo = Contatos.create(dataContato)

                            res.status(200);
                            res.json({
                                usuarioCredito: UsuarioComSaldo,
                                usuarioDebito: debitoUser,
                                transferencia: transferenciaRealizada, 
                                contatos: contatoSalvo
                            });
                        } else {
                            res.status(500);
                            res.json({
                                erro: 'password invalid'
                            });
                        }
                    })
                } else {
                    bcrypt.compare(req.body.senha_confirmacao, user.senha_confirmacao, function(err, result) {
                        if(result){
                            const transferenciaRealizada = Transferencias.create(data)

                            const debito = parseInt(user.saldo) - parseInt(data.valor)
                            const debitoUser = Users.update({
                                saldo: debito
                            },{
                                where: {
                                    id: user.id
                                }
                            })

                            let saldoCredito = parseInt(saldoUsuarioCredito.saldo) + parseInt(data.valor)
                            const UsuarioComSaldo = Users.update({
                                saldo: saldoCredito
                            }, {
                                where: {
                                    id: data.users_cred
                                }
                            })

                            res.status(200);
                            res.json({
                                UsuarioCredito: UsuarioComSaldo,
                                usuarioDebito: debitoUser,
                                transferencia: transferenciaRealizada
                            });
                        } else {
                            res.status(500);
                            res.json({
                                erro: 'password invalid'
                            });
                        }
                    })
                }
            } else {
                res.status(500);
                res.json({error: 'User not exists'});
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    async getTransferencias(req, res, next) {
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
                attributes: ['id']
            })

            if(user != null){
                const transferencias = await Transferencias.findAll({
                    include: [{
                        model: Users, as: 'usuario_deb',
                        attributes: ['nome']
                    },
                    {
                        model: Users, as: 'usuario_cred',
                        attributes: ['nome']
                    }],
                    where: {
                        [Op.or]: [{users_deb: user.id}, {users_cred: user.id}]
                        
                    }
                })

                res.status(200);
                res.json({
                    transferencias
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    async getContatos(req, res, next) {
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
                attributes: ['id']
            })

            if(user != null){
                const contatos = await Contatos.findAll({
                    attributes: ['id', 'users_agenda', 'users_id'],
                    include: [{
                        model: Users, as: 'usuario_agenda_id',
                        attributes: ['nome']
                    }],
                    where: {
                        users_agenda: user.id,
                    }
                    
                })
                res.status(200);
                res.json({
                    contatos
                });
            }

        } catch( error ) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    
    async getLatest (req, res, next) {
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
                attributes: ['id']
            })

            if(user != null){

                const transferencias = await Transferencias.findAll({
                    limit: 1,
                    order: [ [ 'createdAt', 'DESC' ]],
                    where: {
                        [Op.or]: [{users_deb: user.id}, {users_cred: user.id}]
                    },
                    include: [{
                        model: Users, as: 'usuario_deb',
                        attributes: ['nome']
                    },
                    {
                        model: Users, as: 'usuario_cred',
                        attributes: ['nome']
                    }],
                })

                if(transferencias[0].users_deb == user.id){
                    let data = {
                        createdAt: transferencias[0].createdAt,
                        id: transferencias[0].id,
                        updatedAt: transferencias[0].updatedAt,
                        users_cred: transferencias[0].users_cred,
                        users_deb: transferencias[0].users_deb,
                        usuario_cred: transferencias[0].usuario_cred,
                        usuario_deb: transferencias[0].usuario_deb,
                        valor: transferencias[0].valor,
                        debito: true,
                    }
                    res.status(200).json({data: data})
                } else {
                    let data = {
                        createdAt: transferencias[0].createdAt,
                        id: transferencias[0].id,
                        updatedAt: transferencias[0].updatedAt,
                        users_cred: transferencias[0].users_cred,
                        users_deb: transferencias[0].users_deb,
                        usuario_cred: transferencias[0].usuario_cred,
                        usuario_deb: transferencias[0].usuario_deb,
                        valor: transferencias[0].valor,
                        debito: false,
                    }

                    res.status(200).json({data})
                }

                
                
               


               
            }
    }

}
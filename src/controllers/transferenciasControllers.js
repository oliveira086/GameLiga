const {Users, Transferencias, Contatos } = require('../models');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
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
                attributes: ['nome']
            })

            if(user != null){
                let data = {
                    users_cred: req.body.users_cred,
                    users_deb: req.body.users_deb,
                    valor: req.body.valor
                }

                let contatos = await Contatos.findAll({
                    where: {
                        users_agenda: data.users_deb,
                        users_id: data.users_cred
                    }
                })

                if(contatos.length == 0){
                    console.log('PASSEI')
                    const transferenciaRealizada = await Transferencias.create(data)
                    let dataContato = {
                        users_agenda: data.users_deb,
                        users_id: req.body.users_cred
                    }
                    const contatoSalvo = await Contatos.create(dataContato)

                    //Postagem.findByPk(post_id)
                    res.status(200);
                    res.json({
                        transferenciaRealizada, contatoSalvo
                    });
                } else {
                    res.status(500);
                    res.json({error: 'Contato exists'});
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
    }

}
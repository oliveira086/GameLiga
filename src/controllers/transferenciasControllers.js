const { sequelize, Users, Transferencias } = require('../models');
const jwt = require('jsonwebtoken')

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

                const transferenciaRealizada = await Transferencias.create(data)

                let user_deb = Users.findPk(transferenciaRealizada.user_deb)
                let user_cred = Users.findPk(transferenciaRealizada.user_cred)

                let resposta = {
                    createdAt: transferenciaRealizada.createdAt,
                    id: transferenciaRealizada.id,
                    updatedAt: transferenciaRealizada.updatedAt,
                    users_cred: user_cred,
                    users_deb: user_deb,
                    valor: transferenciaRealizada.valor,
                }

                //Postagem.findByPk(post_id)
                res.status(200);
                res.json({
                    resposta
                });
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
                    where: {
                        users_deb: user.id
                    }
                })

                let user_deb = await Users.findByPk(transferencias.user_deb)
                let user_cred = await Users.findByPk(transferencias.user_cred)

                let resposta = {
                    createdAt: transferencias.createdAt,
                    id: transferencias.id,
                    updatedAt: transferencias.updatedAt,
                    users_cred: user_cred,
                    users_deb: user_deb,
                    valor: transferencias.valor,
                }

                res.status(200);
                res.json({
                    resposta
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    

}
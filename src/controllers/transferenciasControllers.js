const { sequelize, Users, Transferencias } = require('../models');
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
                    users_deb: req.bdy.users_deb,
                    valor: req.body.valor
                }
                const transferenciaRealizada = await Transferencias.create(data)
                res.status(200);
                res.json({
                    transferenciaRealizada
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

            res.status(200).json(user)

            // if(user != null){
            //     const transferencias = await Transferencias.findAll({
            //         where: {
            //             // [Op.or]: [{users_cred: user.id}, {users_deb: user.id}]
            //             users_deb: user.id
            //         }
            //     })
            //     res.status(200);
            //     res.json({
            //         transferencias
            //     });
            // }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    

}
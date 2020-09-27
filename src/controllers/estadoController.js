const { sequelize, Estados, Users} = require('../models');
const jwt = require('jsonwebtoken')


module.exports = {
    async getEstado(req, res, next) {
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
                const estados = await Estados.findAll()
                console.log(estados)
                res.status(200).json(estados);
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

    async createEstado(req, res, next) {
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

                const estadoExist = await Estados.findAll({
                    where: {
                        nome: req.body.nome
                    }
                })
                if (estadoExist.length != 0) {
                    res.status(400).json({error: 'estado already exists'})
                } else {
    
                    const estadoCriado = await Estados.create(req.body);
                    res.status(200);
                    res.json({
                        estadoCriado
                    });
                }
            } 
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    // async deleteUser(req, res, next) {
    //     try {
    //         const { id } = req.params

    //         const userDeleted = await Users.destroy({
    //             where: {
    //                 id
    //             }
    //         });

    //         if (userDeleted) {
    //             res.status(200);
    //             res.json('user deleted');
    //         } else {
    //             res.status(404);
    //             res.json({error: 'user not found'});
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500);
    //         res.json({error: 'internal error'});
    //     }
    // },
}
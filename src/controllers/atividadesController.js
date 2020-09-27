const { sequelize, Atividades, Users} = require('../models');
const jwt = require('jsonwebtoken')


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

    // async createEstado(req, res, next) {
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

    //             const estadoExist = await Estados.findAll({
    //                 where: {
    //                     nome: req.body.nome
    //                 }
    //             })
    //             if (estadoExist.length != 0) {
    //                 res.status(400).json({error: 'estado already exists'})
    //             } else {
    
    //                 const estadoCriado = await Estados.create(req.body);
    //                 res.status(200);
    //                 res.json({
    //                     estadoCriado
    //                 });
    //             }
    //         } 
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500);
    //         res.json({error: 'internal error'});
    //     }
    // },

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
const { sequelize, Users } = require('../models');
const generateToken = require('../functions/generateToken');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')

module.exports = {
    async getUser(req, res, next) {
        try {

            const token = req.body.token;
            if(!token) {
                res.status(401).json({error: 'token not declared'})
            }
            jwt.verify(token, process.env.SECRET_KEY, (error,decoded) => {
                if(error){
                    res.status(401).json({error: 'token invalid'})
                }
                req.email = decoded.email
            })

            const user = await Users.findOne({
                where:{
                    email: req.email
                },
                attributes: ['id','nome', 'saldo', 'super_user', 'id_trello']
            })
            if(user != null){ 
                res.status(200).json(user);
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

    async createUser(req, res, next) {
        try {

            const userExist = await Users.findAll({
                where: {
                    email: req.body.email
                }
            })

            if (userExist[0]) {
                res.status(400).json({error: 'email already exists'})
            } else {
                
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.senha, salt);

                req.body.senha = hash
                
                const user = await Users.create(req.body);
                const token = generateToken(user.email);
                res.status(201);
                res.json({
                    token
                });
            }
            
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    async updateUser(req, res, next) {
        try {
            const email = req.email
            const propsForUpate = Object.keys(req.body)

            const user = await Users.update(req.body, {
                where: {
                    email
                }
            });

            if (user[0]) {
                res.status(200).json(`user updated: ${propsForUpate}`)
            } else {
                res.status(500).json({error: 'user not found'})
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'internal error'})
        }
    },

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params

            const userDeleted = await Users.destroy({
                where: {
                    id
                }
            });

            if (userDeleted) {
                res.status(200);
                res.json('user deleted');
            } else {
                res.status(404);
                res.json({error: 'user not found'});
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    async getUserWithEmail(req, res, next){
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
                    email: req.body.email
                },
                attributes: ['nome']
            })
            if(user != null){
                let email = await Users.findOne({
                    where: {
                        email: req.body.email
                    },
                    attributes: ['nome', 'id']
                })

                res.status(200).json(email);
            } else {
                res.status(500);
                res.json({error: 'user not found'});
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

    async getConfirmationPass(req, res, next){
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
                let email = await Users.findOne({
                    where: {
                        email: req.email
                    },
                    attributes: ['senha_confirmacao']
                })
                if(email.senha_confirmacao == 0){
                    res.status(200).json({ok: 'user not pass'});
                } else {
                    res.status(200).json({ok: 'user with pass'});
                }
               
            }
            else {
                res.status(500);
                res.json({error: 'user not found'});
            }

        } catch (erro){
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    async saveConfirmationPass(req, res, next){
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

                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.senha_confirmacao, salt);
                req.body.senha_confirmacao = hash
                
                let senha = await Users.update({
                    senha_confirmacao: req.body.senha_confirmacao
                },
                {
                    where: {
                        id: user.id
                    }
                })
                res.status(200).json(senha);
            }
            else {
                res.status(500);
                res.json({error: 'user not found'});
            }

        } catch(error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },
    async updateConfirmationPass (req, res, next){
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
                attributes: ['id', 'senha_confirmacao']
            })
            if(user != null){

                let senhaAntiga = req.body.oldPass
                let senhaNova = req.body.newPass
                
                bcrypt.compare(senhaAntiga, user.senha_confirmacao, function(err, result) {
                    
                    if(result) {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(senhaNova, salt);
                        senhaNova = hash

                        let senha = Users.update({
                            senha_confirmacao: senhaNova
                        },
                        {
                            where: {
                                id: user.id
                            }
                        })
                        res.status(200).json({ok:senha});
                    } else {
                        res.status(500).json({erro: 'password not corret'});
                    }
                })
            }
            else {
                res.status(500);
                res.json({error: 'user not found'});
            }

        } catch(error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    }
}
const { sequelize, Users } = require('../models');
const generateToken = require('../functions/generateToken');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')

module.exports = {
    async getUser(req, res, next) {
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
                // attributes: ['nome', 'saldo']
            })
            if(user != null){ 
                res.status(200).json(user);
            } else {
                res.status(400).json({ error: 'user not found' });
                res.send(user)
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
                console.log(req.body)
                
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
}
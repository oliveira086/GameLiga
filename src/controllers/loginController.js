const { sequelize, Users } = require('../models');
const generateToken = require('../functions/generateToken');
const bcrypt = require('bcrypt-nodejs');

module.exports = {

    async login(req, res, next) {
        try {

            const userExist = await Users.findOne({
                where: {
                    email: req.body.email
                }, attributes: ['saldo', 'senha', 'email']
            })

            if (!userExist) {
                res.status(400).json({error: 'email not exists'})
            }
            else {
                bcrypt.compare(req.body.senha, userExist.senha, function(err, result) {
                    let resposta = result
                    if (resposta) {
                        const dateNow = new Date
                        userExist.last_login = dateNow.toISOString()
                        userExist.save()
                        const token = generateToken(userExist.email)
                        let saldo = userExist.saldo
                        res.status(200)
                        res.json({token, saldo});
                    }
                    else {
                        res.status(400).json({error: 'invalid password'})
                    }
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error: 'internal error'});
        }
    },

}
const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = function generateToken(email){
    return jwt.sign({ email },process.env.SECRET_KEY,{
        expiresIn: 86400 //  em segundos 
    })
}
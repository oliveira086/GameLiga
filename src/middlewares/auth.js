const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({error: 'token not declared'})
    }
    jwt.verify(token,process.env.SECRET_KEY, (error,decoded)=> {
        if(error){
            return res.status(401).json({error: 'token invalid'})
        }
        req.email = decoded.email
        return next()
    })
}
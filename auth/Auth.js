const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers.authentication;

    if(!token){
        return res.status(400).json({
            message: "Token not found"
        })
    }
    try {
        const decodedToken = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET)
        req.user = decodedToken
        next()
    } catch (error) {
        res.status(403).json({ message: 'Unauthorized' });
    }
}

module.exports = {auth}
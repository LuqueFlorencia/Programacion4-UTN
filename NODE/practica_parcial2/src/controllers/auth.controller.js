const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../utils/errores')

async function login(req, res, next){
    const { username, password } = req.body;

    if (username !== process.env.APP_USER || password !== process.env.APP_PASS)
        throw new AuthorizationError('Credenciales invalidas');

    const payload = { username }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN
    });

    return res.status(200).json({token});
};

module.exports = { login }
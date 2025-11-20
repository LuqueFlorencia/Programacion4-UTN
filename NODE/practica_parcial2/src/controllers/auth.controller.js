const jwt = require('jsonwebtoken');
const { AUTH_CONFIG } = require('../config/auth.config');
const { AuthorizationError } = require('../utils/errores')

async function login(req, res, next) {
    const { username, password } = req.body;

    if (username !== AUTH_CONFIG.user.username || password !== AUTH_CONFIG.user.password){
        throw new AuthorizationError('Credenciales invalidas.')
    };

    const payload = { username }
    const token = jwt.sign(payload, AUTH_CONFIG.jwtSecret, {
        expiresIn: AUTH_CONFIG.jwtExpiresIn
    });

    return res.status(200).json({token});
};

module.exports = { login }
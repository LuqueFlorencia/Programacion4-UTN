const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const val = require('../middleware/validation')
const schema = require('../validations/auth.schema')

router.post(
    '/',
    val.validarBody(schema.loginSchema),
    controller.login
);

module.exports = router;
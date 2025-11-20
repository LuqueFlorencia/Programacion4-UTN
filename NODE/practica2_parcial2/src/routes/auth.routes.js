const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const schema = require('../validations/auth.schema');
const mw = require('../middlewares/auth.middleware');
const val = require('../middlewares/validate.middleware');

router.post(
    '/',
    val.validarBody(schema.authSchema),
    mw.asyncHandler(controller.login)
);

module.exports = router;
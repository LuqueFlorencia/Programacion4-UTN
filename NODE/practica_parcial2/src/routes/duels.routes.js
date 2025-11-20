const express = require('express');
const router = express.Router();
const mw = require('../middleware/auth');
const val = require('../middleware/validation');
const schema = require('../validations/duels.schema');
const controller = require('../controllers/duels.controller');

router.post(
    '/',
    mw.authMiddleware,
    val.validarBody(schema.crearDuelSchema),
    mw.asyncHandler(controller.createDuel)
);

router.get(
    '/',
    mw.authMiddleware,
    val.validarQuery(schema.getDuelsSchema),
    mw.asyncHandler(controller.getAllDuels)
);

module.exports = router;
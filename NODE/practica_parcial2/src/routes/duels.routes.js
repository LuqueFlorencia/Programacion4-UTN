const express = require('express');
const router = express.Router();
const mw = require('../middleware/validation');
const schema = require('../validations/duels.schema');
const controller = require('../controllers/duels.controller');

router.post(
    '/',
    mw.validarBody(schema.crearDuelSchema),
    mw.asyncHandler(controller.createDuel)
);

router.get(
    '/',
    mw.validarQuery(schema.getDuelsSchema),
    mw.asyncHandler(controller.getAllDuels)
);

module.exports = router;
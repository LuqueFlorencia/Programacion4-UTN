const express = require('express');
const router = express.Router();
const mw = require('../middleware/auth');
const controller = require('../controllers/guardians.controller')
const val = require('../middleware/validation')
const schema = require('../validations/guardians.schema')

router.post(
    '/', 
    mw.authMiddleware,
    val.validarBody(schema.crearGuardianSchema), 
    mw.asyncHandler(controller.createGuardian)
);

router.get(
    '/',
    mw.authMiddleware,
    val.validarQuery(schema.getGuardiansSchema),
    mw.asyncHandler(controller.getAllGuardians)
);

router.patch(
    '/:id/energy',
    mw.authMiddleware,
    val.validarParams(schema.idParamSchema),
    val.validarBody(schema.patchEnergySchema),
    mw.asyncHandler(controller.patchEnergy)
);

router.patch(
    '/:id/item',
    mw.authMiddleware,
    val.validarParams(schema.idParamSchema),
    val.validarBody(schema.patchItemSchema),
    mw.asyncHandler(controller.patchItem)
);

module.exports = router;
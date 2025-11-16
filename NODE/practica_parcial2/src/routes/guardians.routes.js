const express = require('express');
const router = express.Router();
const controller = require('../controllers/guardians.controller')
const mw = require('../middleware/validation')
const schema = require('../validations/guardians.schema')

router.post(
    '/', 
    mw.validarBody(schema.crearGuardianSchema), 
    mw.asyncHandler(controller.createGuardian)
);

router.get(
    '/',
    mw.validarQuery(schema.getGuardiansSchema),
    mw.asyncHandler(controller.getAllGuardians)
);

router.patch(
    '/:id/energy',
    mw.validarParams(schema.idParamSchema),
    mw.validarBody(schema.patchEnergySchema),
    mw.asyncHandler(controller.patchEnergy)
);

router.patch(
    '/:id/item',
    mw.validarParams(schema.idParamSchema),
    mw.validarBody(schema.patchItemSchema),
    mw.asyncHandler(controller.patchItem)
);

module.exports = router;
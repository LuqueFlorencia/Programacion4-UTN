const express = require('express');
const router = express.Router();
const controller = require('../controllers/challenges.controller');
const mw = require('../middleware/validation');
const schema = require('../validations/challenges.schema')

router.post(
    '/',
    mw.validarBody(schema.crearChallengeSchema),
    mw.asyncHandler(controller.createChallenge)
);

router.get(
    '/',
    mw.validarQuery(schema.getChallengeSchema),
    mw.asyncHandler(controller.getAllChallenges)
);

router.post(
    '/:challengeId/attempt/:guardianId',
    mw.validarBody(schema.attemptChallengeSchema),
    mw.asyncHandler(controller.attemptChallenge)
);

module.exports = router;
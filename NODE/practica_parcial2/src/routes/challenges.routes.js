const express = require('express');
const router = express.Router();
const mw = require('../middleware/auth');
const controller = require('../controllers/challenges.controller');
const val = require('../middleware/validation');
const schema = require('../validations/challenges.schema')

router.post(
    '/',
    mw.authMiddleware,
    val.validarBody(schema.crearChallengeSchema),
    mw.asyncHandler(controller.createChallenge)
);

router.get(
    '/',
    mw.authMiddleware,
    val.validarQuery(schema.getChallengeSchema),
    mw.asyncHandler(controller.getAllChallenges)
);

router.post(
    '/:challengeId/attempt/:guardianId',
    mw.authMiddleware,
    val.validarBody(schema.attemptChallengeSchema),
    mw.asyncHandler(controller.attemptChallenge)
);

module.exports = router;
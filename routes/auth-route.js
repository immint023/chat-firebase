const express = require('express');
const passport = require('passport');
const router = express.Router();

const controller = require('../controllers/auth-controller');

router.route('/register').post(controller.register);
router.route('/login').post(controller.login);

module.exports = router;

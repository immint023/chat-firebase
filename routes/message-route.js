const express = require('express');
const router = express.Router();
const controller = require('../controllers/message-controller');

router.route('/')
  .get(controller.getList)
  .post(controller.create);

module.exports = router;
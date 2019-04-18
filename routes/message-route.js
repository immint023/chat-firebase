const express = require('express');
const authorize = require('../middlewares/auth');
const controller = require('../controllers/message-controller');

const router = express.Router();
router
  .route('/')
  .get(authorize(), controller.getList)
  .post(controller.create);

module.exports = router;

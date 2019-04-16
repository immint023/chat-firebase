const express = require('express');

const messageRoutes = require('./message-route');
const authRoutes = require('./auth-route');

const router = express.Router();

router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read } = require('../controllers/rooms');

router.get('/user/chat', requireSignin, read);

module.exports = router;
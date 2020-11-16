const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, addMessage } = require('../controllers/rooms');

router.get('/user/chat/room/:id', requireSignin, read);
router.put('/user/chat/room/message/:id/:name/:message',  addMessage);

module.exports = router;
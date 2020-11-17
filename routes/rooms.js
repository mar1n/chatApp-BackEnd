const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, addMessage, deleteMessage } = require('../controllers/rooms');

router.get('/user/chat/room/:id', requireSignin, read);
router.put('/user/chat/room/message/:id/:name/:message',  addMessage);
router.put('/user/chat/room/message/:roomId/:messageId',  deleteMessage);

module.exports = router;
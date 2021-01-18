const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, addMessage, deleteMessage, readAllMessage, addRoom, readAllUsers } = require('../controllers/rooms');

router.get('/user/chat/room/:id', requireSignin, read);
router.put('/user/chat/room/add', addRoom);
router.put('/user/chat/room/message/:id/:name/:message',  addMessage);
router.put('/user/chat/room/message/:roomId/:messageId',  deleteMessage);
router.put('/user/chat/room/message/readAll/:roomId/:name',  readAllMessage);
router.put('/user/chat/room/readAllUsers/:roomId/:name',  readAllUsers);

module.exports = router;
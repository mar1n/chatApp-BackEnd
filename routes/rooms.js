const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, addMessage, deleteMessage, readAllMessage, addRoom, readAllUsers, readMessages } = require('../controllers/rooms');

router.get('/user/chat/room/:name', requireSignin, read);
router.put('/user/chat/room/add', addRoom);
router.put('/user/chat/room/message/:id/:name/:message',  addMessage);
router.put('/user/chat/room/message/:roomId/:messageId',  deleteMessage);
router.put('/user/chat/room/readMessage/:roomId/:name',  readMessages);
router.put('/user/chat/room/readAllUsers/:roomId/:name',  readAllUsers);

module.exports = router;
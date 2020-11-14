const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { item, update } = require('../controllers/item');

router.get('/item', item);

module.exports = router;
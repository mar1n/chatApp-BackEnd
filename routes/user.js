const express = require('express');
const router = express.Router();

// import controllers

const { requireSignin, adminMiddleware } = require('../controllers/auth');
const { read, readAll, update } = require('../controllers/user');

router.get('/user/:id', requireSignin, read);
router.get('/user/readAll/:id', requireSignin, readAll);
router.put('/user/update', requireSignin, update);
router.put('/admin/update', requireSignin, adminMiddleware, update);

module.exports = router;
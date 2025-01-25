const express = require('express');
const router = express.Router();

// controllers
const {signup} =  require('../controllers/Auth')

router.post('/login')
router.post('/signup',signup)

module.exports = router;
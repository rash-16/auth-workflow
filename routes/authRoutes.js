const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
  register,
  login,
  logout,
  verifyEmail,
  check
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);
router.get('/check',authenticateUser, check);


module.exports = router;

const express = require('express');
const History = require('../models/History');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Get user history
router.get('/', auth, async (req, res) => {
  try {
    const history = await History.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

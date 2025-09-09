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

// Delete a history item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await History.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!item) return res.status(404).json({ msg: 'History item not found' });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete all history
router.delete('/', auth, async (req, res) => {
  try {
    await History.deleteMany({ user: req.user });
    res.json({ msg: 'All history deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

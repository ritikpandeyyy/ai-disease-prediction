const express = require('express');
const router = express.Router();


const jwt = require('jsonwebtoken');
const History = require('../models/History');

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return next(); // allow unauthenticated for now
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.id;
  } catch (err) {}
  next();
}


const axios = require('axios');

// POST /api/predict
router.post('/', auth, async (req, res) => {
  try {
    const aiRes = await axios.post('http://localhost:8000/predict', req.body);
    const result = aiRes.data;
    if (req.user) {
      await History.create({ user: req.user, type: 'prediction', input: req.body, result });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

module.exports = router;

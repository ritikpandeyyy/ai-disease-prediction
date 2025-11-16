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

// POST /api/diet

router.post('/', auth, async (req, res) => {
  try {
    // Expect disease in request body, else fallback to prediction
    let disease = req.body.disease;
    if (!disease && req.body.symptoms) {
      // Call AI service to predict disease if not provided
      const predRes = await axios.post('http://localhost:8000/predict', req.body);
      disease = predRes.data.prediction;
    }
    const aiRes = await axios.post('http://localhost:8000/diet', { disease });
    const result = aiRes.data;
    if (req.user) {
      await History.create({ user: req.user, type: 'diet', input: req.body, result });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

module.exports = router;

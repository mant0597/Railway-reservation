const express = require('express');
const router = express.Router();
const Station = require('../models/Station');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const isOperator = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'operator') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post('/addStation', authMiddleware, isOperator, async (req, res) => {
  try {
    const { station_code, name, city, state } = req.body;
    
    if (!station_code || !name || !city || !state) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newStation = new Station({ station_code, name, city, state });
    await newStation.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

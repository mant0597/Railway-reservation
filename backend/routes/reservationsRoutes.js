const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Train = require('../models/Train');
const Station = require('../models/Station');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const isRole = require('../middleware/roleMiddleware');
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { train_id, source_station, destination_station, journey_date, passengers } = req.body;
    const user_id = req.user.id; 

    const train = await Train.findById(train_id);
    if (!train) return res.status(404).json({ message: 'Train not found' });

    const newReservation = new Reservation({
      user_id,
      train_id,
      source_station,
      destination_station,
      booking_date: new Date(),
      journey_date,
      passengers,
      status: 'Confirmed'
    });
    await newReservation.save();

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    if (reservation.user_id.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Access denied' });

    reservation.status = 'Cancelled';
    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user_id: req.user.id }).populate('train_id source_station destination_station');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

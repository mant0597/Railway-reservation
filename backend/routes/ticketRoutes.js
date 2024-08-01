const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
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

router.post('/', authMiddleware, isOperator, async (req, res) => {
  try {
    const { reservation_id, train_id, seat_number, class: ticketClass, fare } = req.body;
    
    if (!reservation_id || !train_id || !seat_number || !ticketClass || !fare) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTicket = new Ticket({ reservation_id, train_id, seat_number, class: ticketClass, fare, status: 'Confirmed' });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', authMiddleware, isOperator, async (req, res) => {
  try {
    const { reservation_id, train_id, seat_number, class: ticketClass, fare } = req.body;

    if (!reservation_id || !train_id || !seat_number || !ticketClass || !fare) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTicket = new Ticket({ reservation_id, train_id, seat_number, class: ticketClass, fare, status: 'Confirmed' });
    
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', authMiddleware, async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id).populate('reservation_id train_id');
      
      if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
      const user = await User.findById(req.user.id);
      if (user.role === 'operator' || (ticket.reservation_id.toString() === user._id.toString())) {
        if (ticket.status === 'Confirmed') {
          res.json(ticket);
        } else {
            console.log('Ticket Status:', ticket.status);

          res.status(404).json({ message: 'Ticket is not confirmed' });
        }
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;

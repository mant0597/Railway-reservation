const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  train_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  seat_number: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;

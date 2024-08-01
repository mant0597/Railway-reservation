const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  train_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  source_station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  destination_station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station',
    required: true,
  },
  booking_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  journey_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Confirmed', 'Cancelled'],
  },
  passengers: [
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      seat_preference: {
        type: String,
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

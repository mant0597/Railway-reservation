const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_number: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
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
  departure_time: {
    type: Date,
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
  days_of_operation: {
    type: [String],
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

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;

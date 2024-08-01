const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  station_code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
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

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;

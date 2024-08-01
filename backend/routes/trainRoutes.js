const express = require('express');
const router = express.Router();
const Train = require('../models/Train');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const isOperator = require('../middleware/roleMiddleware').bind(null, 'operator');
const Station = require('../models/Station');

// Create a new train (only for operators)
router.post('/', authMiddleware, isOperator, async (req, res) => {
  try {
    const { train_number, name, type, source_station, destination_station, departure_time, arrival_time, days_of_operation } = req.body;
    
    if (!train_number || !name || !type || !source_station || !destination_station || !departure_time || !arrival_time || !days_of_operation) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const newTrain = new Train({
      train_number,
      name,
      type,
      source_station,
      destination_station,
      departure_time,
      arrival_time,
      days_of_operation,
      created_by: req.user.id
    });

    await newTrain.save();
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trains based on source and destination stations
// Get trains based on source and destination stations
// Get trains based on source and destination stations
router.get('/', authMiddleware, async (req, res) => {
    try {
      const { sourceStation, destinationStation } = req.query;
  
      if (!sourceStation || !destinationStation) {
        return res.status(400).json({ message: 'Source and destination stations are required' });
      }
  
      // Log query parameters
      console.log('Source Station:', sourceStation);
      console.log('Destination Station:', destinationStation);
  
      // Fetch station documents
      const sourceStationDoc = await Station.findOne({ city: sourceStation });
      const destinationStationDoc = await Station.findOne({ city: destinationStation });
  
      // Log the documents fetched
      console.log('Source Station Document:', sourceStationDoc);
      console.log('Destination Station Document:', destinationStationDoc);
  
      if (!sourceStationDoc || !destinationStationDoc) {
        return res.status(404).json({ message: 'Source or destination station not found' });
      }
  
      const query = {
        source_station: sourceStationDoc._id,
        destination_station: destinationStationDoc._id
      };
  
      const trains = await Train.find(query);
      res.status(200).json(trains);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
// Update a train (only for operators)
router.put('/:id', authMiddleware, isOperator, async (req, res) => {
  try {
    const { train_number, name, type, source_station, destination_station, departure_time, arrival_time, days_of_operation } = req.body;

    if (!train_number && !name && !type && !source_station && !destination_station && !departure_time && !arrival_time && !days_of_operation) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    const updatedTrain = await Train.findByIdAndUpdate(
      req.params.id,
      { train_number, name, type, source_station, destination_station, departure_time, arrival_time, days_of_operation },
      { new: true }
    );

    if (!updatedTrain) {
      return res.status(404).json({ message: 'Train not found' });
    }

    res.status(200).json(updatedTrain);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a train by ID
router.get('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id).populate('source_station destination_station');
    if (!train) {
      return res.status(404).json({ message: 'Train not found' });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

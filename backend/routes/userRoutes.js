const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    console.log('Received data:', { name, email, password, phone, address, role });

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); 
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;

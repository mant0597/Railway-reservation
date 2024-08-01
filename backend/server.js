const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authMiddleware = require('./middleware/authMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');

app.use(loggerMiddleware);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userRoutes = require('./routes/userRoutes');
const trainRoutes = require('./routes/trainRoutes');
const reservationsRoutes = require('./routes/reservationsRoutes');
const stationRoutes = require('./routes/stationRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/users', userRoutes);
app.use('/api/trains', authMiddleware, trainRoutes);
app.use('/api/reservations', authMiddleware, reservationsRoutes);
app.use('/api/stations', authMiddleware, stationRoutes);
app.use('/api/tickets', authMiddleware, ticketRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

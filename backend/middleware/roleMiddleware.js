// middleware/roleMiddleware.js
const User = require('../models/User');

const isRole = (role) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = isRole;

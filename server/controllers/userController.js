const User = require('../models/User');

// @desc    Get all pharmacies
// @route   GET /api/users/pharmacies
// @access  Public
exports.getPharmacies = async (req, res) => {
  try {
    const pharmacies = await User.find({ role: 'pharmacy' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

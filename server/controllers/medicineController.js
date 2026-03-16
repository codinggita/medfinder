const Medicine = require('../models/Medicine');
const User = require('../models/User');

// @desc    Fetch all medicines with Search, Filter & Pagination
// @route   GET /api/medicines
// @access  Public
exports.getMedicines = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    const count = await Medicine.countDocuments({ ...keyword });
    
    // Sorting logic
    let sort = {};
    if (req.query.sort === 'price') {
      sort = { price: 1 };
    } else if (req.query.sort === 'stock') {
      sort = { stock: -1 };
    }

    const medicines = await Medicine.find({ ...keyword })
      .populate({ path: 'pharmacyId', model: User, select: 'name email' })
      .sort(sort)
      .limit(limit)
      .skip(skip);

    res.json({
      medicines,
      page,
      pages: Math.ceil(count / limit),
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new medicine
// @route   POST /api/medicines
// @access  Private/Pharmacy
exports.createMedicine = async (req, res) => {
  try {
    const { name, stock, price, description } = req.body;

    const medicine = await Medicine.create({
      name,
      stock: Number(stock),
      price: Number(price),
      description,
      pharmacyId: req.user.id
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update medicine stock or details
// @route   PUT /api/medicines/:id
// @access  Private/Pharmacy
exports.updateMedicine = async (req, res) => {
  try {
    const { name, stock, price, description } = req.body;

    const medicine = await Medicine.findById(req.params.id);

    if (medicine) {
      if (medicine.pharmacyId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User not authorized to update this medicine' });
      }

      medicine.name = name || medicine.name;
      medicine.stock = stock !== undefined ? Number(stock) : medicine.stock;
      medicine.price = price !== undefined ? Number(price) : medicine.price;
      medicine.description = description || medicine.description;

      const updatedMedicine = await medicine.save();
      res.json(updatedMedicine);
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a medicine
// @route   DELETE /api/medicines/:id
// @access  Private/Pharmacy
exports.deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (medicine) {
      if (medicine.pharmacyId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User not authorized to delete this medicine' });
      }

      await Medicine.deleteOne({ _id: req.params.id });
      res.json({ message: 'Medicine removed' });
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

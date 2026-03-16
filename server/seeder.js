const { connectDB } = require('./config/db');
const User = require('./models/User');
const Medicine = require('./models/Medicine');
const dotenv = require('dotenv');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Clear existing
    await Medicine.deleteMany();
    await User.deleteMany();

    console.log('Data Cleared!');

    // Create Pharmacy Users
    const pharmacyUser1 = await User.create({
      name: 'City Pharmacy',
      email: 'pharmacy@example.com',
      password: 'password123',
      role: 'pharmacy'
    });

    const pharmacyUser2 = await User.create({
      name: 'National Health Store',
      email: 'national@example.com',
      password: 'password123',
      role: 'pharmacy'
    });

    // Create regular User
    await User.create({
      name: 'Normal User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });

    // Create Medicines dummy data
    const medicines = [
      // Pharmacy 1: City Pharmacy
      { name: 'Paracetamol', pharmacyId: pharmacyUser1._id, stock: 50, price: 5.99, description: 'Common pain reliever and fever reducer.' },
      { name: 'Dolo 650', pharmacyId: pharmacyUser1._id, stock: 30, price: 8.50, description: 'Extra strength fever reducer.' },
      { name: 'Crocin', pharmacyId: pharmacyUser1._id, stock: 0, price: 4.25, description: 'Fast acting pain relief.' },
      { name: 'Aspirin', pharmacyId: pharmacyUser1._id, stock: 120, price: 12.00, description: 'Pain reliever and blood thinner.' },
      { name: 'Amoxicillin', pharmacyId: pharmacyUser1._id, stock: 15, price: 15.00, description: 'Broad-spectrum antibiotic for bacterial infections.' },
      { name: 'Azithromycin', pharmacyId: pharmacyUser1._id, stock: 20, price: 18.50, description: 'Antibiotic for various respiratory infections.' },
      { name: 'Vitamin C', pharmacyId: pharmacyUser1._id, stock: 200, price: 10.50, description: 'Immune system booster.' },
      { name: 'Metformin', pharmacyId: pharmacyUser1._id, stock: 60, price: 14.50, description: 'Medication for managing type 2 diabetes.' },

      // Pharmacy 2: National Health Store
      { name: 'Paracetamol', pharmacyId: pharmacyUser2._id, stock: 100, price: 4.99, description: 'General pain relief medication.' },
      { name: 'Ibuprofen', pharmacyId: pharmacyUser2._id, stock: 75, price: 8.99, description: 'Anti-inflammatory and pain reliever.' },
      { name: 'Allegra', pharmacyId: pharmacyUser2._id, stock: 40, price: 21.00, description: 'Non-drowsy formulation for 24h allergy relief.' },
      { name: 'Flonase', pharmacyId: pharmacyUser2._id, stock: 22, price: 25.50, description: 'Nasal spray for powerful allergy relief.' },
      { name: 'Lisinopril', pharmacyId: pharmacyUser2._id, stock: 50, price: 15.75, description: 'Treats high blood pressure and heart failure.' },
      { name: 'Omega-3', pharmacyId: pharmacyUser2._id, stock: 120, price: 29.99, description: 'Promotes heart and brain health.' },
      { name: 'Vitamin D3', pharmacyId: pharmacyUser2._id, stock: 150, price: 14.25, description: 'Supports bone health and immunity.' },
      { name: 'Claritin', pharmacyId: pharmacyUser2._id, stock: 55, price: 20.99, description: '24-hour non-drowsy allergy relief.' }
    ];

    await Medicine.insertMany(medicines);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();

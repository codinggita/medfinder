const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const medicineDbName = process.env.DB_MEDICINE || 'medicine';
const usersDbName = process.env.DB_USERS || 'users';

const createDbUri = (base, dbName) => {
  try {
    const url = new URL(base);
    url.pathname = `/${dbName}`;
    return url.toString();
  } catch (err) {
    // Fallback for simple local strings if URL fails
    const [path, query] = base.split('?');
    const separator = path.endsWith('/') ? '' : '/';
    return `${path}${separator}${dbName}${query ? '?' + query : ''}`;
  }
};

// Create separate connections
const medicineConn = mongoose.createConnection(createDbUri(mongoUri, medicineDbName));
const userConn = mongoose.createConnection(createDbUri(mongoUri, usersDbName));

const connectDB = async () => {
  try {
    // Wait for both connections to open
    await Promise.all([
      new Promise((resolve, reject) => {
        medicineConn.once('open', () => {
          console.log(`Medicine DB Connected: ${medicineConn.host}/${medicineConn.name}`);
          resolve();
        });
        medicineConn.on('error', reject);
      }),
      new Promise((resolve, reject) => {
        userConn.once('open', () => {
          console.log(`Users DB Connected: ${userConn.host}/${userConn.name}`);
          resolve();
        });
        userConn.on('error', reject);
      })
    ]);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const users = [
  {
    _id: 'user1',
    name: 'City Pharmacy',
    email: 'pharmacy@example.com',
    password: '$2a$10$wS9bL/KlpL3mIWR2W3nQ9.H.S6eU3rX3Jg.G.N.P.O.R.S.T.U.V.W.', // hashed 'password123'
    role: 'pharmacy'
  },
  {
    _id: 'user2',
    name: 'National Health Store',
    email: 'national@example.com',
    password: '$2a$10$wS9bL/KlpL3mIWR2W3nQ9.H.S6eU3rX3Jg.G.N.P.O.R.S.T.U.V.W.', // hashed 'password123'
    role: 'pharmacy'
  },
  {
    _id: 'user3',
    name: 'John Doe',
    email: 'user@example.com',
    password: '$2a$10$wS9bL/KlpL3mIWR2W3nQ9.H.S6eU3rX3Jg.G.N.P.O.R.S.T.U.V.W.', // hashed 'password123'
    role: 'user'
  }
];

const medicines = [
  // Pharmacy 1: City Pharmacy
  { _id: 'med1', name: 'Paracetamol', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 50, price: 5.99, description: 'Common pain reliever and fever reducer.' },
  { _id: 'med2', name: 'Dolo 650', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 30, price: 8.50, description: 'Extra strength fever reducer.' },
  { _id: 'med3', name: 'Crocin', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 0, price: 4.25, description: 'Fast acting pain relief.' },
  { _id: 'med4', name: 'Aspirin', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 120, price: 12.00, description: 'Pain reliever and blood thinner.' },
  { _id: 'med5', name: 'Amoxicillin', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 15, price: 15.00, description: 'Broad-spectrum antibiotic for bacterial infections.' },
  { _id: 'med6', name: 'Azithromycin', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 10, price: 22.50, description: 'Used for various respiratory infections.' },
  { _id: 'med7', name: 'Metformin', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 60, price: 14.50, description: 'Management of type 2 diabetes.' },
  { _id: 'med8', name: 'Atorvastatin', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 25, price: 32.00, description: 'To lower high cholesterol levels.' },
  { _id: 'med9', name: 'Cetirizine', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 40, price: 9.99, description: 'Effective relief for common allergy symptoms.' },
  { _id: 'med10', name: 'Omeprazole', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 35, price: 18.25, description: 'Treats acid reflux and stomach ulcers.' },
  { _id: 'med11', name: 'Vitamin C', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 200, price: 10.50, description: 'Essential vitamin for immune support.' },
  { _id: 'med12', name: 'B-Complex', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 85, price: 19.99, description: 'Supports energy metabolism and nervous system.' },

  // Pharmacy 2: National Health Store
  { _id: 'med13', name: 'Paracetamol', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 100, price: 4.99, description: 'General pain relief medication.' },
  { _id: 'med14', name: 'Ibuprofen', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 75, price: 8.99, description: 'Anti-inflammatory and pain reliever.' },
  { _id: 'med15', name: 'Allegra', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 40, price: 21.00, description: 'Non-drowsy formulation for 24h allergy relief.' },
  { _id: 'med16', name: 'Flonase', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 22, price: 25.50, description: 'Nasal spray for powerful allergy relief.' },
  { _id: 'med17', name: 'Lisinopril', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 50, price: 15.75, description: 'Treats high blood pressure and heart failure.' },
  { _id: 'med18', name: 'Amlodipine', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 30, price: 12.99, description: 'Calcium channel blocker for hypertension.' },
  { _id: 'med19', name: 'Omega-3', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 120, price: 29.99, description: 'Promotes heart and brain health.' },
  { _id: 'med20', name: 'Vitamin D3', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 150, price: 14.25, description: 'Supports bone health and immunity.' },
  { _id: 'med21', name: 'Pepto-Bismol', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 45, price: 11.50, description: 'Relieves upset stomach and indigestion.' },
  { _id: 'med22', name: 'Tylenol', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 80, price: 9.49, description: 'Popular acetaminophen brand for pain.' },
  { _id: 'med23', name: 'Claritin', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 55, price: 20.99, description: '24-hour non-drowsy allergy relief.' },
  { _id: 'med24', name: 'Zantac', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 15, price: 13.99, description: 'Prevents and relieves heartburn.' },
  { _id: 'med25', name: 'Pantoprazole', pharmacyId: { _id: 'user2', name: 'National Health Store' }, stock: 28, price: 16.50, description: 'Reduced stomach acid production.' }
];

module.exports = {
  connectDB,
  medicineConn,
  userConn,
  users,
  medicines
};

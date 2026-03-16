const mongoose = require('mongoose');
require('dotenv').config();

const cloudUri = process.env.MONGO_URI;
const medicineDbName = process.env.DB_MEDICINE || 'medicine';
const usersDbName = process.env.DB_USERS || 'users';
const localUri = 'mongodb://127.0.0.1:27017';

const createDbUri = (base, dbName) => {
  try {
    const url = new URL(base);
    url.pathname = `/${dbName}`;
    return url.toString();
  } catch (err) {
    const [path, query] = base.split('?');
    const separator = path.endsWith('/') ? '' : '/';
    return `${path}${separator}${dbName}${query ? '?' + query : ''}`;
  }
};

// Initialize connections without URI first
const medicineConn = mongoose.createConnection();
const userConn = mongoose.createConnection();

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    tlsAllowInvalidCertificates: true
  };

  try {
    console.log("Connecting to Cloud MongoDB...");
    await Promise.all([
      medicineConn.openUri(createDbUri(cloudUri, medicineDbName), options),
      userConn.openUri(createDbUri(cloudUri, usersDbName), options)
    ]);
    console.log("Cloud MongoDB Connected Successfully.");
  } catch (error) {
    console.error(`Cloud Database Connection Error: ${error.message}`);
    console.warn("Attempting local MongoDB fallback...");
    
    try {
      // Clear previous attempts and try local
      await Promise.all([
        medicineConn.close(),
        userConn.close()
      ]);
      
      await Promise.all([
        medicineConn.openUri(createDbUri(localUri, medicineDbName), options),
        userConn.openUri(createDbUri(localUri, usersDbName), options)
      ]);
      console.log("Local MongoDB Fallback Successful.");
    } catch (localError) {
      console.error(`Local Fallback Failed: ${localError.message}`);
      console.warn("Server will continue running, but database features may be unavailable.");
    }
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
  }
];

const medicines = [
  { _id: 'med1', name: 'Paracetamol', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 50, price: 5.99, description: 'Common pain reliever.' },
  { _id: 'med2', name: 'Dolo 650', pharmacyId: { _id: 'user1', name: 'City Pharmacy' }, stock: 30, price: 8.50, description: 'Fever reducer.' }
];

module.exports = {
  connectDB,
  medicineConn,
  userConn,
  users,
  medicines
};

const { medicineConn, userConn, connectDB } = require('./config/db');
const User = require('./models/User');
const Medicine = require('./models/Medicine');
const dotenv = require('dotenv');

dotenv.config();

const importData = async () => {
  try {
    console.log('Starting Cloud Data Import...');
    await connectDB();
    
    // Check if we are actually connected to cloud
    // The connectDB logs "Cloud MongoDB Connected Successfully" if it works.
    
    // Clear existing data
    await Medicine.deleteMany({});
    await User.deleteMany({});
    console.log('Previous Data Cleared!');

    // Create Pharmacy Users
    const p1 = await User.create({ name: 'City Pharmacy', email: 'pharmacy@example.com', password: 'password123', role: 'pharmacy' });
    const p2 = await User.create({ name: 'National Health Store', email: 'national@example.com', password: 'password123', role: 'pharmacy' });
    const p3 = await User.create({ name: 'Wellness Medical Hall', email: 'wellness@example.com', password: 'password123', role: 'pharmacy' });
    const p4 = await User.create({ name: 'Apex Pharma Care', email: 'apex@example.com', password: 'password123', role: 'pharmacy' });
    const p5 = await User.create({ name: 'LifeLine Medicos', email: 'lifeline@example.com', password: 'password123', role: 'pharmacy' });

    // Create regular User
    await User.create({ name: 'Normal User', email: 'user@example.com', password: 'password123', role: 'user' });

    const medicines = [];
    const pharmacies = [p1, p2, p3, p4, p5];
    
    const medTemplates = [
      { name: 'Paracetamol', desc: 'Common pain reliever and fever reducer.', price: 5.99 },
      { name: 'Amoxicillin', desc: 'Antibiotic for bacterial infections.', price: 15.00 },
      { name: 'Metformin', desc: 'For managing type 2 diabetes.', price: 14.50 },
      { name: 'Atorvastatin', desc: 'Lowers high cholesterol.', price: 32.00 },
      { name: 'Lisinopril', desc: 'Treats high blood pressure.', price: 15.75 },
      { name: 'Amlodipine', desc: 'Calcium channel blocker for hypertension.', price: 12.99 },
      { name: 'Albuterol', desc: 'Quick-relief inhaler for asthma.', price: 45.00 },
      { name: 'Gabapentin', desc: 'For nerve pain and seizures.', price: 19.50 },
      { name: 'Levothyroxine', desc: 'Thyroid hormone replacement.', price: 22.25 },
      { name: 'Azithromycin', desc: 'Broad-spectrum antibiotic.', price: 22.50 },
      { name: 'Omeprazole', desc: 'Treats acid reflux and ulcers.', price: 18.25 },
      { name: 'Cetirizine', desc: 'Allergy relief.', price: 9.99 },
      { name: 'Losartan', desc: 'Treats high blood pressure.', price: 17.50 },
      { name: 'Sertraline', desc: 'Antidepressant medication.', price: 28.00 },
      { name: 'Metoprolol', desc: 'Beta-blocker for blood pressure.', price: 14.00 },
      { name: 'Simvastatin', desc: 'Statin to lower cholesterol.', price: 11.50 },
      { name: 'Prednisone', desc: 'Steroid to treat inflammation.', price: 8.50 },
      { name: 'Montelukast', desc: 'Prevents asthma and allergy symptoms.', price: 24.50 },
      { name: 'Fluoxetine', desc: 'Treats depression and anxiety.', price: 19.99 },
      { name: 'Pantoprazole', desc: 'Reduces stomach acid.', price: 16.50 },
      { name: 'Ibuprofen', desc: 'Anti-inflammatory pain reliever.', price: 7.99 },
      { name: 'Furosemide', desc: 'Diuretic for fluid retention.', price: 6.50 },
      { name: 'Rosuvastatin', desc: 'Potent statin for cholesterol.', price: 35.00 },
      { name: 'Hydrochlorothiazide', desc: 'Treats high blood pressure.', price: 4.50 },
      { name: 'Bupropion', desc: 'Antidepressant and smoking cessation aid.', price: 25.00 },
      { name: 'Tamsulosin', desc: 'Treats enlarged prostate.', price: 38.00 },
      { name: 'Duloxetine', desc: 'Nerve pain and mood stabilizer.', price: 21.00 },
      { name: 'Meloxicam', desc: 'Treats arthritis pain.', price: 13.50 },
      { name: 'Tramadol', desc: 'Moderate to severe pain relief.', price: 29.00 },
      { name: 'Citalopram', desc: 'Selective serotonin reuptake inhibitor.', price: 18.00 },
      { name: 'Trazodone', desc: 'Sedative and antidepressant.', price: 15.00 },
      { name: 'Alprazolam', desc: 'Treats anxiety and panic disorders.', price: 22.00 },
      { name: 'Carvedilol', desc: 'Beta-blocker for heart failure.', price: 14.50 },
      { name: 'Warfarin', desc: 'Blood thinner to prevent clots.', price: 9.00 },
      { name: 'Sildenafil', desc: 'Treats erectile dysfunction.', price: 55.00 },
      { name: 'Clopidogrel', desc: 'Prevents blood clots.', price: 19.00 },
      { name: 'Spironolactone', desc: 'Diuretic for heart and skin.', price: 12.00 },
      { name: 'Atenolol', desc: 'Treats high blood pressure.', price: 7.00 },
      { name: 'Cyclobenzaprine', desc: 'Muscle relaxant.', price: 16.00 },
      { name: 'Cephalexin', desc: 'Antibiotic for skin infections.', price: 14.00 }
    ];

    for (let i = 0; i < medTemplates.length; i++) {
        for (let j = 0; j < 3; j++) {
            const pharmacy = pharmacies[(i + j) % pharmacies.length];
            medicines.push({
                name: medTemplates[i].name,
                pharmacyId: pharmacy._id,
                stock: Math.floor(Math.random() * 150) + 10,
                price: parseFloat((medTemplates[i].price + (Math.random() * 2 - 1)).toFixed(2)),
                description: medTemplates[i].desc
            });
        }
    }

    await Medicine.insertMany(medicines);

    console.log(`Successfully imported ${medicines.length} medicines and 6 users to Atlas!`);
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();

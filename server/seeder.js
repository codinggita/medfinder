const { medicineConn, userConn, connectDB } = require('./config/db');
const User = require('./models/User');
const Medicine = require('./models/Medicine');
const dotenv = require('dotenv');

dotenv.config();

const importData = async () => {
  try {
    console.log('Starting Full Data Import...');
    await connectDB();

    // Clear existing data
    await Medicine.deleteMany({});
    await User.deleteMany({});
    console.log('Previous Data Cleared!');

    // ─── Pharmacy Users ────────────────────────────────────────────────────────
    const p1 = await User.create({ name: 'City Pharmacy', email: 'city@example.com', password: 'password123', role: 'pharmacy' });
    const p2 = await User.create({ name: 'National Health Store', email: 'national@example.com', password: 'password123', role: 'pharmacy' });
    const p3 = await User.create({ name: 'Wellness Medical Hall', email: 'wellness@example.com', password: 'password123', role: 'pharmacy' });
    const p4 = await User.create({ name: 'Apex Pharma Care', email: 'apex@example.com', password: 'password123', role: 'pharmacy' });
    const p5 = await User.create({ name: 'LifeLine Medicos', email: 'lifeline@example.com', password: 'password123', role: 'pharmacy' });

    // ─── Regular User ──────────────────────────────────────────────────────────
    await User.create({ name: 'Demo User', email: 'user@example.com', password: 'password123', role: 'user' });

    console.log('Users created!');

    const pharmacies = [p1, p2, p3, p4, p5];

    // ─── Medicine Templates ─────────────────────────────────────────────────────
    const medTemplates = [
      {
        name: 'Paracetamol',
        brandName: 'Crocin 500',
        category: 'Tablet',
        composition: 'Paracetamol 500mg',
        manufacturer: 'GSK Pharmaceuticals',
        price: 5.99,
        description: 'Common pain reliever and fever reducer. Safe for adults and children over 12.',
      },
      {
        name: 'Ibuprofen',
        brandName: 'Brufen 400',
        category: 'Tablet',
        composition: 'Ibuprofen 400mg',
        manufacturer: 'Abbott India',
        price: 7.99,
        description: 'Anti-inflammatory pain reliever for headaches, muscle pain, and fever.',
      },
      {
        name: 'Amoxicillin',
        brandName: 'Mox 500',
        category: 'Capsule',
        composition: 'Amoxicillin Trihydrate 500mg',
        manufacturer: 'Ranbaxy Labs',
        price: 15.00,
        description: 'Broad-spectrum antibiotic for bacterial infections including throat and ear infections.',
      },
      {
        name: 'Azithromycin',
        brandName: 'Zithromax 500',
        category: 'Tablet',
        composition: 'Azithromycin 500mg',
        manufacturer: 'Pfizer India',
        price: 22.50,
        description: 'Macrolide antibiotic for respiratory and skin infections. 3-day treatment course.',
      },
      {
        name: 'Cephalexin',
        brandName: 'Ciplox 500',
        category: 'Capsule',
        composition: 'Cephalexin 500mg',
        manufacturer: 'Cipla Ltd.',
        price: 14.00,
        description: 'First-generation cephalosporin antibiotic for skin, ear, and urinary tract infections.',
      },
      {
        name: 'Metformin',
        brandName: 'Glycomet 500',
        category: 'Tablet',
        composition: 'Metformin Hydrochloride 500mg',
        manufacturer: 'USV Pharmaceuticals',
        price: 14.50,
        description: 'First-line medication for managing type 2 diabetes. Taken with meals.',
      },
      {
        name: 'Glimepiride',
        brandName: 'Amaryl 2mg',
        category: 'Tablet',
        composition: 'Glimepiride 2mg',
        manufacturer: 'Sanofi India',
        price: 18.00,
        description: 'Sulfonylurea drug to control blood sugar in type 2 diabetes.',
      },
      {
        name: 'Atorvastatin',
        brandName: 'Lipitor 20',
        category: 'Tablet',
        composition: 'Atorvastatin Calcium 20mg',
        manufacturer: 'Pfizer India',
        price: 32.00,
        description: 'Statin medication to lower bad cholesterol and reduce heart disease risk.',
      },
      {
        name: 'Rosuvastatin',
        brandName: 'Crestor 10',
        category: 'Tablet',
        composition: 'Rosuvastatin Calcium 10mg',
        manufacturer: 'AstraZeneca India',
        price: 35.00,
        description: 'Potent statin for lowering LDL cholesterol and triglycerides.',
      },
      {
        name: 'Simvastatin',
        brandName: 'Zocor 20',
        category: 'Tablet',
        composition: 'Simvastatin 20mg',
        manufacturer: 'Sun Pharma',
        price: 11.50,
        description: 'HMG-CoA reductase inhibitor for cholesterol management.',
      },
      {
        name: 'Amlodipine',
        brandName: 'Norvasc 5mg',
        category: 'Tablet',
        composition: 'Amlodipine Besylate 5mg',
        manufacturer: 'Pfizer India',
        price: 12.99,
        description: 'Calcium channel blocker for hypertension and angina.',
      },
      {
        name: 'Lisinopril',
        brandName: 'Zestril 10',
        category: 'Tablet',
        composition: 'Lisinopril 10mg',
        manufacturer: 'AstraZeneca India',
        price: 15.75,
        description: 'ACE inhibitor for high blood pressure and heart failure.',
      },
      {
        name: 'Losartan',
        brandName: 'Cozaar 50',
        category: 'Tablet',
        composition: 'Losartan Potassium 50mg',
        manufacturer: 'MSD Pharmaceuticals',
        price: 17.50,
        description: 'Angiotensin receptor blocker for hypertension and kidney protection.',
      },
      {
        name: 'Atenolol',
        brandName: 'Tenormin 50',
        category: 'Tablet',
        composition: 'Atenolol 50mg',
        manufacturer: 'AstraZeneca India',
        price: 7.00,
        description: 'Beta-blocker for high blood pressure and heart rate control.',
      },
      {
        name: 'Metoprolol',
        brandName: 'Betaloc 50',
        category: 'Tablet',
        composition: 'Metoprolol Succinate 50mg',
        manufacturer: 'AstraZeneca India',
        price: 14.00,
        description: 'Cardioselective beta-blocker for hypertension and angina.',
      },
      {
        name: 'Carvedilol',
        brandName: 'Coreg 6.25',
        category: 'Tablet',
        composition: 'Carvedilol 6.25mg',
        manufacturer: 'GSK Pharmaceuticals',
        price: 14.50,
        description: 'Alpha and beta-blocker for heart failure and high blood pressure.',
      },
      {
        name: 'Omeprazole',
        brandName: 'Prilosec 20',
        category: 'Capsule',
        composition: 'Omeprazole 20mg',
        manufacturer: 'Dr. Reddy\'s Labs',
        price: 18.25,
        description: 'Proton pump inhibitor for acid reflux, GERD, and gastric ulcers.',
      },
      {
        name: 'Pantoprazole',
        brandName: 'Pantodac 40',
        category: 'Tablet',
        composition: 'Pantoprazole Sodium 40mg',
        manufacturer: 'Zydus Cadila',
        price: 16.50,
        description: 'Reduces stomach acid production. Taken before meals.',
      },
      {
        name: 'Cetirizine',
        brandName: 'Zyrtec 10',
        category: 'Tablet',
        composition: 'Cetirizine Hydrochloride 10mg',
        manufacturer: 'UCB India',
        price: 9.99,
        description: 'Second-generation antihistamine for allergy relief, hay fever, and hives.',
      },
      {
        name: 'Montelukast',
        brandName: 'Singulair 10',
        category: 'Tablet',
        composition: 'Montelukast Sodium 10mg',
        manufacturer: 'MSD Pharmaceuticals',
        price: 24.50,
        description: 'Leukotriene receptor antagonist for asthma and seasonal allergies.',
      },
      {
        name: 'Albuterol',
        brandName: 'Ventolin Inhaler',
        category: 'Injection',
        composition: 'Salbutamol Sulphate 100mcg/puff',
        manufacturer: 'GSK Pharmaceuticals',
        price: 45.00,
        description: 'Short-acting bronchodilator (rescue inhaler) for asthma attacks.',
      },
      {
        name: 'Levothyroxine',
        brandName: 'Synthroid 50',
        category: 'Tablet',
        composition: 'Levothyroxine Sodium 50mcg',
        manufacturer: 'Abbott India',
        price: 22.25,
        description: 'Synthetic thyroid hormone for hypothyroidism. Taken on empty stomach.',
      },
      {
        name: 'Gabapentin',
        brandName: 'Neurontin 300',
        category: 'Capsule',
        composition: 'Gabapentin 300mg',
        manufacturer: 'Pfizer India',
        price: 19.50,
        description: 'For neuropathic pain, epilepsy, and restless leg syndrome.',
      },
      {
        name: 'Pregabalin',
        brandName: 'Lyrica 75',
        category: 'Capsule',
        composition: 'Pregabalin 75mg',
        manufacturer: 'Pfizer India',
        price: 32.00,
        description: 'For nerve pain, fibromyalgia, and certain types of seizures.',
      },
      {
        name: 'Sertraline',
        brandName: 'Zoloft 50',
        category: 'Tablet',
        composition: 'Sertraline Hydrochloride 50mg',
        manufacturer: 'Pfizer India',
        price: 28.00,
        description: 'SSRI antidepressant for depression, OCD, panic disorder, and PTSD.',
      },
      {
        name: 'Fluoxetine',
        brandName: 'Prozac 20',
        category: 'Capsule',
        composition: 'Fluoxetine Hydrochloride 20mg',
        manufacturer: 'Eli Lilly India',
        price: 19.99,
        description: 'SSRI for depression, bulimia nervosa, OCD, and panic disorder.',
      },
      {
        name: 'Duloxetine',
        brandName: 'Cymbalta 30',
        category: 'Capsule',
        composition: 'Duloxetine Hydrochloride 30mg',
        manufacturer: 'Eli Lilly India',
        price: 21.00,
        description: 'SNRI for depression, anxiety, and neuropathic pain.',
      },
      {
        name: 'Bupropion',
        brandName: 'Wellbutrin 150',
        category: 'Tablet',
        composition: 'Bupropion Hydrochloride 150mg',
        manufacturer: 'GSK Pharmaceuticals',
        price: 25.00,
        description: 'Antidepressant also used for smoking cessation (Zyban).',
      },
      {
        name: 'Alprazolam',
        brandName: 'Xanax 0.25',
        category: 'Tablet',
        composition: 'Alprazolam 0.25mg',
        manufacturer: 'Pfizer India',
        price: 22.00,
        description: 'Benzodiazepine for anxiety and panic disorders. Short-term use only.',
      },
      {
        name: 'Citalopram',
        brandName: 'Celexa 20',
        category: 'Tablet',
        composition: 'Citalopram Hydrobromide 20mg',
        manufacturer: 'Forest Labs India',
        price: 18.00,
        description: 'SSRI antidepressant for major depressive disorder.',
      },
      {
        name: 'Trazodone',
        brandName: 'Desyrel 50',
        category: 'Tablet',
        composition: 'Trazodone Hydrochloride 50mg',
        manufacturer: 'Bristol-Myers Squibb',
        price: 15.00,
        description: 'Antidepressant with sedative properties, also used for insomnia.',
      },
      {
        name: 'Prednisone',
        brandName: 'Deltasone 10',
        category: 'Tablet',
        composition: 'Prednisone 10mg',
        manufacturer: 'Pfizer India',
        price: 8.50,
        description: 'Corticosteroid for inflammation, autoimmune diseases, and allergic reactions.',
      },
      {
        name: 'Furosemide',
        brandName: 'Lasix 40',
        category: 'Tablet',
        composition: 'Furosemide 40mg',
        manufacturer: 'Sanofi India',
        price: 6.50,
        description: 'Loop diuretic for fluid retention, generically called water pill.',
      },
      {
        name: 'Spironolactone',
        brandName: 'Aldactone 25',
        category: 'Tablet',
        composition: 'Spironolactone 25mg',
        manufacturer: 'Pfizer India',
        price: 12.00,
        description: 'Aldosterone antagonist diuretic for heart failure, acne, and PCOS.',
      },
      {
        name: 'Hydrochlorothiazide',
        brandName: 'HCTZ 25',
        category: 'Tablet',
        composition: 'Hydrochlorothiazide 25mg',
        manufacturer: 'Sun Pharma',
        price: 4.50,
        description: 'Thiazide diuretic for high blood pressure and edema.',
      },
      {
        name: 'Clopidogrel',
        brandName: 'Plavix 75',
        category: 'Tablet',
        composition: 'Clopidogrel Bisulphate 75mg',
        manufacturer: 'Sanofi India',
        price: 19.00,
        description: 'Antiplatelet agent to prevent blood clots after heart attack or stroke.',
      },
      {
        name: 'Warfarin',
        brandName: 'Coumadin 5',
        category: 'Tablet',
        composition: 'Warfarin Sodium 5mg',
        manufacturer: 'Bristol-Myers Squibb',
        price: 9.00,
        description: 'Anticoagulant (blood thinner) to prevent clotting in atrial fibrillation and DVT.',
      },
      {
        name: 'Meloxicam',
        brandName: 'Mobic 15',
        category: 'Tablet',
        composition: 'Meloxicam 15mg',
        manufacturer: 'Boehringer Ingelheim',
        price: 13.50,
        description: 'NSAID for osteoarthritis and rheumatoid arthritis pain.',
      },
      {
        name: 'Tramadol',
        brandName: 'Ultram 50',
        category: 'Capsule',
        composition: 'Tramadol Hydrochloride 50mg',
        manufacturer: 'Janssen India',
        price: 29.00,
        description: 'Opioid-like analgesic for moderate to severe pain. Prescription required.',
      },
      {
        name: 'Tamsulosin',
        brandName: 'Flomax 0.4',
        category: 'Capsule',
        composition: 'Tamsulosin Hydrochloride 0.4mg',
        manufacturer: 'Astellas Pharma',
        price: 38.00,
        description: 'Alpha-blocker to relieve symptoms of enlarged prostate (BPH).',
      },
      {
        name: 'Sildenafil',
        brandName: 'Viagra 50',
        category: 'Tablet',
        composition: 'Sildenafil Citrate 50mg',
        manufacturer: 'Pfizer India',
        price: 55.00,
        description: 'PDE5 inhibitor for erectile dysfunction. Also used for pulmonary arterial hypertension.',
      },
      {
        name: 'Cyclobenzaprine',
        brandName: 'Flexeril 10',
        category: 'Tablet',
        composition: 'Cyclobenzaprine Hydrochloride 10mg',
        manufacturer: 'Janssen India',
        price: 16.00,
        description: 'Muscle relaxant for short-term relief of muscle spasms.',
      },
      {
        name: 'Dolo 650',
        brandName: 'Dolo 650',
        category: 'Tablet',
        composition: 'Paracetamol 650mg',
        manufacturer: 'Micro Labs Ltd.',
        price: 8.50,
        description: 'High-dose paracetamol for fever and pain, especially popular during flu season.',
      },
      {
        name: 'Vitamin D3',
        brandName: 'Calcirol 60K',
        category: 'Capsule',
        composition: 'Cholecalciferol 60,000 IU',
        manufacturer: 'Cadila Healthcare',
        price: 42.00,
        description: 'Weekly dose Vitamin D3 supplement for deficiency treatment and bone health.',
      },
      {
        name: 'Vitamin B12',
        brandName: 'Cobadex CZS',
        category: 'Tablet',
        composition: 'Methylcobalamin 1500mcg + Zinc + Selenium',
        manufacturer: 'Franco-Indian Pharma',
        price: 19.00,
        description: 'Treats Vitamin B12 deficiency and peripheral neuropathy.',
      },
      {
        name: 'Calcium + Vitamin D',
        brandName: 'Shelcal 500',
        category: 'Tablet',
        composition: 'Calcium Carbonate 1250mg + Vitamin D3 250 IU',
        manufacturer: 'Elder Pharma',
        price: 17.50,
        description: 'Calcium supplement for osteoporosis prevention and bone strength.',
      },
      {
        name: 'Iron + Folic Acid',
        brandName: 'Ferrochelate',
        category: 'Tablet',
        composition: 'Ferrous Fumarate 200mg + Folic Acid 0.5mg',
        manufacturer: 'Macleods Pharma',
        price: 11.00,
        description: 'For iron deficiency anemia, especially during pregnancy.',
      },
      {
        name: 'Ondansetron',
        brandName: 'Zofran 4mg',
        category: 'Tablet',
        composition: 'Ondansetron Hydrochloride 4mg',
        manufacturer: 'GSK Pharmaceuticals',
        price: 24.00,
        description: 'Antiemetic for nausea and vomiting caused by chemotherapy or surgery.',
      },
      {
        name: 'Domperidone',
        brandName: 'Motilium 10',
        category: 'Tablet',
        composition: 'Domperidone 10mg',
        manufacturer: 'Janssen India',
        price: 10.50,
        description: 'Treats nausea, vomiting, and bloating by improving gut motility.',
      },
      {
        name: 'ORS Powder',
        brandName: 'Electral ORS',
        category: 'Syrup',
        composition: 'Sodium Chloride + Potassium Chloride + Sodium Citrate + Dextrose',
        manufacturer: 'Franco-Indian Pharma',
        price: 6.00,
        description: 'Oral rehydration solution for diarrhea and dehydration.',
      },
      {
        name: 'Betamethasone Cream',
        brandName: 'Betnovate-C',
        category: 'Cream',
        composition: 'Betamethasone Valerate 0.1% + Clioquinol 3%',
        manufacturer: 'GSK Pharmaceuticals',
        price: 28.00,
        description: 'Topical corticosteroid-antibiotic cream for eczema, psoriasis, and skin infections.',
      },
      {
        name: 'Clotrimazole Cream',
        brandName: 'Candid Cream',
        category: 'Cream',
        composition: 'Clotrimazole 1%',
        manufacturer: 'Glenmark Pharma',
        price: 16.00,
        description: 'Antifungal cream for ringworm, athlete\'s foot, and candidal skin infections.',
      },
    ];

    // ─── Generate Entries (each medicine at 2–3 pharmacies) ───────────────────────
    const medicines = [];
    const expiryDates = [
      new Date('2026-03-01'), new Date('2026-06-01'), new Date('2026-09-01'),
      new Date('2026-12-01'), new Date('2027-03-01'), new Date('2027-06-01'),
    ];

    for (let i = 0; i < medTemplates.length; i++) {
      const t = medTemplates[i];
      // Assign 2 pharmacies per medicine (rotating)
      for (let j = 0; j < 2; j++) {
        const pharmacy = pharmacies[(i + j) % pharmacies.length];
        const expiry = expiryDates[(i + j) % expiryDates.length];
        const priceFuzz = parseFloat((t.price + (Math.random() * 2 - 1)).toFixed(2));
        medicines.push({
          name: t.name,
          brandName: t.brandName,
          category: t.category,
          composition: t.composition,
          manufacturer: t.manufacturer,
          pharmacyId: pharmacy._id,
          stock: Math.floor(Math.random() * 150) + 10,
          price: Math.max(1, priceFuzz),
          expiryDate: expiry,
          description: t.description,
        });
      }
    }

    await Medicine.insertMany(medicines);

    console.log(`\n✅ SUCCESS:`);
    console.log(`   • ${medicines.length} medicines imported`);
    console.log(`   • 6 users (5 pharmacies + 1 regular user) created`);
    console.log(`\nLogin credentials:`);
    console.log(`   Regular user  → user@example.com / password123`);
    console.log(`   City Pharmacy → city@example.com / password123`);
    console.log(`   National      → national@example.com / password123`);
    process.exit();
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();

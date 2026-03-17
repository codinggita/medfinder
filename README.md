# MedFinder 💊  
### Full Stack Healthcare Solution

MedFinder is a professional full-stack web application designed to bridge the gap between patients and pharmacies. It provides a real-time platform for searching medicine availability, browsing local pharmacy inventories, and managing pharmacy stocks through a dedicated dashboard.

## 🚀 Live Demo
- **Frontend (Netlify):** [https://medfinder-by-devisingh.netlify.app](https://medfinder-by-devisingh.netlify.app)
- **Backend API (Render):** [https://medfinder-api.onrender.com/](https://medfinder-api.onrender.com/)

---

## 📌 Project Overview
Finding specific medicines in local pharmacies can be a stressful and time-consuming process, especially during emergencies. MedFinder addresses this by offering a centralized digital directory where:
- **Users** can instantly find which nearby stores have their required medication.
- **Pharmacies** can digitize their inventory and reach more patients.

## ✨ Key Features

### 🔍 Advanced Medicine Search
- **Instant Search:** Find medicines by name, category, or brand.
- **Debounced Input:** Optimized performance for a smooth searching experience.
- **Smart Filtering:** Sort by price, availability, or relevance.

### 🏥 Pharmacy Ecosystem
- **Verified Pharmacies:** Browse a curated list of certified local healthcare providers.
- **Live Inventory:** View the real-time stock of specific pharmacies.
- **Direct Navigation:** Seamlessly move from pharmacy listings to their specific medicine catalogs.

### 🛠️ Pharmacy Dashboard (B2B)
- **Inventory Management:** Full CRUD operations for medicines (Add, Edit, Delete).
- **Stock Tracking:** Monitor and update availability levels (In Stock, Low Stock, Out of Stock).
- **Business Insights:** Visualize pharmacy performance and inventory statistics.

### 🛍️ User Experience
- **Secure Authentication:** JWT-based login and signup for users and pharmacy owners.
- **Modern UI/UX:** Clean, professional interface with a fresh green healthcare theme.
- **Dark Mode:** Full support for both light and dark themes with persistent storage.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.
- **Order Tracking:** Simulated order placement and real-time status tracking for a complete commerce flow.

---

## 🛠️ Technical Stack
- **Frontend:** React.js, Tailwind CSS, Axios, Lucide Icons, Recharts (for Dashboard analytics).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Cloud-hosted).
- **State Management:** React Context API (Auth, Theme, Cart).
- **Deployment:** Render (Backend), Netlify (Frontend).

## 📂 Project Structure
```text
medfinder
│
├── client/          # React Frontend (Vite)
│   ├── src/
│   │   ├── api/     # Centralized API Configuration
│   │   ├── components/
│   │   ├── context/ # Auth, Theme, Cart states
│   │   └── pages/   # Application Views
│
├── server/          # Node/Express Backend
│   ├── models/      # Mongoose Schemas
│   ├── routes/      # API Endpoints
│   ├── middleware/  # Auth & Security
│   └── server.js    # Entry point
```

---

## 🧑‍💻 Development
This project was developed with a focus on **clean code**, **environment-aware configuration**, and **production readiness**. It includes production-grade features like:
- **CORS Management:** Dynamic origin validation for secure cross-domain communication.
- **Centralized API Logic:** Abstracted axios instances for easy environment switching.
- **SPA Routing Fixes:** Netlify `_redirects` configuration for deep-linking support.

## 👨‍💻 Author
**Devisingh Rajput**  
*Full Stack Developer*

---
© 2026 MedFinder. All rights reserved.
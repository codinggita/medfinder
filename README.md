# MedFinder 💊  
### Full Stack Hackathon Project

## 📌 Project Description
MedFinder is a full-stack web application developed as part of the **Full Stack Hackathon Event**. The project addresses a real-world healthcare problem where people struggle to find the availability of medicines in nearby pharmacies. Often, patients or their family members must visit multiple medical stores to locate a required medicine, which wastes time and can delay treatment during emergencies.

MedFinder provides a centralized digital platform where users can search for a medicine and instantly view nearby pharmacies where the medicine is available. Pharmacy owners can update their inventory through a dashboard, ensuring users always receive accurate and up-to-date stock information.

The project demonstrates a complete full-stack solution using modern web technologies.

---

## 🎯 Event Objective
This project was built to meet the goals of the **Full Stack Hackathon Event**, which encourages participants to:

- Identify a real-world problem  
- Design and build a complete full-stack solution  
- Use modern web technologies to solve practical problems  

---

## ❗ Problem Statement
Many people face difficulty finding specific medicines when they urgently need them. Patients often visit several pharmacies before locating the required medication. This process is inefficient, time-consuming, and stressful, especially in medical emergencies.

Currently, there is no simple platform that allows users to check medicine availability across nearby pharmacies in one place.

---

## 💡 Proposed Solution
MedFinder solves this problem by providing a web platform where users can:

- Search for a specific medicine  
- View nearby pharmacies where the medicine is available  
- Check medicine stock status  
- Save time and reduce unnecessary travel  

Pharmacy owners can manage their medicine inventory through a dashboard to ensure accurate stock availability.

---

## 🚀 Key Features

### 🔎 Medicine Search
Users can search medicines by name and quickly see which pharmacies have them in stock.

### 📍 Nearby Pharmacy Listing
The platform displays nearby pharmacies along with important information such as:
- Pharmacy name  
- Location  
- Availability status  

### 📦 Stock Status
Each medicine listing displays its availability:
- Available  
- Out of Stock  
- Low Stock  

### 🏪 Pharmacy Dashboard
Pharmacy owners can manage medicine inventory by:
- Adding new medicines  
- Updating stock levels  
- Removing medicines  

### 🔐 Authentication System
The platform includes authentication features:
- User signup  
- User login  
- Password validation  
- Protected routes  

### 🌙 Theme Support
Users can switch between:
- Dark mode  
- Light mode  

The selected theme is saved for future visits.

### 🔎 Search, Filtering & Sorting
Users can:
- Search medicines  
- Filter results  
- Sort pharmacy listings  

### ⚡ Debounced Search
Debouncing is implemented to optimize performance during search operations and prevent excessive API requests.

### 📄 Pagination
Pagination is implemented for medicine listings using backend pagination.

### 🔄 CRUD Operations
The system supports full database operations:

- Create medicines  
- Read medicine data  
- Update stock  
- Delete medicines  

### 🔗 API Integration
REST APIs handle all backend operations with proper loading states.

---

## 📂 Project Structure

```text
medfinder
│
├── client
│   ├── components
│   ├── pages
│   ├── context
│   ├── hooks
│   └── utils
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── config
```


---

## 🌍 Real World Impact
MedFinder improves access to essential medicines by helping users quickly locate pharmacies that have the required medication in stock. The platform reduces unnecessary travel, saves time, and supports better healthcare accessibility.

---

## 🔮 Future Improvements
Possible future enhancements include:

- Real-time pharmacy inventory integration  
- Map-based pharmacy location search  
- Medicine reservation system  
- Notification alerts for medicine availability  

---

## 👨‍💻 Contributor
Developed as a **Full Stack Hackathon Project** demonstrating practical application of modern web technologies.